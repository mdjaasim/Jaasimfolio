'use client';

import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';
import { overlay } from '@/config/motion';
import type { Mode } from '@/config/preferences';
import { site } from '@/config/site';
import { t } from '@/content';
import { currentChapter } from '@/engine/math';
import { useMode } from '@/engine/mode';
import { usePresence } from '@/engine/presence';
import { useNavigate, useU } from '@/engine/timeline';
import { Logo } from '../logo/logo';
import styles from './index-overlay.module.css';

interface IndexOverlayProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])';

/** Full-screen ink overlay: slides up, list rises in, closes the same way. Focus is trapped while open. */
export function IndexOverlay({ open, onClose }: IndexOverlayProps) {
  const copy = t();
  const u = useU();
  const navigate = useNavigate();
  const { preference, setPreference, mode } = useMode();
  const { mounted, entered } = usePresence(open, overlay.unmountDelayMs);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(
      () => panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(),
      60,
    );
    return () => {
      window.clearTimeout(id);
      returnFocus.current?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  const active = mode === 'guided' ? currentChapter(u) : -1;
  const rise = (i: number): CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: `translateY(${entered ? 0 : overlay.itemRisePx}px)`,
    transitionDelay: `${overlay.itemDelayBaseMs + i * overlay.itemStaggerMs}ms`,
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const modes: { value: Mode; label: string; short: string }[] = [
    { value: 'guided', label: copy.index.guided, short: copy.index.guidedShort },
    { value: 'free', label: copy.index.free, short: copy.index.freeShort },
  ];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={copy.header.index}
      className={styles.panel}
      data-entered={entered}
      onKeyDown={onKeyDown}
    >
      <div className={styles.top}>
        <Logo />
        <button
          type="button"
          className={styles.close}
          data-cursor="link"
          data-autofocus
          onClick={onClose}
        >
          {copy.header.close}
        </button>
      </div>

      <ol className={styles.list}>
        {copy.index.chapters.map((chapter, i) => (
          <li key={chapter.id} style={rise(i)} className={styles.item}>
            <button
              type="button"
              className={styles.chapter}
              data-cursor="link"
              aria-current={active === i ? 'true' : undefined}
              onClick={() => {
                onClose();
                window.setTimeout(() => navigate(chapter.id), overlay.travelDelayMs);
              }}
            >
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
              {chapter.label}
            </button>
          </li>
        ))}
      </ol>

      <div
        className={styles.side}
        style={{
          opacity: entered ? 1 : 0,
          transform: `translateY(${entered ? 0 : 30}px)`,
          transitionDelay: `${overlay.sideDelayMs}ms`,
        }}
      >
        <p className={styles.key}>{copy.index.pace}</p>
        <div role="group" aria-label={copy.index.pace} className={styles.switch}>
          {modes.map((m) => (
            <button
              key={m.value}
              type="button"
              className={styles.option}
              data-cursor="link"
              aria-pressed={preference === m.value}
              onClick={() => setPreference(m.value)}
            >
              <span className={styles.long}>{m.label}</span>
              <span className={styles.short}>{m.short}</span>
            </button>
          ))}
        </div>
        <p className={styles.key}>{copy.index.email}</p>
        <p className={styles.value}>
          <a href={`mailto:${site.email}`} data-cursor="link">
            {site.email}
          </a>
        </p>
        <p className={`${styles.key} ${styles.elsewhere}`}>{copy.index.elsewhere}</p>
        <p className={`${styles.value} ${styles.elsewhere}`}>
          <a href={site.linkedin} data-cursor="link">
            {copy.contact.linkedin}
          </a>
          <br />
          <a href={site.github} data-cursor="link">
            {copy.contact.github}
          </a>
        </p>
      </div>
      <p className={styles.hint}>{copy.index.hint}</p>
    </div>
  );
}

export default IndexOverlay;
