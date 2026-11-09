import type { CSSProperties } from 'react';
import { logo } from '@/config/motion';
import { site } from '@/config/site';
import { t } from '@/content';
import { clamp01 } from '@/engine/math';
import styles from './logo.module.css';

interface LogoProps {
  /** 0 = `<JAASIM>`, 1 = letters after J collapsed. */
  collapse?: number;
  /** 0 = no slash, 1 = slash shown, so the mark reads `<J/>`. */
  slash?: number;
  /** Size in CSS length (defaults to the header size). */
  size?: string;
  className?: string;
}

/** `<JAASIM>` that morphs to `<J/>`. Driven by two 0..1 values so scroll can scrub it. */
export function Logo({ collapse = 0, slash = 0, size, className }: LogoProps) {
  const copy = t();
  const [first = '', ...rest] = site.wordmark;
  const lettersStyle: CSSProperties = {
    maxWidth: `${(1 - collapse) * logo.lettersEm}em`,
    opacity: clamp01(1 - collapse * 1.25),
    transform: `translateX(${-collapse * logo.driftEm}em)`,
  };
  const slashStyle: CSSProperties = {
    maxWidth: `${slash * logo.slashEm}em`,
    opacity: clamp01(slash * 1.3),
    transform: `translateX(${(1 - slash) * -logo.slashDriftEm}em)`,
  };
  return (
    <span
      className={`${styles.logo} ${className ?? ''}`}
      style={size ? ({ '--wm': size } as CSSProperties) : undefined}
    >
      <span className="visually-hidden">{site.shortName}</span>
      <span aria-hidden="true" className={styles.tag}>
        {copy.launch.tagOpen}
      </span>
      <span aria-hidden="true">{first}</span>
      <span aria-hidden="true" className={styles.clip} style={lettersStyle}>
        {rest.join('')}
      </span>
      <span aria-hidden="true" className={styles.clip} style={slashStyle}>
        /
      </span>
      <span aria-hidden="true" className={styles.tag}>
        {copy.launch.tagClose}
      </span>
    </span>
  );
}

export default Logo;
