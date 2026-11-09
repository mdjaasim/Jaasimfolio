import type { CSSProperties } from 'react';
import { t } from '@/content';
import { ease, seg } from '@/engine/math';
import { timeline } from '@/config/timeline';
import type { Beat, Brand } from '@/scenes/phone-track';
import styles from './phone.module.css';

interface PhoneProps {
  /** Which screen is showing (the Craft beat). */
  screen: Beat;
  /** Brand theme of the bug-report sheet. */
  brand: Brand;
  /** Scroll position, for the sheet that rises on the last beat. */
  u: number;
  style?: CSSProperties;
}

/** The one phone that travels from the hero through Craft. Screens are drawn UI marked as placeholders. */
export function Phone({ screen, brand, u, style }: PhoneProps) {
  const copy = t().phone;
  const sheetRise = (1 - ease(seg(u, timeline.craft.sheet))) * 100;
  const layer = (n: Beat) => ({ className: styles.layer, 'data-on': screen === n });
  return (
    <div className={styles.phone} style={style} aria-hidden="true">
      <div className={styles.screen}>
        <div {...layer(1)}>
          <span className={styles.title}>{copy.workout}</span>
          <div className={styles.days}>
            {copy.days.map((d, i) => (
              <span key={i} className={styles.day} data-on={i === copy.activeDay}>
                {d}
              </span>
            ))}
          </div>
          <div className={styles.list} style={{ top: 'calc(150 * var(--k))' }}>
            {Array.from({ length: copy.blocks }, (_, i) => (
              <div key={i} className={styles.row}>
                {copy.block} {i + 1}
                <i />
              </div>
            ))}
          </div>
          <div className={styles.tab} />
        </div>

        <div {...layer(2)}>
          <span className={styles.title}>{copy.personalisation}</span>
          <div className={styles.video}>{copy.videoClass}</div>
          <div className={styles.list} style={{ top: 'calc(262 * var(--k))' }}>
            {copy.rows.map((r) => (
              <div key={r} className={styles.row}>
                {r}
                <i />
              </div>
            ))}
          </div>
          <div className={styles.tab} />
        </div>

        <div {...layer(3)}>
          <span className={styles.title}>{copy.performance}</span>
          <div className={styles.bars}>
            <i style={{ height: '60%' }} />
            <i style={{ height: '75%' }} />
            <i style={{ height: '90%' }} data-strong="true" />
            <i style={{ height: '90%' }} data-strong="true" />
          </div>
          <div className={styles.axis}>
            <span>{copy.before}</span>
            <span>{copy.after}</span>
          </div>
          <div className={styles.tab} />
        </div>

        <div {...layer(4)}>
          <span className={styles.title}>{copy.app}</span>
          <div className={styles.ring} />
          <div
            className={styles.sheet}
            data-brand={brand}
            style={{ transform: `translateY(${sheetRise}%)` }}
          >
            <i className={styles.grip} />
            <div className={styles.sheetLabel}>{copy.reportBug}</div>
            <div className={styles.sheetBox} />
            <div className={styles.chips}>
              {copy.tools.map((tool, i) => (
                <span key={tool} className={styles.chip} data-on={i === 0}>
                  {tool}
                </span>
              ))}
            </div>
            <div className={styles.sheetLabel}>{copy.brandLabel}</div>
            {copy.brands.map((b, i) => (
              <span key={b} className={styles.chip} data-on={brand === i + 1}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phone;
