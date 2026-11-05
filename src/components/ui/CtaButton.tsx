"use client";

import { useContact } from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

export function CtaButton({ children = "Start a project", variant = "primary", className }: { children?: React.ReactNode; variant?: "primary" | "outline"; className?: string }) {
  const { openContact } = useContact();
  return (
    <button
      data-marabi-cta
      onClick={() => openContact()}
      className={cn(
        "rounded-xl px-6 py-3 font-medium transition active:scale-[0.98]",
        variant === "primary" ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border bg-background hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}
