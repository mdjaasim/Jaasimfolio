'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { defaultMode, mediaQueries, storageKeys, type Mode } from '@/config/preferences';
import { readStorage, writeStorage } from './storage';
import { useMediaQuery } from './use-media-query';

interface ModeValue {
  /** What the visitor chose (stored). */
  preference: Mode;
  /** What actually runs: reduced motion forces free scroll. */
  mode: Mode;
  setPreference: (mode: Mode) => void;
  reducedMotion: boolean;
  isMobile: boolean;
  finePointer: boolean;
}

const ModeContext = createContext<ModeValue | null>(null);

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const parse = (raw: string | null): Mode =>
  raw === 'free' || raw === 'guided' ? raw : defaultMode;
const getSnapshot = (): Mode => parse(readStorage('local', storageKeys.mode));

export function ModeProvider({ children }: { children: ReactNode }) {
  const preference = useSyncExternalStore(subscribe, getSnapshot, () => defaultMode);
  const reducedMotion = useMediaQuery(mediaQueries.reducedMotion);
  const isMobile = useMediaQuery(mediaQueries.mobile);
  const finePointer = useMediaQuery(mediaQueries.finePointer);

  const setPreference = useCallback((mode: Mode) => {
    writeStorage('local', storageKeys.mode, mode);
    listeners.forEach((cb) => cb());
  }, []);

  const value = useMemo<ModeValue>(
    () => ({
      preference,
      mode: reducedMotion ? 'free' : preference,
      setPreference,
      reducedMotion,
      isMobile,
      finePointer,
    }),
    [preference, reducedMotion, setPreference, isMobile, finePointer],
  );
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error('useMode must be used inside <ModeProvider>');
  return ctx;
}

export default ModeProvider;
