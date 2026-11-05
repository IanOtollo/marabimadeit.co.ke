import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { doors, services } from "@/data/site";
import { Doors } from "@/components/sections/Doors";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { MarabiHint } from "@/components/bot/MarabiHint";

export const metadata: Metadata = {
  title: "Services",
  description: "Four doors: websites and portfolios, e-commerce, custom software, and CRM/ERP systems, built by Marabi Made It in Nairobi.",
  alternates: { canonical: "/services" },
};

const compare = [
  { id: "websites", best: "You need to be found, trusted and contacted", weeks: "4 to 6", team: "Strategy, design, build", pick: "Credibility and leads" },
  { id: "ecommerce", best: "You sell products and want M-Pesa and cards", weeks: "8 to 10", team: "Design, build, payments, ops", pick: "Orders and revenue" },
  { id: "software", best: "Your process does not fit an off-the-shelf tool", weeks: "8 to 16", team: "Product, engineering, QA", pick: "Efficiency and control" },
  { id: "crm-erp", best: "Customers, stock and money live in different places", weeks: "8 to 12", team: "Analysis, config, migration, training", pick: "One view of the business" },
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-0 pt-16 md:pt-24" rail="Services">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Four doors. One studio behind all of them.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Whatever you are building, it starts at one of these doors. Hover or tap a door to open it, or jump straight to the one you need.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {doors.map((d) => (
              <li key={d.id}>
                <Link href={`/services/${d.id}`} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-primary">
                  {d.title} <ArrowUpRight size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Doors />

      <Section className="border-y border-border/50 bg-card/40" rail="Which door?">
        <div data-hint-scene>
          <Reveal>
            <Eyebrow>Which door is yours?</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="max-w-3xl text-4xl sm:text-5xl">Side by side.</h2>
              <MarabiHint topic="start" label="Ask Marabi which door fits" />
            </div>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border/50">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="p-4 font-medium">Door</th>
                  <th className="p-4 font-medium">Choose it when</th>
                  <th className="p-4 font-medium">Typical timeline</th>
                  <th className="p-4 font-medium">Who is involved</th>
                  <th className="p-4 font-medium">You gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border align-top">
                {compare.map((c) => {
                  const d = doors.find((x) => x.id === c.id)!;
                  return (
                    <tr key={c.id} className="transition-colors hover:bg-muted/40">
                      <td className="p-4">
                        <Link href={`/services/${c.id}`} className={`font-display text-lg underline-offset-4 hover:underline ${d.accent === "primary" ? "text-primary" : "text-secondary"}`}>
                          {d.index} {d.title}
                        </Link>
                      </td>
                      <td className="p-4 text-muted-foreground">{c.best}</td>
                      <td className="p-4 tabular-nums">{c.weeks} weeks</td>
                      <td className="p-4 text-muted-foreground">{c.team}</td>
                      <td className="p-4 text-muted-foreground">{c.pick}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section rail="Not sure?">
        <Reveal className="grid gap-6 md:grid-cols-3">
          {Object.values(services).slice(0, 3).map((s, i) => (
            <div key={s.slug} className="rounded-2xl border border-border/50 bg-card p-8">
              <p className="font-display text-4xl text-primary tabular-nums">0{i + 1}</p>
              <p className="mt-4 text-lg">{s.faqs[0].q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.faqs[0].a}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-10 rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-14">
          <h2 className="text-4xl sm:text-5xl">Not sure which door?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">Tell Marabi what you are trying to achieve. You will get an honest answer, even if it is a smaller door than you expected.</p>
          <CtaButton className="mt-8 px-8 py-4">Start a project</CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
