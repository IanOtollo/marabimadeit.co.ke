"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";
import { ease } from "@/lib/utils";
import { OrbBody } from "./OrbBody";
import { useMarabi, type Reaction } from "./MarabiProvider";

const S = 56;
const PANEL_W = 384;

/** A small animation that matches what the visitor is hovering: chat typing for WhatsApp, a ringing phone for calls, a floating envelope for email. */
function ReactionBadge({ kind }: { kind: Reaction["kind"] }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.25, ease }}
      className="pointer-events-none absolute -right-4 -top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/95 shadow-lg backdrop-blur"
      aria-hidden
    >
      {kind === "whatsapp" && (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-secondary">
          <path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          {[8, 12, 16].map((x, i) => (
            <motion.circle key={x} cx={x} cy="10.5" r="1.3" fill="currentColor" animate={{ y: [0, -2.2, 0], opacity: [0.45, 1, 0.45] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </svg>
      )}
      {kind === "call" && (
        <>
          {[0, 0.45].map((d) => (
            <motion.span key={d} className="absolute inset-0 rounded-full border border-primary" animate={{ scale: [1, 1.9], opacity: [0.7, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: d }} />
          ))}
          <motion.span animate={{ rotate: [0, -18, 18, -18, 18, 0] }} transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 0.35 }}>
            <Phone size={18} className="text-primary" />
          </motion.span>
        </>
      )}
      {kind === "email" && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute left-1 top-1/2 h-1 w-1 rounded-full bg-primary" animate={{ x: [-2, 6], opacity: [0, 0.9, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }} />
          ))}
          <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <Mail size={18} className="text-primary" />
          </motion.span>
        </>
      )}
      {kind === "cta" && (
        <motion.svg viewBox="0 0 10 10" className="h-4 w-4 text-primary" animate={{ scale: [1, 1.35, 1], rotate: [0, 45, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="currentColor" />
        </motion.svg>
      )}
    </motion.span>
  );
}

export function Orb() {
  const m = useMarabi();
  const ctx = useRef(m);
  ctx.current = m;
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const settled = useRef(false);
  const placeRef = useRef<() => void>(() => undefined);

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
    let typingEl: HTMLInputElement | HTMLTextAreaElement | null = null;
    let lastKey = 0; // last keystroke: while recent, Marabi slides alongside the field, fully visible
    let touchField: HTMLElement | null = null; // a field being used on a touch screen
    let lastScroll = 0;
    let lookUntil = 0; // until then its eyes follow the field being used
    const perchTimer = setInterval(() => {
      const c = ctx.current;
      if (!c.goto && !c.bubble && c.panel === "closed" && !c.asleep && !c.hidden) perchIdx++;
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
      if (!fine || reduce || c.asleep || c.hidden || c.goto || c.bubble || c.panel !== "closed") return;
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

    // Reacts to what is being typed, with a wide range of expressions, and never hides or covers the field.
    const usable = (t: EventTarget | null) => {
      if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return null;
      if (/^(checkbox|radio|button|submit|hidden)$/.test((t as HTMLInputElement).type)) return null;
      if (t.closest('[role="dialog"][aria-label="Marabi 2.0 assistant"]')) return null; // its own chat box is handled elsewhere
      return t;
    };
    const keys: number[] = [];
    let backs: number[] = [];
    let lastReact = 0;
    let thinkTimer: ReturnType<typeof setTimeout> | undefined;
    const fired = new Set<string>(); // one-off milestones, per field
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const lastKind: Record<string, number> = {};
    const react = (m: Parameters<typeof ctx.current.setMood>[0], ms: number, gap = 2200) => {
      const now = performance.now();
      if (now - (lastKind[m] ?? 0) < gap) return;
      lastKind[m] = now;
      lastReact = now;
      ctx.current.setMood(m, ms);
    };
    const onKey = (e: KeyboardEvent) => {
      const t = usable(e.target);
      const c = ctx.current;
      if (!t || c.asleep || c.hidden) return;
      const key = typeof e.key === "string" ? e.key : "";
      if (!key) return; // autofill and some keyboards send keystrokes with no key value
      if (key.length > 1 && !["Backspace", "Delete", "Enter"].includes(key)) return;
      const now = performance.now();
      typingEl = t;
      lastKey = now;
      lookUntil = now + 2600;
      keys.push(now);
      while (keys.length && now - keys[0] > 2000) keys.shift();
      if (key === "Backspace") {
        backs.push(now);
        backs = backs.filter((b) => now - b < 1500);
      }
      // varied reactions to how the person is typing
      if (backs.length >= 5) { backs = []; react("concerned", 2400, 6000); }
      else if (keys.length >= 11) { keys.length = 0; react("excited", 2600, 9000); }
      else if (now - lastReact > 5500) react(pick<Parameters<typeof ctx.current.setMood>[0]>(["curious", "happy", "curious", "reading"]), 2400, 0);
      // paused mid-thought: look up and ponder
      clearTimeout(thinkTimer);
      thinkTimer = setTimeout(() => ctx.current.setMood("thinking", 3200), 5000);
    };
    const onInput = (e: Event) => {
      const t = usable(e.target);
      if (!t || ctx.current.asleep || ctx.current.hidden) return;
      const v = t.value;
      const k = (n: string) => !fired.has(n) && (fired.add(n), true);
      if (t.id === "f-name" && v.trim().length >= 2 && k("name")) react("happy", 2200, 0);
      if (t.id === "f-phone" && v.replace(/\D/g, "").length >= 9 && k("phone")) react("cheer", 2400, 0);
      if (t.id === "f-email" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && k("email")) react("cheer", 2400, 0);
      if (t.id === "f-description") {
        if (v.length >= 12 && k("desc12")) react("impressed", 2400, 0);
        if (v.length >= 140 && k("desc140")) react("reading", 3000, 0);
      }
      if (t.id === "f-notes" && v.length >= 40 && k("notes")) react("reading", 2600, 0);
    };
    const onFocus = (e: FocusEvent) => {
      const t = usable(e.target);
      const c = ctx.current;
      if (!t || c.asleep || c.hidden) return;
      typingEl = t;
      if (!fine) touchField = t;
      lookUntil = performance.now() + 2500;
      c.setMood("curious", 2200);
    };
    const onBriefError = () => ctx.current.setMood("concerned", 2800);
    const onBriefSent = () => ctx.current.setMood("cheer", 4200);
    const onScrollTick = () => {
      lastScroll = performance.now();
    };
    const onFocusOut = () => {
      touchField = null;
    };
    window.addEventListener("scroll", onScrollTick, { passive: true });
    window.addEventListener("focusout", onFocusOut);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("input", onInput, true);
    window.addEventListener("focusin", onFocus);
    window.addEventListener("mmi-brief-error", onBriefError);
    window.addEventListener("mmi-brief-sent", onBriefSent);

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
        // While a bubble is showing, hold perfectly still so its buttons are easy to reach.
        if (c.bubble) return { x: pos.x, y: pos.y };
        // While someone types on the brief page, slide alongside their field in the empty left margin: fully visible, never over the form.
        const onForm = window.location.pathname === "/start" && window.innerWidth >= 1024;
        if (onForm && typingEl && performance.now() - lastKey < 2600) {
          const r = typingEl.getBoundingClientRect();
          return { x: 10, y: clamp(r.top + r.height / 2 - S / 2, 90, window.innerHeight - S - 24) };
        }
        // Rest on a perch and watch. Back away if the cursor gets close; never trail it.
        const W = window.innerWidth;
        const H = window.innerHeight;
        const onFormPage = window.location.pathname === "/start" && W >= 1024;
        // on the brief page the perches stay in the empty left margin, away from the form and its summary panel
        const perch = (onFormPage
          ? [{ x: 10, y: H * 0.5 - S / 2 }, { x: 10, y: H - S - 120 }, { x: 10, y: 130 }]
          : [{ x: W - S - 84, y: H - S - 110 }, { x: 28, y: H - S - 110 }, { x: W - S - 84, y: 120 }, { x: 28, y: H * 0.45 }])[perchIdx % (onFormPage ? 3 : 4)];
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
      // Touch screens: stay out of the way. While a field is in use, sit up under the header; while the page scrolls, glide gently toward the edge.
      if (!fine && touchField) return { x: 12, y: 84 };
      const tuck = !fine && performance.now() - lastScroll < 800;
      return { x: tuck ? -S * 0.3 : 16, y: window.innerHeight - S - 24 + (reduce ? 0 : Math.sin(t / 700) * 4) };
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
      // on touch screens it also fades while the page scrolls or a field is in use, so it never competes with content
      el.style.opacity = !fine && performance.now() - lastScroll < 800 ? "0.38" : !fine && touchField ? "0.7" : "1";
      // pupils look at the cursor on desktop, else along their direction of travel
      let fx = cur.x;
      let fy = cur.y;
      if (typingEl && performance.now() < lookUntil) {
        // aim at roughly where the next character will appear
        const r = typingEl.getBoundingClientRect();
        const w = Math.max(40, r.width - 32);
        const caret = (typingEl.selectionStart ?? typingEl.value.length) * 8;
        const multi = typingEl instanceof HTMLTextAreaElement;
        fx = r.left + 16 + (multi ? caret % w : Math.min(caret, w));
        fy = multi ? r.top + 22 + Math.floor(caret / w) * 20 : r.top + r.height / 2;
        fy = clamp(fy, r.top + 8, r.bottom - 8);
      }
      const lx = fine ? fx - (pos.x + S / 2) : vel.x * 4;
      const ly = fine ? fy - (pos.y + S / 2) : vel.y * 4;
      const len = Math.hypot(lx, ly) || 1;
      const mag = Math.min(2.6, len / 40);
      btn.current?.style.setProperty("--px", `${(lx / len) * mag}px`);
      btn.current?.style.setProperty("--py", `${(ly / len) * mag}px`);
      // The info bubble is pinned, not dragged. Report where the orb is, and re-pin once if it was still arriving.
      posRef.current = { x: pos.x, y: pos.y };
      if (!settled.current && bubbleRef.current && Math.hypot(vel.x, vel.y) < 0.3) {
        settled.current = true;
        placeRef.current();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(perchTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScrollTick);
      window.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("input", onInput, true);
      window.removeEventListener("focusin", onFocus);
      window.removeEventListener("mmi-brief-error", onBriefError);
      window.removeEventListener("mmi-brief-sent", onBriefSent);
      clearTimeout(thinkTimer);
    };
  }, []);

  const visible = !m.hidden && !m.asleep;
  const bubble = m.bubble;

  /** Pin the bubble once, beside the orb on whichever side has room, fully on screen and clear of the nav bar. */
  const placeBubble = useCallback(() => {
    const b = bubbleRef.current;
    if (!b) return;
    const { x, y } = posRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const bw = b.offsetWidth;
    const bh = b.offsetHeight;
    const gap = 14;
    const topMin = 76;
    const fit = (v: number, lo: number, hi: number) => Math.min(Math.max(hi, lo), Math.max(lo, v));
    let left: number;
    let top: number;
    if (x - gap - bw >= 8) {
      left = x - gap - bw;
      top = y + S / 2 - bh / 2;
    } else if (x + S + gap + bw <= W - 8) {
      left = x + S + gap;
      top = y + S / 2 - bh / 2;
    } else {
      // no room at the side (small phones): above the orb, or below it when there is no room above
      left = x + S / 2 - bw / 2;
      top = y - bh - gap >= topMin ? y - bh - gap : y + S + gap;
    }
    b.style.left = `${fit(left, 8, W - bw - 8)}px`;
    b.style.top = `${fit(top, topMin, H - bh - 8)}px`;
  }, []);
  placeRef.current = placeBubble;
  useLayoutEffect(() => {
    settled.current = false;
    placeBubble();
    window.addEventListener("resize", placeBubble);
    return () => window.removeEventListener("resize", placeBubble);
  }, [bubble?.id, placeBubble]);

  return (
    <>
    <div ref={root} className="pointer-events-none fixed left-0 top-0 z-[55] transition-opacity duration-500 will-change-transform" style={{ width: S, height: S }}>
      <motion.div animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.4 }} transition={{ duration: 0.5, ease }} className={visible ? "pointer-events-auto" : "pointer-events-none"}>
        <button
          ref={btn}
          onClick={() => (m.panel === "closed" ? m.openChat() : m.close())}
          aria-label="Open Marabi 2.0, the studio assistant"
          tabIndex={visible ? 0 : -1}
          className={`block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary ${m.reaction?.kind === "call" ? "animate-[wiggle_0.35s_ease-in-out_infinite]" : m.mood === "curious" ? "-rotate-6 transition-transform duration-300" : m.mood === "thinking" ? "rotate-3 transition-transform duration-300" : m.mood === "concerned" ? "-rotate-3 transition-transform duration-300" : m.mood === "happy" || m.mood === "impressed" || m.mood === "cheer" ? "animate-bounce" : m.mood === "mad" ? "animate-[wiggle_0.3s_ease-in-out_4]" : ""}`}
        >
          <OrbBody mood={m.mood} size={S} />
        </button>
      </motion.div>

      <AnimatePresence>{visible && m.reaction && <ReactionBadge key={m.reaction.id} kind={m.reaction.kind} />}</AnimatePresence>

    </div>

    {/* A solid, fixed card: no transparency, no blur, no drifting with the assistant. Text lets clicks through; only its buttons are clickable. */}
    <AnimatePresence>
      {bubble && visible && m.panel === "closed" && (
        <motion.div
          key={bubble.id}
          ref={bubbleRef}
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`pointer-events-none fixed left-0 top-0 z-[56] ${bubble.bullets ? "w-[min(21rem,calc(100vw-1rem))]" : "w-[min(17rem,calc(100vw-1rem))]"} rounded-2xl border border-t-2 border-foreground/25 border-t-primary bg-card p-4 text-sm shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)]`}
        >
          <button onClick={m.dismissBubble} onPointerEnter={m.pauseBubble} onPointerLeave={() => m.resumeBubble()} aria-label="Dismiss" className="pointer-events-auto absolute right-2 top-2 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X size={14} />
          </button>
          <p className="pr-6 font-medium leading-snug text-foreground">{bubble.text}</p>
          {bubble.bullets && (
            <ul className="mt-3 space-y-2 text-[13px] leading-snug text-foreground/85">
              {bubble.bullets.map((b) => (
                <li key={b} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {bubble.actions && (
            <div className="mt-4 flex flex-wrap gap-2">
              {bubble.actions.map((a, i) => (
                <button
                  key={a.label}
                  onClick={() => {
                    m.dismissBubble();
                    a.run();
                  }}
                  onPointerEnter={m.pauseBubble}
                  onPointerLeave={() => m.resumeBubble()}
                  className={`pointer-events-auto rounded-lg px-3 py-1.5 text-xs font-medium transition active:scale-[0.97] ${
                    i === 0 ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-background hover:bg-muted"
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
    </>
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
