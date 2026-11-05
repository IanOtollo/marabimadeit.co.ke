"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Pause, Play, Plus } from "lucide-react";
import { services } from "@/data/site";
import { archEdges, archNodes, boardCards, codeSnippet, softwareArtifacts } from "@/data/worlds";
import { Eyebrow, Reveal, Section } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn, ease } from "@/lib/utils";
import { useOnScreen } from "./shared";

const s = services.software;

/* ───────────── Terminal: types a real-looking commit ───────────── */

const TOKEN = /(\/\/.*$)|("[^"]*"|'[^']*')|\b(export|async|function|const|await|if|return)\b/g;

function Highlight({ line }: { line: string }) {
  if (line.startsWith("$")) return <span className="text-secondary">{line}</span>;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1] ? "text-muted-foreground" : m[2] ? "text-secondary" : "text-primary";
    out.push(<span key={m.index} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(line.slice(last));
  return <>{out}</>;
}

function Terminal() {
  const reduce = useReducedMotion();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const full = useMemo(() => codeSnippet.join("\n"), []);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce) {
      setN(full.length);
      return;
    }
    if (!on) return;
    if (n >= full.length) {
      const t = setTimeout(() => setN(0), 6000);
      return () => clearTimeout(t);
    }
    const ch = full[n];
    const t = setTimeout(() => setN((x) => x + 1), ch === "\n" ? 260 : 22 + Math.random() * 28);
    return () => clearTimeout(t);
  }, [on, n, full, reduce]);
  const lines = full.slice(0, n).split("\n");
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" /><span className="h-2.5 w-2.5 rounded-full bg-foreground/20" /><span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="ml-3 truncate font-mono text-xs text-muted-foreground">marabi/shop-api · feat/mpesa-reconcile</span>
      </div>
      <pre className="min-h-[19rem] overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:p-6 sm:text-xs" aria-label="Code being written">
        <code>
          {lines.map((l, k) => (
            <div key={k} className="whitespace-pre"><Highlight line={l} />{k === lines.length - 1 && <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-primary align-middle" />}{l === "" && <span>&nbsp;</span>}</div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ───────────── Sprint board ───────────── */

const COLS = ["Backlog", "Doing", "Review", "Shipped"];

function Board() {
  const reduce = useReducedMotion();
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const [cards, setCards] = useState(boardCards);
  const [play, setPlay] = useState(true);
  const [hover, setHover] = useState(false);
  const [turn, setTurn] = useState(0);
  const running = play && !hover && on && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      setCards((cs) => {
        const id = cs[turn % cs.length].id;
        return cs.map((c) => (c.id === id ? { ...c, col: c.col === 3 ? 0 : c.col + 1 } : c));
      });
      setTurn((x) => x + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [running, turn]);

  const shipped = cards.filter((c) => c.col === 3).reduce((a, c) => a + c.pts, 0);
  return (
    <div ref={ref} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Sprint 14 · <span className="text-primary">{shipped}</span> points shipped</p>
        <button onClick={() => setPlay(!play)} aria-label={play ? "Pause board" : "Play board"} className="rounded-lg border border-border p-2 hover:bg-muted">{play ? <Pause size={14} /> : <Play size={14} />}</button>
      </div>
      <LayoutGroup>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {COLS.map((c, ci) => (
            <div key={c} className="min-h-[15rem] rounded-xl border border-border bg-card/60 p-3">
              <p className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                {c}<span className={cn("rounded-full px-2 py-0.5 text-[10px]", ci === 3 ? "bg-secondary/20 text-secondary" : "bg-muted")}>{cards.filter((x) => x.col === ci).length}</span>
              </p>
              <div className="space-y-2">
                {cards.filter((x) => x.col === ci).map((x) => (
                  <motion.div layout layoutId={x.id} key={x.id} transition={{ duration: 0.6, ease }} className={cn("rounded-lg border bg-background p-3 text-sm", ci === 3 ? "border-secondary/50" : "border-border")}>
                    <p className="leading-snug">{x.title}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono">{x.tag}</span>
                      <span className="text-muted-foreground">{x.pts} pts</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
      <p className="mt-3 text-xs text-muted-foreground">Illustrative sprint. Hover or focus to pause. You see a board like this, live, for your own project.</p>
    </div>
  );
}

/* ───────────── Architecture diagram ───────────── */

const NODE_W = 118;
const NODE_H = 44;
const byId = (id: string) => archNodes.find((n) => n.id === id)!;
const edgePath = (a: string, b: string) => {
  const A = byId(a);
  const B = byId(b);
  const vertical = Math.abs(A.x - B.x) < 40;
  if (vertical) {
    const dir = B.y > A.y ? 1 : -1;
    return `M ${A.x} ${A.y + (dir * NODE_H) / 2} L ${B.x} ${B.y - (dir * NODE_H) / 2}`;
  }
  const dir = B.x > A.x ? 1 : -1;
  const x1 = A.x + (dir * NODE_W) / 2;
  const x2 = B.x - (dir * NODE_W) / 2;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${A.y} C ${mx} ${A.y}, ${mx} ${B.y}, ${x2} ${B.y}`;
};

function Architecture() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("api");
  const a = byId(active);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card p-3 sm:p-5">
        <svg viewBox="0 0 770 400" className="min-w-[34rem] w-full" role="group" aria-label="System architecture. Select a node for details.">
          {archEdges.map(([from, to], k) => {
            const hot = active === from || active === to;
            const d = edgePath(from, to);
            return (
              <g key={`${from}-${to}`}>
                <motion.path id={`sw-e-${k}`} d={d} fill="none" strokeWidth={hot ? 2.5 : 1.5} className={cn("transition-colors", hot ? "stroke-primary" : "stroke-border")}
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease, delay: k * 0.12 }} />
                {!reduce && (
                  <circle r={hot ? 4 : 2.5} className={hot ? "fill-primary" : "fill-muted-foreground"}>
                    <animateMotion dur={`${2.4 + (k % 3) * 0.5}s`} repeatCount="indefinite" begin={`${k * 0.3}s`}>
                      <mpath href={`#sw-e-${k}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            );
          })}
          {archNodes.map((n, k) => {
            const on = n.id === active;
            return (
              <motion.g key={n.id} tabIndex={0} role="button" aria-label={`${n.label}. ${n.text}`} aria-pressed={on}
                onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} onClick={() => setActive(n.id)}
                onKeyDown={(e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && setActive(n.id)}
                className="cursor-pointer outline-none"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease, delay: 0.3 + k * 0.07 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                <rect x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx="10" strokeWidth={on ? 2.5 : 1.5} className={cn("transition-colors", on ? "fill-primary/15 stroke-primary" : "fill-background stroke-border")} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" className={cn("text-[13px]", on ? "fill-primary" : "fill-foreground")}>{n.label}</text>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="rounded-2xl border border-border bg-card p-6" aria-live="polite">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Component</p>
          <h3 className="mt-2 text-3xl text-primary">{a.label}</h3>
          <p className="mt-4 text-muted-foreground">{a.text}</p>
          <p className="mt-6 text-xs text-muted-foreground">Talks to: {archEdges.filter(([x, y]) => x === a.id || y === a.id).map(([x, y]) => byId(x === a.id ? y : x).label).join(", ")}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────────── Deliverables: accordion rail ───────────── */

function Rail() {
  const [open, setOpen] = useState(0);
  return (
    <ol className="relative border-l border-border">
      {s.deliverables.map((d, i) => {
        const on = open === i;
        return (
          <li key={d.title} className="relative pl-8 sm:pl-12">
            <span className={cn("absolute -left-[0.4rem] top-7 h-3 w-3 rounded-full border-2 transition-colors", on ? "border-primary bg-primary" : "border-border bg-background")} aria-hidden />
            <h3>
              <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} aria-controls={`rail-${i}`} className="flex w-full items-center justify-between gap-4 py-6 text-left">
                <span className="flex items-baseline gap-4"><span className={cn("font-mono text-sm", on ? "text-primary" : "text-muted-foreground")}>0{i + 1}</span><span className="font-display text-2xl sm:text-3xl">{d.title}</span></span>
                <Plus size={22} className={cn("shrink-0 transition-transform", on && "rotate-45 text-primary")} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`rail-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
                  <p className="max-w-2xl pb-3 text-muted-foreground">{d.text}</p>
                  <p className="pb-8 text-sm"><span className="rounded-md border border-secondary/50 px-2 py-1 text-xs text-secondary">Artifact</span> <span className="ml-2">{softwareArtifacts[d.title]}</span></p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

/* ───────────── Phases: Gantt ───────────── */

const GANTT = [{ from: 1, to: 2 }, { from: 3, to: 4 }, { from: 5, to: 16 }, { from: 17, to: 20 }];
const WEEKS = 20;

function Gantt() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[36rem]">
        <div className="ml-40 grid grid-cols-20 text-[10px] text-muted-foreground" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }} aria-hidden>
          {[...Array(WEEKS)].map((_, k) => <span key={k} className="border-l border-border pl-1">{k === 0 ? "Start" : k === 16 ? "Launch" : ""}</span>)}
        </div>
        <ul className="mt-2 space-y-3">
          {s.phases.map((p, k) => (
            <li key={p.name} className="flex items-center gap-4">
              <div className="w-36 shrink-0"><p className="text-sm">{p.name}</p><p className="text-xs text-muted-foreground">{p.duration}</p></div>
              <div className="relative h-9 flex-1 rounded-md bg-muted/40">
                <motion.div className={cn("absolute top-0 flex h-full items-center overflow-hidden rounded-md px-3 text-xs", k % 2 ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground")}
                  style={{ left: `${((GANTT[k].from - 1) / WEEKS) * 100}%` }} initial={{ width: 0 }} whileInView={{ width: `${((GANTT[k].to - GANTT[k].from + 1) / WEEKS) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, ease, delay: k * 0.15 }}>
                  <span className="whitespace-nowrap">{k === 2 ? "Short sprints with demos" : `Phase ${k + 1}`}</span>
                </motion.div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ───────────── The world ───────────── */

export function SoftwareWorld() {
  return (
    <>
      <Section className="pt-12 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="font-display text-6xl tracking-tighter text-primary sm:text-7xl">03</p>
            <Eyebrow>Custom Software</Eyebrow>
            <h1 className="text-5xl tracking-tighter sm:text-6xl lg:text-7xl">Idea to <span className="text-primary">shipped.</span></h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">{s.intro}</p>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground"><span className="text-foreground">Built for: </span>{s.who}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaButton>Scope my product</CtaButton>
              <a href="#board" className="rounded-xl border border-border bg-background px-6 py-3 transition hover:bg-muted">See how we ship</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}><Terminal /></Reveal>
        </div>
      </Section>

      <Section id="board" className="border-y border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Cadence</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">Short sprints. Work you can see.</h2>
        </Reveal>
        <Board />
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Architecture</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">Boring where it should be.</h2>
          <p className="mb-10 mt-4 max-w-2xl text-muted-foreground">Hover or tap any component. Proven parts, clear boundaries, nothing you cannot hand to another developer.</p>
        </Reveal>
        <Architecture />
      </Section>

      <Section className="border-y border-border/50 bg-card/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>What you get</Eyebrow>
            <h2 className="text-4xl sm:text-5xl">Each step leaves an artifact.</h2>
            <p className="mt-4 text-muted-foreground">Open any item to see what lands in your hands.</p>
          </Reveal>
          <Rail />
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="mb-10 max-w-3xl text-4xl sm:text-5xl">One axis, start to launch.</h2>
        </Reveal>
        <Gantt />
      </Section>

      <Section className="border-t border-border/50 bg-card/40">
        <Reveal>
          <Eyebrow>Tools we use</Eyebrow>
          <h2 className="max-w-3xl text-4xl sm:text-5xl">The dependency file.</h2>
          <pre className="mt-8 max-w-xl overflow-x-auto rounded-2xl border border-border bg-card p-5 font-mono text-xs leading-loose sm:text-sm">
            <code>
              <span className="text-muted-foreground">{"// your stack, documented and portable"}</span>
              {"\n"}
              {s.stack.map((t) => (
                <span key={t} className="block"><span className="text-secondary">&quot;{t}&quot;</span><span className="text-muted-foreground">,</span></span>
              ))}
            </code>
          </pre>
        </Reveal>
      </Section>
    </>
  );
}
