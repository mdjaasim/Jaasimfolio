'use client';

import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { clamp01, round2, seg } from '@/engine/math';
import { useMode } from '@/engine/mode';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import styles from './path.module.css';

/** Vertical layout of the timeline (design px) for the desktop and mobile frames. */
const DESKTOP = {
  lineX: 520,
  length: 1330,
  shift: 620,
  entryY: [0, 230, 470],
  entrySize: [56, 56, 88],
  /** Offsets of the date, dot and text block from an entry's y. */
  entry: { date: 8, node: 20, text: 0 },
  subStart: 700,
  subGap: 96,
  sub: { dot: 10, cat: 2, body: 0 },
} as const;
const MOBILE = {
  lineX: 22,
  length: 1440,
  shift: 760,
  entryY: [0, 196, 392],
  entrySize: [34, 34, 52],
  entry: { date: 0, node: 6, text: 22 },
  subStart: 640,
  subGap: 128,
  sub: { dot: 6, cat: 0, body: 22 },
} as const;

/** 06 Path: a 1px line draws down with a yellow head; employers and the Fuze timeline appear as it reaches them. */
export function Path({ u }: { u: number }) {
  const copy = t().path;
  const { isMobile } = useMode();
  const g = isMobile ? MOBILE : DESKTOP;
  const [lo, hi] = timeline.path.visible;
  if (u <= lo || u >= hi) return null;

  const drawn = seg(u, timeline.path.draw);
  const length = drawn * g.length;
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
        <div className={styles.world} style={{ transform: `translateY(${sp(-drawn * g.shift)})` }}>
          <div
            className={styles.line}
            style={{
              left: sp(g.lineX),
              height: sp(g.length),
              transform: `scaleY(${round2(drawn)})`,
            }}
          />
          <i
            className={styles.head}
            style={{ left: sp(g.lineX - 6), transform: `translateY(${sp(length - 7)})` }}
          />

          {copy.entries.map((e, i) => {
            const y = g.entryY[i] ?? 0;
            const size = g.entrySize[i] ?? 56;
            return (
              <div key={e.title} style={reveal(fade(y, 110), 30)}>
                <span
                  className={`label muted ${styles.date}`}
                  style={{ top: sp(y + g.entry.date) }}
                >
                  {e.date}
                </span>
                <i className={styles.node} style={{ top: sp(y + g.entry.node) }} />
                <div className={styles.entry} style={{ top: sp(y + g.entry.text) }}>
                  <h2 style={{ fontSize: sp(size), lineHeight: sp(size) }}>{e.title}</h2>
                  <span className={`label muted ${styles.role}`}>{e.role}</span>
                  <p className={styles.body}>{e.body}</p>
                </div>
              </div>
            );
          })}

          {copy.fuze.map((m, i) => {
            const y = g.subStart + i * g.subGap;
            return (
              <div key={m.cat} style={reveal(fade(y, 90), 26)}>
                <i className={styles.subDot} style={{ top: sp(y + g.sub.dot) }} />
                <span className={`label ${styles.cat}`} style={{ top: sp(y + g.sub.cat) }}>
                  {m.cat}
                </span>
                <p className={styles.subBody} style={{ top: sp(y + g.sub.body) }}>
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
