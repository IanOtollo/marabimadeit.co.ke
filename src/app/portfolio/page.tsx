import type { Metadata } from "next";
import Link from "next/link";
import { doors } from "@/data/site";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects delivered by Marabi Made It, grouped by discipline and year: websites, e-commerce, software and CRM/ERP.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-24" rail="Portfolio" info="work">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
          <div className="flex flex-wrap items-center gap-4"><h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Projects we have delivered.</h1><MarabiHint topic="work" label="Ask Marabi about our portfolio" /></div>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Every project, numbered in the order it was built and grouped by year. Filter by the tools used, or open a service to see its own projects.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {doors.map((d) => (
              <li key={d.id}>
                <Link href={`/services/${d.id}`} className="inline-block rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-primary">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>
      <CaseStudies />
    </>
  );
}
