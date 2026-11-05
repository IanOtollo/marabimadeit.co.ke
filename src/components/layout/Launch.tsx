"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const LAUNCH_KEY = "mmi-launch";
const REPEAT_AFTER = 14 * 24 * 60 * 60 * 1000; // lenient: a returning visitor within two weeks never sees it again
const MIN_MS = 2400; // long enough for the launch to read, never longer than the real load needs
const CAP_MS = 8000; // a slow connection is never held hostage

/** What the progress figure actually measures. Weights add to 1. */
const TASKS = [
  { id: "page", label: "Page", weight: 0.4 },
  { id: "fonts", label: "Typefaces", weight: 0.25 },
  { id: "faces", label: "Portraits", weight: 0.35 },
] as const;
type TaskId = (typeof TASKS)[number]["id"];

function stamp() {
  try {
    localStorage.setItem(LAUNCH_KEY, String(Date.now()));
  } catch {}
}

/** A slim launch vehicle: metallic ogive, panel seams, grid fins, three-engine cluster, soft plume. */
function Rocket({ shake, burn, lift }: { shake: number; burn: boolean; lift: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 80 300"
      className="h-80 w-[5.5rem] overflow-visible sm:h-[26rem] sm:w-28"
      animate={shake ? { x: [0, -shake, shake, -shake / 2, 0] } : { x: 0 }}
      transition={{ duration: 0.16, repeat: Infinity }}
      aria-hidden
    >
      <defs>
        <linearGradient id="hull" x1="0" x2="1">
          <stop offset="0" stopColor="hsl(var(--foreground))" stopOpacity="0.35" />
          <stop offset="0.35" stopColor="hsl(var(--foreground))" stopOpacity="0.98" />
          <stop offset="0.62" stopColor="hsl(var(--foreground))" stopOpacity="0.8" />
          <stop offset="1" stopColor="hsl(var(--foreground))" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="plume" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="hsl(var(--foreground))" stopOpacity="0.98" />
          <stop offset="0.25" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="0.7" stopColor="hsl(var(--secondary))" stopOpacity="0.35" />
          <stop offset="1" stopColor="hsl(var(--secondary))" stopOpacity="0" />
        </linearGradient>
        <filter id="soft" x="-80%" y="-20%" width="260%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* exhaust plume, drawn first so the hull sits in front of it */}
      {burn && (
        <g>
          <motion.ellipse cx="40" cy="236" rx="30" ry="22" fill="hsl(var(--primary))" opacity="0.35" filter="url(#soft)" animate={{ opacity: [0.25, 0.5, 0.3] }} transition={{ duration: 0.3, repeat: Infinity }} />
          <motion.path
            d="M31 232 Q40 360 49 232 Z"
            fill="url(#plume)"
            filter="url(#soft)"
            style={{ transformOrigin: "40px 232px" }}
            animate={{ scaleY: lift ? [1.5, 2.1, 1.7] : [0.55, 0.85, 0.65], scaleX: [1, 0.92, 1] }}
            transition={{ duration: 0.18, repeat: Infinity }}
          />
          <motion.path d="M36 232 Q40 300 44 232 Z" fill="hsl(var(--foreground))" style={{ transformOrigin: "40px 232px" }} animate={{ scaleY: lift ? [1.4, 1.9, 1.5] : [0.5, 0.8, 0.6] }} transition={{ duration: 0.14, repeat: Infinity }} />
        </g>
      )}

      {/* grid fins / landing legs, swept and thin */}
      <path d="M26 206 L9 250 L27 238 Z" fill="hsl(var(--muted-foreground))" />
      <path d="M54 206 L71 250 L53 238 Z" fill="hsl(var(--muted-foreground))" />
      <path d="M27 76 L16 92 L27 90 Z M53 76 L64 92 L53 90 Z" fill="hsl(var(--muted-foreground))" />

      {/* hull: long ogive nose, straight cylinder */}
      <path d="M40 4 C52 34 54 74 54 112 V224 H26 V112 C26 74 28 34 40 4 Z" fill="url(#hull)" />
      {/* seams and detail */}
      <g stroke="hsl(var(--background))" strokeOpacity="0.4" strokeWidth="0.9" fill="none">
        <path d="M27 96 H53 M26.5 150 H53.5 M26.2 196 H53.8" />
        <path d="M40 8 V224" strokeOpacity="0.12" />
      </g>
      <path d="M26.4 124 H53.6 V132 H26.4 Z" fill="hsl(var(--background))" fillOpacity="0.75" />
      <path d="M27 62 H53" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <rect x="31" y="170" width="18" height="6" rx="1" fill="hsl(var(--background))" fillOpacity="0.55" />
      <path d="M34 173 H46" stroke="hsl(var(--secondary))" strokeWidth="1.5" />

      {/* engine section: three bells */}
      <rect x="26" y="224" width="28" height="6" fill="hsl(var(--muted-foreground))" />
      <path d="M29 230 H36 L34.5 240 H30.5 Z M37 230 H43 L42 241 H38 Z M44 230 H51 L49.5 240 H45.5 Z" fill="hsl(var(--background))" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
    </motion.svg>
  );
}

