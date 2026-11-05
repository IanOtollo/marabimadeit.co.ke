"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { doors, type Door } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { useContact } from "@/components/layout/Shell";
import { cn, ease } from "@/lib/utils";

/* ---------- a small drawn illustration for each service, animated when its row opens ---------- */
function Glyph({ id }: { id: string }) {
  const line = (d: number) => ({ initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.8, delay: d, ease } });
  const pop = (d: number) => ({ initial: { opacity: 0, scale: 0.7 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: d, ease } });
  const s = "h-full w-full";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (id === "websites")
    return (
      <svg viewBox="0 0 240 150" className={s} aria-hidden>
        <motion.rect x="14" y="12" width="212" height="126" rx="10" {...stroke} {...line(0)} />
        <path d="M14 36 H226" {...stroke} strokeOpacity="0.4" />
        {[28, 42, 56].map((x, i) => (
          <motion.circle key={x} cx={x} cy="24" r="3" fill="hsl(var(--primary))" {...pop(0.5 + i * 0.1)} />
        ))}
        <motion.rect x="28" y="50" width="110" height="14" rx="4" fill="hsl(var(--primary))" fillOpacity="0.85" {...pop(0.7)} />
        <motion.rect x="28" y="72" width="84" height="7" rx="3.5" fill="currentColor" fillOpacity="0.35" {...pop(0.85)} />
        {[0, 1, 2].map((i) => (
          <motion.rect key={i} x={28 + i * 66} y="92" width="56" height="34" rx="6" {...stroke} stroke="hsl(var(--secondary))" {...pop(1 + i * 0.12)} />
        ))}
        <motion.rect x="150" y="50" width="62" height="30" rx="6" fill="hsl(var(--secondary))" fillOpacity="0.25" {...pop(0.95)} />
      </svg>
    );

  if (id === "ecommerce")
    return (
      <svg viewBox="0 0 240 150" className={s} aria-hidden>
        <motion.path d="M70 54 H170 L180 128 H60 Z" {...stroke} {...line(0)} />
        <motion.path d="M92 54 V46 A28 28 0 0 1 148 46 V54" {...stroke} stroke="hsl(var(--primary))" {...line(0.4)} />
        <motion.circle cx="120" cy="96" r="20" fill="hsl(var(--secondary))" fillOpacity="0.18" stroke="hsl(var(--secondary))" strokeWidth="2" {...pop(0.9)} />
        <motion.path d="M110 96 l7 7 l14 -16" {...stroke} stroke="hsl(var(--secondary))" strokeWidth={3} {...line(1.1)} />
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx={34 + i * 6} cy={30 + i * 14} r="3" fill="hsl(var(--primary))" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }} />
        ))}
        <motion.rect x="186" y="44" width="40" height="22" rx="6" fill="hsl(var(--primary))" {...pop(1.2)} />
        <text x="206" y="59" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--primary-foreground))">KES</text>
      </svg>
    );

  if (id === "software")
    return (
      <svg viewBox="0 0 240 150" className={s} aria-hidden>
        <motion.rect x="14" y="12" width="212" height="126" rx="10" {...stroke} {...line(0)} />
        <path d="M14 36 H226" {...stroke} strokeOpacity="0.4" />
        <motion.path d="M34 62 l14 10 l-14 10" {...stroke} stroke="hsl(var(--primary))" strokeWidth={3} {...line(0.5)} />
        {[[60, 90], [60, 70], [86, 110], [60, 50]].map(([x, w], i) => (
          <motion.rect key={i} x={x} y={58 + i * 18} height="7" rx="3.5" fill={i % 2 ? "hsl(var(--secondary))" : "currentColor"} fillOpacity={i % 2 ? 0.9 : 0.4} initial={{ width: 0 }} animate={{ width: w + 40 }} transition={{ duration: 0.6, delay: 0.7 + i * 0.25, ease }} />
        ))}
        <motion.rect x="150" y="116" width="2" height="12" fill="hsl(var(--primary))" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        <motion.text x="200" y="64" fontSize="26" fontWeight="700" fill="hsl(var(--secondary))" {...pop(1.4)}>{"{ }"}</motion.text>
      </svg>
    );

  const sat = [[48, 40], [192, 36], [206, 104], [120, 128], [34, 100]];
  return (
    <svg viewBox="0 0 240 150" className={s} aria-hidden>
      {sat.map(([x, y], i) => (
        <motion.path key={i} d={`M120 72 L${x} ${y}`} {...stroke} strokeOpacity="0.5" {...line(0.2 + i * 0.12)} />
      ))}
      {sat.map(([x, y], i) => (
        <motion.circle key={`n${i}`} cx={x} cy={y} r="11" fill="hsl(var(--background))" stroke={i % 2 ? "hsl(var(--secondary))" : "hsl(var(--primary))"} strokeWidth="2.5" {...pop(0.5 + i * 0.12)} />
      ))}
      <motion.circle cx="120" cy="72" r="20" fill="hsl(var(--primary))" fillOpacity="0.22" stroke="hsl(var(--primary))" strokeWidth="2.5" {...pop(0.1)} />
      <motion.circle cx="120" cy="72" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" animate={{ scale: [1, 1.9], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "120px 72px" }} />
    </svg>
  );
}

