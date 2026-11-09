/** localStorage/sessionStorage can throw (private mode, blocked data) or be absent; never rely on it. */
export function readStorage(kind: 'local' | 'session', key: string): string | null {
  try {
    const store = kind === 'local' ? window.localStorage : window.sessionStorage;
    return store.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(kind: 'local' | 'session', key: string, value: string): void {
  try {
    const store = kind === 'local' ? window.localStorage : window.sessionStorage;
    store.setItem(key, value);
  } catch {
    /* optional */
  }
}
