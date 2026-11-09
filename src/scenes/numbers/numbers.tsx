import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './numbers.module.css';

/** Counter positions (design px): number, then its caption beside it. */
const LAYOUT = [
  { x: 32, y: 130, tx: 330, ty: 230 },
  { x: 760, y: 130, tx: 1020, ty: 230 },
  { x: 32, y: 480, tx: 330, ty: 590 },
  { x: 760, y: 480, tx: 1020, ty: 590 },
] as const;

const STAGGER = 0.1;
const RISE = 160;
const LEAVE_RISE = 120;

/** 03 By the numbers: four counters tick up; a yellow highlighter wipes behind the first. */
export function Numbers({ u }: { u: number }) {
  const copy = t().numbers;
  const [lo, hi] = timeline.numbers.visible;
  if (u <= lo || u >= hi) return null;

  const count = ease(seg(u, timeline.numbers.count));
  const highlight = seg(u, timeline.numbers.highlight);
  const out = seg(u, timeline.numbers.out);
  const leaving = {
    opacity: round2(1 - seg(u, [timeline.numbers.out[0], timeline.numbers.out[0] + 0.5])),
    transform: `translateY(${sp(-out * LEAVE_RISE)})`,
  };

  const enter = (k: number) => {
    const a = seg(u, [7.4 + k * STAGGER, 8.0 + k * STAGGER]);
    const b = ease(seg(u, [7.4 + k * STAGGER, 8.2 + k * STAGGER]));
    return { opacity: round2(a), transform: `translateY(${sp((1 - b) * RISE)})` };
  };

  return (
    <Frame style={{ zIndex: 5 }}>
      <div style={leaving}>
        {copy.items.map((item, i) => {
          const pos = LAYOUT[i];
          if (!pos) return null;
          return (
            <div key={item.title}>
              <div
                className={styles.value}
                style={{ left: sp(pos.x), top: sp(pos.y), ...enter(i) }}
              >
                <span className={styles.digits}>
                  {i === 0 && (
                    <i
                      className={styles.mark}
                      style={{ transform: `scaleX(${round2(highlight)})` }}
                    />
                  )}
                  {Math.round(item.value * count)}
                </span>
              </div>
              <p
                className={styles.caption}
                style={{ left: sp(pos.tx), top: sp(pos.ty), ...enter(i) }}
              >
                <b className="label muted">{item.title}</b>
                {item.body}
              </p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

export default Numbers;
