"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { doors } from "@/data/site";
import { projects, serialOf, zohoProjects, type DoorId, type Project } from "@/data/projects";
import { Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { StackIcon } from "@/components/ui/StackIcon";
import { cn, ease } from "@/lib/utils";

const blurbs: Record<DoorId, string> = {
  websites: "Sites that explain, tell stories and make the next step obvious.",
  ecommerce: "Stores that show the range, take payment and keep orders moving.",
  software: "Private systems built around how a business really runs. Shown here in words, never on screen.",
  "crm-erp": "The platforms we implement and the brands we have delivered them with.",
};

const host = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** A logo drawn as a silhouette in the current text colour, so it follows the theme. */
function Silhouette({ src, ratio, h = 3.25, className = "" }: { src: string; ratio: number; h?: number; className?: string }) {
  const w = Math.min(ratio * h, 15);
  return <span aria-hidden className={cn("block bg-current", className)} style={{ width: `${w}rem`, height: `${w / ratio}rem`, WebkitMask: `url(${src}) center / contain no-repeat`, mask: `url(${src}) center / contain no-repeat` }} />;
}

/** A live site inside a browser window; the page glides slowly past as you scroll. */
function BrowserFrame({ p }: { p: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  return (
    <motion.a
      ref={ref}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${p.client} (${host(p.url!)})`}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease }}
      className="group block overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center gap-3 border-b border-border/70 bg-muted/60 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-background/70 px-3 py-1 text-center text-xs text-muted-foreground">{host(p.url!)}</span>
        <ArrowUpRight size={14} className="shrink-0 text-muted-foreground transition group-hover:text-primary" />
      </div>
      <div className="relative aspect-[8/5] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 scale-[1.1]">
          <Image src={p.image!} alt={`${p.client}: ${p.title}`} width={1440} height={900} sizes="(min-width: 1024px) 56vw, 100vw" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" aria-hidden />
      </div>
    </motion.a>
  );
}

/** A private system, kept compact: the client's mark, what it is, and a lock. */
function PrivateCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease, delay: i * 0.08 }} className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-primary">{serialOf(p)}</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock size={12} className="text-primary" /> Private
        </span>
      </div>
      <div className="my-8 flex h-20 items-center text-foreground/80">
        {p.logo ? <Silhouette src={p.logo.src} ratio={p.logo.ratio} h={3.2} /> : <span className="font-display text-6xl tracking-tighter">{p.monogram}</span>}
      </div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.client}</p>
      <h3 className="mt-1 text-xl leading-snug">{p.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
    </motion.article>
  );
}

function Entry({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  return (
    <motion.article initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease }} className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <div className={cn(flip && "lg:order-2")}>{<BrowserFrame p={p} />}</div>
      <div>
        <p className="font-mono text-sm text-primary">
          {serialOf(p)} <span className="text-muted-foreground">· {p.year}</span>
        </p>
        <p className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">{p.client}</p>
        <h3 className="mt-2 text-3xl leading-tight tracking-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-4 text-muted-foreground">{p.summary}</p>
        {p.highlights && (
          <ul className="mt-5 space-y-2.5 text-sm">
            {p.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-xs text-muted-foreground">
              <StackIcon name={s} />
              {s}
            </li>
          ))}
        </ul>
        {p.url && (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]">
            Visit the live site <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function CrmChapter() {
  const brands = [
    { name: "Zoho", text: "The platform behind much of our CRM and ERP work: CRM, Books, Inventory and Deluge scripting, configured around how your team really sells, stocks and invoices.", ratio: 2.288, src: "/partners/zoho.svg" },
    { name: "IKA360", text: "A brand we have delivered CRM and ERP work with. Details are shared on request, so we can introduce you to the right people.", ratio: 1.41, src: "/partners/ika360.svg" },
  ];
  return (
    <div>
    <div className="grid gap-5 md:grid-cols-2">
      {brands.map((b, i) => (
        <motion.div key={b.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease, delay: i * 0.1 }} className="rounded-2xl border border-border/60 bg-card p-8 sm:p-10">
          <div className="flex h-24 items-center text-foreground/80">
            <Silhouette src={b.src} ratio={b.ratio} h={b.name === "IKA360" ? 5 : 4} />
          </div>
          <h3 className="mt-6 text-2xl">{b.name}</h3>
          <p className="mt-3 text-muted-foreground">{b.text}</p>
        </motion.div>
      ))}
    </div>
      <Reveal>
        <p className="mb-2 mt-14 text-sm uppercase tracking-widest text-muted-foreground">Zoho implementations</p>
        <ul className="divide-y divide-border border-y border-border">
          {zohoProjects.map((z) => (
            <li key={z.client} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
              <span className="text-lg sm:text-xl">{z.client}</span>
              <span className="text-sm text-muted-foreground">{z.work}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function PortfolioShowcase() {
  const [filter, setFilter] = useState<DoorId | "all">("all");
  const count = (id: DoorId) => (id === "crm-erp" ? zohoProjects.length : projects.filter((p) => p.door === id).length);
  const chapters = doors.filter((d) => filter === "all" || d.id === filter);

  return (
    <div className="border-t border-border/50">
      <div className="sticky top-16 z-20 border-b border-border/40 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8" role="group" aria-label="Filter the portfolio by service">
          {([["all", "All work", projects.length + zohoProjects.length], ...doors.map((d) => [d.id, d.title, count(d.id as DoorId)])] as [string, string, number][]).map(([id, label, n]) => (
            <button key={id} onClick={() => setFilter(id as DoorId | "all")} aria-pressed={filter === id} className={cn("shrink-0 rounded-xl border px-4 py-2 text-sm transition", filter === id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
              {label} <span className="opacity-60">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {chapters.map((d, ci) => {
        const list = projects.filter((p) => p.door === d.id).sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || a.order - b.order);
        return (
          <Section key={d.id} id={d.id} rail={d.title} className={cn(ci > 0 && "border-t border-border/50")}>
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-6xl tracking-tighter text-muted-foreground/40 sm:text-8xl">0{doors.findIndex((x) => x.id === d.id) + 1}</span>
                <div>
                  <h2 className="text-3xl tracking-tight sm:text-5xl">{d.title}</h2>
                  <p className="mt-2 max-w-xl text-muted-foreground">{blurbs[d.id as DoorId]}</p>
                </div>
              </div>
            </Reveal>
            <div className="mt-14">
              {d.id === "crm-erp" ? (
                <CrmChapter />
              ) : d.id === "software" ? (
                <div className="grid gap-5 md:grid-cols-3">
                  {list.map((p, i) => (
                    <PrivateCard key={p.id} p={p} i={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-20 sm:space-y-28">
                  {list.map((p, i) => (
                    <Entry key={p.id} p={p} i={i} />
                  ))}
                </div>
              )}
            </div>
            {d.id !== "crm-erp" && list.some((p) => p.private) && (
              <p className="mt-14 flex items-start gap-3 text-sm text-muted-foreground">
                <Lock size={16} className="mt-0.5 shrink-0 text-primary" />
                Systems marked private are in daily use by real businesses. We describe them and never show them, to keep those businesses safe. Ask us and we will arrange a conversation with the client.
              </p>
            )}
          </Section>
        );
      })}

      <Section className="border-t border-border/50">
        <Reveal>
          <div className="rounded-2xl border border-border/60 bg-card p-8 sm:p-14">
            <p className="font-display text-3xl tracking-tight sm:text-5xl">Have something in mind?</p>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">Tell us what you want to build, and it could be the next project on this page.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton>Start a project</CtaButton>
              <Link href="/contact" className="rounded-xl border border-border px-6 py-3 transition hover:bg-muted">
                Send a message
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
