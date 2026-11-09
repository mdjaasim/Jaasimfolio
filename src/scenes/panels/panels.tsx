import { timeline } from '@/config/timeline';
import { panel } from '@/engine/math';
import { sp } from '@/engine/units';
import styles from './panels.module.css';

/** Ground panels that wipe up over the previous scene; their top corners straighten to 0 as they cover it. */
const GROUNDS = [
  { key: 'ink1', range: timeline.panels.ink1, tone: styles.ink, z: 2 },
  { key: 'bone2', range: timeline.panels.bone2, tone: styles.bone, z: 4 },
  { key: 'ink3', range: timeline.panels.ink3, tone: styles.ink, z: 6 },
  { key: 'bone4', range: timeline.panels.bone4, tone: styles.bone, z: 8 },
  { key: 'yellow', range: timeline.panels.yellow, tone: styles.yellow, z: 10 },
] as const;

export function Panels({ u }: { u: number }) {
  return (
    <>
      {GROUNDS.map(({ key, range, tone, z }) => {
        const p = panel(u, range, 40);
        if (p.translateYPercent >= 100) return null;
        return (
          <div
            key={key}
            className={`${styles.panel} ${tone}`}
            style={{
              zIndex: z,
              transform: `translateY(${p.translateYPercent}%)`,
              borderRadius: `${sp(p.radiusPx)} ${sp(p.radiusPx)} 0 0`,
            }}
          />
        );
      })}
    </>
  );
}

export default Panels;
