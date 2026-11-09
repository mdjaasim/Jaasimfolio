'use client';

import { useEffect, useRef, useState } from 'react';
import { timeline } from '@/config/timeline';
import { site } from '@/config/site';
import { fill, t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { useGreeting } from '@/engine/greeting';
import { useClock } from '@/engine/use-clock';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './contact.module.css';

const LINE_STAGGER = 0.12;
const LINE_SPAN = 0.5;
const COPIED_MS = 2400;

/** Overshoot for the Say hello circle (a soft "back" ease). */
const back = (t01: number): number => 1 + 2.7 * Math.pow(t01 - 1, 3) + 1.7 * Math.pow(t01 - 1, 2);

/** 08 Contact: the ground floods yellow, the headline reveals line by line, the circle scales in. */
export function Contact({ u }: { u: number }) {
  const copy = t().contact;
  const { name } = useGreeting();
  const clock = useClock(site.timeZone);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (u <= timeline.contact.visible) return null;

  const rise = (i: number) =>
    round2(
      (1 -
        ease(
          seg(u, [
            timeline.contact.lines + i * LINE_STAGGER,
            timeline.contact.lines + LINE_SPAN + i * LINE_STAGGER,
          ]),
        )) *
        115,
    );
  const bt = seg(u, timeline.contact.button);
  const op = round2(bt);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
    } catch {
      /* clipboard can be blocked; the address is still visible and selectable */
    }
  };

  return (
    <Frame style={{ zIndex: 11, color: 'var(--on-yellow)' }}>
      <span className={`label ${styles.thanks}`} style={{ opacity: op }}>
        {name ? fill(copy.thanksNamed, { name }) : copy.thanksAnon}
      </span>
      <h2 className={styles.headline}>
        {[copy.lines[0], copy.lines[1]].map((line, i) => (
          <span key={line} className={styles.mask}>
            <span style={{ transform: `translateY(${rise(i)}%)` }}>{line}</span>
          </span>
        ))}
        <span className={`${styles.mask} ${styles.maskAccent}`}>
          <span style={{ transform: `translateY(${rise(2)}%)` }}>
            <span className={styles.accent}>{copy.accent}</span>
          </span>
        </span>
      </h2>
      <a
        className={styles.cta}
        data-cursor-tone="yellow"
        data-cursor="link"
        href={`mailto:${site.email}`}
        style={{ transform: `scale(${round2(0.4 + 0.6 * back(bt))})` }}
      >
        {copy.cta}
      </a>

      <div className={styles.links} style={{ opacity: op }}>
        <button type="button" className="text-link" data-cursor="link" onClick={copyEmail}>
          {site.email}
        </button>
        <span className={styles.copied} data-on={copied} role="status">
          {copied ? copy.copied : ''}
        </span>
        <a
          className="text-link"
          data-cursor="link"
          href={site.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          {copy.linkedin}
        </a>
        <a
          className="text-link"
          data-cursor="link"
          href={site.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          {copy.github}
        </a>
      </div>
      <p className={`label ${styles.foot}`} style={{ opacity: op, left: sp(32) }}>
        <span>
          {copy.local} {clock}
        </span>
        <span>{copy.credit}</span>
      </p>
    </Frame>
  );
}

export default Contact;
