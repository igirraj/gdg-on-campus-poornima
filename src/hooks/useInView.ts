import { useEffect, useRef, useState } from 'react';

/**
 * One-shot IntersectionObserver: flips to `inView` the first time the
 * element enters the viewport and stays true. Used to trigger scroll
 * reveals; falls back to visible when IntersectionObserver is missing.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  // Missing IntersectionObserver (very old browsers) → reveal immediately.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
