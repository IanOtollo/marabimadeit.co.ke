"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { byId, details, topics, type Topic } from "@/data/botKnowledge";

export type Mood = "idle" | "happy" | "mad" | "sleepy" | "excited" | "talking" | "curious" | "thinking" | "impressed" | "concerned" | "cheer" | "reading";
export type PanelMode = "closed" | "chat";
export type Reaction = { kind: "whatsapp" | "call" | "email" | "cta"; id: number };
export type Preset = { door?: string; note?: string };
export type Bubble = { id: number; text: string; topic?: string; bullets?: string[]; actions?: { label: string; run: () => void }[] };

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
  /** A slow shooting-star glide to the call to action, now and then, to draw the eye to it. */
  star: { el: HTMLElement; id: number } | null;
  ask: { topic: string; id: number } | null;
  reaction: Reaction | null;
  askTopic: (topic: string) => void;
  name?: string;
  dock: HTMLElement | null;
  registerDock: (el: HTMLElement | null) => void;
  openChat: () => void;
  openStart: (p?: Preset) => void;
  close: () => void;
  wake: () => void;
  sleep: () => void;
  hide: () => void;
  setMood: (m: Mood, ms?: number) => void;
  say: (b: Omit<Bubble, "id">, ms?: number) => void;
  dismissBubble: () => void;
  pauseBubble: () => void;
  resumeBubble: (ms?: number) => void;
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

