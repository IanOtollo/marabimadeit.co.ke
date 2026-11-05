"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OrbBody } from "./OrbBody";
import { useMarabi } from "./MarabiProvider";

/** The logo's resting place for Marabi 2.0. Empty and dim while the assistant is out; home to a sleeping orb otherwise. */
export function BotDock() {
  const m = useMarabi();
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    m.registerDock(ref.current);
    return () => m.registerDock(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resting = m.asleep || m.hidden;
  return (
    <button
      ref={ref}
      onClick={() => (resting ? m.wake() : m.openChat())}
      aria-label={resting ? "Wake Marabi 2.0, the studio assistant" : "Open Marabi 2.0, the studio assistant"}
      title={m.asleep ? "Marabi is napping. Tap to wake." : m.hidden ? "Bring Marabi back" : "Ask Marabi"}
      className="relative ml-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className={`absolute inset-0 rounded-full border border-dashed ${resting ? "border-border" : "border-primary/50 animate-pulse"}`} />
      <AnimatePresence>
        {resting && (
          <motion.span initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} transition={{ delay: 0.5, duration: 0.3 }} className="relative">
            <OrbBody mood="sleepy" size={14} />
          </motion.span>
        )}
      </AnimatePresence>
      {!resting && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
    </button>
  );
}
