"use client";

import { useEffect, useRef } from "react";

type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number; g: number; b: number; a: number };

/**
 * Particle portrait. Samples the image into particles that spring home. Once they settle,
 * the real photo fades in over them so the face reads almost perfectly. The cursor carves a
 * soft hole in the photo and pushes particles away; a click scatters everything, then it reforms.
 * Pauses off-screen; honours prefers-reduced-motion (photo shown immediately).
 */
export default function ParticleAvatars({ src, label }: { src?: string; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let dead = false;
    let photo: HTMLCanvasElement | null = null;
    let masked: HTMLCanvasElement | null = null;
    let photoAlpha = reduce ? 1 : 0;
    let settled = 0;
    const mouse = { x: -9999, y: -9999 };

    const drawProcedural = (c: CanvasRenderingContext2D, W: number, H: number) => {
      const bust = (cx: number, color: string) => {
        const s = Math.min(W / 2.4, H / 1.5);
        c.fillStyle = color;
        c.beginPath();
        c.ellipse(cx, H * 0.36, s * 0.2, s * 0.26, 0, 0, Math.PI * 2);
        c.fill();
        c.beginPath();
        c.moveTo(cx - s * 0.5, H * 0.95);
        c.quadraticCurveTo(cx - s * 0.46, H * 0.6, cx, H * 0.6);
        c.quadraticCurveTo(cx + s * 0.46, H * 0.6, cx + s * 0.5, H * 0.95);
        c.closePath();
        c.fill();
      };
      bust(W * 0.5, "#c9a227");
    };

    const build = async () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // photo layer at device resolution so it is crisp once revealed
      const ph = document.createElement("canvas");
      ph.width = Math.floor(w * dpr);
      ph.height = Math.floor(h * dpr);
      const pc = ph.getContext("2d")!;
      pc.imageSmoothingQuality = "high";
      // sampling layer at CSS resolution
      const off = document.createElement("canvas");
      off.width = Math.floor(w);
      off.height = Math.floor(h);
      const o = off.getContext("2d", { willReadFrequently: true })!;

      if (src) {
        const img = new Image();
        img.src = src;
        await img.decode().catch(() => undefined);
        if (dead) return;
        const k = Math.min(w / img.width, h / img.height);
        const dw = img.width * k;
        const dh = img.height * k;
        const dx = (w - dw) / 2;
        const dy = h - dh; // sit on the baseline
        o.drawImage(img, dx, dy, dw, dh);
        pc.drawImage(img, dx * dpr, dy * dpr, dw * dpr, dh * dpr);
      } else {
        drawProcedural(o, off.width, off.height);
        pc.drawImage(off, 0, 0, ph.width, ph.height);
      }
      photo = ph;
      masked = document.createElement("canvas");
      masked.width = ph.width;
      masked.height = ph.height;

      const step = w < 640 ? 4 : 3;
      const data = o.getImageData(0, 0, off.width, off.height).data;
      particles = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const i = (y * off.width + x) * 4;
          if (data[i + 3] < 100) continue;
          particles.push({
            hx: x,
            hy: y,
            x: reduce ? x : Math.random() * w,
            y: reduce ? y : Math.random() * h,
            vx: 0,
            vy: 0,
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3] / 255,
          });
        }
      }
      settled = 0;
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !photo) return;
      ctx.clearRect(0, 0, w, h);

      // --- photo layer: fades in once the particles have settled ---
      const target = reduce ? 1 : settled > 24 ? 0.96 : 0;
      photoAlpha += (target - photoAlpha) * (target > photoAlpha ? 0.035 : 0.12);
      if (photoAlpha > 0.01) {
        ctx.globalAlpha = photoAlpha;
        const near = mouse.x > -999;
        if (near && masked) {
          const mc = masked.getContext("2d")!;
          const k = photo.width / w;
          mc.globalCompositeOperation = "source-over";
          mc.clearRect(0, 0, masked.width, masked.height);
          mc.drawImage(photo, 0, 0);
          mc.globalCompositeOperation = "destination-out";
          const R = 110 * k;
          const g = mc.createRadialGradient(mouse.x * k, mouse.y * k, R * 0.15, mouse.x * k, mouse.y * k, R);
          g.addColorStop(0, "rgba(0,0,0,1)");
          g.addColorStop(1, "rgba(0,0,0,0)");
          mc.fillStyle = g;
          mc.fillRect(0, 0, masked.width, masked.height);
          mc.globalCompositeOperation = "source-over";
          ctx.drawImage(masked, 0, 0, w, h);
        } else {
          ctx.drawImage(photo, 0, 0, w, h);
        }
        ctx.globalAlpha = 1;
      }

      // --- particles ---
      const veil = 1 - photoAlpha * 0.82; // particles stay as a faint shimmer over the photo
      let energy = 0;
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120 && d2 > 0.1) {
          const d = Math.sqrt(d2);
          const f = (1 - d / 120) * 6;
          p.vx -= (dx / d) * f;
          p.vy -= (dy / d) * f;
        }
        const drift = reduce ? 0 : Math.sin(t / 900 + p.hx * 0.02) * 0.15 * veil;
        p.vx += (p.hx - p.x) * 0.045;
        p.vy += (p.hy + drift - p.y) * 0.045;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        energy += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.hx - p.x) * 0.2 + Math.abs(p.hy - p.y) * 0.2;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a * veil})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      const avg = particles.length ? energy / particles.length : 0;
      settled = avg < 0.35 ? settled + 1 : 0;
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const leave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const burst = () => {
      settled = 0;
      photoAlpha = 0;
      for (const p of particles) {
        const a = Math.random() * Math.PI * 2;
        const f = 8 + Math.random() * 16;
        p.vx += Math.cos(a) * f;
        p.vy += Math.sin(a) * f;
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      build();
    });
    ro.observe(canvas.parentElement!);

    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("click", burst);
    build().then(() => {
      if (!dead) raf = requestAnimationFrame(tick);
    });

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("click", burst);
    };
  }, [src]);

  return <canvas ref={ref} role="img" aria-label={label} className="block touch-pan-y" />;
}
