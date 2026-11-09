'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Phone } from '@/components/phone/phone';
import { NameField } from '@/components/name-field/name-field';
import { copyFeedbackMs } from '@/config/motion';
import { site } from '@/config/site';
import { timeline } from '@/config/timeline';
import { caseStudies, fill, photos, t } from '@/content';
import { chrome } from '@/engine/chrome';
import { useGreeting } from '@/engine/greeting';
import { useClock } from '@/engine/use-clock';
import type { Beat, Brand } from '@/scenes/phone-track';
import { Reveal } from './reveal';
import { useCountUp } from './use-count-up';
import { useReveal } from './use-reveal';
import styles from './free.module.css';

const SETTLED_SHEET_U = timeline.craft.sheet[1] + 0.2;
const BEAT_BRAND: Record<Beat, Brand> = { 1: 1, 2: 1, 3: 1, 4: 1 };
const HERO_LETTER_STEP_MS = 40;

function Hello() {
  const copy = t().hello;
  const { name, greeted } = useGreeting();
  return (
    <section id="chapter-hello" data-tone="light" className={`${styles.sec} ${styles.hello}`}>
      <p className="visually-hidden" role="status">
        {name ? `${copy.wordNamed} ${name}.` : ''}
      </p>
      <div className={styles.helloRow}>
        <p className={styles.helloWord}>
          {greeted ? (name ? copy.wordNamed : copy.wordAnon) : copy.word}
        </p>
        {greeted ? name && <p className={styles.helloName}>{`${name}.`}</p> : <NameField />}
      </div>
      {greeted && <p className={styles.sub}>{copy.intro}</p>}
    </section>
  );
}

