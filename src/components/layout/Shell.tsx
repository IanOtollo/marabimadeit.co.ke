"use client";

import { createContext, useContext, useMemo } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { Analytics } from "./Analytics";
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

  return (
    <MarabiProvider>
      <ContactBridge>
        <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-xl bg-primary px-4 py-2 text-primary-foreground">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollRail />
        <Sparks />
        <Orb />
        <MarabiPanel />
        <CookieBanner />
        <Analytics />
      </ContactBridge>
    </MarabiProvider>
  );
}
