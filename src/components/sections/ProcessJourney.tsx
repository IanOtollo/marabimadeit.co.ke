"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { AXIS_WEEKS, stages, type Stage } from "@/data/process";
import { cn, ease } from "@/lib/utils";

/* ---------- one bespoke illustration per stage ---------- */
function Illustration({ id }: { id: string }) {
  const draw = (d: number) => ({ initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.9, delay: d, ease } });
  const pop = (d: number) => ({ initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: d, ease } });
  const svg = "h-full w-full text-foreground";

  if (id === "discover")
    return (
      <svg viewBox="0 0 320 240" className={svg} aria-hidden>
        {[30, 60, 90].map((r) => (
          <circle key={r} cx="160" cy="120" r={r} fill="none" stroke="currentColor" strokeOpacity="0.18" />
        ))}
        <path d="M160 20V220M60 120H260" stroke="currentColor" strokeOpacity="0.12" />
        <motion.g style={{ originX: "160px", originY: "120px" }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
          <path d="M160 120 L160 28 A92 92 0 0 1 225 55 Z" fill="hsl(var(--primary))" fillOpacity="0.28" />
          <path d="M160 120 L160 28" stroke="hsl(var(--primary))" strokeWidth="2" />
        </motion.g>
        {[[205, 80], [120, 150], [200, 160], [110, 85]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="5" fill="hsl(var(--secondary))" {...pop(0.5 + i * 0.5)} />
        ))}
      </svg>
    );

  if (id === "define")
    return (
      <svg viewBox="0 0 320 240" className={svg} aria-hidden>
        <defs>
          <pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="320" height="240" fill="url(#g)" />
        <rect x="120" y="24" width="80" height="32" rx="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        {[[30, 130], [130, 130], [230, 130]].map(([x], i) => (
          <g key={i}>
            <motion.path d={`M160 56 V90 H${x + 30} V130`} fill="none" stroke="currentColor" strokeOpacity="0.5" {...draw(0.3 + i * 0.25)} />
            <motion.rect x={x} y="130" width="60" height="30" rx="6" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" {...pop(0.9 + i * 0.25)} />
            <motion.path d={`M${x + 30} 160 V190`} fill="none" stroke="currentColor" strokeOpacity="0.4" {...draw(1.2 + i * 0.2)} />
            <motion.rect x={x + 5} y="190" width="50" height="22" rx="5" fill="none" stroke="currentColor" strokeOpacity="0.5" {...pop(1.5 + i * 0.2)} />
          </g>
        ))}
      </svg>
    );

  if (id === "design")
    return (
      <svg viewBox="0 0 320 240" className={svg} aria-hidden>
        <rect x="50" y="20" width="220" height="200" rx="14" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        {[
          { x: 66, y: 36, w: 188, h: 26, c: "--primary" },
          { x: 66, y: 74, w: 110, h: 70, c: "--secondary" },
          { x: 188, y: 74, w: 66, h: 70, c: "--muted-foreground" },
          { x: 66, y: 156, w: 188, h: 16, c: "--muted-foreground" },
          { x: 66, y: 182, w: 120, h: 16, c: "--muted-foreground" },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="6"
            stroke="currentColor"
            strokeOpacity="0.3"
            initial={{ fill: "hsl(var(--muted))", fillOpacity: 0.2 }}
            animate={{ fill: `hsl(var(${b.c}))`, fillOpacity: b.c === "--muted-foreground" ? 0.4 : 0.75 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.35 }}
          />
        ))}
      </svg>
    );

  if (id === "develop")
    return (
      <svg viewBox="0 0 320 240" className={svg} aria-hidden>
        <rect x="24" y="20" width="272" height="200" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <circle cx="42" cy="38" r="4" fill="hsl(var(--danger))" />
        <circle cx="56" cy="38" r="4" fill="hsl(var(--primary))" />
        <circle cx="70" cy="38" r="4" fill="hsl(var(--secondary))" />
        {[[40, 150], [60, 110], [60, 170], [80, 90], [60, 130], [40, 60], [40, 120]].map(([ind, w], i) => (
          <motion.rect
            key={i}
            x={40 + (ind - 40)}
            y={62 + i * 20}
            height="8"
            rx="4"
            fill={i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--secondary))" : "currentColor"}
            fillOpacity={i % 3 === 2 ? 0.45 : 0.85}
            initial={{ width: 0 }}
            animate={{ width: w }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.35, ease }}
          />
        ))}
        <motion.rect x="200" y="62" width="2" height="12" fill="hsl(var(--primary))" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        <motion.g {...pop(3)}>
          <circle cx="262" cy="190" r="16" fill="hsl(var(--secondary))" fillOpacity="0.2" stroke="hsl(var(--secondary))" />
          <path d="M254 190 l6 6 l10 -12" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </svg>
    );

  if (id === "deliver")
    return (
      <svg viewBox="0 0 320 240" className={svg} aria-hidden>
        {["Performance 96", "Accessibility 100", "SEO 100", "Security pass"].map((t, i) => (
          <g key={t}>
            <motion.circle cx="50" cy={56 + i * 40} r="12" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" {...pop(0.3 + i * 0.5)} />
            <motion.path d={`M44 ${56 + i * 40} l5 5 l9 -11`} fill="none" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeLinecap="round" {...draw(0.5 + i * 0.5)} />
            <text x="76" y={61 + i * 40} fontSize="15" fill="currentColor" fillOpacity="0.85">{t}</text>
          </g>
        ))}
        <motion.g {...pop(2.4)}>
          <rect x="196" y="176" width="100" height="36" rx="10" fill="hsl(var(--primary))" />
          <text x="246" y="199" textAnchor="middle" fontSize="15" fontWeight="600" fill="hsl(var(--primary-foreground))">Go live</text>
        </motion.g>
      </svg>
    );

  return (
    <svg viewBox="0 0 320 240" className={svg} aria-hidden>
      {[40, 70, 100, 135, 175].map((h, i) => (
        <motion.rect key={i} x={50 + i * 46} y={200 - h} width="28" rx="6" fill={i % 2 ? "hsl(var(--secondary))" : "hsl(var(--primary))"} fillOpacity="0.85" initial={{ height: 0, y: 200 }} animate={{ height: h, y: 200 - h }} transition={{ duration: 0.8, delay: 0.3 + i * 0.3, ease }} />
      ))}
      <motion.path d="M50 170 C110 150 150 110 270 40" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeDasharray="4 6" {...draw(1)} />
      <motion.g style={{ originX: "280px", originY: "40px" }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        <circle cx="280" cy="40" r="14" fill="none" stroke="hsl(var(--primary))" strokeDasharray="6 8" />
      </motion.g>
    </svg>
  );
}