function Hero() {
  const copy = t().hero;
  const letters = (word: string, offset: number) =>
    [...word].map((c, i) => (
      <span
        key={i}
        style={{ animationDelay: `${(offset + i) * HERO_LETTER_STEP_MS}ms` }}
        className={styles.heroLetter}
      >
        {c}
      </span>
    ));
  return (
    <section data-tone="light" className={`${styles.sec} ${styles.hero}`}>
      <p aria-hidden="true" className={styles.heroName}>
        {letters(copy.first, 0)}
      </p>
      <p aria-hidden="true" className={`${styles.heroName} ${styles.heroLast}`}>
        {letters(copy.last, copy.first.length)}
      </p>
      <Reveal as="p" className={styles.sub}>
        {copy.sub.before}
        <span className="highlight">{copy.sub.accent}</span>
        {copy.sub.after}
      </Reveal>
      <Reveal as="p" className={`${styles.strip} label muted`} delay={120}>
        {copy.strip.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </Reveal>
    </section>
  );
}

function Craft() {
  const copy = t().craft;
  return (
    <section id="chapter-craft" data-tone="dark" className={`${styles.sec} ${styles.dark}`}>
      <p aria-hidden="true" className={styles.ghost} data-word={copy.ghost} />
      <h2 className="visually-hidden">{copy.label}</h2>
      {copy.beats.map((b, i) => {
        const beat = (i + 1) as Beat;
        return (
          <Reveal as="article" key={b.nav} className={styles.beat}>
            <div>
              <span className={`label ${styles.onInkMuted}`}>
                {copy.label} · {copy.beatWord} 0{beat}
              </span>
              <h3 className={styles.beatHeading}>
                {b.pre}
                <span className="highlight">{b.accent}</span>
              </h3>
              <p className={styles.beatBody}>{b.body}</p>
            </div>
            <div className={styles.phoneBox}>
              <Phone screen={beat} brand={BEAT_BRAND[beat]} u={SETTLED_SHEET_U} />
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}

function Counter({ item }: { item: { value: number; title: string; body: string } }) {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.4);
  const value = useCountUp(item.value, revealed);
  return (
    <div ref={ref} className={styles.counter}>
      <p className={styles.counterValue}>
        <span aria-hidden="true">{value}</span>
        <span className="visually-hidden">{item.value}</span>
      </p>
      <p className={styles.counterBody}>
        <b className="label muted">{item.title}</b>
        {item.body}
      </p>
    </div>
  );
}

function Numbers() {
  const copy = t().numbers;
  return (
    <section id="chapter-numbers" data-tone="light" className={styles.sec}>
      <h2 className="visually-hidden">{copy.label}</h2>
      <div className={styles.counters}>
        {copy.items.map((item) => (
          <Counter key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function Work() {
  const copy = t().work;
  return (
    <section id="chapter-work" data-tone="light" className={styles.sec}>
      <span className={`label muted ${styles.sectionLabel}`}>{copy.label}</span>
      <ul className={styles.workList}>
        {caseStudies.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 60}>
            <button
              type="button"
              className={styles.workRow}
              data-cursor="view"
              onClick={() => chrome.openCase(i)}
            >
              <span className="label muted">{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.workTitle}>{c.title}</span>
              <span className={`label muted ${styles.workMeta}`}>{c.summary}</span>
            </button>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Lab() {
  const copy = t().lab;
  return (
    <section id="chapter-lab" data-tone="dark" className={`${styles.sec} ${styles.dark}`}>
      <span className={`label ${styles.onInkMuted} ${styles.sectionLabel}`}>{copy.label}</span>
      {copy.items.map((item, i) => (
        <Reveal as="article" key={item.title.join(' ')} className={styles.labItem}>
          <div>
            <span
              className={`label ${styles.onInkMuted}`}
            >{`${String(i + 1).padStart(2, '0')} / ${String(copy.items.length).padStart(2, '0')}`}</span>
            <h3 className={styles.labTitle}>{item.title.join(' ')}</h3>
            <p className={styles.labBody}>{item.body}</p>
            <p className={`label ${styles.labStack}`}>{item.stack}</p>
          </div>
          <div className={styles.plate}>
            <Image
              src={photos[item.photo].src}
              alt=""
              fill
              sizes="(max-width: 767px), (max-aspect-ratio: 1/1) 100vw, 45vw"
              className={styles.plateImg}
            />
          </div>
        </Reveal>
      ))}
    </section>
  );
}

function Path() {
  const copy = t().path;
  return (
    <section id="chapter-path" data-tone="light" className={styles.sec}>
      <span className={`label muted ${styles.sectionLabel}`}>{copy.label}</span>
      <ol className={styles.timeline}>
        {copy.entries.map((e, i) => (
          <Reveal as="li" key={e.title} className={styles.entry}>
            <span className={`label muted ${styles.entryDate}`}>{e.date}</span>
            <h3 className={styles.entryTitle} data-major={i === copy.entries.length - 1}>
              {e.title}
            </h3>
            <span className="label muted">{e.role}</span>
            <p className={styles.entryBody}>{e.body}</p>
            {i === copy.entries.length - 1 && (
              <ul className={styles.fuze}>
                {copy.fuze.map((m) => (
                  <li key={m.cat}>
                    <span className="label">{m.cat}</span>
                    <p>{m.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
      <p className={`label muted ${styles.edu}`}>{copy.education}</p>
    </section>
  );
}

function Marquee({ words, reverse }: { words: readonly string[]; reverse?: boolean }) {
  // The second row starts outlined so the two rows interleave solid and outline.
  const list = [...words, ...words, ...words, ...words];
  return (
    <div aria-hidden="true" className={styles.marquee} data-reverse={reverse}>
      <div className={styles.marqueeTrack}>
        {list.map((w, i) => (
          <span key={i}>
            <span className={(i % 2 === 1) !== Boolean(reverse) ? styles.outline : undefined}>
              {w}
            </span>
            <em>/</em>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const copy = t().about;
  return (
    <section id="chapter-about" data-tone="light" className={styles.sec}>
      <Reveal className={styles.aboutGrid}>
        <div className={styles.portrait}>{copy.portraitSlot}</div>
        <div>
          <span className="label muted">{copy.label}</span>
          <h2 className={styles.aboutHeading}>
            {copy.bio.before}
            <span className="highlight">{copy.bio.accent}</span>
            {copy.bio.after}
          </h2>
          <p className={styles.aboutEdu}>{copy.education}</p>
        </div>
      </Reveal>
      <Marquee words={copy.marqueeTop} />
      <Marquee words={copy.marqueeBottom} reverse />
    </section>
  );
}

function Contact() {
  const copy = t().contact;
  const { name } = useGreeting();
  const clock = useClock(site.timeZone);
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), copyFeedbackMs);
    } catch {
      /* clipboard can be blocked; the address stays visible */
    }
  };

  return (
    <section id="chapter-contact" data-tone="yellow" className={`${styles.sec} ${styles.yellow}`}>
      <Reveal>
        <span className="label">{name ? fill(copy.thanksNamed, { name }) : copy.thanksAnon}</span>
        <h2 className={styles.contactHeading}>
          {copy.lines.join(' ')} <span className={styles.accent}>{copy.accent}</span>
        </h2>
      </Reveal>
      <Reveal delay={120} className={styles.contactRow}>
        <a
          className={styles.cta}
          data-cursor-tone="yellow"
          data-cursor="link"
          href={`mailto:${site.email}`}
        >
          {copy.cta}
        </a>
        <div className={styles.contactLinks}>
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
      </Reveal>
      <p className={`label ${styles.foot}`}>
        <span>
          {copy.local} {clock}
        </span>
        <span>{copy.credit}</span>
      </p>
    </section>
  );
}

/** Free scroll: the same chapters as ordinary sections. No pin, no lerp, no parallax; content eases in once. */
export function FreeSite() {
  const root = useRef<HTMLDivElement>(null);

  // Tell the header and cursor which ground sits under the header.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const sections = root.current?.querySelectorAll<HTMLElement>('[data-tone]') ?? [];
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= 48 && r.bottom > 48) {
          chrome.setTone((s.dataset.tone as 'light' | 'dark' | 'yellow') ?? 'light');
          return;
        }
      }
      chrome.setTone('light');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      chrome.setTone('light');
    };
  }, []);

  return (
    <div ref={root} className={styles.free}>
      <Hello />
      <Hero />
      <Craft />
      <Numbers />
      <Work />
      <Lab />
      <Path />
      <About />
      <Contact />
    </div>
  );
}

export default FreeSite;