/** Launch tower with an umbilical arm that swings clear at ignition. */
function Tower({ clear }: { clear: boolean }) {
  return (
    <svg viewBox="0 0 70 320" className="h-72 w-14 sm:h-[24rem] sm:w-[4.5rem]" aria-hidden>
      <g stroke="hsl(var(--muted-foreground))" strokeOpacity="0.7" fill="none" strokeWidth="1.6">
        <path d="M8 320 V6 M26 320 V6" />
        {Array.from({ length: 20 }, (_, i) => (
          <path key={i} d={i % 2 ? `M8 ${16 * i + 12} L26 ${16 * i - 4}` : `M26 ${16 * i + 12} L8 ${16 * i - 4}`} strokeWidth="1" strokeOpacity="0.45" />
        ))}
      </g>
      <motion.g style={{ transformOrigin: "26px 120px" }} animate={{ rotate: clear ? -78 : 0 }} transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
        <path d="M26 118 H66 V124 H26 Z" fill="hsl(var(--muted-foreground))" />
        <circle cx="66" cy="121" r="3" fill="hsl(var(--primary))" />
      </motion.g>
    </svg>
  );
}

export function Launch({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"load" | "ignite" | "lift">("load");
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState<Record<TaskId, boolean>>({ page: false, fonts: false, faces: false });
  const doneRef = useRef(done);
  doneRef.current = done;
  const start = useRef(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Decide whether to play at all: first visit only, and never for reduced motion.
  useEffect(() => {
    let seen = false;
    try {
      const t = Number(localStorage.getItem(LAUNCH_KEY));
      seen = !!t && Date.now() - t < REPEAT_AFTER;
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      onDone();
      return;
    }
    start.current = performance.now();
    const mark = (k: TaskId) => setDone((d) => ({ ...d, [k]: true }));

    // real work: the document, the typefaces, and the two portraits the hero depends on
    if (document.readyState === "complete") mark("page");
    else window.addEventListener("load", () => mark("page"), { once: true });
    document.fonts.ready.then(() => mark("fonts"));
    Promise.all(
      ["/images/aineah-cutout.png", "/images/ian-cutout.png"].map((src) => {
        const i = new Image();
        i.src = src;
        return i.decode().catch(() => undefined);
      }),
    ).then(() => mark("faces"));
    const cap = setTimeout(() => setDone({ page: true, fonts: true, faces: true }), CAP_MS);
    return () => clearTimeout(cap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Progress is the real completed weight, plus a bounded creep so the bar moves while we wait.
  useEffect(() => {
    let raf = 0;
    let shown = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (phaseRef.current !== "load" || !start.current) return;
      const elapsed = performance.now() - start.current;
      const d = doneRef.current;
      const real = TASKS.reduce((s, t) => s + (d[t.id] ? t.weight : 0), 0);
      const creep = (1 - real) * Math.min(0.6, elapsed / 9000);
      const allReal = real > 0.999;
      const target = allReal ? (elapsed >= MIN_MS ? 100 : 94) : Math.min(96, (real + creep) * 100);
      shown += (target - shown) * (allReal ? 0.14 : 0.07);
      if (target === 100 && shown > 99.4) shown = 100;
      setPct(Math.floor(shown));
      if (shown >= 100) setPhase("ignite");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phase === "ignite") {
      stamp();
      const t = setTimeout(() => setPhase("lift"), 1000);
      return () => clearTimeout(t);
    }
    if (phase === "lift") {
      const t = setTimeout(onDone, 1600);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  const label = phase === "load" ? (pct < 40 ? "Systems check" : pct < 85 ? "Fuelling" : "Terminal count") : phase === "ignite" ? "Ignition" : "Liftoff";
  const shake = phase === "load" ? (pct > 80 ? 0.8 : 0) : phase === "ignite" ? 2.2 : 0;

  return (
    <motion.div id="launch" className="fixed inset-0 z-[100] overflow-hidden" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} role="status" aria-label={`Loading, ${pct} percent`}>
      {/* the night sky fades away on liftoff to reveal the site underneath */}
      <motion.div className="absolute inset-0 bg-background" animate={{ opacity: phase === "lift" ? 0 : 1 }} transition={{ duration: 1.2, delay: phase === "lift" ? 0.4 : 0 }} />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,hsl(var(--primary)/0.14),transparent_65%)]"
        animate={{ opacity: phase === "lift" ? 0 : phase === "ignite" ? 1 : 0.5 }}
        transition={{ duration: 0.8 }}
        aria-hidden
      />

      <button
        onClick={() => {
          stamp();
          onDone();
        }}
        className="absolute right-4 top-4 z-10 rounded-lg px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        Skip
      </button>

      {/* pad: tower, rocket, ground line */}
      <div className="absolute inset-x-0 bottom-[24%] flex justify-center">
        <div className="absolute bottom-0 right-[calc(50%+2.2rem)] sm:right-[calc(50%+2.8rem)]">
          <Tower clear={phase !== "load"} />
        </div>
        <motion.div animate={phase === "lift" ? { y: "-140vh" } : { y: 0 }} transition={phase === "lift" ? { duration: 1.5, ease: [0.7, 0, 0.9, 0.4] } : { duration: 0 }} className="relative">
          <Rocket shake={shake} burn={phase !== "load" || pct > 88} lift={phase === "lift"} />
        </motion.div>

        {/* ground exhaust: a low, wide wash, not puffy toy clouds */}
        {phase !== "load" && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute bottom-[-0.5rem] h-8 w-40 rounded-[100%] bg-foreground/20 blur-xl"
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{ opacity: [0, 0.6, 0], scaleX: [0.3, 2.4 + i * 0.7, 3.4 + i * 0.8] }}
                transition={{ duration: 1.8, delay: i * 0.12, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-[calc(24%-0.25rem)] mx-auto h-px w-[min(86vw,34rem)] bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />

      {/* real progress */}
      <motion.div className="absolute inset-x-0 bottom-[6%] flex flex-col items-center px-4 text-center" animate={{ opacity: phase === "lift" ? 0 : 1 }}>
        <p className="font-display text-6xl tabular-nums tracking-tighter sm:text-7xl">
          {pct}
          <span className="text-2xl text-muted-foreground">%</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        <ul className="mt-4 flex gap-5 text-xs text-muted-foreground">
          {TASKS.map((t) => (
            <li key={t.id} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${done[t.id] ? "bg-secondary" : "bg-border"}`} />
              {t.label}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
