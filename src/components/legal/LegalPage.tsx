"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Info } from "lucide-react";
import { site } from "@/data/site";
import type { LegalDoc } from "@/data/legal";
import { cn } from "@/lib/utils";

/**
 * Ordered policy list. Kept local (rather than imported from the data module) so the client
 * bundle for a legal page does not carry the text of all seven documents.
 * Keep in sync with `legalList` in src/data/legal.ts.
 */
const POLICIES = [
  { slug: "terms", title: "Terms of Service" },
  { slug: "privacy", title: "Privacy Policy" },
  { slug: "cookies", title: "Cookie Policy" },
  { slug: "engagement", title: "Engagement & Payment Terms" },
  { slug: "acceptable-use", title: "Acceptable Use Policy" },
  { slug: "security", title: "Security & Responsible Disclosure" },
  { slug: "accessibility", title: "Accessibility Statement" },
] as const;

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

function readingMinutes(doc: LegalDoc) {
  let n = words(doc.intro);
  doc.glance?.forEach((g) => (n += words(g)));
  doc.sections.forEach((s) => {
    n += words(s.title);
    s.clauses?.forEach((c) => (n += words(c)));
    s.definitions?.forEach((d) => (n += words(d.term) + words(d.meaning)));
    s.table?.head.forEach((h) => (n += words(h)));
    s.table?.rows.forEach((r) => r.forEach((c) => (n += words(c))));
    if (s.note) n += words(s.note);
  });
  return Math.max(1, Math.round(n / 200));
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const [active, setActive] = useState(doc.sections[0]?.id ?? "");
  const minutes = useMemo(() => readingMinutes(doc), [doc]);
  const idx = POLICIES.findIndex((p) => p.slug === doc.slug);
  const prev = idx > 0 ? POLICIES[idx - 1] : null;
  const next = idx >= 0 && idx < POLICIES.length - 1 ? POLICIES[idx + 1] : null;

  // Scroll-spy: highlight the section currently under the top third of the viewport.
  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [doc]);

  const toc = (
    <ol className="space-y-1 text-sm">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            aria-current={active === s.id ? "location" : undefined}
            className={cn(
              "flex gap-2 rounded-lg px-3 py-1.5 transition-colors",
              active === s.id ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="w-5 shrink-0 tabular-nums">{i + 1}.</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <article className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[18rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
          <details className="rounded-2xl border border-border bg-card p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium">Contents ({doc.sections.length} sections)</summary>
            <div className="mt-3">{toc}</div>
          </details>
          <div className="hidden lg:block">
            <p className="mb-3 px-3 text-sm uppercase tracking-widest text-muted-foreground">Contents</p>
            {toc}
          </div>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Legal</p>
          <h1 className="mt-3 text-5xl tracking-tighter sm:text-6xl">{doc.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>Last updated {site.updated}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden /> {minutes} min read
            </span>
          </p>
          <p className="mt-8 text-lg leading-relaxed">{doc.intro}</p>

          {doc.glance && (
            <section aria-labelledby="glance" className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 id="glance" className="text-xl">
                At a glance
              </h2>
              <ul className="mt-4 space-y-3">
                {doc.glance.map((g) => (
                  <li key={g} className="flex gap-3 text-muted-foreground">
                    <Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">This summary is for convenience. The full text below is what applies.</p>
            </section>
          )}

          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mt-14 scroll-mt-28">
              <h2 className="text-2xl sm:text-3xl">
                <span className="mr-2 text-muted-foreground/70 tabular-nums">{i + 1}.</span>
                {s.title}
              </h2>

              {s.definitions && (
                <dl className="mt-5 divide-y divide-border rounded-xl border border-border">
                  {s.definitions.map((d) => (
                    <div key={d.term} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4">
                      <dt className="font-medium">{d.term}</dt>
                      <dd className="text-muted-foreground">{d.meaning}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {s.clauses && (
                <ol className="mt-5 space-y-4">
                  {s.clauses.map((c, j) => (
                    <li key={j} className="flex gap-4 leading-relaxed text-muted-foreground">
                      <span className="w-10 shrink-0 tabular-nums text-foreground/60">
                        {i + 1}.{j + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ol>
              )}

              {s.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[34rem] text-left text-sm">
                    <thead className="bg-card text-foreground">
                      <tr>
                        {s.table.head.map((h) => (
                          <th key={h} scope="col" className="p-3 font-medium sm:p-4">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border align-top text-muted-foreground">
                      {s.table.rows.map((r, ri) => (
                        <tr key={ri}>
                          {r.map((cell, ci) => (
                            <td key={ci} className={cn("p-3 sm:p-4", ci === 0 && "font-medium text-foreground")}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s.note && (
                <aside className="mt-6 flex gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed">
                  <Info size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <p>{s.note}</p>
                </aside>
              )}
            </section>
          ))}

          <nav aria-label="Previous and next policy" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/${prev.slug}`} className="group rounded-2xl border border-border p-5 transition-colors hover:bg-muted">
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <ArrowLeft size={14} aria-hidden /> Previous
                </span>
                <span className="mt-2 block font-display text-lg group-hover:text-primary">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/${next.slug}`} className="group rounded-2xl border border-border p-5 text-right transition-colors hover:bg-muted">
                <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Next <ArrowRight size={14} aria-hidden />
                </span>
                <span className="mt-2 block font-display text-lg group-hover:text-primary">{next.title}</span>
              </Link>
            )}
          </nav>

          <nav aria-label="Related policies" className="mt-10">
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Related policies</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {POLICIES.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    aria-current={p.slug === doc.slug ? "page" : undefined}
                    className={cn(
                      "inline-block rounded-xl border px-4 py-2 text-sm transition-colors",
                      p.slug === doc.slug ? "border-primary/50 bg-muted text-primary" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Questions about any policy: <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </nav>
        </div>
      </div>
    </article>
  );
}
