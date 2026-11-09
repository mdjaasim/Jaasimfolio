'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { timeline } from '@/config/timeline';
import { caseStudies, photos, t } from '@/content';
import { chrome } from '@/engine/chrome';
import { ease, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './work.module.css';

/** 04 Work: typographic rows; hovering dims the rest and a photograph follows the pointer. Choosing a row opens its case study. */
export function Work({ u }: { u: number }) {
  const copy = t().work;
  const [hovered, setHovered] = useState<number | null>(null);
  const [lastHovered, setLastHovered] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const [lo, hi] = timeline.work.visible;
  if (u <= lo || u >= hi) return null;

  const follow = (x: number, y: number) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.setProperty('--px', `${x}px`);
    el.style.setProperty('--py', `${y}px`);
  };

  const active = hovered !== null;
  const preview = caseStudies[lastHovered];

  return (
    <Frame style={{ zIndex: 5 }}>
      <div onPointerMove={(e) => follow(e.clientX, e.clientY)} className={styles.scene}>
        <span className={`label muted ${styles.label}`}>{copy.label}</span>
        <ul className={styles.list}>
          {caseStudies.map((c, i) => {
            const { start, stagger, duration } = {
              start: timeline.work.rowsStart,
              stagger: timeline.work.rowStagger,
              duration: timeline.work.rowDuration,
            };
            const e = ease(seg(u, [start + i * stagger, start + duration + i * stagger]));
            return (
              <li
                key={c.slug}
                style={{ opacity: round2(e), transform: `translateY(${sp((1 - e) * 160)})` }}
              >
                <button
                  type="button"
                  className={styles.row}
                  data-cursor="view"
                  style={{ opacity: active && hovered !== i ? 0.3 : 1 }}
                  onPointerEnter={() => {
                    setHovered(i);
                    setLastHovered(i);
                  }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => {
                    setHovered(i);
                    setLastHovered(i);
                  }}
                  onBlur={() => setHovered(null)}
                  onClick={() => chrome.openCase(i)}
                >
                  <span className="label muted">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={styles.title}
                    style={{ transform: hovered === i ? `translateX(${sp(16)})` : 'none' }}
                  >
                    {c.title}
                  </span>
                  <span className={`label muted ${styles.meta}`}>{c.summary}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div ref={previewRef} className={styles.preview} data-on={active} aria-hidden="true">
        {caseStudies.map((c, i) => (
          <Image
            key={c.slug}
            src={photos[c.cover].src}
            alt=""
            fill
            sizes="20vw"
            className={styles.previewImg}
            style={{ opacity: i === lastHovered ? 1 : 0 }}
          />
        ))}
        <span className={styles.previewCaption}>{preview?.title}</span>
      </div>
    </Frame>
  );
}

export default Work;
