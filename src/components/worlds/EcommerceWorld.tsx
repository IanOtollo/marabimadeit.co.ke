"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Boxes, Check, ChevronLeft, ChevronRight, CreditCard, Pause, Play, Package, ReceiptText, RotateCcw, Smartphone, Truck, TrendingUp } from "lucide-react";
import { services } from "@/data/site";
import { pipelineStages, stkSteps, zones } from "@/data/worlds";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn, ease } from "@/lib/utils";
import { useOnScreen } from "./shared";

const s = services.ecommerce;

/* ───────────── Phone: M-Pesa STK push checkout ───────────── */

function PinDots({ n }: { n: number }) {
  return (
    <div className="flex justify-center gap-3" aria-label={`${n} of 4 digits entered`}>
      {[0, 1, 2, 3].map((k) => (
        <motion.span key={k} animate={{ scale: k < n ? 1 : 0.8, opacity: k < n ? 1 : 0.35 }} transition={{ duration: 0.2 }} className="h-3 w-3 rounded-full bg-foreground" />
      ))}
    </div>
  );
}

function PhoneScreen({ step, pin, go }: { step: number; pin: number; go: (n: number) => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease }} className="absolute inset-0 flex flex-col p-4 pt-9 text-xs">
        {step === 0 && (
          <>
            <div className="flex-1 rounded-xl bg-gradient-to-br from-secondary/50 via-primary/30 to-background" />
            <p className="mt-3 font-display text-lg">Handwoven Kikoy Throw</p>
            <p className="text-muted-foreground">Coastal blue · 100% cotton</p>
            <p className="mt-2 font-display text-xl text-primary">KES 3,450</p>
            <button onClick={() => go(1)} className="mt-3 rounded-lg bg-primary py-2.5 font-medium text-primary-foreground">Add to cart</button>
          </>
        )}
        {step === 1 && (
          <>
            <p className="font-display text-lg">Your cart</p>
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-border p-2">
              <span className="h-10 w-10 rounded-md bg-gradient-to-br from-secondary/50 to-primary/30" />
              <span className="flex-1">Kikoy Throw<br /><span className="text-muted-foreground">Qty 1</span></span>
              <span>3,450</span>
            </div>
            <div className="mt-3 rounded-lg border border-border p-2">
              <p className="text-muted-foreground">Delivery</p>
              <p>Nairobi · same day · 250</p>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-base"><span>Total</span><span>KES 3,700</span></div>
            <div className="mt-auto rounded-lg border border-border p-2 text-muted-foreground">M-Pesa number<br /><span className="text-foreground">0712 ••• 456</span></div>
            <button onClick={() => go(2)} className="mt-2 rounded-lg bg-secondary py-2.5 font-medium text-secondary-foreground">Pay with M-Pesa</button>
          </>
        )}
        {step === 2 && (
          <>
            <p className="font-display text-lg text-muted-foreground">Checking out…</p>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease }} className="mt-auto rounded-2xl border border-border bg-muted p-4 text-center shadow-xl">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">M-Pesa · STK push</p>
              <p className="mt-2">Pay <span className="font-medium">KES 3,700</span> to Demo Shop?</p>
              <p className="mt-3 text-muted-foreground">Enter your M-Pesa PIN</p>
              <div className="mt-3"><PinDots n={pin} /></div>
            </motion.div>
          </>
        )}
        {step === 3 && (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
              <motion.circle cx="26" cy="26" r="23" fill="none" strokeWidth="3" className="stroke-secondary" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease }} />
              <motion.path d="M15 27 l8 8 l14 -16" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-secondary" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.45, ease }} />
            </svg>
            <p className="mt-4 font-display text-xl">Payment received</p>
            <p className="mt-1 text-muted-foreground">Order MM-10482</p>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-1 flex-col justify-center">
            <p className="mb-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground">Messages · now</p>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, ease }} className="rounded-2xl rounded-tl-sm bg-muted p-3 leading-relaxed">
              Confirmed. KES 3,700.00 paid to Demo Shop. Order MM-10482 arrives today by 5pm. Track: demo.shop/t/10482
            </motion.div>
            <p className="mt-3 text-center text-muted-foreground">Stock updated. Receipt emailed. No one typed a thing.</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function PhoneDemo() {
  const reduce = useReducedMotion();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [pin, setPin] = useState(0);
  const playing = auto && !reduce && on;

  const go = useCallback((n: number) => {
    setAuto(false);
    setStep(((n % 5) + 5) % 5);
  }, []);

  useEffect(() => {
    if (step !== 2) {
      setPin(0);
      return;
    }
    setPin(0);
    const ids = [1, 2, 3, 4].map((k) => setTimeout(() => setPin(k), 700 + k * 450));
    return () => ids.forEach(clearTimeout);
  }, [step]);

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setStep((x) => (x + 1) % 5), step === 2 ? 3600 : step === 4 ? 3400 : 2300);
    return () => clearTimeout(id);
  }, [playing, step]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[19rem]">
      <div className="relative mx-auto aspect-[9/18.5] w-full rounded-[2.5rem] border-[10px] border-foreground/15 bg-background shadow-2xl">
        <span className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground/15" aria-hidden />
        <div className="absolute inset-0 overflow-hidden rounded-[1.9rem]"><PhoneScreen step={step} pin={pin} go={go} /></div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button onClick={() => go(step - 1)} aria-label="Previous step" className="rounded-lg border border-border p-2 hover:bg-muted"><ChevronLeft size={16} /></button>
        <p className="text-sm" aria-live="polite"><span className="text-primary">{step + 1}/5</span> {stkSteps[step]}</p>
        <button onClick={() => go(step + 1)} aria-label="Next step" className="rounded-lg border border-border p-2 hover:bg-muted"><ChevronRight size={16} /></button>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {stkSteps.map((n, k) => (
          <button key={n} onClick={() => go(k)} aria-label={`Go to ${n}`} aria-current={k === step} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <span className={cn("block h-full bg-primary transition-all duration-500", k <= step ? "w-full" : "w-0")} />
          </button>
        ))}
        <button onClick={() => setAuto(!auto)} aria-label={auto ? "Pause demo" : "Play demo"} className="ml-1 rounded-lg border border-border p-1.5 hover:bg-muted">{auto ? <Pause size={14} /> : <Play size={14} />}</button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">Illustrative checkout. Your store uses your products and your Daraja credentials.</p>
    </div>
  );
}

