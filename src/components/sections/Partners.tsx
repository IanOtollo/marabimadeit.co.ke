"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { partners, type Partner } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { ease } from "@/lib/utils";

/** Typographic silhouette used until a partner's own single-colour SVG is dropped in /public/partners. */
function Wordmark({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 260 80" className="h-16 w-auto" role="img" aria-label={`${name} logo`}>
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <path d="M58 20 A24 24 0 1 0 58 60" />
        <path d="M40 40 H64" />
      </g>
      <text x="82" y="52" fontSize="34" fontWeight="700" letterSpacing="3" fill="currentColor" fontFamily="var(--font-body), system-ui, sans-serif">
        {name}
      </text>
    </svg>
  );
}

function Silhouette({ p }: { p: Partner }) {
  if (p.logo)
    return (
      <span
        role="img"
        aria-label={`${p.name} logo`}
        className="block h-16 w-48 bg-current"
        style={{ WebkitMask: `url(${p.logo}) center / contain no-repeat`, mask: `url(${p.logo}) center / contain no-repeat` }}
      />
    );
  return <Wordmark name={p.name} />;
}

function Tile({ p, i }: { p: Partner; i: number }) {
  const body = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" aria-hidden />
      <span className="flex h-28 items-center justify-center text-muted-foreground transition-colors duration-500 group-hover:text-primary">
        <Silhouette p={p} />
      </span>
      <span className="mt-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
        {p.note}
        {p.url && <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />}
      </span>
    </>
  );
  const cls = "group relative block overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-colors hover:border-primary/40";
  return (
    <motion.li initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.1 }}>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${p.name}, ${p.note}`}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.li>
  );
}

export function Partners() {
  return (
    <Section id="partners" rail="Partners" className="border-y border-border/50 bg-card/40">
      <Reveal>
        <Eyebrow>Trusted by · in good company</Eyebrow>
        <h2 className="max-w-3xl text-4xl sm:text-5xl">Partners and clients.</h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">Brands that have put their weight behind us. Every mark below is shown as a silhouette, in their own colour only when you look closer.</p>
      </Reveal>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p, i) => (
          <Tile key={p.name} p={p} i={i} />
        ))}
        <motion.li initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: partners.length * 0.1 }}>
          <div className="flex h-full min-h-[14rem] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="font-display text-2xl">Your mark could be next.</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">Build with us and join the wall.</p>
            <CtaButton className="mt-5 px-5 py-2.5 text-sm">Start a project</CtaButton>
          </div>
        </motion.li>
      </ul>
    </Section>
  );
}
