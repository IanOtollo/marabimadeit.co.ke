"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { budgetOptions, composeBrief, emptyBrief, examples, guessService, phoneDigits, scopeOptions, serviceLabel, serviceOptions, timingOptions, validate, type BriefData, type ServiceId } from "@/data/brief";
import { site } from "@/data/site";
import { Select } from "@/components/ui/Select";
import { MarabiHint } from "@/components/bot/MarabiHint";
import { cn } from "@/lib/utils";

const KEY = "mmi-brief";
const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary";

function Tag({ optional }: { optional?: boolean }) {
  return <span className="text-xs font-normal text-muted-foreground">{optional ? "Optional" : "Required"}</span>;
}

function Field({ id, label, optional, error, hint, children }: { id: string; label: string; optional?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="mb-1.5 flex items-center gap-2 text-sm font-medium">
        {label} <Tag optional={optional} />
      </label>
      {children}
      {error ? (
        <p id={`e-${id}`} role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function Part({ n, title, why, optional, info, hint, children }: { n: string; title: string; why: string; optional?: boolean; info: string; hint: string; children: React.ReactNode }) {
  return (
    <section data-marabi-info={info} data-hint-scene className="border-t border-border/60 pt-9 first:border-t-0 first:pt-0">
      <header className="mb-6 flex items-start gap-4">
        <span className="font-display text-3xl tabular-nums text-primary">{n}</span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl">{title}</h2>
            {optional && <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">Optional</span>}
            <MarabiHint topic={info} label={hint} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{why}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

const chip = (on: boolean) =>
  cn("rounded-xl border px-4 py-2.5 text-sm transition active:scale-[0.98]", on ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground");

export function BriefForm() {
  const params = useSearchParams();
  const [d, setD] = useState<BriefData>(emptyBrief);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [ref, setRef] = useState("");
  const [restored, setRestored] = useState(false);
  const [skipGuess, setSkipGuess] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const hp = useRef<HTMLInputElement>(null);

  // restore a saved draft, then apply anything handed over from the assistant or a service page
  useEffect(() => {
    let draft: Partial<BriefData> = {};
    try {
      draft = JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {}
    const next: BriefData = { ...emptyBrief, ...draft };
    const svc = params.get("service");
    const note = params.get("note");
    if (svc && serviceOptions.some((s) => s.id === svc)) next.service = svc as ServiceId;
    if (note && !next.description) next.description = note.slice(0, 1000);
    setD(next);
    setRestored(Object.values(draft).some((v) => (Array.isArray(v) ? v.length > 0 : !!v)));
  }, [params]);

  // autosave on this device only, until the brief is sent
  useEffect(() => {
    if (status !== "idle") return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(d));
      } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [d, status]);

  const set = <K extends keyof BriefData>(k: K, v: BriefData[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    if (errors[k as string]) setErrors(({ [k as string]: _drop, ...rest }) => rest);
  };
  const toggleScope = (s: string) => set("scope", d.scope.includes(s) ? d.scope.filter((x) => x !== s) : [...d.scope, s]);

  const missing = Object.keys(validate(d));
  const done = 5 - missing.length;
  const guess = !d.service && d.description.trim().length > 14 && !skipGuess ? guessService(d.description) : null;
  const needs = scopeOptions[(d.service || "unsure") as ServiceId];
  const message = composeBrief(d, ref || undefined);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(d);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      window.dispatchEvent(new Event("mmi-brief-error"));
      const el = document.getElementById(first === "service" ? "f-service-0" : `f-${first}`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setStatus("sending");
    setServerErr("");
    try {
      const res = await fetch("/api/brief", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...d, hp: hp.current?.value || "" }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) {
        setRef(j.ref);
        setStatus("sent");
        window.dispatchEvent(new Event("mmi-brief-sent"));
        try {
          localStorage.removeItem(KEY);
        } catch {}
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (j.errors) {
        setErrors(j.errors);
        setStatus("idle");
        return;
      }
      if (j.fallback) {
        setStatus("fallback"); // email not set up or down: hand over by WhatsApp / email instead
        return;
      }
      setServerErr(j.error || "Something went wrong. Please try again, or message us on WhatsApp.");
      setStatus("idle");
    } catch {
      setStatus("fallback"); // offline or blocked: hand the brief over another way rather than lose it
    }
  };

  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const mail = `mailto:${site.enquiryTo}?subject=${encodeURIComponent(`Project brief: ${serviceLabel(d.service)}`)}&body=${encodeURIComponent(message)}`;

  if (status === "sent")
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8 sm:p-12" role="status">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check size={24} />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl">Brief received.</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you, {d.name.trim().split(" ")[0]}. Your reference is <span className="font-medium text-foreground">{ref}</span>. Quote it if you contact us about this project.
        </p>
        <ol className="mt-8 space-y-4">
          {[
            ["A founder replies", "Aineah or Ian reads your brief personally and gets back to you quickly, by phone, WhatsApp or email."],
            ["A first call", "To understand your goals and answer your questions."],
            ["A written proposal", "Scope, plan and quote. No obligation to proceed."],
          ].map(([t, x], i) => (
            <li key={t} className="flex gap-4">
              <span className="font-display text-2xl tabular-nums text-primary">0{i + 1}</span>
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-sm text-muted-foreground">{x}</p>
              </div>
            </li>
          ))}
        </ol>
        <details className="mt-8 rounded-xl border border-border bg-background p-4 text-sm">
          <summary className="cursor-pointer font-medium">A copy of what you sent</summary>
          <pre className="mt-3 whitespace-pre-wrap font-body text-muted-foreground">{message}</pre>
        </details>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello, I have just sent a project brief. My reference is ${ref}.`)}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border px-5 py-3 text-sm transition hover:bg-muted">
            Message us your reference
          </a>
          <Link href="/" className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Back to the home page
          </Link>
        </div>
      </div>
    );

  if (status === "fallback")
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border/60 bg-card p-8 sm:p-12" role="status">
        <h1 className="text-3xl sm:text-4xl">One last step.</h1>
        <p className="mt-3 text-muted-foreground">Your brief is ready. Send it with one of the buttons below and it opens in your own app, already written. Aineah or Ian will get back to you quickly.</p>
        <pre className="mt-6 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-background p-4 font-body text-sm text-muted-foreground">{message}</pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Send on WhatsApp
          </a>
          <a href={mail} className="rounded-xl border border-border px-5 py-3 text-sm transition hover:bg-muted">
            Send by email
          </a>
          <button onClick={() => setStatus("idle")} className="px-3 py-3 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Edit my brief
          </button>
        </div>
      </div>
    );

  const err = (k: string) => errors[k];
  const inv = (k: string) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 xl:gap-14">
      <div className="lg:order-2">
        <header className="mb-8 lg:hidden">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Project brief</p>
          <h1 className="mt-2 text-4xl tracking-tighter">Tell us about your project.</h1>
          <p className="mt-3 text-sm text-muted-foreground">About three minutes. Five details are required, the rest is optional.</p>
        </header>
      <form noValidate onSubmit={submit} className="space-y-12">
        {restored && (
          <p className="rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground">
            We restored your saved draft.{" "}
            <button
              type="button"
              onClick={() => {
                setD(emptyBrief);
                setRestored(false);
                try {
                  localStorage.removeItem(KEY);
                } catch {}
              }}
              className="underline underline-offset-4 hover:text-foreground"
            >
              Start fresh
            </button>
          </p>
        )}

        <Part n="1" title="About you" why="So we know who to reply to, and how." info="formrequired" hint="Why do you ask for my phone number?">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={err("name")}>
              <input id="f-name" value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={cn(field, err("name") && "border-danger")} {...inv("name")} />
            </Field>
            <Field id="phone" label="Phone or WhatsApp" error={err("phone")} hint="We usually reply by phone or WhatsApp first.">
              <input id="f-phone" type="tel" inputMode="tel" value={d.phone} placeholder="0712 345 678 or +254 712 345 678" onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={cn(field, err("phone") && "border-danger")} {...inv("phone")} />
            </Field>
            <Field id="email" label="Email" error={err("email")}>
              <input id="f-email" type="email" value={d.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={cn(field, err("email") && "border-danger")} {...inv("email")} />
            </Field>
            <Field id="org" label="Organisation" optional>
              <input id="f-org" value={d.org} onChange={(e) => set("org", e.target.value)} autoComplete="organization" className={field} />
            </Field>
          </div>
        </Part>

        <Part n="2" title="The project" why="What you want built, in your own words." info="formwrite" hint="What should I write here?">
          <div className="space-y-6">
            <div role="radiogroup" aria-labelledby="service-label" data-marabi-info="formservice">
              <p id="service-label" className="mb-2 flex items-center gap-2 text-sm font-medium">
                Which service is closest? <Tag />
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s, i) => (
                  <button key={s.id} id={i === 0 ? "f-service-0" : undefined} type="button" role="radio" aria-checked={d.service === s.id} onClick={() => set("service", s.id)} className={chip(d.service === s.id)}>
                    {s.label}
                  </button>
                ))}
              </div>
              {err("service") && (
                <p role="alert" className="mt-2 text-xs text-danger">
                  {err("service")}
                </p>
              )}
            </div>

            <Field id="description" label="What do you want to achieve?" error={err("description")} hint={`For example: ${examples[(d.service || "unsure") as ServiceId]}`}>
              <textarea id="f-description" rows={5} value={d.description} onChange={(e) => set("description", e.target.value)} className={cn(field, "resize-y", err("description") && "border-danger")} {...inv("description")} />
            </Field>
            {guess && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm" role="status">
                <span>
                  This sounds like <span className="font-medium">{serviceLabel(guess)}</span>.
                </span>
                <button type="button" onClick={() => set("service", guess)} className="font-medium text-primary underline underline-offset-4">
                  Select it
                </button>
                <button type="button" onClick={() => setSkipGuess(true)} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  No thanks
                </button>
              </div>
            )}

            <Field id="site" label="Existing website or social page" optional>
              <input id="f-site" value={d.site} onChange={(e) => set("site", e.target.value)} placeholder="https://" inputMode="url" className={field} />
            </Field>
          </div>
        </Part>

        <Part n="3" title="Scope and timing" why="Helps us prepare for the first call. Skip anything you are unsure about." optional info="formscope" hint="Why do you ask about scope and timing?">
          <div className="space-y-6">
            {needs.length > 0 && (
              <div role="group" aria-labelledby="scope-label">
                <p id="scope-label" className="mb-2 flex items-center gap-2 text-sm font-medium">
                  What might it need? <Tag optional />
                </p>
                <div className="flex flex-wrap gap-2">
                  {needs.map((s) => (
                    <button key={s} type="button" aria-pressed={d.scope.includes(s)} onClick={() => toggleScope(s)} className={chip(d.scope.includes(s))}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                  When would you like to start? <Tag optional />
                </p>
                <Select name="timing" label="When would you like to start?" options={timingOptions} placeholder="Choose" value={d.timing} onChange={(v) => set("timing", v)} />
                <p className="mt-1.5 text-xs text-muted-foreground">Timelines are flexible and agreed with you.</p>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                  Budget range <Tag optional />
                </p>
                <Select name="budget" label="Budget range" options={budgetOptions} placeholder="Choose" value={d.budget} onChange={(v) => set("budget", v)} />
                <p className="mt-1.5 text-xs text-muted-foreground">Only to suggest the right shape. Never shown publicly.</p>
              </div>
            </div>
          </div>
        </Part>

        <Part n="4" title="Anything else" why="References, deadlines, constraints, things you have seen and liked." optional info="formnext" hint="What happens after I send this?">
          <Field id="notes" label="Notes" optional>
            <textarea id="f-notes" rows={4} value={d.notes} onChange={(e) => set("notes", e.target.value)} className={cn(field, "resize-y")} />
          </Field>
        </Part>

        <input ref={hp} name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

        <div className="border-t border-border/60 pt-8" data-marabi-info="formdata">
          <p className="max-w-xl text-xs text-muted-foreground">
            By sending this you agree we may use these details to respond to you and to prepare a proposal, as set out in our{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            . Your details go only to the founders and are never sold.
          </p>
          {serverErr && (
            <p role="alert" className="mt-4 text-sm text-danger">
              {serverErr}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button disabled={status === "sending"} className="rounded-xl bg-primary px-8 py-3.5 font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90 disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send brief"}
            </button>
            <p className="text-sm text-muted-foreground">We&apos;ll get back to you.</p>
          </div>
        </div>
      </form>
      </div>

      <aside className="lg:order-1 lg:sticky lg:top-24 lg:self-start" aria-label="Brief summary">
        <div className="space-y-6 lg:flex lg:flex-col lg:gap-5 lg:space-y-0 lg:rounded-3xl lg:border lg:border-border/60 lg:bg-gradient-to-b lg:from-card/70 lg:to-card/20 lg:p-8 xl:p-9">
        <div className="hidden lg:block">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Project brief</p>
          <h1 className="mt-3 text-4xl tracking-tighter xl:text-5xl">Tell us about your project.</h1>
          <p className="mt-4 text-muted-foreground [@media(max-height:899px)]:hidden">
            This takes about three minutes. Five details are required. Everything else is optional and only helps us prepare for our first call, so skip whatever you are unsure about.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Your brief</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={done} aria-label="Required fields completed">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(done / 5) * 100}%` }} />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">{done} of 5 required</span>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ["Service", d.service ? serviceLabel(d.service) : "Not chosen yet"],
              ["Contact", d.name.trim() || phoneDigits(d.phone).length >= 9 ? [d.name.trim(), phoneDigits(d.phone).length >= 9 ? d.phone.trim() : ""].filter(Boolean).join(", ") : "Not added yet"],
              ["Needs", d.scope.length ? `${d.scope.length} selected` : "None selected"],
              ["Start", d.timing || "Not set"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="min-w-0 truncate text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 [@media(max-height:769px)]:hidden">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">What happens next</p>
          <ol className="mt-4 space-y-3 text-sm">
            {["We'll get back to you", "A first call", "A written proposal, no obligation"].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="font-display text-primary tabular-nums">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <p className="text-sm text-muted-foreground [@media(max-height:804px)]:hidden">
          Rather talk it through?{" "}
          <a data-marabi-action="whatsapp" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
            WhatsApp us
          </a>{" "}
          or{" "}
          <a data-marabi-action="call" href={`tel:${site.phone.replace(/\s/g, "")}`} className="underline underline-offset-4 hover:text-foreground">
            call {site.phone}
          </a>
          .
        </p>
        </div>
      </aside>
    </div>
  );
}