function Row({ d, open, onOpen, onToggle }: { d: Door; open: boolean; onOpen: () => void; onToggle: () => void }) {
  const { openContact } = useContact();
  const reduce = useReducedMotion();
  const tone = d.accent === "primary" ? "text-primary" : "text-secondary";
  const bar = d.accent === "primary" ? "bg-primary" : "bg-secondary";
  const panelId = `svc-${d.id}`;

  return (
    <li id={d.id} data-marabi-info={d.id} className="relative scroll-mt-24 border-t border-border/60 last:border-b" onMouseEnter={() => matchMedia("(hover: hover)").matches && onOpen()}>
      <span className={cn("absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 transition-transform duration-500", bar, open && "scale-y-100")} aria-hidden />
      <h3>
        <button onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="group flex w-full items-center gap-4 py-6 pl-4 text-left sm:gap-8 sm:py-8 sm:pl-6">
          <span className={cn("w-8 shrink-0 font-display text-lg tabular-nums transition-colors duration-300 sm:w-12 sm:text-2xl", open ? tone : "text-muted-foreground")}>{d.index}</span>
          <span className={cn("min-w-0 flex-1 font-display text-3xl leading-tight tracking-tighter transition-all duration-500 sm:text-5xl lg:text-7xl", open ? "translate-x-1 text-foreground sm:translate-x-3" : "text-foreground/60 group-hover:text-foreground/90")}>{d.title}</span>
          <span className="hidden max-w-[15rem] text-right text-sm text-muted-foreground lg:block">{d.kicker}</span>
          <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-12 sm:w-12", open ? cn("border-transparent", bar, "text-background") : "border-border text-muted-foreground group-hover:border-foreground/40")}>
            <ArrowUpRight size={20} className={cn("transition-transform duration-500", open ? "rotate-45" : "rotate-0")} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={d.title}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 pl-4 sm:pb-12 sm:pl-[5.5rem] md:grid-cols-[1.25fr_1fr] md:gap-12">
              <div>
                <p className="max-w-xl text-lg text-muted-foreground">{d.blurb}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {d.points.map((p) => (
                    <li key={p} className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs sm:text-sm">
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                  <Link href={`/services/${d.id}`} className={cn("inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 font-medium text-background transition active:scale-[0.98] hover:opacity-90", bar)}>
                    Explore this service <ArrowUpRight size={16} />
                  </Link>
                  <button onClick={() => openContact({ door: d.id })} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Enquire
                  </button>
                </div>
              </div>
              <div className={cn("hidden aspect-[8/5] w-full max-w-sm items-center justify-center rounded-2xl border border-border/60 bg-card/40 p-5 md:flex", tone)}>
                <Glyph id={d.id} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** The four services as an editorial index: huge type, one row open at a time. */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  const [open, setOpen] = useState<string | null>(doors[0].id);
  // a link such as /#crm-erp (or a returning visitor) can land straight on a service
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h && doors.some((d) => d.id === h)) setOpen(h);
  }, []);

  return (
    <Section id="services" rail="Services">
      {heading && (
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <div data-hint-scene className="flex flex-wrap items-center gap-4">
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Four services. One studio.</h2>
            <MarabiHint topic="overview" label="Ask Marabi what we do" />
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Websites, e-commerce, software and CRM/ERP, each built end to end by the same two people. Open one to see what is inside.</p>
        </Reveal>
      )}
      <Reveal className={cn(heading && "mt-12")}>
        <ul>
          {doors.map((d) => (
            <Row key={d.id} d={d} open={open === d.id} onOpen={() => setOpen(d.id)} onToggle={() => setOpen(open === d.id ? null : d.id)} />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
