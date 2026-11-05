"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { timeline } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { cn, ease } from "@/lib/utils";
import { MarabiHint } from "@/components/bot/MarabiHint";

function Item({ t, i }: { t: (typeof timeline)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const on = useInView(ref, { margin: "-35% 0px -35% 0px" });
  const seen = useInView(ref, { once: true, margin: "-10% 0px" });
  const left = i % 2 === 0;
  return (
    <li ref={ref} className="relative grid pb-20 last:pb-0 md:grid-cols-2 md:gap-16">
      {/* node on the spine */}
      <span className="absolute left-0 top-3 -translate-x-1/2 md:left-1/2" aria-hidden>
        <span className={cn("relative block h-4 w-4 rounded-full border-2 transition-all duration-500", on ? "scale-125 border-primary bg-primary" : seen ? "border-primary bg-background" : "border-border bg-background")} />
        {on && <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />}
      </span>
      {/* ghost label */}
      <p
        className={cn(
          "text-outline pointer-events-none absolute -top-2 hidden select-none font-display text-8xl font-semibold leading-none tracking-tighter transition-opacity duration-700 md:block lg:text-9xl",
          left ? "left-[calc(50%+4rem)]" : "right-[calc(50%+4rem)] text-right",
          on ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      >
        0{i + 1}
      </p>
      <motion.div
        initial={{ opacity: 0, x: left ? -30 : 30 }}
        animate={seen ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease }}
        className={cn("pl-8 md:pl-0", left ? "md:col-start-1 md:text-right" : "md:col-start-2")}
      >
        <p className={cn("text-sm uppercase tracking-widest transition-colors duration-500", on ? "text-primary" : "text-muted-foreground")}>{t.date}</p>
        <h3 className="mt-2 text-3xl sm:text-4xl">{t.title}</h3>
        <p className={cn("mt-3 max-w-md text-muted-foreground", left && "md:ml-auto")}>{t.text}</p>
      </motion.div>
    </li>
  );
}

export function Timeline() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const head = useTransform(fill, [0, 1], ["0%", "100%"]);

  return (
    <Section id="story" rail="Our story" info="story" className="overflow-hidden">
      <Reveal>
        <Eyebrow>Our story</Eyebrow>
        <div className="flex flex-wrap items-center gap-4"><h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">How we got here.</h2><MarabiHint topic="story" label="Ask Marabi about our story" /></div>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">Five moments, in order. Follow the line.</p>
      </Reveal>
      <ol ref={list} className="relative mt-16 pl-6 md:pl-0">
        {/* the spine: faint track, ruler ticks, and a bright line that draws as you scroll */}
        <div className="absolute bottom-0 left-0 top-0 w-px -translate-x-1/2 bg-border md:left-1/2" aria-hidden />
        <div className="absolute bottom-0 left-0 top-0 w-3 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_1px,transparent_14px)] opacity-60 md:left-1/2" aria-hidden />
        <motion.div className="absolute left-0 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-primary to-secondary md:left-1/2" style={{ height: head }} aria-hidden />
        <motion.span className="absolute left-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_18px_6px_hsl(var(--primary)/0.55)] md:left-1/2" style={{ top: head }} aria-hidden />
        {timeline.map((t, i) => (
          <Item key={t.title} t={t} i={i} />
        ))}
      </ol>
    </Section>
  );
}
