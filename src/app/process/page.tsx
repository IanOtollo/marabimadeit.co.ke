import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ProcessJourney } from "@/components/sections/ProcessJourney";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { MarabiHint } from "@/components/bot/MarabiHint";

export const metadata: Metadata = {
  title: "Our process",
  description: "How Marabi Made It builds: six stages from Discover to Develop further, in the order they happen, with what you get and decide at each one.",
  alternates: { canonical: "/process" },
};

const needFromYou = [
  { t: "One decision-maker", d: "Someone who can approve scope, design and go-live without a committee, so work never waits." },
  { t: "Content and access", d: "Your logo, copy, product data and logins, by the dates in the plan. We help you write what is missing." },
  { t: "Feedback within 3 working days", d: "Short, specific and consolidated. It keeps the timeline honest and the price fixed." },
  { t: "Honesty about constraints", d: "Budget, deadlines, internal politics, legacy systems. The earlier we know, the cheaper it is to design around them." },
];

const guarantees = [
  "Nothing is built before you have signed off the design.",
  "A staging link you can open at any time, not a reveal at the end.",
  "A fixed quote. Changes are priced in writing before we do them.",
  "Source code, credentials and a recorded handover at the end.",
  "30 days of defect cover after launch, included.",
];

export default function ProcessPage() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-24" rail="Process">
        <Reveal>
          <Eyebrow>Our process</Eyebrow>
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">From day zero to launch, and beyond.</h1>
            <MarabiHint topic="process" label="Ask Marabi about the process" />
          </div>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Six stages, in the order they really happen, with what happens at each one. Timing is flexible and agreed per project. Scroll to move through time: at each stage you will see what we do, what you receive, and the decision that is yours.
          </p>
        </Reveal>
      </Section>

      <ProcessJourney />

      <Section className="border-y border-border/50 bg-card/40" rail="What we need from you">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <Eyebrow>Working together</Eyebrow>
            <h2 className="text-4xl sm:text-5xl">What we need from you.</h2>
            <p className="mt-6 text-muted-foreground">A great build is a partnership. These four things are what most often decide whether a project finishes on time.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {needFromYou.map((n, i) => (
              <Reveal key={n.t} delay={(i % 2) * 0.1}>
                <div className="h-full rounded-2xl border border-border/50 bg-card p-6">
                  <p className="font-display text-3xl text-primary tabular-nums">0{i + 1}</p>
                  <h3 className="mt-3 text-xl">{n.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section rail="Our commitments">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>In writing</Eyebrow>
            <h2 className="text-4xl sm:text-5xl">What we commit to.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {guarantees.map((g) => (
                <li key={g} className="flex gap-3 text-lg">
                  <Check size={20} className="mt-1.5 shrink-0 text-secondary" /> {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-16">
          <h2 className="text-4xl sm:text-5xl">Ready to begin stage one?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Discovery is a free call. You leave with clarity, whether or not we end up working together.</p>
          <CtaButton className="mt-8 px-8 py-4">Start a project</CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
