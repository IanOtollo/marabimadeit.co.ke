"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/lib/scroll";

/** Smooth scrolling on desktop pointer devices only, as on the reference site. */
export function useLenis() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const lenis = new Lenis({ duration: 1.2 });
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
