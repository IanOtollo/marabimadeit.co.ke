import type { Metadata } from "next";
import { Suspense } from "react";
import { BriefForm } from "@/components/brief/BriefForm";
import { Section } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell Marabi Made It about your project in about three minutes. Only a few details are required, and we'll get back to you.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <Section className="pt-8 md:pt-12" rail="Project brief">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted/30" aria-hidden />}>
        <BriefForm />
      </Suspense>
    </Section>
  );
}
