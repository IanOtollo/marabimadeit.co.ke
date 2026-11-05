import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Estimator } from "@/components/sections/Estimator";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";

export const metadata: Metadata = {
  title: "Pricing",
  description: "How Marabi Made It prices websites, e-commerce, custom software and CRM/ERP projects: fixed quotes in Kenya Shillings, in writing, before work starts.",
  alternates: { canonical: "/pricing" },
};

const principles = [
  { title: "Fixed quotes, in writing", text: "After a free discovery call you receive a written proposal with scope, timeline and a fixed price. If scope changes, we price the change before doing it." },
  { title: "Shillings, not surprises", text: "Quoted in KES. VAT and third-party costs such as domains, hosting and SMS are listed separately and passed through at cost." },
  { title: "Pay as it progresses", text: "A deposit starts the work and the balance follows milestones, so you only ever pay for progress you can see." },
  { title: "You own what you buy", text: "Design files, code and content are assigned to you on final payment, with full handover and documentation." },
];

const always = ["Free discovery call and written proposal", "Mobile-first, accessible design", "SEO foundations and performance tuning", "Staging site to review as we build", "30 days of post-launch defect cover", "Recorded handover and documentation"];

const faqs = [
  { q: "Why don't you list prices?", a: "A five-page site and a twelve-module ERP are not the same job. Publishing a number would either overcharge the small project or under-quote the large one. We would rather give you an accurate fixed price after a short conversation." },
  { q: "Can I get a rough idea first?", a: "Yes. Use the shaper above to see your project's scale and timeline, add a budget range on the enquiry, and we will tell you straight away whether it is realistic." },
  { q: "Do you do payment plans?", a: "Milestone-based payments are standard. For larger builds we can agree a custom schedule in the proposal." },
  { q: "What about running costs after launch?", a: "Hosting, domains and licences are charged by their providers. We can also offer a monthly maintenance plan covering updates, monitoring and support." },
  { q: "Which payment methods do you accept?", a: "Bank transfer and M-Pesa, to the account shown on the invoice we issue. See our Engagement & Payment Terms for the details." },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-24" rail="Rates">
        <Reveal>
          <Eyebrow>Rates</Eyebrow>
          <h1 className="max-w-4xl text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Clear pricing, quoted in shillings.</h1>
          <p className="mt-8 max-w-3xl text-lg text-muted-foreground">
            Every engagement is scoped and priced in writing before work begins. Shape your project below to see its scale and a realistic timeline, then we turn it into a fixed quote.
          </p>
        </Reveal>
        <div className="mt-14">
          <Estimator compact />
        </div>
      </Section>

      <Section className="border-y border-border/50 bg-card/40" rail="Our approach">
        <Reveal>
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Four principles behind every quote.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <div className="h-full rounded-2xl border border-border/50 bg-card p-8">
                <p className="font-display text-4xl text-primary tabular-nums">0{i + 1}</p>
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section rail="Included">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Always included</Eyebrow>
            <h2 className="text-4xl sm:text-5xl">No add-ons for the basics.</h2>
            <ul className="mt-8 space-y-3">
              {always.map((a) => (
                <li key={a} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-secondary" size={18} /> {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Payment at a glance</Eyebrow>
            <div className="rounded-2xl border border-border/50 bg-card p-8">
              <dl className="space-y-5 text-sm">
                <div><dt className="text-muted-foreground">Deposit</dt><dd className="mt-1 text-lg">50% to begin, unless the proposal says otherwise</dd></div>
                <div><dt className="text-muted-foreground">Balance</dt><dd className="mt-1 text-lg">Tied to milestones, final instalment before go-live</dd></div>
                <div><dt className="text-muted-foreground">Invoices due</dt><dd className="mt-1 text-lg">Within 7 days of issue</dd></div>
                <div><dt className="text-muted-foreground">Methods</dt><dd className="mt-1 text-lg">Bank transfer or M-Pesa</dd></div>
              </dl>
              <Link href="/engagement" className="mt-6 inline-block text-sm text-primary underline-offset-4 hover:underline">
                Read the full Engagement &amp; Payment Terms
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-border/50 bg-card/40" rail="Questions">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="text-4xl sm:text-5xl">About pricing.</h2>
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl">
                  {f.q}
                  <span className="text-2xl text-muted-foreground transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <Reveal className="rounded-2xl border border-border/50 bg-card p-8 text-center sm:p-16">
          <h2 className="text-4xl sm:text-5xl">Get your fixed quote.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">A short call, a written proposal, no obligation.</p>
          <CtaButton className="mt-8 px-8 py-4">Request a quote</CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
