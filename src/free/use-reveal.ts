'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Reveal an element once as it scrolls into view. The element is visible in server markup
 * (no JS, no flash); on mount it hides, then eases in when it intersects the viewport.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<'visible' | 'hidden' | 'in'>('visible');

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Already on screen when mounted: nothing to reveal.
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return;
    setState('hidden');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('in');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, revealed: state !== 'hidden', state };
}
