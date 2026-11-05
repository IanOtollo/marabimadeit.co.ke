"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A custom dropdown that matches the site, replacing the browser's native one.
 * Fully keyboard operable (arrows, Enter, Space, Escape, Home/End) and screen-reader friendly.
 * It writes its value into a hidden input so it works inside an ordinary <form>.
 */
export function Select({ name, options, defaultValue, label, className }: { name: string; options: string[]; defaultValue?: string; label: string; className?: string }) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState(defaultValue && options.includes(defaultValue) ? defaultValue : options[0]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [up, setUp] = useState(false);

  const show = () => {
    // open upward when there is not enough room below
    const r = root.current?.getBoundingClientRect();
    setUp(!!r && window.innerHeight - r.bottom < 280 && r.top > 280);
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (o: string) => {
    setValue(o);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  // keep the highlighted option in view while arrowing through a long list
  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation(); // close the list, not the whole dialog
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(options[active]);
    } else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div ref={root} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3 text-left text-sm outline-none transition",
          open ? "border-primary" : "border-border hover:border-foreground/30 focus-visible:border-primary",
        )}
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={16} className={cn("shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute left-0 right-0 z-30 max-h-60 overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-2xl",
            up ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {options.map((o, i) => (
            <li
              key={o}
              id={`${id}-${i}`}
              role="option"
              aria-selected={o === value}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(o)}
              className={cn("flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors", i === active ? "bg-muted" : "", o === value && "text-primary")}
            >
              <span>{o}</span>
              {o === value && <Check size={15} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
