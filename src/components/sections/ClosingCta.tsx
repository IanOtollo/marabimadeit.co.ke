"use client";

import Link from "next/link";
import { Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";

export function ClosingCta() {
  return (
    <Section rail="Start" className="border-t border-border/50">
      <Reveal className="text-center">
        <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
          Need something built<span className="text-primary">?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">A few quick taps and Marabi packages your brief for the team.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton className="px-8 py-4">Start a project</CtaButton>
          <Link href="/portfolio" className="rounded-xl border border-border bg-background px-8 py-4 transition hover:bg-muted">
            See our portfolio
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
