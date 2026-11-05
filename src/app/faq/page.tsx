import type { Metadata } from "next";
import { doors, services, site } from "@/data/site";
import { FaqExplorer, type FaqGroup } from "@/components/sections/FaqExplorer";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { MarabiHint } from "@/components/bot/MarabiHint";

export const metadata: Metadata = {
  title: "Questions",
  description: "Straight answers about working with Marabi Made It: process, M-Pesa, ownership, support and more.",
  alternates: { canonical: "/faq" },
};

const general: FaqGroup = {
  id: "general",
  label: "Working with us",
  items: [
    { q: "How do I start?", a: "Tap Start a project and answer five quick questions, or write to us directly. You get a reply within one business day, then a free discovery call and a written proposal with a fixed quote." },
    { q: "Where are you based, and who do you work with?", a: `We are based in ${site.location} and work with clients across Kenya and beyond, by call, WhatsApp, email or in person.` },
    { q: "Who will actually build my project?", a: "The two principals: Aineah Marabi, Founder and Lead Software Developer, and Ian Otollo, Co-Founder and Developer. We take on a limited number of projects so you are never handed to a stranger." },
    { q: "Do you sign NDAs?", a: "Yes, before you share anything sensitive. Confidentiality is also covered in our Terms of Service." },
    { q: "How and when do I pay?", a: "A deposit starts the work and the balance follows milestones. We accept bank transfer and M-Pesa to the account on the invoice we issue. Full detail is in the Engagement and Payment Terms." },
    { q: "What if I only need a small change to something existing?", a: "We take on improvements and rebuilds as well as new builds. We start with a short review of what exists and tell you honestly whether to repair, refactor or rebuild." },
  ],
};

const groups: FaqGroup[] = [general, ...doors.map((d) => ({ id: d.id, label: d.title, items: services[d.id].faqs }))];

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Section className="pt-16 md:pt-24" rail="Questions" info="start">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <div className="flex flex-wrap items-center gap-4"><h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Straight answers.</h1><MarabiHint topic="start" label="Ask Marabi a question" /></div>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">Search every question we get asked, or filter by topic. Still stuck? Ask Marabi in the corner.</p>
        </Reveal>
        <div className="mt-12 max-w-4xl">
          <FaqExplorer groups={groups} />
        </div>
        <Reveal className="mt-16 rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-14">
          <h2 className="text-3xl sm:text-4xl">Did not find yours?</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Ask us directly. A real person replies within one business day.</p>
          <CtaButton className="mt-6">Ask us</CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