export function MarabiProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<PanelMode>("closed");
  const [asleep, setAsleep] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mood, setMoodState] = useState<Mood>("idle");
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [goto, setGoto] = useState<Ctx["goto"]>(null);
  const [spark, setSpark] = useState<Ctx["spark"]>(null);
  const [star, setStar] = useState<Ctx["star"]>(null);
  const [ask, setAsk] = useState<{ topic: string; id: number } | null>(null);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const router = useRouter();
  const path = usePathname();
  const pathRef = useRef(path);
  pathRef.current = path;
  const [dock, setDock] = useState<HTMLElement | null>(null);
  const [memory, setMemory] = useState<Memory>({});
  const seq = useRef(0);
  const bubbleAt = useRef(0);
  /** The cookie notice sits at the bottom of the screen; Marabi never talks over it. */
  const cookieOpen = () => !!document.querySelector('[role="dialog"][aria-label="Cookie consent"]');
  const moodTimer = useRef<ReturnType<typeof setTimeout>>();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();
  const lastActive = useRef(Date.now());
  const panelRef = useRef(panel);
  panelRef.current = panel;
  const live = useRef({ asleep, hidden, bubble });
  live.current = { asleep, hidden, bubble };

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

  /** While the visitor's pointer is on the bubble's buttons, it stays; it leaves a few seconds after they move away. */
  const pauseBubble = useCallback(() => clearTimeout(bubbleTimer.current), []);
  const resumeBubble = useCallback((ms = 6000) => {
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  const say = useCallback((b: Omit<Bubble, "id">, ms = 9000) => {
    clearTimeout(bubbleTimer.current);
    bubbleAt.current = Date.now();
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

  /** Every "Start a project" leads to the formal brief page, carrying across anything already known. */
  const openStart = useCallback(
    (p?: Preset) => {
      wake();
      setBubble(null);
      setPanel("closed");
      const q = new URLSearchParams();
      if (p?.door) q.set("service", p.door);
      if (p?.note) q.set("note", p.note.slice(0, 600));
      const qs = q.toString();
      router.push(`/start${qs ? `?${qs}` : ""}`);
    },
    [wake, router],
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

  const askTopic = useCallback(
    (topic: string) => {
      wake();
      setBubble(null);
      setPanel("chat");
      setAsk({ topic, id: ++seq.current });
    },
    [wake],
  );

  const explain = useCallback(
    (topicId: string, el?: HTMLElement | null) => {
      const t = byId(topicId);
      if (!t) return;
      wake();
      const id = ++seq.current;
      if (el) setGoto({ el, id });
      setMood("talking", 4200);
      const actions: NonNullable<Bubble["actions"]> = [
        { label: "Go deeper", run: () => askTopic(t.id) },
        ...(t.link ? [{ label: "Open page", run: () => router.push(t.link!.href) }] : []),
        { label: t.door ? "Start with this" : "Start a project", run: () => openStart(t.door ? { door: t.door } : undefined) },
      ];
      setTimeout(() => say({ text: t.short, topic: t.id, bullets: details[t.id], actions }, 22000), el ? 700 : 0);
      setTimeout(() => setGoto((g) => (g && g.id === id ? null : g)), 22500);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wake, setMood, say, openChat, openStart, router],
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

  // double-click (desktop) or double-tap (phone) on any area marked data-marabi-info and Marabi explains it
  const explainRef = useRef(explain);
  explainRef.current = explain;
  useEffect(() => {
    const trigger = (target: EventTarget | null) => {
      const t = target as HTMLElement | null;
      const el = t?.closest?.("[data-marabi-info]") as HTMLElement | null;
      if (!el || !t) return;
      if (t.closest("button, a, input, textarea, select, summary, label, [role=dialog], [role=slider]")) return;
      window.getSelection()?.removeAllRanges();
      explainRef.current(el.dataset.marabiInfo || "overview", el);
    };
    const onDbl = (e: MouseEvent) => trigger(e.target);
    let last = { t: 0, x: 0, y: 0 };
    const onTouch = (e: TouchEvent) => {
      const c = e.changedTouches[0];
      const now = Date.now();
      if (now - last.t < 320 && Math.hypot(c.clientX - last.x, c.clientY - last.y) < 30) {
        trigger(e.target);
        last = { t: 0, x: 0, y: 0 };
      } else last = { t: now, x: c.clientX, y: c.clientY };
    };
    document.addEventListener("dblclick", onDbl);
    document.addEventListener("touchend", onTouch, { passive: true });
    return () => {
      document.removeEventListener("dblclick", onDbl);
      document.removeEventListener("touchend", onTouch);
    };
  }, []);

  // dwell: rest the mouse on an area marked data-marabi-info for 8 seconds and Marabi explains it, once per topic per visit
  useEffect(() => {
    const DWELL = 8000;
    const COOLDOWN = 25000;
    const KEY_SEEN = "mmi-dwell";
    let timer: ReturnType<typeof setTimeout> | undefined;
    let anchor: HTMLElement | null = null;
    let at = { x: 0, y: 0 };
    let lastFire = 0;
    let seen: string[] = [];
    try {
      seen = JSON.parse(sessionStorage.getItem(KEY_SEEN) || "[]");
    } catch {}

    const infoAt = (x: number, y: number) => {
      const t = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!t) return null;
      // never fire over controls, navigation, or the assistant itself
      if (t.closest("button, a, input, textarea, select, summary, label, nav, [role=dialog], [role=slider], [data-no-dwell]")) return null;
      return t.closest("[data-marabi-info]") as HTMLElement | null;
    };
    const fire = () => {
      const el = infoAt(at.x, at.y);
      if (!el || el !== anchor) return;
      const topic = el.dataset.marabiInfo || "overview";
      const l = live.current;
      if (document.hidden || cookieOpen() || panelRef.current !== "closed" || l.asleep || l.hidden || l.bubble) return;
      if (Date.now() - lastFire < COOLDOWN || seen.includes(topic)) return;
      seen = [...seen, topic];
      try {
        sessionStorage.setItem(KEY_SEEN, JSON.stringify(seen));
      } catch {}
      lastFire = Date.now();
      // info only: the bubble appears beside the assistant, which does not fly to the section or touch anything
      explainRef.current(topic, null);
    };
    const arm = () => {
      clearTimeout(timer);
      anchor = infoAt(at.x, at.y);
      if (anchor) timer = setTimeout(fire, DWELL);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      at = { x: e.clientX, y: e.clientY };
      // small movements inside the same area keep the clock running; entering a different area restarts it
      if (infoAt(at.x, at.y) !== anchor) arm();
    };
    const stop = () => {
      clearTimeout(timer);
      anchor = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", arm, { passive: true });
    document.addEventListener("mouseleave", stop);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", arm);
      document.removeEventListener("mouseleave", stop);
    };
  }, []);

  // Hover reactions and a gentle nudge. Hovering a contact button makes Marabi play a matching animation;
  // resting on a button for a few seconds makes it say what the click will do. It never clicks anything itself.
  useEffect(() => {
    const NUDGE = 5000;
    const COOLDOWN = 15000;
    const copy: Record<string, string> = {
      whatsapp: "Go on, click it. It opens WhatsApp with a chat ready to start.",
      call: "Tap it to call. It opens your phone's dialer with the number filled in.",
      email: "Click it to write to us. It opens your email app with our address ready.",
      cta: "Ready when you are. Click it and I will package your brief in a few taps.",
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    let target: HTMLElement | null = null;
    let lastFire = 0;
    const seen = new Set<string>();
    const kindOf = (el: HTMLElement): Reaction["kind"] => {
      const a = el.dataset.marabiAction;
      return a === "whatsapp" || a === "call" || a === "email" ? a : "cta";
    };
    const pick = (t: EventTarget | null) => (t as HTMLElement | null)?.closest?.("[data-marabi-action], [data-marabi-cta]") as HTMLElement | null;
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = pick(e.target);
      if (el === target) return;
      clearTimeout(timer);
      target = el;
      if (!el) {
        setReaction(null);
        return;
      }
      const kind = kindOf(el);
      if (!live.current.asleep && !live.current.hidden) {
        setReaction({ kind, id: ++seq.current });
        if (kind === "call") setMood("excited", 2200);
        else setMood("happy", 2200);
      }
      timer = setTimeout(() => {
        const l = live.current;
        if (target !== el || document.hidden || cookieOpen() || panelRef.current !== "closed" || l.asleep || l.hidden || l.bubble) return;
        if (Date.now() - lastFire < COOLDOWN || seen.has(kind)) return;
        seen.add(kind);
        lastFire = Date.now();
        say({ text: copy[kind] }, 7000);
        setMood("excited", 1800);
      }, NUDGE);
    };
    const onLeave = () => {
      clearTimeout(timer);
      target = null;
      setReaction(null);
    };
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // an info bubble never lingers over content the visitor has scrolled on to
  useEffect(() => {
    const onScroll = () => {
      if (live.current.bubble && Date.now() - bubbleAt.current > 1500) setBubble(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the brief page Marabi introduces itself once, as a companion to the form and nothing more.
  useEffect(() => {
    if (path !== "/start" || hidden || asleep) return;
    const t = setTimeout(() => {
      if (pathRef.current !== "/start" || panelRef.current !== "closed" || document.querySelector('[role="dialog"][aria-label="Cookie consent"]')) return;
      let seen = false;
      try {
        seen = sessionStorage.getItem("mmi-bot-form-hello") === "1";
        sessionStorage.setItem("mmi-bot-form-hello", "1");
      } catch {}
      if (seen) return;
      say(
        {
          text: "I can help with this brief. Click the ? beside any section to see why we ask, or describe your project in the box and I will suggest the right service.",
          actions: [
            { label: "What should I write?", run: () => askTopic("formwrite") },
            { label: "Which service?", run: () => askTopic("formservice") },
          ],
        },
        9000,
      );
      setMood("happy", 1600);
    }, 2500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, hidden, asleep]);

  // Now and then (twice a visit at most) Marabi glides to the "Start a project" button as a slow shooting star, says what it is for, and the
  // button pulses softly. It stops beside the button, never on it, never clicks, and never interrupts a form, a legal page or an open bubble.
  useEffect(() => {
    const skip = ["/start", "/contact", "/privacy", "/terms", "/cookies", "/engagement", "/acceptable-use", "/security", "/accessibility", "/licenses"];
    if (skip.includes(path) || hidden || asleep) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let pulsed: HTMLElement | null = null;
    let tries = 0;
    const retry = () => {
      if (++tries < 6) timers.push(setTimeout(run, 4000));
    };
    const run = () => {
      let n = 0;
      try {
        n = Number(sessionStorage.getItem("mmi-cta-star") || 0);
      } catch {}
      if (n >= 2) return;
      const l = live.current;
      const tag = document.activeElement?.tagName || "";
      if (document.hidden || cookieOpen() || panelRef.current !== "closed" || l.asleep || l.hidden || l.bubble || /INPUT|TEXTAREA|SELECT/.test(tag)) return retry();
      const seen = [...document.querySelectorAll<HTMLElement>("[data-marabi-cta]")].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
      });
      const el = seen.find((e) => !e.closest("nav, header")) || seen[0];
      if (!el) return retry();
      try {
        sessionStorage.setItem("mmi-cta-star", String(n + 1));
      } catch {}
      pulsed = el;
      el.classList.add("mm-pulse");
      timers.push(setTimeout(() => el.classList.remove("mm-pulse"), 7500));
      if (!reduce) setStar({ el, id: ++seq.current });
      timers.push(
        setTimeout(() => {
          say(
            {
              text: "Ready when you are. Tell me about your project and I will package your brief in a few taps.",
              actions: [
                { label: "Start a project", run: () => openStart() },
                { label: "Not now", run: () => undefined },
              ],
            },
            8000,
          );
          setMood("excited", 2000);
        }, reduce ? 300 : 2800),
      );
      timers.push(setTimeout(() => setStar(null), (reduce ? 300 : 2800) + 8800));
    };
    timers.push(setTimeout(run, 16000));
    return () => {
      timers.forEach(clearTimeout);
      pulsed?.classList.remove("mm-pulse");
      setStar(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, hidden, asleep]);

  // one gentle hello per visit
  useEffect(() => {
    if (hidden || asleep) return;
    const hello = setTimeout(() => {
      if (panelRef.current !== "closed" || cookieOpen()) return;
      let seen = false;
      try {
        seen = sessionStorage.getItem("mmi-bot-hello") === "1";
        sessionStorage.setItem("mmi-bot-hello", "1");
      } catch {}
      if (seen) return;
      say(
        {
          text: memory.name ? `Karibu back, ${memory.name}. Want to pick up your brief?` : "Habari! I'm Marabi 2.0. Double-tap any section and I'll explain it, or tap me to ask.",
          actions: [
            { label: "Ask me", run: () => openChat() },
            { label: "Start a project", run: () => openStart() },
          ],
        },
        10000,
      );
      setMood("happy", 1600);
    }, 9000);
    // No autonomous actions: Marabi never flies to, highlights or presses anything on the page by itself.
    return () => clearTimeout(hello);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, asleep]);

  const value = useMemo<Ctx>(
    () => ({
      panel, asleep, hidden, mood, bubble, goto, spark, star, ask, reaction, askTopic, name: memory.name, dock, memory,
      registerDock: setDock,
      openChat, openStart,
      close, wake, sleep, hide, setMood, say, dismissBubble, pauseBubble, resumeBubble, explain, pointTo, remember,
    }),
    [panel, asleep, hidden, mood, bubble, goto, spark, star, ask, reaction, askTopic, memory, dock, openChat, openStart, close, wake, sleep, hide, setMood, say, dismissBubble, pauseBubble, resumeBubble, explain, pointTo, remember],
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}

export type { Topic };
export { topics };
