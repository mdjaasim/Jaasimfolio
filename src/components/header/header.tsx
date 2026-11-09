'use client';

import { timeline } from '@/config/timeline';
import { site } from '@/config/site';
import { t } from '@/content';
import { useChrome } from '@/engine/chrome';
import { ease, headerTone, seg } from '@/engine/math';
import { useMode } from '@/engine/mode';
import { useNavigate, useU } from '@/engine/timeline';
import { useClock } from '@/engine/use-clock';
import { Logo } from '../logo/logo';
import styles from './header.module.css';

interface HeaderProps {
  onOpenIndex: () => void;
  /** Overlay open: header sits on the ink overlay. */
  overIndex?: boolean;
}

/** Persistent header: morphing logo on the left, local time and Index on the right. */
export function Header({ onOpenIndex, overIndex = false }: HeaderProps) {
  const copy = t();
  const u = useU();
  const { mode } = useMode();
  const navigate = useNavigate();
  const clock = useClock(site.timeZone);
  const freeTone = useChrome((c) => c.tone);

  const collapse = ease(seg(u, timeline.headerMorph.collapse));
  const slash = ease(seg(u, timeline.headerMorph.slash));
  const tone = overIndex ? 'dark' : mode === 'guided' ? headerTone(u) : freeTone;

  return (
    <header className={styles.header} data-tone={tone}>
      <button
        type="button"
        className={styles.home}
        data-cursor="link"
        onClick={() => navigate('hello')}
        aria-label={site.shortName}
      >
        <Logo collapse={collapse} slash={slash} />
      </button>
      <div className={styles.right}>
        <span className={styles.time} suppressHydrationWarning>
          {copy.header.time} {clock}
        </span>
        <button
          type="button"
          className={styles.index}
          data-cursor="link"
          onClick={onOpenIndex}
          aria-haspopup="dialog"
        >
          {copy.header.index}
        </button>
      </div>
    </header>
  );
}

export default Header;
