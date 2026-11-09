'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { launchCutTimes } from '@/config/launch-schedule';
import { launch } from '@/config/motion';
import { site } from '@/config/site';
import { launchPhotoOrder, photos, t } from '@/content';
import { useMode } from '@/engine/mode';
import { sp } from '@/engine/units';
import { Logo } from '@/components/logo/logo';
import styles from './launch.module.css';

interface LaunchProps {
  /** Called when the curtain has lifted and the page underneath is ready. */
  onDone: () => void;
}

const PHOTO_STRIDE = 5;
const PHOTO_OFFSET = 1;

const sec = (ms: number): string => `${(ms / 1000).toFixed(2)}s`;

/** Ten calm word+photo pairs, black closing from top and bottom while the cut accelerates, then the name is written. */
export function Launch({ onDone }: LaunchProps) {
  const copy = t();
  const { reducedMotion, isMobile } = useMode();
  const [cut, setCut] = useState(0);
  const [nameSize, setNameSize] = useState<number | null>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const cutTimes = useMemo(() => launchCutTimes(), []);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  // Lock scroll while it plays and warm the photographs.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    launchPhotoOrder.forEach((id) => {
      const img = new window.Image();
      img.src = photos[id].src;
    });
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const id = window.setTimeout(() => onDoneRef.current(), launch.reducedMotionMs);
      return () => window.clearTimeout(id);
    }
    const timers = cutTimes.map((end, i) =>
      window.setTimeout(() => setCut(i + 1 < cutTimes.length ? i + 1 : -1), end),
    );
    timers.push(window.setTimeout(() => onDoneRef.current(), launch.readyMs));
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion, cutTimes]);

  // Fit "MOHAMED JAASIM" fully on screen: scale the type so the line takes a set share of the width.
  useEffect(() => {
    if (reducedMotion) return;
    const fit = () => {
      const el = nameRef.current;
      if (!el) return;
      const width = el.scrollWidth;
      if (!width) return;
      const current = parseFloat(getComputedStyle(el).fontSize);
      const share = isMobile ? launch.nameWidthShareMobile : launch.nameWidthShare;
      setNameSize((prev) => {
        const next = Math.floor((current * window.innerWidth * share) / width);
        return prev !== null && Math.abs(prev - next) <= 1 ? prev : next;
      });
    };
    const ids = launch.fitRetriesMs.map((ms) => window.setTimeout(fit, ms));
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => {
      ids.forEach(window.clearTimeout);
      window.removeEventListener('resize', fit);
    };
  }, [reducedMotion, isMobile]);

  if (reducedMotion) {
    return (
      <div className={styles.root} data-reduced="true">
        <div className={styles.reduced}>
          <Logo size="calc(40 * var(--s))" />
        </div>
      </div>
    );
  }

  const wordIndex = Math.floor(Math.max(cut, 0) / 2);
  const word = copy.launch.words[wordIndex % copy.launch.words.length] ?? '';
  const photo =
    photos[
      launchPhotoOrder[(wordIndex * PHOTO_STRIDE + PHOTO_OFFSET) % launchPhotoOrder.length] ??
        'ai-network'
    ];
  const fit = isMobile ? launch.word.mobile : launch.word.desktop;
  const wordSize = Math.min(
    fit.max,
    Math.floor(fit.width / (word.length * launch.word.widthPerChar)),
  );
  const showWord = cut >= 0 && cut % 2 === 0;
  const showPhoto = cut >= 0 && cut % 2 === 1;

  const vars = {
    '--shutter-start': sec(launch.shutterStartMs),
    '--shutter-dur': sec(launch.shutterDurationMs),
    '--guide-fade': sec(launch.guideFadeMs),
    '--tags-at': sec(launch.tagsMs),
    '--curtain-at': sec(launch.curtainStartMs),
    '--curtain-dur': sec(launch.curtainDurationMs),
  } as CSSProperties;

  return (
    <div className={styles.root} style={vars} aria-hidden="true">
      {showWord && (
        <div className={styles.word} style={{ fontSize: sp(wordSize) }}>
          {word}
        </div>
      )}
      {showPhoto && (
        <div className={styles.photo}>
          <Image
            key={cut}
            src={photo.src}
            alt=""
            fill
            sizes="100vw"
            priority
            className={styles.photoImg}
            unoptimized
          />
          <span className={styles.caption}>{photo.caption}</span>
        </div>
      )}

      <div className={`${styles.shutter} ${styles.shutterTop}`} />
      <div className={`${styles.shutter} ${styles.shutterBottom}`} />
      {cut >= 0 && <span className={styles.count}>{String(cut + 1).padStart(2, '0')}</span>}

      <div className={styles.guides}>
        {launch.guides.map((g, i) => (
          <span
            key={i}
            className={`${styles.guide} ${g.axis === 'h' ? styles.guideH : styles.guideV}`}
            style={
              {
                [g.axis === 'h' ? 'top' : 'left']: `${g.at}%`,
                ['--delay' as string]: sec(launch.guidesStartMs + i * launch.guideStaggerMs),
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.nameWrap}>
        <div className={styles.nameBox}>
          <div
            ref={nameRef}
            className={styles.name}
            style={nameSize ? { fontSize: nameSize } : undefined}
          >
            {[...copy.launch.name].map((c, i) => {
              const ch = c === ' ' ? ' ' : c;
              return (
                <span key={i} className={styles.letter}>
                  <span
                    className={styles.outline}
                    style={
                      {
                        ['--delay' as string]: sec(
                          launch.lettersStartMs + i * launch.letterStaggerMs,
                        ),
                      } as CSSProperties
                    }
                  >
                    {ch}
                  </span>
                  <span
                    className={styles.fill}
                    style={
                      {
                        ['--delay' as string]: sec(
                          launch.lettersStartMs + launch.fillOffsetMs + i * launch.letterStaggerMs,
                        ),
                      } as CSSProperties
                    }
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
          </div>
          <span
            className={`${styles.name} ${styles.tag} ${styles.tagL}`}
            style={nameSize ? { fontSize: nameSize } : undefined}
          >
            {copy.launch.tagOpen}
          </span>
          <span
            className={`${styles.name} ${styles.tag} ${styles.tagR}`}
            style={nameSize ? { fontSize: nameSize } : undefined}
          >
            {copy.launch.tagClose}
          </span>
        </div>
      </div>
      <span className="visually-hidden">{site.name}</span>
    </div>
  );
}

export default Launch;