/* ───────────── Order pipeline + stock ───────────── */

function Pipeline() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(-1);
  const [log, setLog] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stock = idx >= 0 ? 23 : 24;

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = () => {
    clear();
    setLog([]);
    setIdx(-1);
    pipelineStages.forEach((st, k) => {
      const t = setTimeout(() => {
        setIdx(k);
        setLog((l) => [...l, st.log]);
      }, (k + 1) * (reduce ? 200 : 1300));
      timers.current.push(t);
    });
  };
  const reset = () => {
    clear();
    setIdx(-1);
    setLog([]);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Kikoy Throw · stock on hand</p>
          <p className="font-display text-5xl tabular-nums">
            <motion.span key={stock} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease }} className="inline-block text-primary">{stock}</motion.span>
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={run} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"><Package size={16} /> Place a test order</button>
          <button onClick={reset} aria-label="Reset" className="rounded-xl border border-border p-2.5 hover:bg-muted"><RotateCcw size={16} /></button>
        </div>
      </div>
      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" aria-hidden />
        <motion.div className="absolute left-0 top-4 h-0.5 bg-primary" animate={{ width: `${Math.max(0, idx) * 33.3}%` }} transition={{ duration: 0.8, ease }} aria-hidden />
        <ol className="relative grid grid-cols-4">
          {pipelineStages.map((st, k) => (
            <li key={st.id} className="flex flex-col items-center text-center">
              <motion.span animate={{ scale: k === idx ? 1.2 : 1 }} className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors", k <= idx ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}>
                {k <= idx ? <Check size={14} /> : k + 1}
              </motion.span>
              <span className={cn("mt-2 text-xs sm:text-sm", k <= idx ? "text-foreground" : "text-muted-foreground")}>{st.label}</span>
            </li>
          ))}
        </ol>
      </div>
      <ul className="mt-8 min-h-[7rem] space-y-2 font-mono text-xs text-muted-foreground" aria-live="polite">
        {log.length === 0 && <li>Press the button to watch an order move through the system.</li>}
        {log.map((l, k) => (
          <motion.li key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex gap-2"><span className="text-secondary">{`0${k + 1}`}</span>{l}</motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── Delivery zone schematic ───────────── */

const RINGS = [{ id: "inner", r: 52 }, { id: "metro", r: 100 }, { id: "upcountry", r: 148 }];
const PICKUPS = [{ x: 150, y: 120 }, { x: 330, y: 150 }, { x: 205, y: 262 }, { x: 290, y: 90 }, { x: 110, y: 215 }, { x: 355, y: 245 }];

function ZoneMap() {
  const [active, setActive] = useState("inner");
  const z = zones.find((x) => x.id === active) ?? zones[0];
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
      <svg viewBox="0 0 480 340" className="w-full" role="img" aria-label="Schematic of delivery zones around a hub">
        {[...Array(9)].map((_, k) => (
          <line key={`h${k}`} x1="0" x2="480" y1={k * 42.5} y2={k * 42.5} className="stroke-border" strokeWidth="0.5" />
        ))}
        {[...Array(13)].map((_, k) => (
          <line key={`v${k}`} y1="0" y2="340" x1={k * 40} x2={k * 40} className="stroke-border" strokeWidth="0.5" />
        ))}
        {[...RINGS].reverse().map((r) => (
          <motion.circle key={r.id} cx="240" cy="170" r={r.r} strokeWidth={active === r.id ? 2.5 : 1} strokeDasharray={r.id === "upcountry" ? "6 6" : undefined} className={cn("transition-colors", active === r.id ? "fill-primary/15 stroke-primary" : "fill-transparent stroke-muted-foreground/40")}
            initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} style={{ transformOrigin: "240px 170px" }} />
        ))}
        {PICKUPS.map((p, k) => (
          <rect key={k} x={p.x - 5} y={p.y - 5} width="10" height="10" rx="2" className={cn("transition-colors", active === "pickup" ? "fill-secondary" : "fill-muted-foreground/50")} />
        ))}
        <circle cx="240" cy="170" r="10" className="fill-primary" />
        <circle cx="240" cy="170" r="10" className="animate-ping fill-primary/40" style={{ transformOrigin: "240px 170px" }} />
        <text x="240" y="196" textAnchor="middle" className="fill-foreground text-[10px]">Your hub</text>
      </svg>
      <div>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Delivery zone">
          {zones.map((x) => (
            <button key={x.id} role="radio" aria-checked={x.id === active} onClick={() => setActive(x.id)} onMouseEnter={() => setActive(x.id)} onFocus={() => setActive(x.id)}
              className={cn("rounded-xl border px-4 py-2 text-sm transition", x.id === active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>{x.name}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={z.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-6 rounded-2xl border border-border bg-card p-6" aria-live="polite">
            <p className="font-display text-4xl text-primary">{z.eta}</p>
            <p className="mt-3">{z.detail}</p>
            <p className="mt-4 text-sm text-muted-foreground"><span className="text-foreground">Pricing: </span>{z.fee}. Rates and zones are configured for your business.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────── Deliverables: spotlight bento ───────────── */

const ICONS = [Smartphone, CreditCard, Boxes, Truck, ReceiptText, TrendingUp];
const SPAN = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-6"];

function Tile({ i }: { i: number }) {
  const d = s.deliverables[i];
  const Icon = ICONS[i];
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.div ref={ref} onPointerMove={move} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease, delay: (i % 3) * 0.08 }}
      className={cn("group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8", SPAN[i])}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(18rem_circle_at_var(--mx,50%)_var(--my,50%),hsl(var(--primary)/0.14),transparent_70%)]" aria-hidden />
      <Icon className="relative text-primary" size={26} />
      <h3 className="relative mt-5 text-2xl">{d.title}</h3>
      <p className="relative mt-2 max-w-xl text-muted-foreground">{d.text}</p>
    </motion.div>
  );
}

/* ───────────── Phases: scroll-linked stepper ───────────── */

function Stepper() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <ol ref={ref} className="relative mx-auto max-w-3xl pl-12 sm:pl-16">
      <span className="absolute bottom-2 left-[1.05rem] top-2 w-0.5 bg-border sm:left-[1.55rem]" aria-hidden />
      <motion.span className="absolute left-[1.05rem] top-2 w-0.5 bg-primary sm:left-[1.55rem]" style={{ height: h }} aria-hidden />
      {s.phases.map((p, k) => (
        <motion.li key={p.name} className="relative pb-14 last:pb-0" initial="off" whileInView="on" viewport={{ amount: 0.6, margin: "0px 0px -35% 0px" }}>
          <motion.span variants={{ off: { scale: 0.8, backgroundColor: "hsl(var(--card))", color: "hsl(var(--muted-foreground))" }, on: { scale: 1, backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" } }}
            transition={{ duration: 0.4 }} className="absolute -left-12 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-border font-display text-sm sm:-left-16 sm:h-11 sm:w-11">{k + 1}</motion.span>
          <motion.div variants={{ off: { opacity: 0.4, x: 12 }, on: { opacity: 1, x: 0 } }} transition={{ duration: 0.5, ease }}>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{p.duration}</p>
            <h3 className="mt-1 text-3xl">{p.name}</h3>
            <p className="mt-2 max-w-xl text-muted-foreground">{p.text}</p>
          </motion.div>
        </motion.li>
      ))}
    </ol>
  );
}

/* ───────────── The world ───────────── */

const LEDGER = ["Storefront", "Commerce engine", "Database", "Payments", "Cards", "Cache and queues"];

export function EcommerceWorld() {
  return (
    <>
      {/* Hero: copy + live phone */}
      <Section className="pt-12 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="font-display text-6xl tracking-tighter text-secondary sm:text-7xl">02</p>
            <Eyebrow>E-commerce</Eyebrow>
            <h1 className="text-5xl tracking-tighter sm:text-6xl lg:text-7xl">From <span className="text-secondary">tap</span> to delivered.</h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">{s.intro}</p>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground"><span className="text-foreground">Built for: </span>{s.who}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton>Plan my store</CtaButton>
              <a href="#pipeline" className="rounded-xl border border-border bg-background px-6 py-3 transition hover:bg-muted">Watch an order move</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}><PhoneDemo /></Reveal>
        </div>
      </Section>

      <Section id="pipeline" className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Behind the checkout</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Every payment moves the whole operation.</h2>
        </Reveal>
        <Pipeline />
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Delivery logic</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Zones, promises and fees that make sense.</h2>
        </Reveal>
        <ZoneMap />
      </Section>

      <Section className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>What you get</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">A store and the operation behind it.</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-6">{s.deliverables.map((_, i) => <Tile key={i} i={i} />)}</div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="mb-14 max-w-3xl text-4xl sm:text-5xl">Ten weeks, one thread.</h2>
        </Reveal>
        <Stepper />
      </Section>

      <Section className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Tools we use</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">The stack ledger.</h2>
          <ul className="mt-8 max-w-2xl space-y-3">
            {s.stack.map((t, i) => (
              <li key={t} className="flex items-baseline gap-3 text-sm sm:text-base">
                <span className="text-muted-foreground">{LEDGER[i] ?? "Tooling"}</span>
                <span className="flex-1 border-b border-dotted border-border" aria-hidden />
                <span className="text-right">{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
