"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowUp, EyeOff, X } from "lucide-react";
import { byId, followUp, greetings, matchTopic, smallTalk, type Topic } from "@/data/botKnowledge";
import { cn, ease } from "@/lib/utils";
import { OrbBody } from "./OrbBody";
import { useMarabi } from "./MarabiProvider";

type Msg = { id: number; from: "bot" | "me"; text: string; chips?: { label: string; topic?: string; start?: boolean }[]; link?: { href: string; label: string } };

function Chat() {
  const m = useMarabi();
  const onForm = usePathname() === "/start";
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    onForm
      ? {
          id: 1,
          from: "bot",
          text: "I am here to help you fill in this brief. Ask me what to write, which service fits, or what happens after you send it.",
          chips: [
            { label: "What should I write?", topic: "formwrite" },
            { label: "Which service do I need?", topic: "formservice" },
            { label: "What happens after I send?", topic: "formnext" },
            { label: "Is my data safe?", topic: "formdata" },
          ],
        }
      : {
          id: 1,
          from: "bot",
          text: m.name ? greetings.back(m.name) : greetings.new,
          chips: [
            { label: "Start a project", start: true },
            { label: "How long does it take?", topic: "timeline" },
            { label: "How do you work?", topic: "process" },
          ],
        },
  ]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const id = useRef(2);
  const lastTopic = useRef<Topic | null>(null);
  const handledAsk = useRef(0);
  const LEADS = ["", "Good question. ", "Happy to explain. ", ""];

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);

  const chipFor = (label: string) => {
    if (/start a project|send it to the team/i.test(label)) return { label, start: true };
    if (/what can you build/i.test(label)) return { label, topic: "overview" };
    if (/how do you work/i.test(label)) return { label, topic: "process" };
    return { label };
  };

  /** A reply that is not a plain topic answer: small-talk and context-aware follow-ups. */
  const say = (r: { text: string; chips?: string[]; link?: Topic["link"] }, userText: string) => {
    setMsgs((p) => [...p, { id: id.current++, from: "me", text: userText }]);
    setTyping(true);
    m.setMood("talking", 1500);
    setTimeout(() => {
      setMsgs((p) => [...p, { id: id.current++, from: "bot", text: r.text, link: r.link, chips: r.chips?.map(chipFor) }]);
      setTyping(false);
    }, 550);
  };

  const reply = (topicId: string | null, userText?: string) => {
    if (userText) setMsgs((p) => [...p, { id: id.current++, from: "me", text: userText }]);
    setTyping(true);
    m.setMood("talking", 1800);
    setTimeout(() => {
      const t = topicId ? byId(topicId) : null;
      if (t) lastTopic.current = t;
      const bot: Msg = t
        ? { id: id.current++, from: "bot", text: LEADS[id.current % LEADS.length] + t.answer, link: t.link, chips: [...t.follow.map((f) => ({ label: byId(f)?.title ?? f, topic: f })), { label: "Start a project", start: true }] }
        : {
            id: id.current++,
            from: "bot",
            text: "I don't have a clean answer to that one. The quickest route is to put it to the team. I can package your question with a short brief, and they reply personally and fast.",
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
    const talk = smallTalk(v, m.name);
    if (talk) return say(talk, v);
    const t = matchTopic(v);
    const fu = !t || v.split(/\s+/).length <= 7 ? followUp(v, lastTopic.current) : null;
    if (fu) return say(fu, v);
    reply(t?.id ?? null, v);
    if (!t) m.remember({ draft: { ...(m.memory.draft ?? {}), note: v } });
  };

  // "Go deeper" from a bubble lands here with the topic already asked
  useEffect(() => {
    if (m.ask && m.ask.id !== handledAsk.current) {
      handledAsk.current = m.ask.id;
      reply(m.ask.topic, byId(m.ask.topic)?.title ?? undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [m.ask?.id]);

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
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about M-Pesa, timelines, process..." aria-label="Ask Marabi a question" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
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
            <button onClick={() => m.openStart()} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition hover:opacity-90">
              Start a project
            </button>
            <button onClick={m.hide} aria-label="Hide assistant" title="Hide assistant" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <EyeOff size={16} />
            </button>
            <button onClick={m.close} aria-label="Close" className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X size={18} />
            </button>
          </header>
          <Chat />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
