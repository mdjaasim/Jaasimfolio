import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { ease, round2, seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './hero.module.css';

const letters = (word: string, u: number, offset: number) =>
  [...word].map((c, i) => {
    const { start, length, stagger } = timeline.hero.letters;
    const e = ease(seg(u, [start + offset + i * stagger, start + length + offset + i * stagger]));
    return { c, opacity: round2(e), rise: (1 - e) * 70 };
  });

/** Hero: the name writes itself in, the two halves drift apart as the sentence fades. */
export function Hero({ u }: { u: number }) {
  const copy = t().hero;
  const [lo, hi] = timeline.hero.visible;
  if (u <= lo || u >= hi) return null;

  const spread = ease(seg(u, timeline.hero.spread));
  const subOut = seg(u, timeline.hero.subOut);
  const subIn = ease(seg(u, timeline.hero.sub));
  const subStyle = {
    opacity: round2(subIn * (1 - subOut)),
    transform: `translateY(${sp((1 - subIn) * 40 - subOut * 40)})`,
  };

  const line = (word: string, offset: number) =>
    letters(word, u, offset).map((l, i) => (
      <span
        key={i}
        className={styles.letter}
        style={{ opacity: l.opacity, transform: `translateY(${sp(l.rise)})` }}
      >
        {l.c}
      </span>
    ));

  return (
    <Frame>
      <p
        aria-hidden="true"
        className={`${styles.name} ${styles.first}`}
        style={{ transform: `translate(${sp(-spread * 26)},${sp(-spread * 50)})` }}
      >
        {line(copy.first, 0)}
      </p>
      <p
        aria-hidden="true"
        className={`${styles.name} ${styles.last}`}
        style={{ transform: `translate(${sp(spread * 40)},${sp(-spread * 50)})` }}
      >
        {line(copy.last, timeline.hero.letters.rightOffset)}
      </p>
      <p className={styles.sub} style={subStyle}>
        {copy.sub.before}
        <span className="highlight">{copy.sub.accent}</span>
        {copy.sub.after}
      </p>
      <p className={`${styles.strip} label muted`} style={subStyle}>
        {copy.strip.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </p>
    </Frame>
  );
}

export default Hero;
