"use client";

import dynamic from "next/dynamic";
import { founders } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";

// three.js is heavy and below the fold: load it only when needed.
const AbilityCard3D = dynamic(() => import("@/components/ui/AbilityCard3D"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[28rem] w-full max-w-sm animate-pulse rounded-2xl bg-muted/40" aria-hidden />,
});

export function FounderCards({ heading = true }: { heading?: boolean }) {
  return (
    <Section id="cards" rail="The two behind it" info="team">
      {heading && (
        <Reveal>
          <Eyebrow>Ability cards</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">The two behind the work.</h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tilt them, flip them, spin them. Every project you hire us for is built by these two, start to finish.
          </p>
        </Reveal>
      )}
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-2">
        {founders.map((f, i) => (
          <Reveal key={f.slug} delay={i * 0.1}>
            <AbilityCard3D person={f} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
