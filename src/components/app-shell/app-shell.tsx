'use client';

import { useState } from 'react';
import { TOTAL_SCREENS } from '@/config/timeline';
import { t } from '@/content';
import { useMode } from '@/engine/mode';
import { SCREEN_UNIT_ATTR } from '@/engine/timeline';
import { Header } from '../header/header';
import { IndexOverlay } from '../index-overlay/index-overlay';
import styles from './app-shell.module.css';

/**
 * Chrome plus the scroll track. Scenes mount inside the sticky stage (guided) or as stacked
 * sections (free) in later waves; this wave ships the engine, header, cursor, Index and 404.
 */
export function AppShell() {
  const copy = t();
  const { mode } = useMode();
  const [indexOpen, setIndexOpen] = useState(false);

  return (
    <>
      <Header onOpenIndex={() => setIndexOpen(true)} overIndex={indexOpen} />
      <div
        className={styles.track}
        data-mode={mode}
        style={{ ['--screens' as string]: TOTAL_SCREENS }}
      >
        <div className={styles.stage} {...{ [SCREEN_UNIT_ATTR]: '' }}>
          <h1 className={styles.hello}>{copy.hello.word}</h1>
        </div>
      </div>
      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}

export default AppShell;
