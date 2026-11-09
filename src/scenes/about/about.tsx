'use client';

import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { useMode } from '@/engine/mode';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './about.module.css';

/** Marquee rows (design px): top of each row, how far they run per screen, and the bottom row's start offset. */
const DESKTOP = { tops: [620, 730], speed: 260, bottomOffset: 1200 } as const;
const MOBILE = { tops: [690, 750], speed: 140, bottomOffset: 700 } as const;
const REPEATS = 2;

/** Alternate solid and outlined words, repeated so the line never runs out. */
function Marquee({
  words,
  x,
  top,
  startOutlined = false,
}: {
  words: readonly string[];
  x: number;
  top: number;
  startOutlined?: boolean;
}) {
  const list = Array.from({ length: REPEATS }, () => words).flat();
  return (
    <div
      aria-hidden="true"
      className={styles.marquee}
      style={{ top: sp(top), transform: `translateX(${sp(x)})` }}
    >
      {list.map((w, i) => (
        <span key={i}>
          <span className={(i % 2 === 1) !== startOutlined ? styles.outline : undefined}>{w}</span>
          <em>/</em>
        </span>
      ))}
    </div>
  );
}

/** 07 About: the portrait reveals by clip-path, the bio rises, two marquees run in opposite directions. */
export function About({ u }: { u: number }) {
  const copy = t().about;
  const { isMobile } = useMode();
  const g = isMobile ? MOBILE : DESKTOP;
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
        <Marquee words={copy.marqueeTop} x={-run * g.speed} top={g.tops[0]} />
        <Marquee
          words={copy.marqueeBottom}
          x={-g.bottomOffset + run * g.speed}
          top={g.tops[1]}
          startOutlined
        />
      </div>
    </Frame>
  );
}

export default About;
