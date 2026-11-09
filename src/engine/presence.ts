'use client';

import { useEffect, useState } from 'react';

/**
 * Keeps an overlay mounted while it leaves so its exit animation plays.
 * `mounted` controls rendering; `entered` is the open state that drives the transition
 * (false while the overlay is entering or leaving).
 */
export function usePresence(open: boolean, exitMs: number): { mounted: boolean; entered: boolean } {
  const [phase, setPhase] = useState({ shown: open, entered: false });

  useEffect(() => {
    if (open) {
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setPhase({ shown: true, entered: true }));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    const id = window.setTimeout(() => setPhase({ shown: false, entered: false }), exitMs);
    return () => window.clearTimeout(id);
  }, [open, exitMs]);

  return { mounted: open || phase.shown, entered: open && phase.entered };
}
