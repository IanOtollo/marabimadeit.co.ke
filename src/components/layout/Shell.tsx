"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Launch } from "./Launch";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { ContactModal } from "./ContactModal";
import { ScrollRail } from "./ScrollRail";
import { MarabiProvider, useMarabi } from "@/components/bot/MarabiProvider";
import { Orb, Sparks } from "@/components/bot/Orb";
import { MarabiPanel } from "@/components/bot/MarabiPanel";

type ContactCtx = { openContact: (preset?: { door?: string; note?: string }) => void };
const Ctx = createContext<ContactCtx>({ openContact: () => undefined });
export const useContact = () => useContext(Ctx);

/** Every "Start a project" button in the site opens Marabi's guided brief. */
function ContactBridge({ children }: { children: React.ReactNode }) {
  const m = useMarabi();
  const value = useMemo<ContactCtx>(() => ({ openContact: (p) => m.openStart(p) }), [m]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function Shell({ children }: { children: React.ReactNode }) {
  useLenis();
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const done = useCallback(() => setLoading(false), []);
  const full = useCallback(() => setContactOpen(true), []);

  return (
    <MarabiProvider onFullForm={full}>
      <ContactBridge>
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-xl bg-primary px-4 py-2 text-primary-foreground">
          Skip to content
        </a>
        <AnimatePresence>{loading && <Launch onDone={done} />}</AnimatePresence>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollRail />
        <Sparks />
        <Orb />
        <MarabiPanel />
        <CookieBanner />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </ContactBridge>
    </MarabiProvider>
  );
}
