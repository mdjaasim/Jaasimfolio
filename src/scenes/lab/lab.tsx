'use client';

import Image from 'next/image';
import { timeline } from '@/config/timeline';
import { photos, t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { useMode } from '@/engine/mode';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './lab.module.css';

/** Where each panel and plate starts along the horizontal track, how far it travels and drifts (design px). */
const DESKTOP = {
  panel: [32, 660, 1290],
  plate: [32, 692, 1322],
  travel: 1260,
  textDrift: 70,
  photoDrift: 90,
} as const;
const MOBILE = {
  panel: [16, 406, 796],
  plate: [16, 406, 796],
  travel: 780,
  textDrift: 40,
  photoDrift: 50,
} as const;

/** 05 Lab: vertical scroll becomes horizontal travel through three experiments. */
export function Lab({ u }: { u: number }) {
  const copy = t().lab;
  const { isMobile } = useMode();
  const g = isMobile ? MOBILE : DESKTOP;
  const [lo, hi] = timeline.lab.visible;
  if (u <= lo || u >= hi) return null;

  const travel = seg(u, timeline.lab.travel);
  const fade = ease(seg(u, timeline.lab.fadeIn));

  return (
    <Frame className={styles.clip} style={{ zIndex: 7, color: 'var(--on-ink)' }}>
      <div
        className={styles.track}
        style={{ opacity: round2(fade), transform: `translateX(${sp(-travel * g.travel)})` }}
      >
        {copy.items.map((item, i) => (
          <div key={item.title.join(' ')}>
            <article className={styles.panel} style={{ left: sp(g.panel[i] ?? 0) }}>
              <span className="label muted-on-ink">{`${String(i + 1).padStart(2, '0')} / ${String(copy.items.length).padStart(2, '0')}`}</span>
              <h2
                className={styles.title}
                style={{ transform: `translateX(${sp(-travel * g.textDrift)})` }}
              >
                {item.title.map((line, k) => (
                  <span key={k}>
                    {line}
                    {k < item.title.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <p className={styles.body}>{item.body}</p>
              <p className={styles.stack}>{item.stack}</p>
            </article>
            <div className={styles.plate} style={{ left: sp(g.plate[i] ?? 0) }}>
              <Image
                src={photos[item.photo].src}
                alt=""
                fill
                sizes="40vw"
                className={styles.plateImg}
                style={{
                  width: `calc(100% + ${sp(g.photoDrift)})`,
                  transform: `translateX(${sp(-travel * g.photoDrift)})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export default Lab;
