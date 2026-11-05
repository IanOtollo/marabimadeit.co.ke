"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUp, Check, EyeOff, X } from "lucide-react";
import { byId, greetings, matchTopic } from "@/data/botKnowledge";
import { doors, site } from "@/data/site";
import { cn, ease } from "@/lib/utils";
import { OrbBody } from "./OrbBody";
import { useMarabi } from "./MarabiProvider";

type Msg = { id: number; from: "bot" | "me"; text: string; chips?: { label: string; topic?: string; start?: boolean }[]; link?: { href: string; label: string } };

const DOOR_OPTS = [...doors.map((d) => ({ id: d.id, label: d.title })), { id: "unsure", label: "Not sure yet" }];
const STAGE = ["An idea, nothing built yet", "Replacing something that exists", "Adding to what I already have", "Not sure yet"];
const TIMING = ["As soon as possible", "Within 1 to 2 months", "In 3 months or more", "I am flexible"];
const BUDGET = ["Under KES 100,000", "KES 100,000 to 300,000", "KES 300,000 to 800,000", "KES 800,000 and above", "Let us discuss it"];

type Brief = { door?: string; stage?: string; timing?: string; budget?: string; name?: string; contact?: string; note?: string };

const chip =
  "rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition hover:border-primary hover:bg-muted active:scale-[0.98]";

