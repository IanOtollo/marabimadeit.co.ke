"use client";

import Link from "next/link";
import { useState } from "react";
import { doors, site } from "@/data/site";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";

const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary";

export function ContactForm({ autoFocus = false, onNavigate, defaultDoor }: { autoFocus?: boolean; onNavigate?: () => void; defaultDoor?: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [phoneErr, setPhoneErr] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const digits = String(f.get("phone") || "").replace(/\D/g, "");
    if (digits.length < 9) {
      setPhoneErr("Enter a phone or WhatsApp number we can reach you on (at least 9 digits).");
      return;
    }
    const subject = `Project enquiry: ${f.get("door")}`;
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone")}\n\n${f.get("message")}`;
    const href = `mailto:${site.enquiryTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(href);
    window.location.href = href; // hands off to the visitor's own mail app; nothing is stored by us
  };

  if (sent)
    return (
      <div className="space-y-4 text-sm">
        <p>Your email app should have opened with the message prefilled. Press send there to complete your enquiry.</p>
        <p className="text-muted-foreground">
          Nothing opened?{" "}
          <a className="underline underline-offset-4 hover:text-primary" href={sent}>
            Open the draft
          </a>{" "}
          or write to {site.email}.
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="name" required autoFocus={autoFocus} placeholder="Your name" className={field} aria-label="Your name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" required placeholder="Email" className={field} aria-label="Email" autoComplete="email" />
        <div>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="Phone / WhatsApp number"
            className={cn(field, phoneErr && "border-danger focus:border-danger")}
            aria-label="Phone or WhatsApp number"
            aria-invalid={!!phoneErr}
            aria-describedby={phoneErr ? "phone-err" : undefined}
            autoComplete="tel"
            onChange={() => phoneErr && setPhoneErr("")}
          />
          {phoneErr && (
            <p id="phone-err" role="alert" className="mt-1.5 text-xs text-danger">
              {phoneErr}
            </p>
          )}
        </div>
      </div>
      <Select name="door" label="Service" options={[...doors.map((d) => d.title), "Not sure yet"]} defaultValue={defaultDoor} />
      <textarea name="message" required rows={5} placeholder="What are you trying to build?" className={field} aria-label="Project description" />
      <p className="text-xs text-muted-foreground">
        By sending this you agree we may use these details to respond to you, as set out in our{" "}
        <Link href="/privacy" onClick={onNavigate} className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
      <button className="w-full rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90">Send enquiry</button>
    </form>
  );
}
