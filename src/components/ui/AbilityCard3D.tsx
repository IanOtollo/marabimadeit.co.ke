"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw } from "lucide-react";
import type { Founder } from "@/data/site";
import { CARD_H, CARD_W, drawBack, drawFront, readFonts } from "@/lib/cardArt";

const W = 2.5;
const H = 3.5;

function roundedShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Holographic foil: an iridescent band that slides with the tilt, applied through the foil mask.
const FRAG = /* glsl */ `
  uniform sampler2D map;
  uniform sampler2D foilMask;
  uniform vec2 uTilt;
  uniform float uTime;
  uniform vec3 uHue;
  varying vec2 vUv;
  // Polished-metal finish: a soft glint sweeps across the card as it tilts, tinted in the
  // character's own colour. No spectrum, no rainbow.
  void main() {
    vec4 base = texture2D(map, vUv);
    float m = texture2D(foilMask, vUv).r;

    float d = vUv.x * 0.8 + vUv.y * 0.6 + uTilt.x * 0.8 - uTilt.y * 0.55;
    float broad = exp(-pow((d - 0.75) * 3.2, 2.0));
    float tight = exp(-pow((d - 0.75) * 11.0, 2.0));

    // brushed grain, very subtle, only on the metal areas
    float grain = fract(sin(dot(floor(vUv * vec2(900.0, 40.0)), vec2(12.9898, 78.233))) * 43758.5453);
    vec3 metal = uHue * (0.55 + 0.55 * broad) + vec3(1.0) * tight * 0.55;
    metal *= 0.94 + 0.06 * grain;

    vec3 col = base.rgb;
    col = mix(col, metal, m * 0.7);

    // soft spotlight that follows the pointer, plus a faint glint over the whole face
    vec2 g = vUv - (vec2(0.5) + uTilt * vec2(0.55, 0.4));
    float spot = pow(max(0.0, 1.0 - length(g) * 1.6), 3.0);
    col += vec3(1.0) * spot * 0.10;
    col += uHue * broad * 0.06;

    gl_FragColor = vec4(col, base.a);
    #include <colorspace_fragment>
  }
`;