function Starter() {
  const m = useMarabi();
  const [brief, setBrief] = useState<Brief>(() => ({ ...(m.memory.draft as Brief), name: m.memory.name, ...(m.preset?.door ? { door: m.preset.door } : {}), note: m.preset?.note }));
  const [step, setStep] = useState(() => (m.preset?.door ? 1 : 0));
  const [sent, setSent] = useState<null | "wa" | "mail">(null);
  const [err, setErr] = useState("");
  const TOTAL = 5;

  const set = (patch: Brief, next = true) => {
    const b = { ...brief, ...patch };
    setBrief(b);
    m.remember({ draft: b as Record<string, string> });
    if (next) setStep((s) => s + 1);
  };

  const doorLabel = DOOR_OPTS.find((d) => d.id === brief.door)?.label ?? "Not sure yet";
  const message = useMemo(
    () =>
      [
        `Hi ${site.name}, I'm ${brief.name || "a visitor"}.`,
        `I'm interested in: ${doorLabel}.`,
        brief.stage && `Where I am: ${brief.stage}.`,
        brief.timing && `Timing: ${brief.timing}.`,
        brief.budget && `Budget: ${brief.budget}.`,
        brief.note && `Notes: ${brief.note}`,
        `Reach me on: ${brief.contact || "-"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    [brief, doorLabel],
  );

  const send = (via: "wa" | "mail") => {
    if (!brief.name?.trim() || !brief.contact?.trim()) {
      setErr("Add your name and a phone number or email so we can reply.");
      return;
    }
    setErr("");
    m.remember({ name: brief.name.trim().split(" ")[0] });
    setSent(via);
    if (via === "wa") window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    else window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry: ${doorLabel}`)}&body=${encodeURIComponent(message)}`;
    m.setMood("happy", 2500);
  };

  const Q = ({ title, sub }: { title: string; sub?: string }) => (
    <div className="mb-4">
      <p className="font-display text-xl leading-tight">{title}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );

  if (sent)
    return (
      <div className="space-y-4 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Check size={20} />
        </div>
        <p className="font-display text-2xl leading-tight">Brief packaged{brief.name ? `, ${brief.name.split(" ")[0]}` : ""}.</p>
        <p className="text-sm text-muted-foreground">
          {sent === "wa" ? "WhatsApp opened with your brief ready. Press send there to deliver it." : "Your email app opened with your brief ready. Press send there to deliver it."} The team replies within one business day, then a free call and a written proposal.
        </p>
        <div className="flex gap-2">
          <button onClick={() => send(sent === "wa" ? "mail" : "wa")} className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted">
            Send {sent === "wa" ? "by email" : "on WhatsApp"} too
          </button>
          <button onClick={m.close} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Done
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-3">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} aria-label="Back" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
        )}
        <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step + 1} aria-label={`Step ${step + 1} of ${TOTAL}`}>
          {Array.from({ length: TOTAL }, (_, i) => (
            <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= step ? "bg-primary" : "bg-muted")} />
          ))}
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {step + 1}/{TOTAL}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25, ease }}>
          {step === 0 && (
            <>
              <Q title="What are we building?" sub="One tap. You can change it later." />
              <div className="grid gap-2">
                {DOOR_OPTS.map((o) => (
                  <button key={o.id} className={chip} onClick={() => set({ door: o.id })}>
                    {o.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <Q title="Where are you at?" />
              <div className="grid gap-2">
                {STAGE.map((o) => (
                  <button key={o} className={chip} onClick={() => set({ stage: o })}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <Q title="When do you need it?" />
              <div className="grid gap-2">
                {TIMING.map((o) => (
                  <button key={o} className={chip} onClick={() => set({ timing: o })}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Q title="Roughly what budget?" sub="Optional. It only helps us suggest the right shape." />
              <div className="grid gap-2">
                {BUDGET.map((o) => (
                  <button key={o} className={chip} onClick={() => set({ budget: o })}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <Q title="Last step: how do we reach you?" sub="Then I package everything for you." />
              <div className="space-y-3">
                <input value={brief.name ?? ""} onChange={(e) => set({ name: e.target.value }, false)} placeholder="Your name" aria-label="Your name" autoComplete="name" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input value={brief.contact ?? ""} onChange={(e) => set({ contact: e.target.value }, false)} placeholder="Phone / WhatsApp or email" aria-label="Phone, WhatsApp or email" autoComplete="tel" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <textarea value={brief.note ?? ""} onChange={(e) => set({ note: e.target.value }, false)} rows={2} placeholder="Anything we should know? (optional)" aria-label="Notes" className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                {err && <p className="text-xs text-danger" role="alert">{err}</p>}
                <div className="grid gap-2 sm:grid-cols-2">
                  <button onClick={() => send("wa")} className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition active:scale-[0.98] hover:opacity-90">
                    Send on WhatsApp
                  </button>
                  <button onClick={() => send("mail")} className="rounded-xl border border-border px-4 py-3 text-sm transition hover:bg-muted active:scale-[0.98]">
                    Send by email
                  </button>
                </div>
                <p className="text-[11px] leading-snug text-muted-foreground">
                  This opens your own WhatsApp or email app with the brief ready. We store nothing until you press send.{" "}
                  <Link href="/privacy" onClick={m.close} className="underline underline-offset-2">
                    Privacy
                  </Link>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <button onClick={m.openFullForm} className="mt-5 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">
        Prefer a full form instead?
      </button>
    </div>
  );
}

function Chat() {
  const m = useMarabi();
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    {
      id: 1,
      from: "bot",
      text: m.name ? greetings.back(m.name) : greetings.new,
      chips: [
        { label: "Start a project", start: true },
        { label: "What does it cost?", topic: "pricing" },
        { label: "How long does it take?", topic: "timeline" },
        { label: "How do you work?", topic: "process" },
      ],
    },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const id = useRef(2);

  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth", block: "end" }), [msgs, typing]);

  const reply = (topicId: string | null, userText?: string) => {
    if (userText) setMsgs((p) => [...p, { id: id.current++, from: "me", text: userText }]);
    setTyping(true);
    m.setMood("talking", 1800);
    setTimeout(() => {
      const t = topicId ? byId(topicId) : null;
      const bot: Msg = t
        ? { id: id.current++, from: "bot", text: t.answer, link: t.link, chips: [...t.follow.map((f) => ({ label: byId(f)?.title ?? f, topic: f })), { label: "Start a project", start: true }] }
        : {
            id: id.current++,
            from: "bot",
            text: "I don't have a clean answer to that one. The quickest route is to put it to the team. I can package your question with a short brief, and they reply within one business day.",
            chips: [{ label: "Send it to the team", start: true }, { label: "What can you build?", topic: "websites" }],
          };
      setMsgs((p) => [...p, bot]);
      setTyping(false);
    }, 650);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    setText("");
    const t = matchTopic(v);
    reply(t?.id ?? null, v);
    if (!t) m.remember({ draft: { ...(m.memory.draft ?? {}), note: v } });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5" aria-live="polite">
        {msgs.map((g) => (
          <div key={g.id} className={cn("flex", g.from === "me" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed", g.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted")}>
              <p>{g.text}</p>
              {g.link && (
                <Link href={g.link.href} onClick={m.close} className="mt-2 inline-block text-xs font-medium text-primary underline underline-offset-4">
                  {g.link.label}
                </Link>
              )}
              {g.chips && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.chips.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => (c.start ? m.openStart(m.memory.draft?.note ? { note: m.memory.draft.note } : undefined) : reply(c.topic ?? null, c.label))}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs transition hover:border-primary hover:text-primary"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start" aria-label="Marabi is typing">
            <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }} />
              ))}
            </div>
          </div>
        )}
        <div ref={end} />
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-border p-3">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about pricing, M-Pesa, timelines..." aria-label="Ask Marabi a question" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
        <button aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 active:scale-95">
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}

export function MarabiPanel() {
  const m = useMarabi();
  const open = m.panel !== "closed";

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && m.close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, m]);

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-label="Marabi 2.0 assistant"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88svh] min-h-[22rem] flex-col overflow-hidden rounded-t-2xl border border-border bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-h-[min(40rem,calc(100svh-3rem))] sm:w-[24rem] sm:rounded-2xl"
        >
          <header className="flex items-center gap-3 border-b border-border p-4">
            <OrbBody mood={m.mood === "idle" ? "happy" : m.mood} size={34} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-none">Marabi 2.0</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Your project assistant
              </p>
            </div>
            <div className="flex rounded-xl bg-muted p-0.5 text-xs">
              {(["chat", "start"] as const).map((t) => (
                <button key={t} onClick={() => (t === "chat" ? m.openChat() : m.openStart())} className={cn("rounded-lg px-3 py-1.5 transition", m.panel === t ? "bg-background text-foreground shadow" : "text-muted-foreground")}>
                  {t === "chat" ? "Ask" : "Start"}
                </button>
              ))}
            </div>
            <button onClick={m.hide} aria-label="Hide assistant" title="Hide assistant" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <EyeOff size={16} />
            </button>
            <button onClick={m.close} aria-label="Close" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X size={18} />
            </button>
          </header>
          {m.panel === "start" ? (
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Starter key={m.preset?.door ?? "x"} />
            </div>
          ) : (
            <Chat />
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
