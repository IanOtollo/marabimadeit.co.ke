import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import Link from "next/link";
import { LocalClock } from "@/components/layout/LocalClock";
import { MarabiHint } from "@/components/bot/MarabiHint";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Marabi Made It. Tell us what you want to build and a founder will get back to you quickly.",
};

const steps = [
  { t: "You write to us", d: "Tell us the problem and what you need." },
  { t: "A founder replies, fast", d: "A short call to understand your goals." },
  { t: "You get a written proposal", d: "Scope, plan and a written quote. No obligation to proceed." },
];

export default function ContactPage() {
  return (
    <Section className="pt-16 md:pt-24" info="location">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <div className="flex flex-wrap items-center gap-4"><h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Tell us what you want to build.</h1><MarabiHint topic="location" label="Ask Marabi how to reach us" /></div>
      </Reveal>
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <ul className="space-y-6">
            <li className="flex gap-4"><Mail className="mt-1 text-primary" size={20} /><div><p className="text-sm text-muted-foreground">Email</p><a data-marabi-action="email" href={`mailto:${site.email}`} className="text-lg underline-offset-4 transition-colors hover:text-primary hover:underline" aria-label={`Email ${site.email}`}>{site.email}</a></div></li>
            <li className="flex gap-4"><Phone className="mt-1 text-primary" size={20} /><div><p className="text-sm text-muted-foreground">Phone</p><a data-marabi-action="call" href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-lg underline-offset-4 transition-colors hover:text-primary hover:underline" aria-label={`Call ${site.phone}`}>{site.phone}</a></div></li>
            <li className="flex gap-4"><MapPin className="mt-1 text-primary" size={20} /><div><p className="text-sm text-muted-foreground">Studio</p><p className="text-lg">{site.location}</p></div></li>
            <li className="flex gap-4"><Clock className="mt-1 text-primary" size={20} /><div><p className="text-sm text-muted-foreground">Local time</p><LocalClock className="text-lg" /></div></li>
          </ul>
          <h2 className="mb-6 mt-14 text-2xl">What happens next</h2>
          <ol className="space-y-5">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="font-display text-3xl text-primary tabular-nums">0{i + 1}</span>
                <div><p className="text-lg">{s.t}</p><p className="text-sm text-muted-foreground">{s.d}</p></div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
            <h2 className="text-2xl">Prefer to put it in writing?</h2>
            <p className="mt-3 text-muted-foreground">Our project brief takes about three minutes. Five details are required and the rest is optional. It reaches both founders directly.</p>
            <Link href="/start" className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">
              Open the project brief
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">Or message us on WhatsApp, or call, using the details on the left.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
