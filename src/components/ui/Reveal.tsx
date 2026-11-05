"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Section({ id, rail, tip, children, className = "" }: { id?: string; rail?: string; tip?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} data-rail={rail} data-marabi-tip={tip} className={`px-4 py-16 sm:px-6 md:py-24 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">{children}</p>;
}
