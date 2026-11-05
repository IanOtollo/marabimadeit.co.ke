"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/site";
import { crmLedger, crmModules, funnelStages } from "@/data/worlds";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn, ease } from "@/lib/utils";
import { CountUp } from "./shared";

const s = services["crm-erp"];

/* ───────────── Funnel: leads flow stage to stage ───────────── */

const STAGE_Y = [34, 102, 170, 238];
const STAGE_W = [320, 250, 180, 120];
// each lead: x offset (fraction of stage width), the stage where it drops out (0-3; 3 = won), start delay
const LEADS = [
  { x: -0.35, end: 3, d: 0 }, { x: 0.2, end: 1, d: 0.5 }, { x: -0.1, end: 2, d: 1 }, { x: 0.35, end: 0, d: 1.5 },
  { x: -0.25, end: 3, d: 2 }, { x: 0.05, end: 2, d: 2.5 }, { x: 0.3, end: 1, d: 3 }, { x: -0.4, end: 0, d: 3.5 },
];

function Funnel() {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto w-full max-w-md">
      <svg viewBox="0 0 360 290" className="w-full" role="img" aria-label="Sales funnel: leads flow through qualified and proposal stages to won deals">
        {funnelStages.map((st, k) => (
          <motion.rect key={st.label} x={180 - STAGE_W[k] / 2} y={STAGE_Y[k] - 26} width={STAGE_W[k]} height={52} rx="12" strokeWidth="1.5"
            className={cn(k === 3 ? "fill-primary/25 stroke-primary" : "fill-card stroke-border")}
            initial={{ opacity: 0, scaleX: 0.7 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease, delay: k * 0.12 }} style={{ transformOrigin: "180px 0" }} />
        ))}
        {funnelStages.map((st, k) => (
          <g key={`t${k}`}>
            <text x={180} y={STAGE_Y[k] - 3} textAnchor="middle" className={cn("text-[11px] uppercase tracking-widest", k === 3 ? "fill-primary" : "fill-muted-foreground")}>{st.label}</text>
            <text x={180} y={STAGE_Y[k] + 16} textAnchor="middle" className="fill-foreground font-display text-[17px]">{st.n}</text>
          </g>
        ))}
        {!reduce && LEADS.map((l, i) => {
          const stops = STAGE_Y.slice(0, l.end + 1).map((y) => y - 22);
          const cy = [-8, ...stops, stops[stops.length - 1]];
          const cx = cy.map((_, k) => 180 + l.x * (k === 0 ? 320 : STAGE_W[Math.min(k - 1, l.end)]));
          const opacity = cy.map((_, k) => (k === 0 || k === cy.length - 1 ? 0 : 1));
          return (
            <motion.circle key={i} r="3.5" className={l.end === 3 ? "fill-primary" : "fill-secondary"}
              animate={{ cx, cy, opacity }}
              transition={{ duration: 2.2 + l.end * 0.6, delay: l.d, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }} />
          );
        })}
      </svg>
      <p className="mt-2 text-center text-xs text-muted-foreground">Illustrative pipeline. Yours shows your real stages and numbers.</p>
    </div>
  );
}

/* ───────────── Module orbit ───────────── */

