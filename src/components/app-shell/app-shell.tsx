'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import { launch } from '@/config/motion';
import { storageKeys } from '@/config/preferences';
import { TOTAL_SCREENS } from '@/config/timeline';
import { t } from '@/content';
import { useMode } from '@/engine/mode';
import { readStorage, writeStorage } from '@/engine/storage';
import { SCREEN_UNIT_ATTR } from '@/engine/timeline';
import { Launch } from '@/scenes/launch/launch';
import { Stage } from '@/scenes/stage';
import { Header } from '../header/header';
import { IndexOverlay } from '../index-overlay/index-overlay';
import { NAME_FIELD_ID } from '../name-field/name-field';
import styles from './app-shell.module.css';

const noopSubscribe = () => () => {};
const launchSeen = () => readStorage('session', storageKeys.launchSeen) === '1';

/** Chrome, the launch and the scroll track. */
export function AppShell() {
  const copy = t();
  const { mode } = useMode();
  const [indexOpen, setIndexOpen] = useState(false);
  const [launchDone, setLaunchDone] = useState(false);
  const seenThisSession = useSyncExternalStore(noopSubscribe, launchSeen, () => false);
  const launching = !seenThisSession && !launchDone;

  const onLaunchDone = useCallback(() => {
    writeStorage('session', storageKeys.launchSeen, '1');
    setLaunchDone(true);
    window.setTimeout(
      () => document.getElementById(NAME_FIELD_ID)?.focus({ preventScroll: true }),
      launch.focusMs - launch.readyMs,
    );
  }, []);

  return (
    <>
      <h1 className="visually-hidden">{copy.hello.h1}</h1>
      {launching && <Launch onDone={onLaunchDone} />}
      <Header onOpenIndex={() => setIndexOpen(true)} overIndex={indexOpen} />
      <div
        className={styles.track}
        data-mode={mode}
        style={{ ['--screens' as string]: TOTAL_SCREENS }}
      >
        <div className={`${styles.stage} grain`} {...{ [SCREEN_UNIT_ATTR]: '' }}>
          <Stage />
        </div>
      </div>
      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}

export default AppShell;