/* ---------- the stage axis: the chronological spine, in order rather than in calendar weeks ---------- */
function Axis({ progress, active }: { progress: number; active: number }) {
  const pct = (w: number) => `${(w / AXIS_WEEKS) * 100}%`;
  return (
    <div className="w-full" aria-hidden>
      <div className="relative h-14">
        {stages.map((s, i) => (
          <div key={s.id} className="absolute top-0 h-2.5 overflow-hidden rounded-full bg-muted" style={{ left: pct(s.weeks[0]), width: `calc(${pct(s.weeks[1] - s.weeks[0])} - 4px)` }}>
            <motion.div
              className={cn("h-full rounded-full", i % 2 ? "bg-secondary" : "bg-primary")}
              animate={{ width: i < active ? "100%" : i === active ? `${Math.max(8, Math.min(100, progress * 100))}%` : "0%" }}
              transition={{ duration: 0.25 }}
            />
          </div>
        ))}
        <div className="absolute top-6 flex w-full justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Kick-off</span>
          <span>Go-live</span>
          <span>After launch</span>
        </div>
        <div className="absolute top-[-3px] h-4 w-4 -translate-x-1/2 rounded-full bg-foreground shadow-[0_0_14px_hsl(var(--foreground)/0.6)]" style={{ left: pct(stageWeek(active, progress)) }} />
      </div>
    </div>
  );
}
const stageWeek = (i: number, p: number) => stages[i].weeks[0] + (stages[i].weeks[1] - stages[i].weeks[0]) * Math.max(0, Math.min(1, p));

