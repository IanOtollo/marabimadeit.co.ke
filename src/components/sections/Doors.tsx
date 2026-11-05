"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { doors, type Door } from "@/data/site";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { useContact } from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

const panel = "rounded-sm border border-black/25 bg-black/10 shadow-[inset_0_2px_5px_rgba(0,0,0,0.30),inset_0_-1px_0_rgba(255,255,255,0.40),0_1px_0_rgba(255,255,255,0.25)]";

/** A real door: frame, raised panels, hinges, knob, keyhole, name plate on the leaf. Its swing is driven by a 0..1 motion value. */
function DoorFace({ d, open }: { d: Door; open: MotionValue<number> }) {
  const primary = d.accent === "primary";
  const tone = primary ? "text-primary" : "text-secondary";
  // full, painted colour: these are bright doors, not dark ones
  const paint = primary
    ? "bg-[linear-gradient(165deg,hsl(var(--primary)),hsl(var(--primary)/0.82)_55%,hsl(var(--primary)/0.68))]"
    : "bg-[linear-gradient(165deg,hsl(var(--secondary)),hsl(var(--secondary)/0.82)_55%,hsl(var(--secondary)/0.68))]";
  const knob = "bg-[radial-gradient(circle_at_30%_28%,hsl(var(--foreground)),hsl(var(--foreground)/0.75)_40%,hsl(var(--muted-foreground)))]";
  const light = primary ? "from-primary/70 via-primary/25" : "from-secondary/70 via-secondary/25";
  // swings away from the viewer, into the room, so the leaf always stays inside its frame
  const rotateY = useTransform(open, [0, 1], [0, 68]);
  const knobTurn = useTransform(open, [0, 0.3], [0, 38]);
  const glow = useTransform(open, [0, 1], [0, 1]);

  return (
    <div className="relative h-full rounded-t-lg border-x-[10px] border-b-0 border-t-[14px] border-foreground/30 bg-background shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]" style={{ perspective: 1500 }}>
      {/* the room behind */}
      <div className={cn("absolute inset-0 overflow-hidden bg-gradient-to-t to-card p-5 pt-8", light)}>
        <motion.div style={{ opacity: glow }}>
          <p className={cn("mb-4 text-xs uppercase tracking-widest", tone)}>Inside</p>
          <ul className="space-y-3 text-sm">
            {d.points.map((p) => (
              <li key={p} className="flex gap-2">
                <Check size={16} className={cn("mt-0.5 shrink-0", tone)} />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-foreground/15 to-transparent" aria-hidden />
      </div>
      {/* the leaf */}
      <motion.div style={{ rotateY, transformOrigin: "left center" }} className="absolute inset-0 border border-black/30 bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]">
        <div className={cn("absolute inset-0 p-4", paint)}>
          <div className="rounded-md border border-black/20 bg-background/85 px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(0,0,0,0.35)]">
            <p className={cn("font-display text-lg leading-none", tone)}>{d.index}</p>
            <h3 className="mt-1 text-lg uppercase leading-tight tracking-wide sm:text-xl">{d.title}</h3>
          </div>
          <div className="mt-4 grid h-[calc(100%-6.5rem)] grid-rows-[1fr_2fr] gap-3 pr-10">
            <div className="grid grid-cols-2 gap-3"><div className={panel} /><div className={panel} /></div>
            <div className="grid grid-cols-2 gap-3"><div className={panel} /><div className={panel} /></div>
          </div>
          {["18%", "48%", "78%"].map((t) => (
            <span key={t} className="absolute left-0 h-8 w-1.5 rounded-r-sm bg-foreground/70" style={{ top: t }} aria-hidden />
          ))}
          <div className="absolute right-3 top-[48%] flex w-10 -translate-y-1/2 flex-col items-center gap-3 rounded-md border border-black/20 bg-background/80 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.35)]" aria-hidden>
            <motion.span style={{ rotate: knobTurn }} className={cn("block h-7 w-7 rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.6),inset_0_-2px_3px_rgba(0,0,0,0.4)]", knob)} />
            <span className="flex flex-col items-center">
              <span className="h-2 w-2 rounded-full bg-black/80" />
              <span className="-mt-px h-2.5 w-0.5 bg-black/80" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DoorCard({ d }: { d: Door }) {
  const reduce = useReducedMotion();
  const { openContact } = useContact();
  const open = useMotionValue(0);
  const [isOpen, setIsOpen] = useState(false);
  const fine = useRef(false);
  useEffect(() => {
    fine.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const swing = (to: 0 | 1) => {
    setIsOpen(to === 1);
    animate(open, to, { duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] });
  };
  const tone = d.accent === "primary" ? "text-primary" : "text-secondary";

  return (
    <div id={d.id} className="w-[78vw] max-w-[22rem] shrink-0 snap-center scroll-mt-24 sm:w-auto sm:max-w-none">
      <button
        onClick={() => swing(isOpen ? 0 : 1)}
        onMouseEnter={() => fine.current && swing(1)}
        onMouseLeave={() => fine.current && swing(0)}
        onFocus={() => swing(1)}
        onBlur={() => swing(0)}
        aria-expanded={isOpen}
        aria-label={`${d.title}. ${isOpen ? "Door open, showing what is inside" : "Open the door"}`}
        className="block h-[26rem] w-full text-left sm:h-[31rem]"
      >
        <DoorFace d={d} open={open} />
      </button>
      <div className="h-2 rounded-b-sm bg-foreground/30 shadow-[0_6px_10px_-2px_rgba(0,0,0,0.45)]" aria-hidden />
      <div className="mt-5 px-1">
        <p className="text-sm text-muted-foreground">{d.blurb}</p>
        <div className="mt-3 flex gap-5 text-sm">
          <Link href={`/services/${d.id}`} className={cn("underline underline-offset-4", tone)}>
            Step inside
          </Link>
          <button onClick={() => openContact({ door: d.id })} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}

export function Doors() {
  return (
    <Section id="doors" rail="Four doors">
      <div data-hint-scene>
        <Reveal>
          <Eyebrow>What we do · one door per discipline</Eyebrow>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Four doors. Pick the one that fits.</h2>
            <MarabiHint topic="websites" label="Ask Marabi about our services" />
          </div>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Hover a door, or tap it, to see what is waiting behind it.</p>
        </Reveal>
      </div>
      {/* the wall: all four doors at once on larger screens; one swipe-snapped row on phones */}
      <div className="-mx-4 mt-12 rounded-2xl border border-border/50 bg-card/40 px-4 pb-10 pt-12 [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_2.5rem,hsl(var(--foreground)/0.025)_2.5rem,hsl(var(--foreground)/0.025)_calc(2.5rem+1px))] sm:mx-0 sm:px-8">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-10 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {doors.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.1} className="shrink-0 sm:shrink">
              <DoorCard d={d} />
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground sm:hidden">Swipe to see all four</p>
      </div>
    </Section>
  );
}
