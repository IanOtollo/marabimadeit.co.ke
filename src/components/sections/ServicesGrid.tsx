"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { doors, type Door } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { useContact } from "@/components/layout/Shell";
import { cn, ease } from "@/lib/utils";

/* ---------- a small drawn illustration for each service, drawn as it scrolls into view ---------- */
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

/** One service, shown in full: no hovering, clicking or opening needed to read it. */
function Service({ d }: { d: Door }) {
  const { openContact } = useContact();
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, margin: "-120px" });
  const tone = d.accent === "primary" ? "text-primary" : "text-secondary";
  const bar = d.accent === "primary" ? "bg-primary" : "bg-secondary";

  return (
    <motion.li
      ref={ref}
      id={d.id}
      data-marabi-info={d.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="relative scroll-mt-24 border-t border-border/60 py-10 pl-5 last:border-b sm:py-14 sm:pl-8"
    >
      <span className={cn("absolute inset-y-10 left-0 w-0.5 sm:inset-y-14", bar)} aria-hidden />
      <div className="grid items-center gap-8 md:grid-cols-[1.35fr_1fr] md:gap-14">
        <div>
          <p className="flex items-baseline gap-4">
            <span className={cn("font-display text-2xl tabular-nums", tone)}>{d.index}</span>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">{d.kicker}</span>
          </p>
          <h3 className="mt-3 font-display text-4xl leading-tight tracking-tighter sm:text-5xl lg:text-6xl">{d.title}</h3>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{d.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {d.points.map((p) => (
              <li key={p} className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs sm:text-sm">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href={`/services/${d.id}`} className={cn("inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 font-medium text-background transition hover:opacity-90 active:scale-[0.98]", bar)}>
              Explore this service <ArrowUpRight size={16} />
            </Link>
            <button onClick={() => openContact({ door: d.id })} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Enquire
            </button>
          </div>
        </div>
        <div className={cn("hidden aspect-[8/5] w-full max-w-sm items-center justify-center rounded-2xl border border-border/60 bg-card/40 p-5 md:flex md:justify-self-end", tone)}>{seen && <Glyph id={d.id} />}</div>
      </div>
    </motion.li>
  );
}

/** The four services, each shown in full, one after the other. */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <Section id="services" rail="Services">
      {heading && (
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
          <div data-hint-scene className="flex flex-wrap items-center gap-4">
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Four services. One studio.</h2>
            <MarabiHint topic="overview" label="Ask Marabi what we do" />
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Websites, e-commerce, software and CRM/ERP, each built end to end by the same two people.</p>
        </Reveal>
      )}
      <ul className={cn(heading && "mt-12")}>
        {doors.map((d) => (
          <Service key={d.id} d={d} />
        ))}
      </ul>
    </Section>
  );
}