function Detail({ s, small = false }: { s: Stage; small?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.window}</p>
      <h3 className={cn("mt-2 tracking-tighter", small ? "text-3xl" : "text-5xl sm:text-6xl lg:text-7xl")}>{s.name}</h3>
      <p className="mt-3 font-display text-xl italic text-primary sm:text-2xl">{s.tagline}</p>
      <p className="mt-4 hidden max-w-xl text-muted-foreground sm:block">{s.what}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {s.deliver.map((d, i) => (
          <motion.li key={d} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08, duration: 0.4, ease }} className="flex gap-2 text-sm">
            <Check size={16} className="mt-0.5 shrink-0 text-secondary" /> {d}
          </motion.li>
        ))}
      </ul>
      <p className="mt-5 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm backdrop-blur">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Your call · </span>
        {s.decide}
      </p>
    </div>
  );
}

export function ProcessJourney() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const [local, setLocal] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const f = Math.min(stages.length - 0.0001, Math.max(0, p * stages.length));
    setActive(Math.floor(f));
    setLocal(f - Math.floor(f));
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce)
    return (
      <div className="mx-auto max-w-5xl space-y-16 px-4 py-16">
        {stages.map((s) => (
          <div key={s.id} className="grid gap-8 md:grid-cols-2">
            <div className="aspect-[4/3]"><Illustration id={s.id} /></div>
            <Detail s={s} small />
          </div>
        ))}
      </div>
    );

  const s = stages[active];
  return (
    <div ref={ref} data-rail="The process" data-marabi-info="process" className="relative" style={{ height: `${stages.length * 85 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-4 pb-6 pt-20 sm:px-6 lg:px-8">
        <motion.div className="absolute left-0 top-0 h-0.5 bg-primary" style={{ width: bar }} aria-hidden />
        <div className="pointer-events-none absolute inset-0 ruler opacity-25" aria-hidden />
        <p className="pointer-events-none absolute right-4 top-20 select-none font-display text-[34vw] font-semibold leading-none tracking-tighter text-outline lg:text-[22vw]" aria-hidden>
          {s.n}
        </p>
        <div className="relative mx-auto grid min-h-0 w-full max-w-7xl flex-1 items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div key={s.id + "-t"} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45, ease }} className="order-2 lg:order-1">
              <Detail s={s} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={s.id + "-i"} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.45, ease }} className="order-1 mx-auto aspect-[4/3] max-h-[28svh] w-full max-w-md rounded-2xl border border-border bg-card/60 p-4 backdrop-blur sm:max-h-[34svh] lg:order-2 lg:max-h-none">
              <Illustration id={s.id} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative mx-auto w-full max-w-7xl pt-4">
          <Axis progress={local} active={active} />
          <p className="mt-1 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
            Stage {s.n} of 0{stages.length} · scroll to move through time
          </p>
        </div>
      </div>
    </div>
  );
}

/** Compact version for the home page: the same six stages as a drawn path, with a link to the full walk-through. */
export function ProcessStrip() {
  const [open, setOpen] = useState(0);
  const s = stages[open];
  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-5 h-px bg-border" aria-hidden />
        <motion.div className="absolute left-0 top-5 h-px bg-primary" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} aria-hidden />
        <ol className="relative grid grid-cols-6">
          {stages.map((st, i) => (
            <li key={st.id} className="flex flex-col items-center text-center">
              <button
                onClick={() => setOpen(i)}
                onMouseEnter={() => setOpen(i)}
                aria-label={`${st.name}, ${st.window}`}
                aria-pressed={open === i}
                className={cn("relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-xs tabular-nums transition", open === i ? "scale-110 border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary")}
              >
                {st.n}
              </button>
              <span className={cn("mt-3 hidden text-sm sm:block", open === i ? "text-foreground" : "text-muted-foreground")}>{st.name}</span>
              <span className="mt-0.5 hidden text-[11px] text-muted-foreground lg:block">{st.window}</span>
            </li>
          ))}
        </ol>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }} className="mt-10 grid items-center gap-8 rounded-2xl border border-border/50 bg-card p-6 sm:p-8 md:grid-cols-[1fr_16rem]">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.window}</p>
            <h3 className="mt-1 text-3xl">{s.name}</h3>
            <p className="mt-2 font-display text-lg italic text-primary">{s.tagline}</p>
            <p className="mt-3 text-muted-foreground">{s.what}</p>
          </div>
          <div className="mx-auto hidden aspect-[4/3] w-full max-w-[16rem] md:block"><Illustration id={s.id} /></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
