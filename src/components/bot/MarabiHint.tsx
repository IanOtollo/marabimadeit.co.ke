"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useMarabi } from "./MarabiProvider";

/**
 * A small "?" button. Clicking it sends Marabi 2.0 rushing to the nearest ancestor marked
 * data-hint-scene (or to the button itself) to explain that topic.
 */
export function MarabiHint({ topic, label = "Ask Marabi about this", className }: { topic: string; label?: string; className?: string }) {
  const m = useMarabi();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onClick={() => m.explain(topic, (ref.current?.closest("[data-hint-scene]") as HTMLElement | null) ?? ref.current)}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary active:scale-90",
        className,
      )}
    >
      ?
    </button>
  );
}
