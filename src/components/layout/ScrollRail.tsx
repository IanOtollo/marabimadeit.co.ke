"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToY } from "@/lib/scroll";

const TICKS = 31;

type Mark = { label: string; at: number };

/**
 * A permanent ruler down the right edge. It shows where you are, marks each section,
 * magnifies under the cursor like a dock, jumps on click and scrubs the page when dragged.
 * The chevron at the top is the way back to the start, always one tap away.
 */
export function ScrollRail() {
  const path = usePathname();
  const rail = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const dragging = useRef(false);
  const labelTimer = useRef<ReturnType<typeof setTimeout>>();

  const measure = useCallback(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));
    setMarks(
      els
        .map((e) => ({ label: e.dataset.rail || "", at: Math.min(1, Math.max(0, (e.getBoundingClientRect().top + window.scrollY - 80) / max)) }))
        .sort((a, b) => a.at - b.at),
    );
    setP(Math.min(1, window.scrollY / max));
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setP(Math.min(1, window.scrollY / max));
        setShowLabel(true);
        clearTimeout(labelTimer.current);
        labelTimer.current = setTimeout(() => setShowLabel(false), 1400);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 2500);
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      setTimeout(measure, 300);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      clearTimeout(t);
      clearTimeout(t2);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [measure, path]);

  const ratioAt = (clientY: number) => {
    const r = rail.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientY - r.top) / r.height));
  };
  const goto = (ratio: number, immediate = false) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollToY(ratio * max, { immediate });
  };

  const current = [...marks].reverse().find((m) => m.at <= p + 0.001);
  const pct = Math.round(p * 100);
  const hoverRatio = hover === null ? null : hover / (TICKS - 1);
  const hoverMark = hoverRatio === null ? null : marks.find((m) => Math.abs(m.at - hoverRatio) < 0.045);

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[52] flex flex-col-reverse items-center gap-3 sm:bottom-auto sm:right-3 sm:top-1/2 sm:-translate-y-1/2" aria-label="Page position">
      <button
        onClick={() => scrollToY(0, { duration: 1.6 })}
        aria-label="Back to the top"
        className={cn(
          "pointer-events-auto group relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary active:scale-90",
          p > 0.03 ? "opacity-100" : "opacity-60 max-sm:pointer-events-none max-sm:opacity-0",
        )}
      >
        <ChevronUp size={16} className={cn("transition-transform duration-300 group-hover:-translate-y-0.5", p > 0.02 && "animate-bounce")} />
        <span className="absolute -left-12 hidden text-[10px] uppercase tracking-widest opacity-0 transition group-hover:opacity-100 sm:block">Top</span>
      </button>

      <div
        ref={rail}
        className="pointer-events-auto relative hidden h-[min(52vh,28rem)] w-8 cursor-grab sm:block touch-none select-none active:cursor-grabbing"
        onPointerMove={(e) => {
          const r = ratioAt(e.clientY);
          setHover(Math.round(r * (TICKS - 1)));
          if (dragging.current) goto(r, true);
        }}
        onPointerLeave={() => !dragging.current && setHover(null)}
        onPointerDown={(e) => {
          dragging.current = true;
          rail.current!.setPointerCapture(e.pointerId);
          goto(ratioAt(e.clientY), true);
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          rail.current!.releasePointerCapture(e.pointerId);
          if (e.pointerType !== "mouse") setHover(null);
        }}
        role="slider"
        aria-label="Scroll position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={`${pct}% of the page${current ? `, ${current.label}` : ""}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") goto(Math.max(0, p - 0.05));
          if (e.key === "ArrowDown") goto(Math.min(1, p + 0.05));
          if (e.key === "Home") goto(0);
          if (e.key === "End") goto(1);
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: TICKS }, (_, i) => {
            const r = i / (TICKS - 1);
            const isMark = marks.some((m) => Math.abs(m.at - r) < 0.5 / (TICKS - 1));
            const dCur = Math.abs(r - p);
            const dHov = hover === null ? 1 : Math.abs(i - hover) / (TICKS - 1);
            const mag = Math.max(Math.exp(-(dCur * dCur) / 0.0012) * 0.9, Math.exp(-(dHov * dHov) / 0.003));
            const len = 8 + (isMark ? 8 : 0) + mag * 14;
            const passed = r <= p + 0.001;
            return (
              <span key={i} className="flex h-0 items-center justify-end">
                <span
                  className={cn("block h-px rounded-full transition-colors duration-200", passed ? "bg-primary" : "bg-foreground/25", isMark && !passed && "bg-foreground/50")}
                  style={{ width: len, transition: "width 120ms ease-out" }}
                />
              </span>
            );
          })}
        </div>
        {/* position marker */}
        <div className="absolute right-0 flex -translate-y-1/2 items-center" style={{ top: `${p * 100}%` }}>
          {(showLabel || hover !== null) && <span className="mr-1.5 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-primary-foreground">{pct}</span>}
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
        </div>
        {/* hover / current label */}
        {(hover !== null || showLabel) && (
          <div
            className="pointer-events-none absolute right-full mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border bg-card/95 px-2.5 py-1 text-xs shadow-lg backdrop-blur"
            style={{ top: `${(hoverRatio ?? p) * 100}%` }}
          >
            {hover !== null ? hoverMark?.label || `${Math.round((hoverRatio ?? 0) * 100)}%` : current?.label || "Start"}
          </div>
        )}
      </div>
    </div>
  );
}
