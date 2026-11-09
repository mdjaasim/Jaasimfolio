'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { storageKeys } from '@/config/preferences';
import { readStorage, writeStorage } from './storage';

export const NAME_MAX_LENGTH = 18;

/** Keep letters (any script), marks, apostrophes, hyphens and spaces; cap the length. */
export function sanitizeName(raw: string): string {
  return raw.replace(/[^\p{L}\p{M}' -]/gu, '').slice(0, NAME_MAX_LENGTH);
}

interface GreetingValue {
  /** What is typed right now. */
  draft: string;
  setDraft: (value: string) => void;
  /** The committed name, or '' when the visitor skipped it. */
  name: string;
  /** True once the question has been answered: by Enter, by leaving the field, or by scrolling on. */
  greeted: boolean;
  commit: () => void;
  skip: () => void;
}

const GreetingContext = createContext<GreetingValue | null>(null);

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const stored = (): string => sanitizeName(readStorage('local', storageKeys.name) ?? '').trim();

/** The visitor's first name, kept only in their own browser; it returns in Contact. */
export function GreetingProvider({ children }: { children: ReactNode }) {
  const savedName = useSyncExternalStore(subscribe, stored, () => '');
  const [draft, setDraftState] = useState('');
  const [skipped, setSkipped] = useState(false);
  const [committed, setCommitted] = useState('');

  const name = committed || savedName;
  const greeted = Boolean(name) || skipped;

  const setDraft = useCallback((value: string) => setDraftState(sanitizeName(value)), []);
  const commit = useCallback(() => {
    const clean = draft.trim();
    if (!clean) return;
    setCommitted(clean);
    writeStorage('local', storageKeys.name, clean);
    listeners.forEach((cb) => cb());
  }, [draft]);
  const skip = useCallback(() => setSkipped(true), []);

  const value = useMemo<GreetingValue>(
    () => ({ draft, setDraft, name, greeted, commit, skip }),
    [draft, setDraft, name, greeted, commit, skip],
  );
  return <GreetingContext.Provider value={value}>{children}</GreetingContext.Provider>;
}

export function useGreeting(): GreetingValue {
  const ctx = useContext(GreetingContext);
  if (!ctx) throw new Error('useGreeting must be used inside <GreetingProvider>');
  return ctx;
}

export default GreetingProvider;