function Orbit() {
  const reduce = useReducedMotion();
  const [id, setId] = useState("sales");
  const m = crmModules.find((x) => x.id === id) ?? crmModules[0];
  const pos = crmModules.map((_, k) => {
    const a = (-90 + k * (360 / crmModules.length)) * (Math.PI / 180);
    return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
  });
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <motion.div className="absolute inset-[8%] rounded-full border border-dashed border-border" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 80, ease: "linear", repeat: Infinity }} aria-hidden />
        <div className="absolute inset-[26%] rounded-full border border-border/60" aria-hidden />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {pos.map((p, k) => (
            <motion.line key={k} x1="50" y1="50" x2={p.x} y2={p.y} strokeWidth={crmModules[k].id === id ? 0.7 : 0.3} className={crmModules[k].id === id ? "stroke-primary" : "stroke-muted-foreground/50"}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: k * 0.1 }} />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-primary text-center text-primary-foreground shadow-xl sm:h-28 sm:w-28">
          {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" aria-hidden />}
          <span className="relative font-display text-lg leading-tight">One<br />record</span>
        </div>
        {crmModules.map((x, k) => (
          <button key={x.id} onClick={() => setId(x.id)} onMouseEnter={() => setId(x.id)} onFocus={() => setId(x.id)} aria-pressed={x.id === id} aria-label={`${x.name} module`}
            className={cn("absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs transition sm:h-20 sm:w-20 sm:text-sm", x.id === id ? "scale-110 border-primary bg-primary/15 text-primary" : "border-border bg-card hover:bg-muted")}
            style={{ left: `${pos[k].x}%`, top: `${pos[k].y}%` }}>
            {x.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="rounded-2xl border border-border bg-card p-6 sm:p-8" aria-live="polite">
          <h3 className="text-4xl text-primary">{m.name}</h3>
          <p className="mt-4">{m.does}</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Replaces</dt><dd className="mt-1">{m.replaces}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Connects to</dt><dd className="mt-1">{m.feeds}</dd></div>
          </dl>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────── Dashboard ───────────── */

function Spark({ pts, tone }: { pts: number[]; tone: "primary" | "secondary" }) {
  const W = 200;
  const H = 56;
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * W, H - 6 - ((v - min) / (max - min || 1)) * (H - 12)] as const);
  const d = xy.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const stroke = tone === "primary" ? "stroke-primary" : "stroke-secondary";
  const fill = tone === "primary" ? "fill-primary/10" : "fill-secondary/10";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-14 w-full" aria-hidden>
      <motion.path d={`${d} L ${W} ${H} L 0 ${H} Z`} className={fill} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />
      <motion.path d={d} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={stroke} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
    </svg>
  );
}

const KPIS = [
  { label: "Pipeline value", n: 4200, prefix: "KES ", suffix: "K", pts: [12, 14, 13, 18, 17, 22, 25, 24, 30], tone: "primary" as const },
  { label: "Orders this week", n: 186, prefix: "", suffix: "", pts: [20, 26, 22, 30, 28, 34, 40, 38, 46], tone: "secondary" as const },
  { label: "Cash collected", n: 2860, prefix: "KES ", suffix: "K", pts: [8, 9, 12, 11, 15, 14, 19, 21, 24], tone: "primary" as const },
];
const BARS = [42, 58, 51, 70, 64, 82, 76];
const AGEING = [{ l: "Current", w: 58, c: "bg-secondary" }, { l: "1-30 days", w: 24, c: "bg-primary" }, { l: "31-60", w: 12, c: "bg-primary/60" }, { l: "60+", w: 6, c: "bg-foreground/40" }];

function Dashboard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{k.label}</p>
            <CountUp to={k.n} prefix={k.prefix} suffix={k.suffix} className={cn("mt-1 block font-display text-3xl sm:text-4xl", k.tone === "primary" ? "text-primary" : "text-secondary")} />
            <Spark pts={k.pts} tone={k.tone} />
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Sales by day</p>
          <div className="mt-4 flex h-32 items-end gap-2">
            {BARS.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t-md bg-primary/80" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: i * 0.08 }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted-foreground" aria-hidden>{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="flex-1 text-center">{d}</span>)}</div>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Receivables ageing</p>
          <div className="mt-6 flex h-6 overflow-hidden rounded-full">
            {AGEING.map((a, i) => (
              <motion.div key={a.l} className={a.c} initial={{ width: 0 }} whileInView={{ width: `${a.w}%` }} viewport={{ once: true }} transition={{ duration: 1, ease, delay: i * 0.12 }} />
            ))}
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-2 text-xs">
            {AGEING.map((a) => <li key={a.l} className="flex items-center gap-2"><span className={cn("h-2.5 w-2.5 rounded-full", a.c)} />{a.l} <span className="ml-auto text-muted-foreground">{a.w}%</span></li>)}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Illustrative dashboard. Every figure on yours drills down to the record behind it.</p>
    </div>
  );
}

/* ───────────── Phases: staircase ───────────── */

function Stairs() {
  return (
    <ol className="grid gap-4 md:grid-cols-4 md:items-end">
      {s.phases.map((p, k) => (
        <motion.li key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease, delay: k * 0.12 }}
          className={cn("flex flex-col justify-end rounded-2xl border border-border bg-card p-6", ["md:min-h-[12rem]", "md:min-h-[15rem]", "md:min-h-[18rem]", "md:min-h-[21rem]"][k])}>
          <span className={cn("font-display text-5xl tabular-nums", k % 2 ? "text-secondary" : "text-primary")}>0{k + 1}</span>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{p.duration}</p>
          <h3 className="mt-1 text-2xl">{p.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}

/* ───────────── The world ───────────── */

export function CrmErpWorld() {
  return (
    <>
      <Section className="pt-12 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="font-display text-6xl tracking-tighter text-secondary sm:text-7xl">04</p>
            <Eyebrow>CRMs &amp; ERPs</Eyebrow>
            <h1 className="text-5xl tracking-tighter sm:text-6xl lg:text-7xl">One system, <span className="text-secondary">whole business.</span></h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">{s.intro}</p>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground"><span className="text-foreground">Built for: </span>{s.who}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton>Map my business</CtaButton>
              <a href="#modules" className="rounded-xl border border-border bg-background px-6 py-3 transition hover:bg-muted">Explore the modules</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}><Funnel /></Reveal>
        </div>
      </Section>

      <Section id="modules" className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>The modules</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Five modules. One record underneath.</h2>
        </Reveal>
        <Orbit />
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Visibility</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Monday-morning clarity.</h2>
        </Reveal>
        <Dashboard />
      </Section>

      <Section className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Before and after, line by line.</h2>
        </Reveal>
        <div className="divide-y divide-border border-y border-border">
          <div className="hidden grid-cols-[1.1fr_1fr_1fr] gap-6 py-3 text-xs uppercase tracking-widest text-muted-foreground md:grid"><span>We deliver</span><span>Before</span><span>After</span></div>
          {s.deliverables.map((d, i) => {
            const l = crmLedger[d.title];
            return (
              <motion.div key={d.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, ease, delay: (i % 3) * 0.05 }} className="grid gap-3 py-6 md:grid-cols-[1.1fr_1fr_1fr] md:gap-6">
                <div><p className="font-display text-2xl">{d.title}</p><p className="mt-1 text-sm text-muted-foreground">{d.text}</p></div>
                <p className="text-muted-foreground md:pt-1"><span className="text-xs uppercase tracking-widest md:hidden">Before: </span>{l?.before}</p>
                <p className="flex gap-2 md:pt-1"><ArrowRight size={16} className="mt-1 hidden shrink-0 text-secondary md:block" /><span><span className="text-xs uppercase tracking-widest text-muted-foreground md:hidden">After: </span><span className="text-foreground">{l?.after}</span></span></p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Twelve weeks, climbing.</h2>
        </Reveal>
        <Stairs />
      </Section>

      <Section className="border-t border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Tools we use</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Platforms, configured or built.</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {s.stack.map((t, i) => (
              <li key={t} className="relative rounded-xl border border-border bg-card px-4 py-2 text-sm">
                <span className={cn("absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full", i % 2 ? "bg-secondary" : "bg-primary")} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
