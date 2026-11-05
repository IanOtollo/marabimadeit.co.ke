"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ease } from "@/lib/utils";
import { OrbBody } from "./OrbBody";
import { useMarabi } from "./MarabiProvider";

const S = 56;
const PANEL_W = 384;

export function Orb() {
  const m = useMarabi();
  const ctx = useRef(m);
  ctx.current = m;
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [side, setSide] = useState<"left" | "right">("left");
  const sideRef = useRef(side);

  useEffect(() => {
    const el = root.current!;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: fine ? window.innerWidth - S - 16 : 16, y: window.innerHeight - S - (fine ? 96 : 24) };
    const vel = { x: 0, y: 0 };
    const cur = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6, t: performance.now(), px: 0, py: 0, moved: 0 };
    let nudges: number[] = [];
    let lastNudge = 0;
    let raf = 0;
    const SAFE = 190; // the distance Marabi likes to keep from the cursor
    let perchIdx = 0;
    const perchTimer = setInterval(() => {
      const c = ctx.current;
      if (!c.goto && c.panel === "closed" && !c.asleep && !c.hidden) perchIdx++;
    }, 28000);

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - cur.t);
      const speed = (Math.hypot(e.clientX - cur.px, e.clientY - cur.py) / dt) * 1000;
      cur.px = cur.x = e.clientX;
      cur.py = cur.y = e.clientY;
      cur.t = now;
      cur.moved = now;
      const c = ctx.current;
      if (!fine || reduce || c.asleep || c.hidden || c.goto || c.panel !== "closed") return;
      const d = Math.hypot(e.clientX - (pos.x + S / 2), e.clientY - (pos.y + S / 2));
      if (d < S * 0.7 && speed > 250 && now - lastNudge > 900) {
        lastNudge = now;
        nudges = [...nudges.filter((t) => now - t < 6000), now];
        const ang = Math.atan2(pos.y + S / 2 - e.clientY, pos.x + S / 2 - e.clientX);
        vel.x += Math.cos(ang) * 16;
        vel.y += Math.sin(ang) * 16;
        if (nudges.length >= 3 || Math.random() < 0.12) {
          c.setMood("mad", 1700);
          c.say({ text: nudges.length >= 3 ? "Okay, okay! Easy there." : "Hey! Watch it." }, 2200);
        } else {
          c.setMood("happy", 1600);
          if (Math.random() < 0.35) c.say({ text: ["hehe", "Hi there!", "That tickles."][Math.floor(Math.random() * 3)] }, 1800);
        }
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const target = (t: number) => {
      const c = ctx.current;
      if (c.asleep || c.hidden) {
        const r = c.dock?.getBoundingClientRect();
        return r ? { x: r.left + r.width / 2 - S / 2, y: r.top + r.height / 2 - S / 2, snug: true } : { x: 16, y: 12, snug: true };
      }
      if (c.goto) {
        const r = c.goto.el.getBoundingClientRect();
        return { x: clamp(r.left - S * 0.75, 8, window.innerWidth - S - 8), y: clamp(r.top - S * 0.85, 8, window.innerHeight - S - 8) };
      }
      if (c.panel !== "closed") {
        return window.innerWidth > 640
          ? { x: window.innerWidth - 24 - PANEL_W - S - 14, y: window.innerHeight - 24 - S - 24 }
          : { x: window.innerWidth - S - 16, y: window.innerHeight - S - 16 };
      }
      if (fine && !reduce) {
        // Rest on a perch and watch. Back away if the cursor gets close; never trail it.
        const W = window.innerWidth;
        const H = window.innerHeight;
        const perch = [
          { x: W - S - 84, y: H - S - 110 },
          { x: 28, y: H - S - 110 },
          { x: W - S - 84, y: 120 },
          { x: 28, y: H * 0.45 },
        ][perchIdx % 4];
        const a = t / 1100;
        let tx = perch.x + Math.cos(a * 0.5) * 10;
        let ty = perch.y + Math.sin(a) * 6;
        const dx = pos.x + S / 2 - cur.x;
        const dy = pos.y + S / 2 - cur.y;
        const d = Math.hypot(dx, dy);
        if (d < SAFE) {
          const nx = dx / (d || 1);
          const ny = dy / (d || 1);
          tx = clamp(cur.x + nx * SAFE * 1.1 - S / 2, 8, W - S - 8);
          ty = clamp(cur.y + ny * SAFE * 1.1 - S / 2, 8, H - S - 8);
        }
        return { x: tx, y: ty };
      }
      return { x: 16, y: window.innerHeight - S - 24 + (reduce ? 0 : Math.sin(t / 700) * 4) };
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const tg = target(t);
      const k = reduce ? 1 : 0.07;
      vel.x = vel.x * 0.8 + (tg.x - pos.x) * k;
      vel.y = vel.y * 0.8 + (tg.y - pos.y) * k;
      pos.x = clamp(pos.x + vel.x, -S, window.innerWidth + S);
      pos.y = clamp(pos.y + vel.y, -S, window.innerHeight + S);
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      // pupils look at the cursor on desktop, else along their direction of travel
      const lx = fine ? cur.x - (pos.x + S / 2) : vel.x * 4;
      const ly = fine ? cur.y - (pos.y + S / 2) : vel.y * 4;
      const len = Math.hypot(lx, ly) || 1;
      const mag = Math.min(2.6, len / 40);
      btn.current?.style.setProperty("--px", `${(lx / len) * mag}px`);
      btn.current?.style.setProperty("--py", `${(ly / len) * mag}px`);
      const s: "left" | "right" = pos.x > window.innerWidth / 2 ? "left" : "right";
      if (s !== sideRef.current) {
        sideRef.current = s;
        setSide(s);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(perchTimer);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const visible = !m.hidden && !m.asleep;
  const bubble = m.bubble;

  return (
    <div ref={root} className="pointer-events-none fixed left-0 top-0 z-[55] will-change-transform" style={{ width: S, height: S }}>
      <motion.div animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.4 }} transition={{ duration: 0.5, ease }} className={visible ? "pointer-events-auto" : "pointer-events-none"}>
        <button
          ref={btn}
          onClick={() => (m.panel === "closed" ? m.openChat() : m.close())}
          aria-label="Open Marabi 2.0, the studio assistant"
          tabIndex={visible ? 0 : -1}
          className={`block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary ${m.mood === "happy" ? "animate-bounce" : m.mood === "mad" ? "animate-[wiggle_0.3s_ease-in-out_4]" : ""}`}
        >
          <OrbBody mood={m.mood} size={S} />
        </button>
      </motion.div>

      <AnimatePresence>
        {bubble && visible && m.panel === "closed" && (
          <motion.div
            key={bubble.id}
            role="status"
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            className={`pointer-events-auto absolute top-1/2 ${bubble.bullets ? "w-72 sm:w-80" : "w-64"} -translate-y-1/2 rounded-2xl border border-border bg-card/95 p-4 text-sm shadow-xl backdrop-blur-md ${
              side === "left" ? "right-full mr-4" : "left-full ml-4"
            }`}
          >
            <button onClick={m.dismissBubble} aria-label="Dismiss" className="absolute right-2 top-2 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X size={14} />
            </button>
            <p className="pr-5 leading-snug">{bubble.text}</p>
            {bubble.bullets && (
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                {bubble.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {bubble.actions && (
              <div className="mt-3 flex flex-wrap gap-2">
                {bubble.actions.map((a, i) => (
                  <button
                    key={a.label}
                    onClick={() => {
                      m.dismissBubble();
                      a.run();
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition active:scale-[0.97] ${
                      i === 0 ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-muted"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Spark burst + pulsing ring that pulls the eye toward the element the orb is pointing at. */
export function Sparks() {
  const { spark } = useMarabi();
  const pts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        a: (i / 16) * Math.PI * 2 + (i % 2) * 0.2,
        d: 46 + ((i * 37) % 44),
        s: 0.6 + ((i * 13) % 7) / 10,
        c: i % 2 ? "text-primary" : "text-secondary",
        delay: (i % 4) * 0.08,
      })),
    [],
  );
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!spark) return;
    const el = spark.el;
    el.classList.add("marabi-ring");
    const t = setTimeout(() => el.classList.remove("marabi-ring"), 2800);
    return () => {
      clearTimeout(t);
      el.classList.remove("marabi-ring");
    };
  }, [spark]);

  if (!spark || reduce) return null;
  const r = spark.el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  return (
    <div className="pointer-events-none fixed inset-0 z-[56]" aria-hidden key={spark.id}>
      {[0, 1].map((n) => (
        <motion.span
          key={n}
          className="absolute rounded-2xl border-2 border-primary"
          style={{ left: r.left - 6, top: r.top - 6, width: r.width + 12, height: r.height + 12 }}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 1.35 }}
          transition={{ duration: 1.1, repeat: 2, delay: n * 0.4, ease: "easeOut" }}
        />
      ))}
      {pts.map((p, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 10 10"
          className={`absolute h-3 w-3 ${p.c}`}
          style={{ left: cx - 6, top: cy - 6 }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], x: Math.cos(p.a) * p.d, y: Math.sin(p.a) * p.d, scale: [0.2, p.s * 1.4, 0], rotate: 90 }}
          transition={{ duration: 0.9, delay: p.delay, repeat: 2, repeatDelay: 0.25, ease: "easeOut" }}
        >
          <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  );
}
