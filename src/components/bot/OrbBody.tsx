"use client";

import { cn } from "@/lib/utils";
import type { Mood } from "./MarabiProvider";

const glow: Record<Mood, string> = {
  idle: "bg-primary/55",
  happy: "bg-primary",
  mad: "bg-danger",
  sleepy: "bg-muted-foreground/25",
  excited: "bg-secondary",
  talking: "bg-secondary/80",
  curious: "bg-secondary/70",
  thinking: "bg-secondary/50",
  impressed: "bg-primary",
  concerned: "bg-muted-foreground/40",
  cheer: "bg-primary",
  reading: "bg-secondary/60",
};

/** The orb's visuals only: sphere, orbit ring, face. Pupils follow the --px/--py CSS variables of an ancestor. */
export function OrbBody({ mood, size = 56, className }: { mood: Mood; size?: number; className?: string }) {
  const asleep = mood === "sleepy";
  const sphere = asleep
    ? "bg-[radial-gradient(circle_at_32%_28%,hsl(var(--foreground)/0.5),hsl(var(--muted-foreground))_52%,hsl(var(--muted)))]"
    : "bg-[radial-gradient(circle_at_32%_28%,hsl(var(--foreground)/0.95),hsl(var(--primary))_36%,hsl(var(--secondary))_90%)]";
  const eye = "fill-[hsl(var(--background))]";
  const stroke = "stroke-[hsl(var(--background))]";
  const look = { transform: "translate(var(--px, 0px), var(--py, 0px))" } as const;

  return (
    <span className={cn("relative block", className)} style={{ width: size, height: size }} aria-hidden>
      <span className={cn("absolute -inset-3 rounded-full opacity-60 blur-xl transition-colors duration-500", glow[mood])} />
      <span className={cn("absolute inset-0 rounded-full shadow-[inset_-6px_-8px_14px_rgba(0,0,0,0.45),inset_4px_4px_10px_rgba(255,255,255,0.35)] transition-all duration-500", sphere)} />
      <span className={cn("absolute inset-0 rounded-full bg-danger/55 transition-opacity duration-300", mood === "mad" ? "opacity-100" : "opacity-0")} />
      {!asleep && (
        <svg viewBox="0 0 56 56" className="absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] animate-[spin_16s_linear_infinite] text-foreground/40">
          <circle cx="28" cy="28" r="32" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 6" />
        </svg>
      )}
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full">
        {mood === "happy" && (
          <g className={stroke} strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M14 29 Q20 20 26 29" />
            <path d="M30 29 Q36 20 42 29" />
            <path className="fill-[hsl(var(--background))]" d="M21 37 Q28 47 35 37 Z" />
          </g>
        )}
        {mood === "mad" && (
          <g>
            <circle cx="20" cy="28" r="3.8" className={eye} style={look} />
            <circle cx="36" cy="28" r="3.8" className={eye} style={look} />
            <path d="M12 19 L26 25 M44 19 L30 25" className={stroke} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M22 42 Q28 36 34 42" className={stroke} strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}
        {asleep && (
          <g className={stroke} strokeWidth="2.6" strokeLinecap="round" fill="none">
            <path d="M14 28 H26" />
            <path d="M30 28 H42" />
            <circle cx="28" cy="39" r="2" className="fill-[hsl(var(--background))]" />
          </g>
        )}
        {mood === "thinking" && (
          <g>
            <g style={{ transform: "translate(-2px, -3px)" }}>
              <ellipse cx="20" cy="27" rx="4" ry="5" className={eye} />
              <ellipse cx="36" cy="27" rx="4" ry="5" className={eye} />
            </g>
            <path d="M31 17.5 Q37 13.5 43 16.5" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M24 40 Q28 38.8 32 40.6" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </g>
        )}
        {mood === "impressed" && (
          <g>
            {[20, 36].map((x) => (
              <path key={x} d={`M${x} 20 L${x + 1.7} 25 L${x + 6.5} 27 L${x + 1.7} 29 L${x} 34 L${x - 1.7} 29 L${x - 6.5} 27 L${x - 1.7} 25 Z`} className={eye} />
            ))}
            <path d="M20 37.5 Q28 47 36 37.5 Z" className={eye} />
          </g>
        )}
        {mood === "concerned" && (
          <g>
            <g style={look}>
              <ellipse cx="20" cy="28" rx="4" ry="4.8" className={eye} />
              <ellipse cx="36" cy="28" rx="4" ry="4.8" className={eye} />
            </g>
            <path d="M13 20.5 L25 16 M43 20.5 L31 16" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M23 41.5 Q28 37.5 33 41.5" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </g>
        )}
        {mood === "cheer" && (
          <g className={stroke} strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M14 29 Q20 19 26 29" />
            <path d="M30 29 Q36 19 42 29" />
            <path className="fill-[hsl(var(--background))]" d="M19 36 Q28 49 37 36 Z" />
          </g>
        )}
        {mood === "reading" && (
          <g>
            <g style={{ animation: "mm-scan 1.3s ease-in-out infinite" }}>
              <ellipse cx="20" cy="27" rx="3.8" ry="4.8" className={eye} />
              <ellipse cx="36" cy="27" rx="3.8" ry="4.8" className={eye} />
            </g>
            <path d="M24 39 Q28 41 32 39" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </g>
        )}
        {mood === "curious" && (
          <g>
            <g style={look}>
              <ellipse cx="20" cy="27" rx="4.7" ry="5.8" className={eye} />
              <ellipse cx="36" cy="27" rx="4.7" ry="5.8" className={eye} />
              <circle cx="21.4" cy="24.6" r="1.5" fill="white" opacity="0.9" />
              <circle cx="37.4" cy="24.6" r="1.5" fill="white" opacity="0.9" />
            </g>
            <path d="M13 17.5 Q19 12.5 26 16" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <ellipse cx="28" cy="40" rx="2.3" ry="2.9" className={eye} />
          </g>
        )}
        {(mood === "idle" || mood === "talking" || mood === "excited") && (
          <g>
            <g style={look}>
              <ellipse cx="20" cy="27" rx={mood === "excited" ? 4.8 : 4} ry={mood === "excited" ? 6 : 5} className={eye} />
              <ellipse cx="36" cy="27" rx={mood === "excited" ? 4.8 : 4} ry={mood === "excited" ? 6 : 5} className={eye} />
              <circle cx="21.2" cy="25" r="1.4" fill="white" opacity="0.9" />
              <circle cx="37.2" cy="25" r="1.4" fill="white" opacity="0.9" />
            </g>
            {mood === "talking" ? (
              <ellipse cx="28" cy="39" rx="3.4" ry="2.6" className={cn(eye, "origin-center animate-pulse")} />
            ) : mood === "excited" ? (
              <path d="M22 36 Q28 46 34 36 Z" className={eye} />
            ) : (
              <path d="M24 38 Q28 40.5 32 38" className={stroke} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            )}
          </g>
        )}
      </svg>
      {asleep && <span className="absolute -right-1 -top-3 animate-bounce text-xs font-semibold text-muted-foreground">z</span>}
      {mood === "thinking" && (
        <span className="absolute -right-2 -top-4 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/70" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
      )}
      {(mood === "cheer" || mood === "impressed") &&
        [0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-primary" : "bg-secondary"}`}
            style={{ animation: `mm-burst 1.1s ease-out ${i * 0.08}s infinite`, ["--a" as string]: `${i * 72}deg` }}
          />
        ))}
    </span>
  );
}
