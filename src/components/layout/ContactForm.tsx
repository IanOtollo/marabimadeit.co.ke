"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { site } from "@/data/site";
import { emailOk, phoneDigits } from "@/data/brief";

type Status = "idle" | "sending" | "sent" | "fallback";

const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-primary";

/** A short contact form: name, email, optional phone and a message of any length. */
export function ContactForm() {
  const router = useRouter();
  const [v, setV] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverErr, setServerErr] = useState("");
  const hp = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof v, x: string) => {
    setV((p) => ({ ...p, [k]: x }));
    if (errors[k]) setErrors(({ [k]: _drop, ...rest }) => rest);
  };

  /** Hand what was typed to the full brief (kept on this device only, never in the address bar), so nothing is retyped. */
  const toBrief = () => {
    try {
      const old = JSON.parse(localStorage.getItem("mmi-brief") || "{}");
      const carry: Record<string, string> = {};
      if (v.name.trim()) carry.name = v.name.trim();
      if (v.email.trim()) carry.email = v.email.trim();
      if (v.phone.trim()) carry.phone = v.phone.trim();
      if (v.message.trim()) carry.description = v.message.trim();
      localStorage.setItem("mmi-brief", JSON.stringify({ ...old, ...carry }));
    } catch {}
    router.push("/start");
  };

  const text = `Name: ${v.name}\nEmail: ${v.email}${v.phone ? `\nPhone / WhatsApp: ${v.phone}` : ""}\n\n${v.message}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (v.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!emailOk(v.email)) errs.email = "Enter a valid email address.";
    if (phoneDigits(v.phone).length < 9) errs.phone = "Enter a phone or WhatsApp number we can reach you on (at least 9 digits).";
    if (!v.message.trim()) errs.message = "Write us a few words about what you need.";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerErr("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, hp: hp.current?.value || "" }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) return setStatus("sent");
      if (j.errors) {
        setErrors(j.errors);
        return setStatus("idle");
      }
      if (j.fallback) return setStatus("fallback");
      setServerErr(j.error || "Something went wrong. Please try again, or message us on WhatsApp.");
      setStatus("idle");
    } catch {
      setStatus("fallback");
    }
  };

  if (status === "sent")
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8" role="status">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check size={24} />
        </div>
        <h2 className="mt-5 text-2xl">Message sent.</h2>
        <p className="mt-3 text-muted-foreground">Thank you, {v.name.trim().split(" ")[0]}. We&apos;ll get back to you.</p>
        <Link href="/start" className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-primary">
          Have a bigger project? Start a project brief
        </Link>
      </div>
    );

  if (status === "fallback")
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8" role="status">
        <h2 className="text-2xl">One last step.</h2>
        <p className="mt-3 text-muted-foreground">Your message is ready. Send it with one of the buttons below and it opens in your own app, already written.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Send on WhatsApp
          </a>
          <a href={`mailto:${site.enquiryTo}?subject=${encodeURIComponent("Message from the website")}&body=${encodeURIComponent(text)}`} className="rounded-xl border border-border px-5 py-3 text-sm transition hover:bg-muted">
            Send by email
          </a>
          <button onClick={() => setStatus("idle")} className="px-3 py-3 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Edit my message
          </button>
        </div>
      </div>
    );

  const inv = (k: string) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `ce-${k}` : undefined });
  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p id={`ce-${k}`} role="alert" className="mt-1.5 text-xs text-danger">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
      <h2 className="text-2xl">Send us a message</h2>
      <p className="mt-2 text-sm text-muted-foreground">Write as much or as little as you like. We&apos;ll get back to you.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm">
            Your name
          </label>
          <input id="c-name" value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={field} placeholder="Full name" {...inv("name")} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm">
            Email
          </label>
          <input id="c-email" type="email" value={v.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={field} placeholder="you@example.com" {...inv("email")} />
          <Err k="email" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-phone" className="mb-1.5 block text-sm">
            Phone or WhatsApp
          </label>
          <input id="c-phone" type="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={field} placeholder="0712 345 678 or +254 712 345 678" {...inv("phone")} />
          <Err k="phone" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="mb-1.5 block text-sm">
            How can we help?
          </label>
          <textarea id="c-message" rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} className={field} placeholder="Tell us what you have in mind." {...inv("message")} />
          <Err k="message" />
        </div>
      </div>
      <input ref={hp} name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      {serverErr && (
        <p role="alert" className="mt-4 text-sm text-danger">
          {serverErr}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} data-marabi-cta className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60">
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        <button type="button" onClick={toBrief} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
          Or fill in the full project brief
        </button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        By sending this you agree we may use these details to reply, as set out in our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
