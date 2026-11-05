"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Counts up to `to` the first time it scrolls into view. Static under reduced motion. */
export function CountUp({ to, duration = 1.6, prefix = "", suffix = "", className }: { to: number; duration?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduce) {
      setV(to);
      return;
    }
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

/** True while the element is on screen. Used to pause loops that nobody is looking at. */
export function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const on = useInView(ref, { margin: "-10% 0px -10% 0px" });
  return [ref, on] as const;
}
