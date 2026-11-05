/** Full text for screen readers; the visual copy reserves layout so nothing reflows while typing. */
export function Typed({ text, count, caret, className }: { text: string; count: number; caret: boolean; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        {caret && <span className="-mb-[0.1em] ml-0.5 inline-block h-[0.9em] w-[0.08em] animate-pulse bg-primary align-baseline" />}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </span>
  );
}
