"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParticleAvatars from "@/components/ui/ParticleAvatars";
import { SocialRow } from "@/components/ui/SocialRow";
import { Typed } from "@/components/ui/Typed";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useContact } from "@/components/layout/Shell";
import { founders, site } from "@/data/site";
import { cn, ease } from "@/lib/utils";

const LINES = ["We build the web,", "the stores, the systems.", site.tagline];

function Avatar({ i }: { i: number }) {
  const f = founders[i];
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.15 }}
      className={cn("order-1 text-center", i === 1 && "order-2 lg:order-3")}
    >
      <div className="relative aspect-square w-full">
        <ParticleAvatars src={f.image} label={`${f.name} rendered as a field of particles that settle into a portrait. Move the cursor over it to disturb them, click to scatter.`} />
      </div>
      <figcaption className="mt-1">
        <p className={cn("font-display text-xl", f.accent === "primary" ? "text-primary" : "text-secondary")}>{f.name}</p>
        <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">{f.role}</p>
      </figcaption>
      <SocialRow person={f} />
    </motion.figure>
  );
}

export function Hero() {
  const { openContact } = useContact();
  const { counts, active, done } = useTypewriter(LINES);
  return (
    <section data-rail="Top" className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 ruler opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[90rem] grid-cols-2 items-center gap-x-4 gap-y-10 py-12 lg:grid-cols-[1fr_1.35fr_1fr] lg:gap-x-8">
        <Avatar i={0} />

        <div className="order-3 col-span-2 text-center lg:order-2 lg:col-span-1">
          <p className="mb-5 text-sm uppercase tracking-widest text-muted-foreground">Marabi Made It · Nairobi</p>
          <h1 className="text-4xl tracking-tighter sm:text-5xl xl:text-6xl">
            {LINES.map((l, i) => (
              <span key={l} className="block">
                <Typed text={l} count={counts[i]} caret={active === i} className={i === 2 ? "text-primary" : undefined} />
              </span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }} className="mt-7">
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              Websites, e-commerce, custom software and CRM/ERP systems, built properly by two brothers in Nairobi.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                data-marabi-cta
                onClick={() => openContact()}
                className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90"
              >
                Start a project
              </button>
              <Link href="/services" className="rounded-xl border border-border bg-background px-6 py-3 transition hover:bg-muted">
                Explore the four doors
              </Link>
            </div>
          </motion.div>
        </div>

        <Avatar i={1} />
      </div>
    </section>
  );
}
