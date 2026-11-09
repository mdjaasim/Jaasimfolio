import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './about.module.css';

const MARQUEE_SPEED = 260;
const MARQUEE_BOTTOM_OFFSET = 1200;
const REPEATS = 2;

/** Alternate solid and outlined words, repeated so the line never runs out. */
function Marquee({ words, x, top }: { words: readonly string[]; x: number; top: number }) {
  const list = Array.from({ length: REPEATS }, () => words).flat();
  return (
    <div
      aria-hidden="true"
      className={styles.marquee}
      style={{ top: sp(top), transform: `translateX(${sp(x)})` }}
    >
      {list.map((w, i) => (
        <span key={i}>
          <span className={i % 2 ? styles.outline : undefined}>{w}</span>
          <em>/</em>
        </span>
      ))}
    </div>
  );
}

/** 07 About: the portrait reveals by clip-path, the bio rises, two marquees run in opposite directions. */
export function About({ u }: { u: number }) {
  const copy = t().about;
  const [lo, hi] = timeline.about.visible;
  if (u <= lo || u >= hi) return null;

  const arrive = ease(seg(u, timeline.about.in));
  const portrait = ease(seg(u, timeline.about.portrait));
  const bio = ease(seg(u, timeline.about.bio));
  const run = u - timeline.about.in[0];

  return (
    <Frame style={{ zIndex: 9 }}>
      <div
        className={styles.scene}
        style={{ opacity: round2(arrive), transform: `translateY(${round2((1 - arrive) * 100)}%)` }}
      >
        <div
          className={styles.portrait}
          style={{
            clipPath: `inset(${round2((1 - portrait) * 100)}% 0 0 0 round var(--radius-xl))`,
          }}
        >
          <div
            className={styles.slot}
            style={{ transform: `scale(${round2(1.08 - 0.08 * portrait)})` }}
          >
            {copy.portraitSlot}
          </div>
        </div>
        <div
          className={styles.bio}
          style={{ opacity: round2(bio), transform: `translateY(${sp((1 - bio) * 40)})` }}
        >
          <span className="label muted">{copy.label}</span>
          <h2 className={styles.heading}>
            {copy.bio.before}
            <span className="highlight">{copy.bio.accent}</span>
            {copy.bio.after}
          </h2>
          <p className={styles.education}>{copy.education}</p>
        </div>
        <Marquee words={copy.marqueeTop} x={-run * MARQUEE_SPEED} top={620} />
        <Marquee
          words={copy.marqueeBottom}
          x={-MARQUEE_BOTTOM_OFFSET + run * MARQUEE_SPEED}
          top={730}
        />
      </div>
    </Frame>
  );
}

export default About;
