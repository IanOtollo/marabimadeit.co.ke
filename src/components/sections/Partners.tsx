"use client";

import { partners, type Partner } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { CtaButton } from "@/components/ui/CtaButton";

const H = 3.5; // rem: the optical height of a standard logo
const MAX_W = 13; // rem: very wide marks are capped so they carry the same visual weight

/** One logo as a silhouette: the SVG is used as a mask over the current text colour, so it follows the theme and turns primary on hover. */
function Mark({ p, hidden = false }: { p: Partner; hidden?: boolean }) {
  const w = Math.min(p.ratio * H, MAX_W);
  const h = w / p.ratio;
  return (
    <li className="flex shrink-0 items-center justify-center" style={{ width: `${Math.max(w, 5)}rem`, height: `${H}rem` }} aria-hidden={hidden || undefined}>
      <span
        role={hidden ? undefined : "img"}
        aria-label={hidden ? undefined : `${p.name} logo`}
        className="block bg-current text-muted-foreground/70 transition-colors duration-500 hover:text-primary"
        style={{ width: `${w}rem`, height: `${h}rem`, WebkitMask: `url(${p.logo}) center / contain no-repeat`, mask: `url(${p.logo}) center / contain no-repeat` }}
      />
    </li>
  );
}

export function Partners() {
  // two identical halves: the track slides exactly half its width, then loops seamlessly
  const half = [...partners, ...partners];
  return (
    <Section id="partners" rail="Partners" info="partners" className="overflow-hidden border-y border-border/50 bg-card/40">
      <Reveal>
        <Eyebrow>Trusted by · in good company</Eyebrow>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Partners and clients.</h2>
          <MarabiHint topic="partners" label="Ask Marabi about our partners" />
        </div>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">Brands we have built with.</p>
      </Reveal>

      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>

      <div className="marquee mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" aria-hidden>
        <ul className="marquee-track flex w-max items-center gap-16 pr-16 sm:gap-24 sm:pr-24">
          {[...half, ...half].map((p, i) => (
            <Mark key={`${p.name}-${i}`} p={p} hidden />
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>Your mark could be next.</span>
        <CtaButton variant="outline" className="px-4 py-2 text-sm">
          Start a project
        </CtaButton>
      </div>
    </Section>
  );
}
