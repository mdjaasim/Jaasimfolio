import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { clamp01, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './path.module.css';

/** Vertical layout of the timeline (design px). */
const LINE_X = 520;
const LINE_LENGTH = 1330;
const SHIFT = 620;
const ENTRY_Y = [0, 230, 470] as const;
const ENTRY_SIZE = [56, 56, 88] as const;
const SUB_START = 700;
const SUB_GAP = 96;

/** 06 Path: a 1px line draws down with a yellow head; employers and the Fuze timeline appear as it reaches them. */
export function Path({ u }: { u: number }) {
  const copy = t().path;
  const [lo, hi] = timeline.path.visible;
  if (u <= lo || u >= hi) return null;

  const drawn = seg(u, timeline.path.draw);
  const length = drawn * LINE_LENGTH;
  const out = seg(u, timeline.path.out);
  const fade = (y: number, span: number) => clamp01((length - y) / span);
  const reveal = (a: number, lift: number) => ({
    opacity: round2(a),
    transform: `translateY(${sp((1 - a) * lift)})`,
  });

  return (
    <Frame style={{ zIndex: 9 }}>
      <div
        className={styles.scene}
        style={{
          opacity: round2(1 - seg(u, [timeline.path.out[0] + 0.1, timeline.path.out[1] - 0.1])),
          transform: `translateY(${sp(-out * 140)})`,
        }}
      >
        <div className={styles.world} style={{ transform: `translateY(${sp(-drawn * SHIFT)})` }}>
          <div className={styles.line} style={{ left: sp(LINE_X), height: sp(length) }} />
          <i className={styles.head} style={{ left: sp(LINE_X - 6), top: sp(length - 7) }} />

          {copy.entries.map((e, i) => {
            const y = ENTRY_Y[i] ?? 0;
            const size = ENTRY_SIZE[i] ?? 56;
            return (
              <div key={e.title} style={reveal(fade(y, 110), 30)}>
                <span className={`label muted ${styles.date}`} style={{ top: sp(y + 8) }}>
                  {e.date}
                </span>
                <i className={styles.node} style={{ top: sp(y + 20) }} />
                <div className={styles.entry} style={{ top: sp(y) }}>
                  <h2 style={{ fontSize: sp(size), lineHeight: sp(size) }}>{e.title}</h2>
                  <span className={`label muted ${styles.role}`}>{e.role}</span>
                  <p className={styles.body}>{e.body}</p>
                </div>
              </div>
            );
          })}

          {copy.fuze.map((m, i) => {
            const y = SUB_START + i * SUB_GAP;
            return (
              <div key={m.cat} style={reveal(fade(y, 90), 26)}>
                <i className={styles.subDot} style={{ top: sp(y + 10) }} />
                <span className={`label ${styles.cat}`} style={{ top: sp(y + 2) }}>
                  {m.cat}
                </span>
                <p className={styles.subBody} style={{ top: sp(y) }}>
                  {m.body}
                </p>
              </div>
            );
          })}
        </div>
        <p
          className={`label muted ${styles.edu}`}
          style={{ opacity: round2(seg(u, timeline.path.edu)) }}
        >
          {copy.education}
        </p>
      </div>
    </Frame>
  );
}

export default Path;
