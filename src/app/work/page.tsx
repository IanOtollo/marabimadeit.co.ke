import type { Metadata } from "next";
import Link from "next/link";
import { doors } from "@/data/site";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Marabi Made It, serialised and grouped by door and year: websites, e-commerce, software and CRM/ERP.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-24" rail="Work">
        <Reveal>
          <Eyebrow>Work</Eyebrow>
          <h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">The case files.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Every project we have shipped, numbered in the order it was built and grouped by year. Filter by the tools used, or open a door to see its own files.
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
