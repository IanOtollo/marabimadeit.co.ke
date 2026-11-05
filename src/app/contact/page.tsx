import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/layout/ContactForm";
import { LocalClock } from "@/components/layout/LocalClock";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Marabi Made It. Tell us what you want to build and we will reply within one business day.",
};

const steps = [
  { t: "You write to us", d: "Tell us the problem and, if you have one, a budget range." },
  { t: "We reply in one business day", d: "A short call to understand your goals, free of charge." },
  { t: "You get a written proposal", d: "Scope, timeline and a fixed price. No obligation to proceed." },
];

export default function ContactPage() {
  return (
    <Section className="pt-16 md:pt-24">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Tell us what you want to build.</h1>
      </Reveal>
      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <ul className="space-y-6">
            <li className="flex gap-4"><Mail className="mt-1 text-primary" size={20} /><div><p className="text-sm text-muted-foreground">Email</p><p className="text-lg">{site.email}</p></div></li>
            <li className="flex gap-4"><Phone className="mt-1 text-primary" size={20} /><div><p className="text-sm text-muted-foreground">Phone</p><p className="text-lg">{site.phone}</p></div></li>
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
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
