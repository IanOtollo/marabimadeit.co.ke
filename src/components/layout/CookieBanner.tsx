"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/utils";

const KEY = "mmi-consent";

/** Analytics is off until the visitor opts in. "No thanks" is as prominent as "Allow". */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  useEffect(() => {
    const reopen = () => setShow(true);
    window.addEventListener("mmi-open-consent", reopen);
    return () => window.removeEventListener("mmi-open-consent", reopen);
  }, []);
  const choose = (v: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    window.dispatchEvent(new CustomEvent("mmi-consent", { detail: v }));
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease, delay: 2.5 }}
          className="fixed inset-x-4 bottom-4 z-[60] max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg sm:left-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="text-sm">
            We use privacy-friendly analytics only with your consent. Essential storage is always on.{" "}
            <Link href="/cookies" className="underline underline-offset-4 hover:text-primary">
              Cookie Policy
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => choose("granted")} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Allow
            </button>
            <button onClick={() => choose("denied")} className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted">
              No thanks
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
