"use client";

import Link from "next/link";
import { SocialRow } from "@/components/ui/SocialRow";
import { useContact } from "@/components/layout/Shell";
import { founders, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { MarabiHint } from "@/components/bot/MarabiHint";

const LINES = ["We build the web,", "the stores, the systems.", site.tagline];

export function Hero() {
  const { openContact } = useContact();
  return (
    <section data-rail="Top" className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 ruler opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <div data-marabi-info="overview" className="relative mx-auto flex w-full max-w-4xl flex-col items-center py-16 text-center">
        <p className="mb-6 flex items-center gap-3 text-sm uppercase tracking-widest text-muted-foreground">Marabi Made It · Nairobi <MarabiHint topic="overview" label="Ask Marabi what we do" /></p>
        <h1 className="text-5xl tracking-tighter sm:text-6xl lg:text-7xl">
          {LINES.map((l, i) => (
            <span key={l} className={cn("hero-in block", i === 2 && "text-primary")} style={{ animationDelay: `${i * 110}ms` }}>
              {l}
            </span>
          ))}
        </h1>
        <div className="hero-in mt-8 w-full" style={{ animationDelay: "380ms" }}>
          <p className="mx-auto max-w-lg text-lg text-muted-foreground">Websites, e-commerce, custom software and CRM/ERP systems, built properly by two brothers in Nairobi.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              data-marabi-cta
              onClick={() => openContact()}
              className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90"
            >
              Start a project
            </button>
            <Link href="/services" className="rounded-xl border border-border bg-background px-6 py-3 transition hover:bg-muted">
              Our services
            </Link>
          </div>

          <ul className="mx-auto mt-14 grid max-w-xl gap-8 border-t border-border/50 pt-10 sm:grid-cols-2">
            {founders.map((f) => (
              <li key={f.slug}>
                <p className={cn("font-display text-2xl", f.accent === "primary" ? "text-primary" : "text-secondary")}>{f.name}</p>
                <p className="mb-4 mt-1 text-xs uppercase tracking-widest text-muted-foreground">{f.role}</p>
                <SocialRow person={f} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
