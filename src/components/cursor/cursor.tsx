'use client';

import { useEffect, useRef } from 'react';
import { cursor as cfg } from '@/config/motion';
import { t } from '@/content';
import { CursorBody, type CursorKind } from '@/engine/cursor-physics';
import { useMode } from '@/engine/mode';
import styles from './cursor.module.css';

interface CursorProps {
  /** Ink instead of yellow (on the yellow Contact ground). */
  ink?: boolean;
}

/** The yellow ball. Fine pointers only; off under reduced motion (native cursor returns). */
export function Cursor({ ink = false }: CursorProps) {
  const { reducedMotion, finePointer } = useMode();
  const active = finePointer && !reducedMotion;
  const ballRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active) return;
    const body = new CursorBody();
    const root = document.documentElement;
    root.dataset.cursor = 'ball';

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-cursor]');
      body.moveTo(
        e.clientX,
        e.clientY,
        (el?.getAttribute('data-cursor') as CursorKind | null) ?? '',
      );
    };
    const onDown = () => body.pressDown();
    const onUp = () => body.release(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      body.step((now - last) / 1000, false);
      last = now;
      const ball = ballRef.current;
      if (ball) {
        const air = Math.min(Math.abs(body.tossV) / 3400, 0.3);
        const sqx = (1 + body.squash) / Math.sqrt(1 + air);
        const sqy = (1 - body.squash * 0.8) * (1 + air);
        const y = body.y + body.tossY + body.press * cfg.pressGatherPx;
        ball.style.opacity = body.seen ? '1' : '0';
        ball.style.transform =
          `translate(${body.x.toFixed(2)}px,${y.toFixed(2)}px) rotate(${body.angle.toFixed(1)}deg) ` +
          `scale(${body.stretch.toFixed(3)},${(1 / Math.sqrt(body.stretch)).toFixed(3)}) rotate(${(-body.angle).toFixed(1)}deg) ` +
          `scale(${sqx.toFixed(3)},${sqy.toFixed(3)}) scale(${body.scale.toFixed(3)})`;
        const label = labelRef.current;
        if (label) {
          const show = body.kind === 'view' && body.scale > cfg.labelOpacityScale && !body.down;
          label.style.opacity = show ? '1' : '0';
          label.style.transform = `translate(${(body.x + cfg.followLabelOffset.x).toFixed(1)}px,${(y + cfg.followLabelOffset.y).toFixed(1)}px)`;
        }
        ghostRefs.current.forEach((g, i) => {
          if (!g) return;
          const ghost = body.ghosts[i];
          if (!ghost) {
            g.style.opacity = '0';
            return;
          }
          g.style.opacity = (Math.pow(ghost.life, 1.3) * 0.6 * ghost.strength).toFixed(3);
          g.style.transform = `translate(${ghost.x.toFixed(2)}px,${ghost.y.toFixed(2)}px) scale(${(ghost.scale * (0.35 + 0.65 * ghost.life)).toFixed(3)})`;
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      delete root.dataset.cursor;
    };
  }, [active]);

  if (!active) return null;
  const color = ink ? cfg.colors.ink : cfg.colors.yellow;
  const size = {
    width: cfg.sizePx,
    height: cfg.sizePx,
    margin: `${-cfg.sizePx / 2}px 0 0 ${-cfg.sizePx / 2}px`,
    background: color,
  };
  return (
    <div className={styles.layer} aria-hidden="true">
      {Array.from({ length: cfg.maxGhosts }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            ghostRefs.current[i] = el;
          }}
          className={styles.dot}
          style={size}
        />
      ))}
      <span ref={ballRef} className={styles.dot} style={size} />
      <span ref={labelRef} className={styles.label}>
        {t().work.open}
      </span>
    </div>
  );
}

export default Cursor;
