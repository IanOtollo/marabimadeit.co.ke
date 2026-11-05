"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn, ease } from "@/lib/utils";
import { useContact } from "./Shell";
import { LocalClock } from "./LocalClock";
import { BotDock } from "@/components/bot/BotDock";

const links = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { openContact } = useContact();
  useEffect(() => setOpen(false), [path]);
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md" aria-label="Primary">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="font-display text-xl tracking-tight">
            {site.short}
          </Link>
          <BotDock />
        </div>
        <ul className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          {links.map((l) => {
            const active = path === l.href || (l.href !== "/" && path.startsWith(l.href + "/"));
            return (
              <li key={l.href}>
                <Link href={l.href} aria-current={active ? "page" : undefined} className={cn("relative transition-colors hover:text-foreground", active && "text-foreground")}>
                  {l.label}
                  {active && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4">
          <LocalClock className="hidden text-xs text-muted-foreground xl:block" />
          <button
            data-marabi-cta
            onClick={() => openContact()}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90"
          >
            Start a project
          </button>
          <button className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t border-border/40 px-4 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-3 font-display text-2xl">
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
