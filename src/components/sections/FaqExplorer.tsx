"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqGroup = { id: string; label: string; items: { q: string; a: string }[] };

export function FaqExplorer({ groups }: { groups: FaqGroup[] }) {
  const [q, setQ] = useState("");
  const [g, setG] = useState("all");
  const term = q.trim().toLowerCase();
  const shown = useMemo(
    () =>
      groups
        .filter((x) => g === "all" || x.id === g)
        .map((x) => ({ ...x, items: x.items.filter((i) => !term || (i.q + " " + i.a).toLowerCase().includes(term)) }))
        .filter((x) => x.items.length),
    [groups, g, term],
  );
  const count = shown.reduce((n, x) => n + x.items.length, 0);

  return (
    <div>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search: M-Pesa, timeline, ownership..."
          aria-label="Search questions"
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-11 pr-4 outline-none transition focus:border-primary"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Question topics">
        {[{ id: "all", label: "All" }, ...groups].map((x) => (
          <button key={x.id} role="tab" aria-selected={g === x.id} onClick={() => setG(x.id)} className={cn("rounded-xl border px-4 py-2 text-sm transition", g === x.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted")}>
            {x.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{count} {count === 1 ? "answer" : "answers"}</p>
      <div className="mt-4 space-y-10">
        {shown.map((x) => (
          <section key={x.id} aria-labelledby={`faq-${x.id}`}>
            <h2 id={`faq-${x.id}`} className="mb-2 text-2xl">{x.label}</h2>
            <div className="divide-y divide-border border-y border-border">
              {x.items.map((i) => (
                <details key={i.q} className="group py-5" open={!!term}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                    {i.q}
                    <span className="text-2xl text-muted-foreground transition group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-muted-foreground">{i.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
        {count === 0 && <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">Nothing matches that yet. Ask Marabi in the corner, or write to us and we will answer directly.</p>}
      </div>
    </div>
  );
}
