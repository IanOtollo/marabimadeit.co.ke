"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { estimatorDoors, scaleBands, urgency } from "@/data/estimator";
import { stages } from "@/data/process";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { useContact } from "@/components/layout/Shell";
import { cn, ease } from "@/lib/utils";

function useCount(value: number) {
  const mv = useMotionValue(value);
  const [v, setV] = useState(value);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.7, ease, onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [value, mv]);
  return v;
}

function Gauge({ weight, color }: { weight: number; color: string }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const frac = Math.min(1, weight / 110);
  const shown = useCount(frac);
  return (
    <svg viewBox="0 0 140 140" className="h-40 w-40 -rotate-90" aria-hidden>
      <circle cx="70" cy="70" r={R} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
      {Array.from({ length: 40 }, (_, i) => (
        <line key={i} x1="70" y1="6" x2="70" y2="12" stroke="hsl(var(--foreground) / 0.25)" strokeWidth="1" transform={`rotate(${(i / 40) * 360} 70 70)`} />
      ))}
      <circle cx="70" cy="70" r={R} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - shown)} style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
    </svg>
  );
}

export function Estimator({ compact = false }: { compact?: boolean }) {
  const { openContact } = useContact();
  const [di, setDi] = useState(0);
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [ui, setUi] = useState(0);
  const door = estimatorDoors[di];

  const chosen = door.options.filter((o) => picked[`${door.id}:${o.id}`]);
  const weight = door.baseWeight + chosen.reduce((s, o) => s + o.weight, 0);
  const weeks = door.baseWeeks + chosen.reduce((s, o) => s + o.weeks, 0);
  const low = Math.max(2, Math.round(weeks * 0.85));
  const high = Math.round(weeks * 1.2);
  const band = scaleBands.find((b) => weight < b.max)!;
  const accent = di % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))";
  const wLow = useCount(low);
  const wHigh = useCount(high);

  const phases = useMemo(() => {
    const total = stages.slice(0, 5).reduce((s, x) => s + (x.weeks[1] - x.weeks[0]), 0);
    return stages.slice(0, 5).map((s) => ({ name: s.name, share: (s.weeks[1] - s.weeks[0]) / total }));
  }, []);

  const note = `Scope: ${chosen.length ? chosen.map((o) => o.label).join("; ") : "to be discussed"}. Urgency: ${urgency[ui].label}. Indicative: ${low} to ${high} weeks, ${band.name} scale.`;

  const body = (
    <div data-hint-scene className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
      <div>
        <div role="tablist" aria-label="What are you building?" className="flex flex-wrap gap-2">
          {estimatorDoors.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={di === i}
              onClick={() => setDi(i)}
              className={cn("rounded-xl border px-4 py-2.5 text-sm transition active:scale-[0.97]", di === i ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted")}
            >
              {d.label}
            </button>
          ))}
        </div>

        <p className="mb-3 mt-8 text-xs uppercase tracking-widest text-muted-foreground">What does it need?</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {door.options.map((o) => {
            const on = !!picked[`${door.id}:${o.id}`];
            return (
              <li key={o.id}>
                <button
                  onClick={() => setPicked((p) => ({ ...p, [`${door.id}:${o.id}`]: !on }))}
                  aria-pressed={on}
                  className={cn("flex h-full w-full items-start gap-3 rounded-xl border p-4 text-left transition active:scale-[0.98]", on ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50")}
                >
                  <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition", on ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{on && <Check size={14} />}</span>
                  <span>
                    <span className="block text-sm font-medium">{o.label}</span>
                    <span className="block text-xs text-muted-foreground">{o.hint}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mb-3 mt-8 text-xs uppercase tracking-widest text-muted-foreground">How soon?</p>
        <div className="flex flex-wrap gap-2">
          {urgency.map((u, i) => (
            <button key={u.id} onClick={() => setUi(i)} aria-pressed={ui === i} className={cn("rounded-xl border px-4 py-2.5 text-sm transition active:scale-[0.97]", ui === i ? "border-secondary bg-secondary/15 text-foreground" : "border-border hover:bg-muted")}>
              {u.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{urgency[ui].note}</p>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              <Gauge weight={weight} color={accent} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scale</span>
                <span className="font-display text-2xl leading-none">{band.name}</span>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Indicative timeline</p>
              <p className="mt-1 font-display text-5xl tabular-nums tracking-tighter">
                {Math.round(wLow)}<span className="text-muted-foreground">–</span>{Math.round(wHigh)}
              </p>
              <p className="text-sm text-muted-foreground">weeks, kickoff to launch</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{band.text}</p>

          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-muted" role="img" aria-label="How the time is split across stages">
            {phases.map((p, i) => (
              <motion.span key={p.name} className={cn("h-full border-r border-background", i % 2 ? "bg-secondary" : "bg-primary")} animate={{ width: `${p.share * 100}%` }} transition={{ duration: 0.6, ease }} title={p.name} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Discover</span>
            <span>Launch</span>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">What shapes your quote</p>
            <ul className="mt-3 min-h-[3rem] space-y-1.5 text-sm">
              {chosen.length === 0 && <li className="text-muted-foreground">Pick what you need and watch this change.</li>}
              {chosen.map((o) => (
                <li key={o.id} className="flex gap-2">
                  <Check size={14} className="mt-1 shrink-0 text-secondary" /> {o.label}
                </li>
              ))}
            </ul>
          </div>
          <button
            data-marabi-cta
            onClick={() => openContact({ door: door.id, note })}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90"
          >
            Send this brief to Marabi
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">You get a fixed quote in shillings after a free call. No obligation.</p>
        </div>
      </aside>
    </div>
  );

  if (compact) return body;
  return (
    <Section id="pricing" rail="Rates" tip="pricing">
      <Reveal>
        <Eyebrow>Rates · shape your project</Eyebrow>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">See the scale before we talk numbers.</h2>
          <MarabiHint topic="pricing" label="Ask Marabi about pricing" />
        </div>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Pick what you are building and what it needs. You will see its scale and a realistic timeline. Prices are fixed and quoted in shillings after a short call.</p>
      </Reveal>
      <div className="mt-12">{body}</div>
    </Section>
  );
}