export default function AbilityCard3D({ person, index }: { person: Founder; index: number }) {
  const host = useRef<HTMLDivElement>(null);
  const flipRef = useRef<() => void>(() => undefined);
  const [state, setState] = useState<"loading" | "ready" | "fallback">("loading");
  const [pct, setPct] = useState(0);
  const [fallbackSrc, setFallbackSrc] = useState("");
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const el = host.current!;
    let disposed = false;
    let raf = 0;
    let cleanup = () => undefined as void;

    const boot = async () => {
      setPct(15);
      const fonts = readFonts();
      const { face, mask } = await drawFront(person, index, fonts);
      setPct(55);
      const back = await drawBack(person, fonts);
      setPct(80);
      if (disposed) return;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        setFallbackSrc(face.toDataURL("image/png"));
        setState("fallback");
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.touchAction = "pan-y";
      renderer.domElement.style.cursor = "grab";
      renderer.domElement.style.display = "block";
      renderer.domElement.style.maxWidth = "100%";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

      const tex = (cv: HTMLCanvasElement, srgb: boolean) => {
        const t = new THREE.CanvasTexture(cv);
        t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        return t;
      };
      const faceTex = tex(face, true);
      const maskTex = tex(mask, false);
      const backTex = tex(back, true);

      const shape = roundedShape(W, H, 0.14);
      const planeGeo = new THREE.ShapeGeometry(shape, 28);
      const pos = planeGeo.attributes.position;
      const uv = planeGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / W + 0.5, pos.getY(i) / H + 0.5);
      uv.needsUpdate = true;

      const frontMat = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { map: { value: faceTex }, foilMask: { value: maskTex }, uTilt: { value: new THREE.Vector2() }, uTime: { value: 0 }, uHue: { value: new THREE.Color(person.hue) } },
        transparent: true,
      });
      const backMat = new THREE.MeshBasicMaterial({ map: backTex, transparent: true });
      const edgeGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.045, bevelEnabled: false, curveSegments: 28 });
      edgeGeo.translate(0, 0, -0.045);
      const edgeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(person.hue).multiplyScalar(0.35), metalness: 0.9, roughness: 0.35 });

      const group = new THREE.Group();
      const front = new THREE.Mesh(planeGeo, frontMat);
      front.position.z = 0.001;
      const backM = new THREE.Mesh(planeGeo, backMat);
      backM.rotation.y = Math.PI;
      backM.position.z = -0.046;
      group.add(new THREE.Mesh(edgeGeo, edgeMat), front, backM);
      scene.add(group);
      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const key = new THREE.DirectionalLight(0xffffff, 2);
      key.position.set(2, 3, 4);
      scene.add(key);

      const resize = () => {
        const w = el.clientWidth;
        const h = Math.round(w * 1.18);
        renderer.setSize(w, h);
        camera.aspect = w / h;
        const fit = (H * 1.12) / (2 * Math.tan((camera.fov * Math.PI) / 360));
        const fitW = (W * 1.3) / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
        camera.position.set(0, 0, Math.max(fit, fitW));
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rot = { x: 0, y: 0, tx: 0, ty: 0 };
      let isFlipped = false;
      let drag = { on: false, x: 0, y: 0, moved: 0, t: 0, offset: 0 };
      const tilt = new THREE.Vector2();

      const setFlip = (v: boolean) => {
        isFlipped = v;
        setFlipped(v);
      };
      flipRef.current = () => setFlip(!isFlipped);

      const toNDC = (e: PointerEvent) => {
        const r = renderer.domElement.getBoundingClientRect();
        return { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: -(((e.clientY - r.top) / r.height) * 2 - 1) };
      };
      const onMove = (e: PointerEvent) => {
        const p = toNDC(e);
        if (drag.on) {
          const dx = e.clientX - drag.x;
          drag.moved += Math.abs(dx) + Math.abs(e.clientY - drag.y);
          drag.offset += dx * 0.012;
          drag.x = e.clientX;
          drag.y = e.clientY;
        } else if (!reduce) {
          rot.tx = -p.y * 0.3;
          rot.ty = p.x * 0.45;
        }
        tilt.set(p.x, p.y);
      };
      const onDown = (e: PointerEvent) => {
        renderer.domElement.setPointerCapture(e.pointerId);
        drag = { on: true, x: e.clientX, y: e.clientY, moved: 0, t: performance.now(), offset: 0 };
        renderer.domElement.style.cursor = "grabbing";
      };
      const onUp = (e: PointerEvent) => {
        if (!drag.on) return;
        const tap = drag.moved < 8 && performance.now() - drag.t < 350;
        const swipe = Math.abs(drag.offset) > 0.9;
        drag.on = false;
        drag.offset = 0;
        renderer.domElement.style.cursor = "grab";
        if (tap || swipe) setFlip(!isFlipped);
        try {
          renderer.domElement.releasePointerCapture(e.pointerId);
        } catch {}
      };
      const onLeave = () => {
        if (!drag.on) {
          rot.tx = 0;
          rot.ty = 0;
          tilt.set(0, 0);
        }
      };
      const cv = renderer.domElement;
      cv.addEventListener("pointermove", onMove);
      cv.addEventListener("pointerdown", onDown);
      cv.addEventListener("pointerup", onUp);
      cv.addEventListener("pointercancel", onUp);
      cv.addEventListener("pointerleave", onLeave);

      let visible = true;
      const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
      io.observe(el);

      const clock = new THREE.Clock();
      const uTilt = frontMat.uniforms.uTilt.value as THREE.Vector2;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = clock.getElapsedTime();
        const base = isFlipped ? Math.PI : 0;
        const idleX = reduce ? 0 : Math.sin(t * 0.8) * 0.03;
        const idleY = reduce ? 0 : Math.cos(t * 0.6) * 0.06;
        rot.x += (rot.tx + idleX - rot.x) * 0.08;
        const targetY = base + (drag.on ? drag.offset : 0) + rot.ty * (isFlipped ? -1 : 1) + idleY;
        rot.y += (targetY - rot.y) * (drag.on ? 0.3 : 0.09);
        group.rotation.set(rot.x, rot.y, 0);
        group.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.05;
        uTilt.lerp(tilt.clone().add(new THREE.Vector2(Math.sin(rot.y) * 0.5, 0)), 0.1);
        frontMat.uniforms.uTime.value = t;
        renderer.render(scene, camera);
      };
      tick();
      setPct(100);
      setState("ready");

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        cv.removeEventListener("pointermove", onMove);
        cv.removeEventListener("pointerdown", onDown);
        cv.removeEventListener("pointerup", onUp);
        cv.removeEventListener("pointercancel", onUp);
        cv.removeEventListener("pointerleave", onLeave);
        [planeGeo, edgeGeo, frontMat, backMat, edgeMat, faceTex, maskTex, backTex].forEach((o) => o.dispose());
        renderer.dispose();
        renderer.forceContextLoss();
        cv.remove();
      };
    };

    boot().catch(() => {
      if (!disposed) setState("fallback");
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [person, index]);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="pointer-events-none absolute inset-8 -z-10 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${person.hue}, transparent 70%)` }}
        aria-hidden
      />
      <div
        ref={host}
        className="relative w-full select-none"
        style={{ minHeight: state === "ready" ? undefined : "22rem" }}
        role="img"
        aria-label={`${person.name}, ${person.role}. A 3D collectible ability card. Move your pointer to tilt it, drag or tap to flip.`}
      >
        {state === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground" role="status">
            <span className="font-display text-5xl tabular-nums text-foreground">{pct}</span>
            <span className="mt-2 text-xs uppercase tracking-widest">Loading card</span>
          </div>
        )}
        {state === "fallback" && fallbackSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fallbackSrc} width={CARD_W} height={CARD_H} alt={`${person.name} ability card`} className="mx-auto h-auto w-full max-w-xs rounded-2xl" />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>Move to tilt · drag or tap to flip</span>
        <button
          onClick={() => flipRef.current()}
          aria-label={`Flip ${person.first}'s card`}
          aria-pressed={flipped}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 transition hover:bg-muted"
        >
          <RotateCcw size={14} /> Flip
        </button>
      </div>
    </div>
  );
}
