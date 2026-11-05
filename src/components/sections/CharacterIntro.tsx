"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { founders } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Title-card introductions, scroll-driven and purely typographic: the outlined name fills the frame,
 * then role, tagline (typed) and a line about them. One card per founder.
 */
export function CharacterIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [act, setAct] = useState(0);
  const [typed, setTyped] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => setAct(p < 0.5 ? 0 : 1));

  // The tagline types itself the moment each card is on screen: no dead scroll, no blank first view.
  useEffect(() => {
    setTyped(0);
    const len = founders[act].tagline.length;
    let n = 0;
    const id = setInterval(() => {
      n++;
      setTyped(Math.min(1, n / len));
      if (n >= len) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, [act]);

  const o0 = useTransform(scrollYProgress, [0, 0.42, 0.5], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.5, 0.58, 1], [0, 1, 1]);
  const y0 = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const y1 = useTransform(scrollYProgress, [0.5, 0.62, 1], [40, 0, -10]);
  const opacities = [o0, o1];
  const ys = [y0, y1];

  return (
    <div ref={ref} id="meet" data-rail="Meet the brothers" data-marabi-info="team" className="relative h-[190vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 ruler opacity-30" aria-hidden />
        {founders.map((f, i) => {
          const tone = f.accent === "primary" ? "text-primary" : "text-secondary";
          const chars = Math.round(typed * f.tagline.length);
          return (
            <motion.article key={f.slug} data-marabi-info={f.slug} style={{ opacity: opacities[i], pointerEvents: act === i ? "auto" : "none" }} aria-hidden={act !== i} className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <p className="text-outline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[24vw] font-semibold leading-none tracking-tighter" aria-hidden>
                {f.first.toUpperCase()}
              </p>
              <div className={cn("pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl", f.accent === "primary" ? "bg-primary/40" : "bg-secondary/40")} aria-hidden />
              <motion.div style={{ y: ys[i] }} className="relative mx-auto max-w-3xl text-center">
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Introducing · 0{i + 1} / 0{founders.length}
                </p>
                <h2 className="mt-4 text-5xl tracking-tighter sm:text-6xl lg:text-8xl">{f.name}</h2>
                <p className={cn("mt-4 text-sm uppercase tracking-widest", tone)}>{f.role}</p>
                <p className="mt-8 min-h-[2.5em] font-display text-3xl italic leading-tight sm:text-5xl">
                  <span className="sr-only">“{f.tagline}”</span>
                  <span aria-hidden>
                    “{f.tagline.slice(0, act === i ? chars : f.tagline.length)}
                    {act === i && chars < f.tagline.length && <span className={cn("ml-0.5 inline-block h-[0.85em] w-[0.07em] animate-pulse align-baseline", f.accent === "primary" ? "bg-primary" : "bg-secondary")} />}
                    {chars >= f.tagline.length || act !== i ? "”" : ""}
                  </span>
                </p>
                <p className="mx-auto mt-6 max-w-md text-muted-foreground">{f.intro}</p>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
