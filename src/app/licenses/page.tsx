import type { Metadata } from "next";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Open-source credits",
  description: "The open-source software and fonts that power marabimadeit.co.ke, with their licences.",
};

const items = [
  { name: "Next.js", note: "The React framework this site is built on", lic: "MIT", by: "Vercel, Inc." },
  { name: "React", note: "User interface library", lic: "MIT", by: "Meta Platforms, Inc. and affiliates" },
  { name: "three.js", note: "The 3D ability cards", lic: "MIT", by: "three.js authors" },
  { name: "Framer Motion", note: "Reveals, hover and scroll animation", lic: "MIT", by: "Framer B.V." },
  { name: "Lenis", note: "Smooth scrolling on desktop", lic: "MIT", by: "darkroom.engineering" },
  { name: "Tailwind CSS", note: "Utility-first styling", lic: "MIT", by: "Tailwind Labs, Inc." },
  { name: "Lucide", note: "Icons", lic: "ISC", by: "Lucide Contributors" },
  { name: "clsx and tailwind-merge", note: "Class name utilities", lic: "MIT", by: "Luke Edwards; Dany Castillo" },
  { name: "Jost", note: "Interface and body typeface", lic: "SIL Open Font License 1.1", by: "The Jost Project Authors" },
  { name: "Fraunces", note: "Display typeface", lic: "SIL Open Font License 1.1", by: "The Fraunces Project Authors" },
];

export default function LicensesPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Reveal>
        <Eyebrow>Open source</Eyebrow>
        <h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl">Built on open software.</h1>
        <p className="mt-8 max-w-3xl text-lg text-muted-foreground">
          This site stands on the work of open-source authors. We are grateful to them, and we credit each one here with its licence. The ability-card artwork, portraits, name and signature are ours and are not covered by these licences.
        </p>
      </Reveal>
      <div className="mt-12 overflow-x-auto rounded-2xl border border-border/50">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-card text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Software</th>
              <th className="p-4 font-medium">Used for</th>
              <th className="p-4 font-medium">Author</th>
              <th className="p-4 font-medium">Licence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((i) => (
              <tr key={i.name}>
                <td className="p-4 font-medium">{i.name}</td>
                <td className="p-4 text-muted-foreground">{i.note}</td>
                <td className="p-4 text-muted-foreground">{i.by}</td>
                <td className="p-4">{i.lic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
