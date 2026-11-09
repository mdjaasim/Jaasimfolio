import Image from 'next/image';
import { timeline } from '@/config/timeline';
import { photos, t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './lab.module.css';

/** Where each panel and plate starts along the horizontal track (design px). */
const PANEL_X = [32, 660, 1290] as const;
const PLATE_X = [32, 692, 1322] as const;
const TRAVEL = 1260;
const TEXT_DRIFT = 70;
const PHOTO_DRIFT = 90;

/** 05 Lab: vertical scroll becomes horizontal travel through three experiments. */
export function Lab({ u }: { u: number }) {
  const copy = t().lab;
  const [lo, hi] = timeline.lab.visible;
  if (u <= lo || u >= hi) return null;

  const travel = seg(u, timeline.lab.travel);
  const fade = ease(seg(u, timeline.lab.fadeIn));

  return (
    <Frame className={styles.clip} style={{ zIndex: 7, color: 'var(--on-ink)' }}>
      <div
        className={styles.track}
        style={{ opacity: round2(fade), transform: `translateX(${sp(-travel * TRAVEL)})` }}
      >
        {copy.items.map((item, i) => (
          <div key={item.title.join(' ')}>
            <article className={styles.panel} style={{ left: sp(PANEL_X[i] ?? 0) }}>
              <span className="label muted-on-ink">{`${String(i + 1).padStart(2, '0')} / ${String(copy.items.length).padStart(2, '0')}`}</span>
              <h2
                className={styles.title}
                style={{ transform: `translateX(${sp(-travel * TEXT_DRIFT)})` }}
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
            <div className={styles.plate} style={{ left: sp(PLATE_X[i] ?? 0) }}>
              <Image
                src={photos[item.photo].src}
                alt=""
                fill
                sizes="40vw"
                className={styles.plateImg}
                style={{
                  width: `calc(100% + ${sp(PHOTO_DRIFT)})`,
                  transform: `translateX(${sp(-travel * PHOTO_DRIFT)})`,
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
