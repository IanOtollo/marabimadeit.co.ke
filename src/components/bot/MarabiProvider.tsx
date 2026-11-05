"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { byId, topics, type Topic } from "@/data/botKnowledge";

export type Mood = "idle" | "happy" | "mad" | "sleepy" | "excited" | "talking";
export type PanelMode = "closed" | "chat" | "start";
export type Preset = { door?: string; note?: string };
export type Bubble = { id: number; text: string; topic?: string; actions?: { label: string; run: () => void }[] };

type Memory = { name?: string; draft?: Record<string, string>; sparks?: number };
const KEY = "mmi-bot";
const SLEEP_MS = 5 * 60 * 1000;

type Ctx = {
  panel: PanelMode;
  asleep: boolean;
  hidden: boolean;
  mood: Mood;
  bubble: Bubble | null;
  goto: { el: HTMLElement; id: number } | null;
  spark: { el: HTMLElement; id: number } | null;
  preset: Preset | null;
  name?: string;
  dock: HTMLElement | null;
  registerDock: (el: HTMLElement | null) => void;
  openChat: () => void;
  openStart: (p?: Preset) => void;
  openFullForm: () => void;
  close: () => void;
  wake: () => void;
  sleep: () => void;
  hide: () => void;
  setMood: (m: Mood, ms?: number) => void;
  say: (b: Omit<Bubble, "id">, ms?: number) => void;
  dismissBubble: () => void;
  explain: (topic: string, el?: HTMLElement | null) => void;
  pointTo: (el: HTMLElement) => void;
  remember: (m: Partial<Memory>) => void;
  memory: Memory;
};

const C = createContext<Ctx | null>(null);
export const useMarabi = () => {
  const c = useContext(C);
  if (!c) throw new Error("useMarabi must be used inside MarabiProvider");
  return c;
};

const read = (): Memory => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
};

