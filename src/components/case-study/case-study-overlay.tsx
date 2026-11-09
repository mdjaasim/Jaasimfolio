'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { overlay } from '@/config/motion';
import { caseStudies, photos, t, type CaseStudy } from '@/content';
import { chrome, useChrome } from '@/engine/chrome';
import { usePresence } from '@/engine/presence';
import styles from './case-study-overlay.module.css';

const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])';
const NEXT_START_DELAY_MS = 60;

function CasePage({
  study,
  next,
  layerStyle,
  onClose,
  onNext,
}: {
  study: CaseStudy;
  next: CaseStudy;
  layerStyle: CSSProperties;
  onClose: () => void;
  onNext: () => void;
}) {
  const copy = t().work;
  const index = caseStudies.indexOf(study);
  const total = caseStudies.length;
  const caseNo = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const { fontSize, lineHeight } = study.titleSize;

  return (
    <div className={styles.layer} style={layerStyle}>
      <section className={styles.cover}>
        <div className="frame">
          <span className={`label ${styles.caseNo}`}>
            {copy.caseLabel} · {caseNo}
          </span>
          <Image
            className={styles.coverImg}
            src={photos[study.cover].src}
            alt=""
            width={1600}
            height={1000}
            priority
          />
          <Image
            className={styles.phoneImg}
            src={photos[study.phone].src}
            alt=""
            width={1600}
            height={1000}
            priority
          />
          <h2
            className={styles.title}
            style={{
              fontSize: `calc(${fontSize} * var(--s))`,
              lineHeight: `calc(${lineHeight} * var(--s))`,
              ['--title-mobile' as string]: study.titleSizeMobile,
            }}
          >
            {study.title}
          </h2>
          <button
            type="button"
            className={styles.back}
            data-cursor="link"
            data-autofocus
            onClick={onClose}
          >
            {copy.back}
          </button>
        </div>
      </section>

      <section className={styles.body}>
        <dl className={styles.meta}>
          <dt>{copy.roles}</dt>
          <dd>{study.role}</dd>
          <dt>{copy.stack}</dt>
          <dd>{study.stack}</dd>
          {study.year && (
            <>
              <dt>{copy.year}</dt>
              <dd>{study.year}</dd>
            </>
          )}
          {study.liveUrl && (
            <>
              <dt>{copy.live}</dt>
              <dd>
                <a
                  href={study.liveUrl}
                  data-cursor="link"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {study.liveUrl.replace(/^https?:\/\//, '')} →
                </a>
              </dd>
            </>
          )}
          <dd>
            <button type="button" className={styles.link} data-cursor="link" onClick={onClose}>
              {copy.back}
            </button>
          </dd>
        </dl>
        <div className={styles.story}>
          <div className={styles.section}>
            <h3>{copy.problem}</h3>
            <p>{study.problem}</p>
          </div>
          <div className={styles.section}>
            <h3>{copy.built}</h3>
            <p>{study.built}</p>
          </div>
          <div className={styles.section}>
            <h3>{copy.outcome}</h3>
            <p>{study.outcome}</p>
          </div>
          <div className={styles.gallery}>
            <Image src={photos[study.phone].src} alt="" width={1600} height={1000} loading="lazy" />
            <Image
              src={photos[study.gallery].src}
              alt=""
              width={1600}
              height={1000}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <button type="button" className={styles.next} data-cursor="link" onClick={onNext}>
        <span className={`label ${styles.nextLabel}`}>{copy.next}</span>
        <span className={styles.nextTitle}>{next.title}</span>
      </button>
    </div>
  );
}

/** A case study that expands from the Work row; the next project slides up over the current one. */
export function CaseStudyOverlay() {
  const open = useChrome((s) => s.caseOpen);
  const isOpen = open !== null;
  const { mounted, entered } = usePresence(isOpen, overlay.unmountDelayMs);
  const [shown, setShown] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Show whichever case was opened (derived during render, as React recommends).
  if (open !== null && open !== shown && incoming === null) setShown(open);

  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(
      () =>
        rootRef.current
          ?.querySelector<HTMLElement>('[data-autofocus]')
          ?.focus({ preventScroll: true }),
      120,
    );
    return () => {
      window.clearTimeout(id);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  // Esc closes from anywhere, even when focus was lost with the layer that just slid away.
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && chrome.closeCase();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen]);

  // After the next project has slid in, put focus back inside the dialog.
  useEffect(() => {
    if (isOpen && incoming === null)
      rootRef.current
        ?.querySelector<HTMLElement>('[data-autofocus]')
        ?.focus({ preventScroll: true });
  }, [shown, incoming, isOpen]);

  const onNext = useCallback(() => {
    if (incoming !== null) return;
    const n = (shown + 1) % caseStudies.length;
    setIncoming(n);
    setSliding(false);
    window.setTimeout(() => setSliding(true), NEXT_START_DELAY_MS);
    window.setTimeout(() => {
      setShown(n);
      setIncoming(null);
      setSliding(false);
      chrome.openCase(n);
    }, overlay.caseSwapMs);
  }, [incoming, shown]);

  if (!mounted) return null;

  const study = caseStudies[shown] ?? caseStudies[0]!;
  const nextOf = (i: number) => caseStudies[(i + 1) % caseStudies.length]!;
  const slide = `transform ${overlay.caseSlideMs}ms var(--ease-reveal)`;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
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

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={study.title}
      className={styles.root}
      data-entered={entered}
      onKeyDown={onKeyDown}
    >
      <CasePage
        key={shown}
        study={study}
        next={nextOf(shown)}
        layerStyle={
          incoming !== null
            ? { transform: `translateY(${sliding ? -14 : 0}%)`, transition: slide }
            : {}
        }
        onClose={chrome.closeCase}
        onNext={onNext}
      />
      {incoming !== null && (
        <CasePage
          key={incoming}
          study={caseStudies[incoming]!}
          next={nextOf(incoming)}
          layerStyle={{
            zIndex: 2,
            transform: `translateY(${sliding ? 0 : 100}%)`,
            transition: slide,
          }}
          onClose={chrome.closeCase}
          onNext={() => {}}
        />
      )}
    </div>
  );
}

export default CaseStudyOverlay;
