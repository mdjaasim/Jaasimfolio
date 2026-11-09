'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { SCROLL_LERP, TOTAL_SCREENS, timeline, type ChapterId } from '@/config/timeline';
import { lerpStep } from './math';
import { useMode } from './mode';

interface TimelineStore {
  get: () => number;
  subscribe: (cb: () => void) => () => void;
  navigate: (id: ChapterId) => void;
}

/** Below this gap (in screens) the eased value snaps to the target; about 1px of scroll. */
const SNAP_DISTANCE = 0.002;
const SETTLE_EPSILON = 0.00001;

const TimelineContext = createContext<TimelineStore | null>(null);

/** Marks one screen-height; the guided stage measures scroll in multiples of it. */
export const SCREEN_UNIT_ATTR = 'data-screen-unit';

export function TimelineProvider({ children }: { children: ReactNode }) {
  const { mode, reducedMotion } = useMode();
  const uRef = useRef(0);
  const listeners = useRef(new Set<() => void>());

  // One screen in px. Measured on mount and on resize, not every frame (a layout read).
  const unitRef = useRef(0);
  const measure = useCallback((): number => {
    const el = document.querySelector<HTMLElement>(`[${SCREEN_UNIT_ATTR}]`);
    unitRef.current = el?.offsetHeight || window.innerHeight || 1;
    return unitRef.current;
  }, []);
  const unit = useCallback((): number => unitRef.current || measure(), [measure]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, mode]);

  useEffect(() => {
    if (mode !== 'guided') {
      // Free scroll: no easing. u still follows the raw scroll so chrome (header morph) stays in sync.
      const onScroll = () => {
        uRef.current = window.scrollY / unit();
        listeners.current.forEach((cb) => cb());
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    // Start where the page already is (reload, back navigation) instead of easing in from the top.
    uRef.current = Math.min(TOTAL_SCREENS, window.scrollY / unit());
    listeners.current.forEach((cb) => cb());
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const target = Math.min(TOTAL_SCREENS, window.scrollY / unit());
      const gap = target - uRef.current;
      // Ease toward the target, and settle exactly on it once it is within a hair, so the loop goes quiet.
      if (Math.abs(gap) > SETTLE_EPSILON) {
        uRef.current =
          Math.abs(gap) < SNAP_DISTANCE ? target : lerpStep(uRef.current, target, dt, SCROLL_LERP);
        listeners.current.forEach((cb) => cb());
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, unit]);

  const store = useMemo<TimelineStore>(
    () => ({
      get: () => uRef.current,
      subscribe: (cb) => {
        listeners.current.add(cb);
        return () => listeners.current.delete(cb);
      },
      navigate: (id) => {
        const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';
        if (mode === 'guided') {
          window.scrollTo({ top: timeline.chapters[id] * unit(), behavior });
        } else {
          document.getElementById(`chapter-${id}`)?.scrollIntoView({ behavior });
        }
      },
    }),
    [mode, reducedMotion, unit],
  );

  return <TimelineContext.Provider value={store}>{children}</TimelineContext.Provider>;
}

function useStore(): TimelineStore {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error('Timeline hooks must be used inside <TimelineProvider>');
  return ctx;
}

/** The eased scroll position in screens. Re-renders on change; scenes read it and derive everything. */
export function useU(): number {
  const store = useStore();
  return useSyncExternalStore(store.subscribe, store.get, () => 0);
}

/**
 * Subscribe to a derived value of u. Re-renders only when the selected primitive changes,
 * so chrome that cares about one threshold does not re-render every frame.
 */
export function useUSelect<T extends string | number | boolean>(select: (u: number) => T): T {
  const store = useStore();
  return useSyncExternalStore(
    store.subscribe,
    () => select(store.get()),
    () => select(0),
  );
}

/** Travel to a chapter (smooth scroll; instant under reduced motion). */
export function useNavigate(): (id: ChapterId) => void {
  return useStore().navigate;
}

export default TimelineProvider;
