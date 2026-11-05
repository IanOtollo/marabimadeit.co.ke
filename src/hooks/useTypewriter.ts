"use client";

import { useEffect, useState } from "react";

/** Types `lines` one after another. Returns visible character counts per line. */
export function useTypewriter(lines: string[], start = true) {
  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0));

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(lines.map((l) => l.length));
      return;
    }
    let line = 0;
    let ch = 0;
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      if (line >= lines.length) return;
      ch++;
      const l = line;
      const c = ch;
      setCounts((prev) => prev.map((v, i) => (i === l ? c : v)));
      const typed = lines[line][ch - 1];
      let delay = 38 + Math.random() * 55;
      if (typed === ",") delay += 220;
      if (typed === ".") delay += 380;
      if (ch >= lines[line].length) {
        line++;
        ch = 0;
        delay += 450;
      }
      timer = setTimeout(next, delay);
    };
    timer = setTimeout(next, 400);
    return () => clearTimeout(timer);
  }, [start]); // eslint-disable-line react-hooks/exhaustive-deps

  const done = counts.every((c, i) => c >= lines[i].length);
  const found = counts.findIndex((c, i) => c < lines[i].length);
  const active = done ? lines.length - 1 : found;
  return { counts, active, done };
}