export function MarabiProvider({ children, onFullForm }: { children: React.ReactNode; onFullForm: () => void }) {
  const [panel, setPanel] = useState<PanelMode>("closed");
  const [asleep, setAsleep] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mood, setMoodState] = useState<Mood>("idle");
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [goto, setGoto] = useState<Ctx["goto"]>(null);
  const [spark, setSpark] = useState<Ctx["spark"]>(null);
  const [preset, setPreset] = useState<Preset | null>(null);
  const [dock, setDock] = useState<HTMLElement | null>(null);
  const [memory, setMemory] = useState<Memory>({});
  const seq = useRef(0);
  const moodTimer = useRef<ReturnType<typeof setTimeout>>();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();
  const lastActive = useRef(Date.now());
  const panelRef = useRef(panel);
  panelRef.current = panel;

  useEffect(() => {
    setMemory(read());
    try {
      if (localStorage.getItem(KEY + "-hidden") === "1") setHidden(true);
    } catch {}
  }, []);

  const remember = useCallback((m: Partial<Memory>) => {
    setMemory((prev) => {
      const next = { ...prev, ...m };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const setMood = useCallback((m: Mood, ms = 1400) => {
    clearTimeout(moodTimer.current);
    setMoodState(m);
    if (ms > 0 && m !== "sleepy") moodTimer.current = setTimeout(() => setMoodState("idle"), ms);
  }, []);

  const dismissBubble = useCallback(() => {
    clearTimeout(bubbleTimer.current);
    setBubble(null);
  }, []);

  const say = useCallback((b: Omit<Bubble, "id">, ms = 9000) => {
    clearTimeout(bubbleTimer.current);
    setBubble({ ...b, id: ++seq.current });
    if (ms > 0) bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  const wake = useCallback(() => {
    lastActive.current = Date.now();
    setAsleep(false);
    setHidden(false);
    try {
      localStorage.removeItem(KEY + "-hidden");
    } catch {}
    setMood("excited", 1600);
  }, [setMood]);

  const sleep = useCallback(() => {
    setPanel("closed");
    setBubble(null);
    setGoto(null);
    setAsleep(true);
    setMoodState("sleepy");
  }, []);

  const hide = useCallback(() => {
    setPanel("closed");
    setBubble(null);
    setHidden(true);
    try {
      localStorage.setItem(KEY + "-hidden", "1");
    } catch {}
  }, []);

  const openChat = useCallback(() => {
    wake();
    setBubble(null);
    setPanel("chat");
  }, [wake]);

  const openStart = useCallback(
    (p?: Preset) => {
      wake();
      setBubble(null);
      setPreset(p ?? null);
      setPanel("start");
    },
    [wake],
  );

  const close = useCallback(() => setPanel("closed"), []);

  const pointTo = useCallback((el: HTMLElement) => {
    const id = ++seq.current;
    setGoto({ el, id });
    setMood("excited", 2600);
    setTimeout(() => setSpark({ el, id }), 650);
    setTimeout(() => {
      setSpark(null);
      setGoto((g) => (g && g.id === id ? null : g));
    }, 3400);
  }, [setMood]);

  const explain = useCallback(
    (topicId: string, el?: HTMLElement | null) => {
      const t = byId(topicId);
      if (!t) return;
      wake();
      const id = ++seq.current;
      if (el) setGoto({ el, id });
      setMood("talking", 4200);
      const actions: NonNullable<Bubble["actions"]> = [
        { label: "Tell me more", run: () => openChat() },
        { label: t.door ? "Start with this" : "Start a project", run: () => openStart(t.door ? { door: t.door } : undefined) },
      ];
      setTimeout(() => say({ text: t.short, topic: t.id, actions }, 12000), el ? 700 : 0);
      setTimeout(() => setGoto((g) => (g && g.id === id ? null : g)), 12500);
    },
    [wake, setMood, say, openChat, openStart],
  );

  // inactivity: five minutes with no input and the assistant goes to sleep in the logo
  useEffect(() => {
    const touch = () => {
      lastActive.current = Date.now();
    };
    const evs = ["pointermove", "keydown", "scroll", "touchstart", "wheel", "click"] as const;
    evs.forEach((e) => window.addEventListener(e, touch, { passive: true }));
    const iv = setInterval(() => {
      if (Date.now() - lastActive.current > SLEEP_MS && panelRef.current === "closed") sleep();
    }, 15000);
    return () => {
      evs.forEach((e) => window.removeEventListener(e, touch));
      clearInterval(iv);
    };
  }, [sleep]);

  // gentle, limited attention-pulls: first a hello, then at most three nudges toward the CTA
  useEffect(() => {
    if (hidden || asleep) return;
    const hello = setTimeout(() => {
      if (panelRef.current !== "closed") return;
      let seen = false;
      try {
        seen = sessionStorage.getItem("mmi-bot-hello") === "1";
        sessionStorage.setItem("mmi-bot-hello", "1");
      } catch {}
      if (seen) return;
      say(
        {
          text: memory.name ? `Karibu back, ${memory.name}. Want to pick up your brief?` : "Habari! I'm Marabi 2.0. Need a hand finding your way, or shall I map your project?",
          actions: [
            { label: "Ask me", run: () => openChat() },
            { label: "Start a project", run: () => openStart() },
          ],
        },
        10000,
      );
      setMood("happy", 1600);
    }, 9000);
    let count = 0;
    const nudge = setInterval(() => {
      if (panelRef.current !== "closed" || count >= 1 || document.hidden) return;
      const cands = Array.from(document.querySelectorAll<HTMLElement>("[data-marabi-cta]"));
      const el = cands.find((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight;
      });
      if (!el) return;
      count++;
      pointTo(el);
      say({ text: "Psst. Starting is easier than it looks: five taps and I'll package the brief.", actions: [{ label: "Show me", run: () => openStart() }] }, 6000);
    }, 75000);
    return () => {
      clearTimeout(hello);
      clearInterval(nudge);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, asleep]);

  const value = useMemo<Ctx>(
    () => ({
      panel, asleep, hidden, mood, bubble, goto, spark, preset, name: memory.name, dock, memory,
      registerDock: setDock,
      openChat, openStart, openFullForm: () => { setPanel("closed"); onFullForm(); },
      close, wake, sleep, hide, setMood, say, dismissBubble, explain, pointTo, remember,
    }),
    [panel, asleep, hidden, mood, bubble, goto, spark, preset, memory, dock, openChat, openStart, close, wake, sleep, hide, setMood, say, dismissBubble, explain, pointTo, remember, onFullForm],
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}

export type { Topic };
export { topics };
