"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, Check, Menu } from "lucide-react";
import { services } from "@/data/site";
import { lighthouseTargets, serpExamples, websitesReceive } from "@/data/worlds";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn, ease } from "@/lib/utils";
import { CountUp } from "./shared";

const s = services.websites;

/* ───────────── Blueprint → live: scroll morph ───────────── */

const STAGES = ["Structure", "Content", "Design", "Live"];

/** One block of the page, drawn three ways: wireframe, plain content, finished design. */
function Morph({ p, label, plain, className, children }: { p: MotionValue<number>; label: string; plain: string; className?: string; children: React.ReactNode }) {
  const wire = useTransform(p, [0.18, 0.34], [1, 0]);
  const mid = useTransform(p, [0.22, 0.36, 0.56, 0.7], [0, 1, 1, 0]);
  const fin = useTransform(p, [0.56, 0.78], [0, 1]);
  return (
    <div className={cn("relative grid", className)}>
      <motion.div style={{ opacity: wire }} className="col-start-1 row-start-1 flex items-center justify-center rounded-md border border-dashed border-muted-foreground/50 bg-muted/20 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
        {label}
      </motion.div>
      <motion.div style={{ opacity: mid }} className="col-start-1 row-start-1 flex items-center rounded-md border border-border px-2 font-mono text-[9px] text-muted-foreground sm:text-[11px]">
        <span className="line-clamp-2">{plain}</span>
      </motion.div>
      <motion.div style={{ opacity: fin }} className="col-start-1 row-start-1">
        {children}
      </motion.div>
    </div>
  );
}

