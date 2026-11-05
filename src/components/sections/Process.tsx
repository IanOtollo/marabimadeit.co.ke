"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { ProcessStrip } from "./ProcessJourney";

export function Process() {
  return (
    <Section id="process" rail="How we work" tip="process" className="border-y border-border/50 bg-card/40">
      <div data-hint-scene>
        <Reveal>
          <Eyebrow>How we work · our life cycle, in order</Eyebrow>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Six stages. Day zero to launch and beyond.</h2>
            <MarabiHint topic="process" label="Ask Marabi how we work" />
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Every project, from a five-page site to an ERP, moves through the same stages in the same order. Hover a stage to see what happens, what you get, and what you decide.
          </p>
        </Reveal>
        <div className="mt-12">
          <ProcessStrip />
        </div>
        <Link href="/process" className="mt-8 inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline">
          Walk through all six stages, week by week <ArrowUpRight size={18} />
        </Link>
      </div>
    </Section>
  );
}
