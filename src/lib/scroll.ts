type LenisLike = { scrollTo: (y: number, o?: { duration?: number; immediate?: boolean; lock?: boolean; force?: boolean }) => void };

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

/** Smooth-scroll through Lenis when it is active, otherwise the browser. */
export function scrollToY(y: number, opts: { immediate?: boolean; duration?: number; lock?: boolean } = {}) {
  const top = Math.max(0, y);
  if (window.__lenis) window.__lenis.scrollTo(top, { duration: opts.duration ?? 1.3, immediate: opts.immediate, lock: opts.lock, force: opts.lock });
  else window.scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
}
