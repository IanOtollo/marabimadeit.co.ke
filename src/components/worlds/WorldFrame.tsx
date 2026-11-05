import Link from "next/link";
import { doors, site, type Door, type ServiceDetail } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { CaseStudies } from "@/components/sections/CaseStudies";
import type { DoorId } from "@/data/projects";

/** The only thing the four worlds share: back link, archive, FAQ, sibling doors, closing CTA, structured data. */
export function WorldFrame({ door, service, children }: { door: Door; service: ServiceDetail; children: React.ReactNode }) {
  const others = doors.filter((d) => d.id !== door.id);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: door.title,
    provider: { "@type": "ProfessionalService", name: site.name, url: `https://${site.domain}` },
    areaServed: "KE",
    description: service.intro,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, faqLd]) }} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link href="/#doors" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← All four doors
        </Link>
      </div>

      {children}

      <CaseStudies door={door.id as DoorId} />

      <Section className="border-y border-border/50 bg-card/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-4xl sm:text-5xl">Straight answers.</h2>
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {service.faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                  {f.q}
                  <span className="text-2xl text-muted-foreground transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Other doors</Eyebrow>
          <div className="grid gap-6 sm:grid-cols-3">
            {others.map((d) => (
              <Link key={d.id} href={`/services/${d.id}`} className="group rounded-2xl border border-border/50 bg-card p-8 transition-shadow hover:shadow-lg">
                <p className={`font-display text-4xl ${d.accent === "primary" ? "text-primary" : "text-secondary"}`}>{d.index}</p>
                <h3 className="mt-3 text-2xl">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.kicker}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal className="rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-16">
          <h2 className="text-4xl sm:text-5xl">Ready to open this door?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Tell us what you need. You will get a straight answer and a written proposal.</p>
          <CtaButton className="mt-8 px-8 py-4">Start a project</CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
