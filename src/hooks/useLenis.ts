"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/lib/scroll";

/** The most one wheel or trackpad event may move the page (px). Hard flicks are capped, then eased out. */
const MAX_STEP = 96;

/**
 * Smooth scrolling everywhere. A violent flick (mouse wheel, trackpad fling or a hard swipe on a phone) is capped
 * and eased out into one steady glide instead of a jump, so the visitor never overshoots what they came to see.
 * Reduced-motion visitors keep the browser's own scrolling.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.085, // how softly the page chases the finger or wheel: lower is silkier
      wheelMultiplier: 0.9,
      allowNestedScroll: true, // chat panel, tables and carousels keep their own scrolling
      syncTouch: true, // phones: Lenis carries the swipe, so a hard flick is smoothed too
      syncTouchLerp: 0.085,
      touchInertiaExponent: 1.5, // a shorter, softer carry after the finger lifts
      virtualScroll: (d) => {
        if (d.event.type === "wheel") d.deltaY = Math.max(-MAX_STEP, Math.min(MAX_STEP, d.deltaY));
        return true;
      },
    });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);
}
