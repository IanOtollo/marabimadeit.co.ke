"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const ID = site.analyticsId;
const KEY = "mmi-consent";

/** Google Analytics 4, loaded only after the visitor clicks Allow on the cookie banner. */
export function Analytics() {
  const [granted, setGranted] = useState(false);
  const [signal, setSignal] = useState(false);

  useEffect(() => {
    if (!ID) return;
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    // Global Privacy Control and Do Not Track count as a refusal
    if (nav.globalPrivacyControl || nav.doNotTrack === "1") setSignal(true);
    try {
      if (localStorage.getItem(KEY) === "granted") setGranted(true);
    } catch {}
    const onChoice = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      setGranted(v === "granted");
      if (v !== "granted") {
        // withdrawn: stop measuring and clear Google's cookies on this site
        (window as unknown as Record<string, boolean>)[`ga-disable-${ID}`] = true;
        document.cookie.split(";").forEach((c) => {
          const n = c.split("=")[0].trim();
          if (n === "_ga" || n.startsWith("_ga_")) document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });
      } else {
        (window as unknown as Record<string, boolean>)[`ga-disable-${ID}`] = false;
      }
    };
    window.addEventListener("mmi-consent", onChoice);
    return () => window.removeEventListener("mmi-consent", onChoice);
  }, []);

  if (!ID || !granted || signal) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ID}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