function BlueprintMorph() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrolled = useTransform(scrollYProgress, [0.06, 0.82], [0, 1], { clamp: true });
  const fixed = useMotionValue(1);
  const p = reduce ? fixed : scrolled;
  const [stage, setStage] = useState(reduce ? 3 : 0);
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.3 ? 0 : v < 0.58 ? 1 : v < 0.85 ? 2 : 3));
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={reduce ? "" : "h-[260vh]"}>
      <div className={cn("flex flex-col justify-center px-4 sm:px-6 lg:px-8", reduce ? "py-16" : "sticky top-16 h-[calc(100svh-4rem)]")}>
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">Scroll to build the page</p>
              <p className="mt-1 font-display text-3xl sm:text-4xl" aria-live="polite">
                0{stage + 1} <span className="text-primary">{STAGES[stage]}</span>
              </p>
            </div>
            <ol className="hidden gap-2 sm:flex" aria-label="Build stages">
              {STAGES.map((n, i) => (
                <li key={n} className={cn("rounded-full border px-3 py-1 text-xs transition-colors", i <= stage ? "border-primary text-primary" : "border-border text-muted-foreground")}>
                  {n}
                </li>
              ))}
            </ol>
          </div>

          {/* browser frame */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
              <span className="ml-3 flex-1 truncate rounded-md bg-background px-3 py-1 font-mono text-[10px] text-muted-foreground sm:text-xs">yourbusiness.co.ke</span>
            </div>
            <div className="grid gap-2 bg-background p-3 text-[10px] sm:gap-3 sm:p-5 sm:text-xs">
              <Morph p={p} label="Nav" plain="Brand · Services · About · Contact" className="h-8 sm:h-10">
                <div className="flex h-full items-center justify-between rounded-md border border-border bg-card px-3">
                  <span className="flex items-center gap-2 font-display text-sm"><span className="h-2.5 w-2.5 rounded-full bg-primary" />Brand</span>
                  <span className="hidden gap-4 text-muted-foreground sm:flex"><span>Services</span><span>About</span><span>Contact</span></span>
                  <span className="rounded-md bg-primary px-3 py-1 text-primary-foreground">Get a quote</span>
                </div>
              </Morph>
              <div className="grid gap-2 sm:grid-cols-5 sm:gap-3">
                <div className="grid gap-2 sm:col-span-3 sm:gap-3">
                  <Morph p={p} label="H1 · headline" plain="A first impression worth keeping" className="h-14 sm:h-20">
                    <p className="flex h-full items-center font-display text-lg leading-tight tracking-tight sm:text-3xl">A first impression <span className="ml-1 text-primary">worth keeping.</span></p>
                  </Morph>
                  <Morph p={p} label="Paragraph" plain="One clear sentence on what you do and who it is for." className="h-10 sm:h-12">
                    <p className="flex h-full items-center text-muted-foreground">One clear sentence on what you do, who it is for, and the next step.</p>
                  </Morph>
                  <Morph p={p} label="CTA" plain="Get a quote" className="h-8 w-28 sm:h-9 sm:w-32">
                    <span className="flex h-full items-center justify-center rounded-md bg-primary font-medium text-primary-foreground">Get a quote</span>
                  </Morph>
                </div>
                <Morph p={p} label="Image" plain="Hero image, 4:3" className="h-24 sm:col-span-2 sm:h-auto">
                  <div className="h-full w-full rounded-md bg-gradient-to-br from-primary/50 via-secondary/30 to-background" />
                </Morph>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {["Design", "Build", "Grow"].map((t, i) => (
                  <Morph key={t} p={p} label={`Card ${i + 1}`} plain={`${t}: short benefit line`} className="h-16 sm:h-24">
                    <div className="h-full rounded-md border border-border bg-card p-2 sm:p-3">
                      <span className={cn("mb-1 block h-1.5 w-6 rounded-full sm:mb-2", i === 1 ? "bg-secondary" : "bg-primary")} />
                      <p className="font-display text-sm sm:text-base">{t}</p>
                      <p className="hidden text-muted-foreground sm:block">A short, specific benefit.</p>
                    </div>
                  </Morph>
                ))}
              </div>
              <Morph p={p} label="Footer" plain="Contact · Social · Legal" className="h-7 sm:h-9">
                <div className="flex h-full items-center justify-between rounded-md bg-muted px-3 text-muted-foreground"><span>© Your Business</span><span>Privacy · Terms</span></div>
              </Morph>
            </div>
          </div>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
            <motion.div className="h-full bg-primary" style={{ width: bar }} />
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowDown size={14} className="animate-bounce" /> This is how every build unfolds: structure first, then words, then design.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Lighthouse dials ───────────── */

function Dial({ label, value, i }: { label: string; value: number; i: number }) {
  const R = 38;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" strokeWidth="7" className="stroke-muted" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            className="stroke-secondary"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C * (1 - value / 100) }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease, delay: i * 0.12 }}
          />
        </svg>
        <CountUp to={value} className="absolute inset-0 flex items-center justify-center font-display text-3xl text-secondary sm:text-4xl" />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

/* ───────────── SERP + social preview ───────────── */

function SerpPlayground() {
  const [i, setI] = useState(0);
  const b = serpExamples[i];
  const tLen = b.title.length;
  const dLen = b.desc.length;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="text-sm text-muted-foreground">Pick a kind of business. Watch how it appears in search and when shared.</p>
        <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Business type">
          {serpExamples.map((e, k) => (
            <button
              key={e.id}
              role="radio"
              aria-checked={k === i}
              onClick={() => setI(k)}
              className={cn("rounded-xl border px-4 py-2 text-sm transition", k === i ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}
            >
              {e.chip}
            </button>
          ))}
        </div>
        <dl className="mt-8 space-y-4 text-sm">
          {[
            { k: "Title tag", n: tLen, max: 60 },
            { k: "Meta description", n: dLen, max: 155 },
          ].map((m) => (
            <div key={m.k}>
              <div className="flex justify-between">
                <dt>{m.k}</dt>
                <dd className={m.n <= m.max ? "text-secondary" : "text-primary"}>{m.n} / {m.max}</dd>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div className={cn("h-full rounded-full", m.n <= m.max ? "bg-secondary" : "bg-primary")} animate={{ width: `${Math.min(100, (m.n / m.max) * 100)}%` }} transition={{ duration: 0.5, ease }} />
              </div>
            </div>
          ))}
        </dl>
        <p className="mt-6 flex gap-2 text-sm text-muted-foreground"><Check size={16} className="mt-0.5 shrink-0 text-secondary" /> Every page gets a title and description written to fit, and a social card that sells the click.</p>
      </div>

      <div className="space-y-4" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3, ease }} className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Search result</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted font-display text-[10px]">{b.name[0]}</span>
                <span className="min-w-0 truncate"><span className="text-foreground">{b.host}</span> <span className="text-muted-foreground">› {b.crumbs}</span></span>
              </div>
              <p className="mt-2 font-display text-lg leading-snug text-secondary sm:text-xl">{b.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <p className="px-5 pt-5 text-xs uppercase tracking-widest text-muted-foreground sm:px-6">Shared on WhatsApp</p>
              <div className="m-4 overflow-hidden rounded-xl border border-border bg-background sm:m-5">
                <div className="relative flex aspect-[1.91/1] items-end bg-gradient-to-br from-primary/40 via-secondary/25 to-background p-4">
                  <p className="font-display text-2xl leading-tight sm:text-3xl">{b.name}</p>
                  <span className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs">{b.ogTag}</span>
                </div>
                <div className="p-3 text-xs">
                  <p className="uppercase text-muted-foreground">{b.host}</p>
                  <p className="mt-1 line-clamp-1 text-sm">{b.title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────── Responsive reflow ───────────── */

function Reflow() {
  const [w, setW] = useState(1100);
  const bp = w < 480 ? "Phone" : w < 820 ? "Tablet" : "Desktop";
  const cols = w < 480 ? 1 : w < 820 ? 2 : 3;
  const split = w >= 820;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <label htmlFor="reflow" className="text-sm text-muted-foreground">Drag to resize the screen</label>
        <input id="reflow" type="range" min={320} max={1100} step={10} value={w} onChange={(e) => setW(Number(e.target.value))} className="h-2 min-w-[10rem] flex-1 cursor-pointer accent-primary" aria-valuetext={`${w} pixels, ${bp}`} />
        <p className="w-40 text-right font-mono text-sm"><span className="text-primary">{w}px</span> · {bp}</p>
      </div>
      <div className="mt-3 flex gap-2">
        {[{ n: "Phone", v: 360 }, { n: "Tablet", v: 768 }, { n: "Desktop", v: 1100 }].map((d) => (
          <button key={d.n} onClick={() => setW(d.v)} className="rounded-lg border border-border px-3 py-1.5 text-xs transition hover:bg-muted">{d.n}</button>
        ))}
      </div>
      <div className="mt-6 flex justify-center rounded-2xl border border-border bg-muted/30 p-3 sm:p-6">
        <div className="overflow-hidden rounded-xl border border-border bg-background transition-[width] duration-300" style={{ width: `${(w / 1100) * 100}%`, minWidth: "9rem" }}>
          <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2 text-[10px]">
            <span className="flex items-center gap-1.5 font-display text-xs"><span className="h-2 w-2 rounded-full bg-primary" />Brand</span>
            {split ? <span className="flex gap-3 text-muted-foreground"><span>Services</span><span>About</span><span>Contact</span></span> : <Menu size={14} />}
          </div>
          <div className={cn("grid gap-3 p-3", split && "grid-cols-2")}>
            <div>
              <p className={cn("font-display leading-tight", split ? "text-2xl" : "text-lg")}>A first impression <span className="text-primary">worth keeping.</span></p>
              <p className="mt-1 text-[10px] text-muted-foreground">One clear sentence on what you do.</p>
              <span className="mt-2 inline-block rounded-md bg-primary px-2.5 py-1 text-[10px] text-primary-foreground">Get a quote</span>
            </div>
            <div className="min-h-[3.5rem] rounded-md bg-gradient-to-br from-primary/40 via-secondary/25 to-background" />
          </div>
          <div className="grid gap-2 p-3 pt-0" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {[0, 1, 2].map((k) => (
              <div key={k} className="rounded-md border border-border bg-card p-2">
                <span className={cn("mb-1 block h-1 w-5 rounded-full", k === 1 ? "bg-secondary" : "bg-primary")} />
                <p className="text-[10px]">Service {k + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Deliverables: tabs ───────────── */

function DeliverableTabs() {
  const [i, setI] = useState(0);
  const d = s.deliverables[i];
  const extra = websitesReceive[d.title];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") setI((i + 1) % s.deliverables.length);
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") setI((i - 1 + s.deliverables.length) % s.deliverables.length);
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div role="tablist" aria-label="What you get" aria-orientation="vertical" onKeyDown={onKey} className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {s.deliverables.map((x, k) => (
          <button key={x.title} role="tab" id={`wt-${k}`} aria-selected={k === i} aria-controls="wt-panel" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)}
            className={cn("flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition", k === i ? "border-primary bg-primary/10" : "border-border hover:bg-muted")}>
            <span className={cn("font-display text-lg tabular-nums", k === i ? "text-primary" : "text-muted-foreground")}>0{k + 1}</span>
            <span className="whitespace-nowrap text-sm lg:whitespace-normal">{x.title}</span>
          </button>
        ))}
      </div>
      <div id="wt-panel" role="tabpanel" aria-labelledby={`wt-${i}`} className="relative min-h-[18rem] overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }}>
            <p className="font-display text-7xl tracking-tighter text-primary/30 sm:text-8xl" aria-hidden>0{i + 1}</p>
            <h3 className="-mt-4 text-3xl sm:text-4xl">{d.title}</h3>
            <p className="mt-4 max-w-xl text-muted-foreground">{d.text}</p>
            {extra && (
              <>
                <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">You receive</p>
                <ul className="mt-3 space-y-2">
                  {extra.receive.map((r) => (
                    <li key={r} className="flex gap-2 text-sm"><Check size={16} className="mt-0.5 shrink-0 text-secondary" />{r}</li>
                  ))}
                </ul>
                <p className="mt-6 border-l-2 border-primary pl-4 text-sm italic text-muted-foreground">{extra.note}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────── The world ───────────── */

export function WebsitesWorld() {
  return (
    <>
      {/* Hero: oversized type */}
      <Section className="pb-0 pt-12 md:pt-20">
        <Reveal>
          <p className="font-display text-6xl tracking-tighter text-primary sm:text-7xl">01</p>
          <Eyebrow>Websites &amp; Portfolios</Eyebrow>
          <h1 className="font-display text-[clamp(3rem,13vw,9rem)] font-semibold leading-[0.9] tracking-tighter">
            <span className="text-outline block">Blueprint</span>
            <span className="block text-primary">to live.</span>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-2xl text-lg text-muted-foreground">{s.intro}</p>
            <div className="flex flex-wrap content-start gap-4">
              <CtaButton>Plan my website</CtaButton>
              <a href="#serp" className="rounded-xl border border-border bg-background px-6 py-3 transition hover:bg-muted">See the SEO side</a>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground"><span className="text-foreground">Built for: </span>{s.who}</p>
        </Reveal>
      </Section>

      <BlueprintMorph />

      <Section className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Speed you can measure</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">The scores we build to.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Targets for every launch, checked in Lighthouse on a throttled mobile connection before we hand over. Your report ships with the site.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {lighthouseTargets.map((t, i) => <Dial key={t.label} {...t} i={i} />)}
        </div>
      </Section>

      <Section id="serp">
        <Reveal>
          <Eyebrow>Found, then chosen</Eyebrow>
          <h2 className="mb-12 max-w-3xl text-4xl sm:text-5xl">How you show up before anyone visits.</h2>
        </Reveal>
        <SerpPlayground />
      </Section>

      <Section className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Mobile first, every screen after</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">One site. Every screen.</h2>
        </Reveal>
        <Reflow />
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Everything between idea and launch.</h2>
        </Reveal>
        <DeliverableTabs />
      </Section>

      {/* Phases: swipeable film strip */}
      <Section className="overflow-hidden border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Four stages, in order.</h2>
          <p className="mt-3 text-sm text-muted-foreground">Swipe or scroll sideways. Indicative: your proposal fixes the real dates.</p>
        </Reveal>
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" tabIndex={0} aria-label="Project phases, scrollable">
          {s.phases.map((ph, k) => (
            <article key={ph.name} className="min-w-[82%] snap-start rounded-2xl border border-border bg-card p-6 sm:min-w-[22rem] sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl text-primary tabular-nums">0{k + 1}</span>
                <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{ph.duration}</span>
              </div>
              <h3 className="mt-6 text-2xl">{ph.name}</h3>
              <p className="mt-2 text-muted-foreground">{ph.text}</p>
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${((k + 1) / s.phases.length) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, ease }} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Tools we use</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Open, proven, yours to keep.</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {s.stack.map((t) => <li key={t} className="rounded-xl border border-border bg-card px-4 py-2 text-sm">{t}</li>)}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
