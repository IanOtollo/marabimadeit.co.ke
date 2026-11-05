"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function LocalClock({ className }: { className?: string }) {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timezone }).format(new Date()));
    f();
    const id = setInterval(f, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      Nairobi {t || "--:--"} EAT
    </span>
  );
}
