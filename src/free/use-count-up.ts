'use client';

import { useEffect, useState } from 'react';
import { useIsoLayoutEffect } from './use-reveal';
import { useMode } from '@/engine/mode';

const DURATION_MS = 900;

/** Counts from 0 to `target` once `active` turns true (instantly under reduced motion). */
export function useCountUp(target: number, active: boolean): number {
  const { reducedMotion } = useMode();
  const [value, setValue] = useState(0);
  // Server markup and no-JS output show the real number; only once running in the browser does it start from 0.
  const [armed, setArmed] = useState(false);
  useIsoLayoutEffect(() => setArmed(true), []);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reducedMotion]);

  return armed ? value : target;
}
