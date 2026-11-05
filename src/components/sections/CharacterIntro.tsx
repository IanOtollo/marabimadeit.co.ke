"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { founders } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Cinematic character introductions, scroll-driven. Each brother gets a title-card moment:
 * an outlined name fills the frame, the figure rises out of the dark, the tagline types itself.
 */
export function CharacterIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [act, setAct] = useState(0);
  const [typed, setTyped] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => setAct(p < 0.5 ? 0 : 1));

  // The tagline types itself the moment each brother's frame is on screen: no dead scroll, no blank first view.
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

  // Act one is fully visible from the first pixel; act two cross-fades in at the midpoint.
  const o0 = useTransform(scrollYProgress, [0, 0.42, 0.5], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.5, 0.58, 1], [0, 1, 1]);
  const y0 = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const y1 = useTransform(scrollYProgress, [0.5, 0.62, 1], [60, 0, -20]);
  const opacities = [o0, o1];
  const ys = [y0, y1];

  return (
    <div ref={ref} id="meet" data-rail="Meet the brothers" className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 ruler opacity-30" aria-hidden />
        {founders.map((f, i) => {
          const tone = f.accent === "primary" ? "text-primary" : "text-secondary";
          const left = i === 0;
          const chars = Math.round(typed * f.tagline.length);
          return (
            <motion.article
              key={f.slug}
              style={{ opacity: opacities[i] }}
              aria-hidden={act !== i}
              className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8"
            >
              {/* Outlined name filling the frame */}
              <p
                className="text-outline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[26vw] font-semibold leading-none tracking-tighter"
                aria-hidden
              >
                {f.first.toUpperCase()}
              </p>
              <div
                className={cn(
                  "pointer-events-none absolute top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full opacity-40 blur-3xl",
                  left ? "left-[5%] lg:left-[12%]" : "right-[5%] lg:right-[12%]",
                  f.accent === "primary" ? "bg-primary/40" : "bg-secondary/40",
                )}
                aria-hidden
              />
              <div className={cn("relative mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-2", !left && "lg:[direction:rtl]")}>
                <motion.div style={{ y: ys[i] }} className="relative mx-auto aspect-square w-[min(70vw,58vh)] lg:[direction:ltr]">
                  <Image src={f.image} alt={`${f.name}, ${f.role}`} width={920} height={920} className="h-full w-full object-contain object-bottom drop-shadow-2xl" />
                </motion.div>
                <div className="text-center lg:text-left lg:[direction:ltr]">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">
                    Introducing · 0{i + 1} / 0{founders.length}
                  </p>
                  <h2 className="mt-3 text-5xl tracking-tighter sm:text-6xl lg:text-7xl">{f.name}</h2>
                  <p className={cn("mt-3 text-sm uppercase tracking-widest", tone)}>{f.role}</p>
                  <p className="mt-6 min-h-[2.5em] font-display text-3xl italic leading-tight sm:text-4xl">
                    <span className="sr-only">“{f.tagline}”</span>
                    <span aria-hidden>
                      “{f.tagline.slice(0, act === i ? chars : f.tagline.length)}
                      {act === i && chars < f.tagline.length && <span className={cn("ml-0.5 inline-block h-[0.85em] w-[0.07em] animate-pulse align-baseline", f.accent === "primary" ? "bg-primary" : "bg-secondary")} />}
                      {chars >= f.tagline.length || act !== i ? "”" : ""}
                    </span>
                  </p>
                  <p className="mx-auto mt-6 max-w-md text-muted-foreground lg:mx-0">{f.intro}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground">
          {act === 0 ? "Scroll to meet the next" : "Scroll to continue"}
        </p>
      </div>
    </div>
  );
}
