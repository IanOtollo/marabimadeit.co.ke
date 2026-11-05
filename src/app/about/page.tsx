import type { Metadata } from "next";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { CharacterIntro } from "@/components/sections/CharacterIntro";
import { FounderCards } from "@/components/sections/FounderCards";
import { Timeline } from "@/components/sections/Timeline";
import { Process } from "@/components/sections/Process";
import { Partners } from "@/components/sections/Partners";
import { MarabiHint } from "@/components/bot/MarabiHint";

export const metadata: Metadata = {
  title: "About",
  description: "Marabi Made It is a Nairobi studio run by two brothers, Ian Otollo and Aineah Marabi. Meet the people behind every project.",
};

const values = [
  { title: "Say it plainly", text: "No jargon to hide behind. Scope, price and timeline in writing, in language you would use yourself." },
  { title: "Own what we ship", text: "We stay accountable after launch. If something we built breaks, it is our problem first." },
  { title: "Keep you in control", text: "Your code, your accounts, your data. Everything handed over, documented, with nothing held hostage." },
  { title: "Build for Kenya first", text: "M-Pesa, patchy connections, small screens and real budgets are design constraints, not afterthoughts." },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24" info="story">
        <Reveal>
          <Eyebrow>About Marabi Made It</Eyebrow>
          <div className="flex flex-wrap items-center gap-4"><h1 className="max-w-5xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Two brothers. One studio. One signature.</h1><MarabiHint topic="team" label="Ask Marabi about the team" /></div>
          <p className="mt-8 max-w-3xl text-lg text-muted-foreground">
            Marabi Made It is a Nairobi studio that builds websites, e-commerce stores, custom software and CRM/ERP systems. We keep the team small on purpose: the people you meet at the start are the people who design, build and support your work.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            The name says it: Marabi made it. We put it on every project because it is a promise as much as a signature. The job gets finished, properly, and you can see it.
          </p>
        </Reveal>
      </Section>
      <CharacterIntro />
      <FounderCards heading={false} />
      <Section className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>How we think</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Four commitments.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.1}>
              <div className="h-full rounded-2xl border border-border/50 bg-card p-8">
                <p className="font-display text-4xl text-primary tabular-nums">0{i + 1}</p>
                <h3 className="mt-4 text-2xl">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Timeline />
      <Process />
      <Partners />
      <Section>
        <Reveal className="rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-16">
          <h2 className="text-4xl sm:text-5xl">Let us build something.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Tell us the problem. We will tell you honestly whether and how we can solve it.</p>
          <CtaButton className="mt-8 px-8 py-4">Start a project</CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
