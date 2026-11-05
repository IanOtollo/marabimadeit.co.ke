"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ease } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 sm:p-8"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl">Start a project</h2>
                <p className="mt-2 text-sm text-muted-foreground">Tell us what you need. We reply within one business day.</p>
              </div>
              <button onClick={onClose} aria-label="Close" className="rounded-xl p-2 hover:bg-muted">
                <X size={20} />
              </button>
            </div>
            <ContactForm autoFocus onNavigate={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
