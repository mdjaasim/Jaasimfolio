'use client';

import { useSyncExternalStore } from 'react';

/** Which full-screen overlays are open. A tiny external store so the cursor and header can react without prop drilling. */
interface ChromeState {
  indexOpen: boolean;
  /** Index into the case studies, or null when closed. */
  caseOpen: number | null;
}

let state: ChromeState = { indexOpen: false, caseOpen: null };
const listeners = new Set<() => void>();

const set = (next: Partial<ChromeState>) => {
  state = { ...state, ...next };
  listeners.forEach((cb) => cb());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const chrome = {
  setIndexOpen: (open: boolean) => set({ indexOpen: open }),
  openCase: (index: number) => set({ caseOpen: index }),
  closeCase: () => set({ caseOpen: null }),
  get: () => state,
};

export function useChrome<T>(select: (s: ChromeState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(state),
    () => select({ indexOpen: false, caseOpen: null }),
  );
}

export const anyOverlayOpen = (s: ChromeState): boolean => s.indexOpen || s.caseOpen !== null;
