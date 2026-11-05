"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FolderClosed } from "lucide-react";
import { groupByYear, projects, projectsFor, serialOf, type DoorId } from "@/data/projects";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn, ease } from "@/lib/utils";

/** Serialised, year-grouped archive of past projects. Empty until src/data/projects.ts is filled. */
export function CaseStudies({ door }: { door?: DoorId }) {
  const list = useMemo(() => projectsFor(door), [door]);
  const stacks = useMemo(() => [...new Set(list.flatMap((p) => p.stack))].sort(), [list]);
  const [tag, setTag] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const shown = tag ? list.filter((p) => p.stack.includes(tag)) : list;
  const groups = groupByYear(shown);

  return (
    <Section id="portfolio" className="border-t border-border/50">
      <Reveal>
        <Eyebrow>Selected work · case files</Eyebrow>
        <h2 className="max-w-3xl text-4xl sm:text-5xl">The archive.</h2>
      </Reveal>

      {list.length === 0 ? (
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 sm:p-10">
            <ul className="space-y-3" aria-hidden>
              {["001", "002", "003"].map((n, i) => (
                <li key={n} className="flex items-center gap-4 rounded-xl border border-dashed border-border p-4 text-muted-foreground/60">
                  <FolderClosed size={18} />
                  <span className="font-mono text-sm">{n}</span>
                  <span className="h-2 flex-1 rounded-full bg-muted" />
                  <span className="hidden h-2 w-16 rounded-full bg-muted sm:block" />
                  <span className="sr-only">{i}</span>
                </li>
              ))}
            </ul>
            {!reduce && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                initial={{ top: "-20%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 3.6, ease: "linear", repeat: Infinity }}
                aria-hidden
              />
            )}
            <div className="relative mt-8 max-w-xl">
              <p className="font-display text-2xl sm:text-3xl">Case files are being archived.</p>
              <p className="mt-3 text-muted-foreground">Every project we have shipped is being written up properly, with the problem, the build and the result. Until then, ask us and we will introduce you to clients you can speak to directly.</p>
              <CtaButton className="mt-6">Ask for references</CtaButton>
            </div>
          </div>
        </Reveal>
      ) : (
        <>
          {stacks.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
              <button onClick={() => setTag(null)} aria-pressed={tag === null} className={cn("rounded-xl border px-4 py-2 text-sm transition", tag === null ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
                All
              </button>
              {stacks.map((s) => (
                <button key={s} onClick={() => setTag(s === tag ? null : s)} aria-pressed={tag === s} className={cn("rounded-xl border px-4 py-2 text-sm transition", tag === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="mt-12 space-y-16">
            {groups.map((g) => (
              <div key={g.year} className="grid gap-6 lg:grid-cols-[10rem_1fr]">
                <p className="font-display text-5xl tracking-tighter text-muted-foreground/50 lg:sticky lg:top-28 lg:self-start">{g.year}</p>
                <ol className="divide-y divide-border border-y border-border">
                  {g.items.map((p) => (
                    <motion.li key={p.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease }} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr_auto]">
                      <span className="font-mono text-sm text-primary">{serialOf(p, projects)}</span>
                      <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">{p.client}</p>
                        <h3 className="mt-1 text-2xl">
                          {p.title}
                          {p.featured && <span className="ml-3 rounded-full border border-primary/50 px-2 py-0.5 align-middle text-xs text-primary">Featured</span>}
                        </h3>
                        <p className="mt-3 max-w-2xl text-muted-foreground">{p.summary}</p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          <span className="text-foreground">Role: </span>
                          {p.role}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <li key={s} className="rounded-lg border border-border px-3 py-1 text-xs">
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3 sm:items-end">
                        {p.metrics?.map((m) => (
                          <p key={m.label} className="sm:text-right">
                            <span className="block font-display text-2xl text-secondary">{m.value}</span>
                            <span className="text-xs text-muted-foreground">{m.label}</span>
                          </p>
                        ))}
                        {p.url && (
                          <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline">
                            Visit <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
