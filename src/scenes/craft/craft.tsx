import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import { craftBeat } from '../phone-track';
import styles from './craft.module.css';

/** Where each floating tech label sits (design px) and how fast it drifts with scroll. */
const TAGS = [
  { left: 925, top: 700, speed: 36 },
  { left: 1010, top: 780, speed: 62 },
  { left: 470, top: 150, speed: 28 },
  { left: 960, top: 210, speed: 50 },
] as const;

const GHOST_DRIFT = 55;
const GHOST_OFFSET = -30;

/** 02 Craft: a ghost word drifts, labels float, and four beats swap caption while the phone stays pinned. */
export function Craft({ u }: { u: number }) {
  const copy = t().craft;
  const [lo, hi] = timeline.craft.visible;
  if (u <= lo || u >= hi) return null;

  const beat = craftBeat(u);
  const intro = ease(seg(u, timeline.craft.intro));
  const drift = u - timeline.craft.driftOrigin;
  const enter = { opacity: round2(intro), transform: `translateY(${sp((1 - intro) * 40)})` };

  return (
    <Frame style={{ zIndex: 3, color: 'var(--on-ink)' }}>
      <div
        aria-hidden="true"
        className={styles.ghost}
        style={{ transform: `translateX(${sp(-drift * GHOST_DRIFT + GHOST_OFFSET)})` }}
      >
        {copy.ghost}
      </div>
      {copy.tags.map((tag, i) => {
        const g = TAGS[i];
        if (!g) return null;
        return (
          <span
            key={tag}
            aria-hidden="true"
            className={styles.tag}
            style={{ left: sp(g.left), top: sp(g.top - drift * g.speed), opacity: round2(intro) }}
          >
            {tag}
          </span>
        );
      })}

      <div className={styles.copy} style={enter}>
        <span className="label muted-on-ink">
          {copy.label} · {copy.beatWord} 0{beat}
        </span>
        <div className={styles.beats}>
          {copy.beats.map((b, i) => {
            const on = beat === i + 1;
            const shift = on ? 0 : beat > i + 1 ? -24 : 24;
            return (
              <div
                key={b.nav}
                className={styles.beat}
                aria-hidden={!on}
                style={{ opacity: on ? 1 : 0, transform: `translateY(${sp(shift)})` }}
              >
                <h2 className={styles.heading}>
                  {b.pre}
                  <span className="highlight">{b.accent}</span>
                </h2>
                <p className={styles.body}>{b.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      <ol className={styles.nav} style={enter}>
        {copy.beats.map((b, i) => (
          <li key={b.nav} className={styles.navItem} data-on={beat === i + 1}>
            <span className={styles.navText}>{b.nav}</span>
            <i />
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export default Craft;
