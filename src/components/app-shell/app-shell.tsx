'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { chrome, useChrome } from '@/engine/chrome';
import { launch } from '@/config/motion';
import { storageKeys } from '@/config/preferences';
import { TOTAL_SCREENS } from '@/config/timeline';
import { photos, t } from '@/content';
import { useMode } from '@/engine/mode';
import { readStorage, writeStorage } from '@/engine/storage';
import { SCREEN_UNIT_ATTR } from '@/engine/timeline';
import { warmUrl } from '@/lib/image-loader';
import { Launch } from '@/scenes/launch/launch';
import { Stage } from '@/scenes/stage';
import { Header } from '../header/header';
import { NAME_FIELD_ID } from '../name-field/name-field';
import styles from './app-shell.module.css';

// Code that is only needed on demand is split out of the first load.
const FreeSite = dynamic(() => import('@/free/free-site').then((m) => m.FreeSite));
const IndexOverlay = dynamic(() =>
  import('../index-overlay/index-overlay').then((m) => m.IndexOverlay),
);
const CaseStudyOverlay = dynamic(() =>
  import('../case-study/case-study-overlay').then((m) => m.CaseStudyOverlay),
);

const noopSubscribe = () => () => {};
const launchSeen = () => readStorage('session', storageKeys.launchSeen) === '1';

/** Chrome, the launch and the scroll track. */
export function AppShell() {
  const copy = t();
  const { mode } = useMode();
  const indexOpen = useChrome((c) => c.indexOpen);
  const caseOpen = useChrome((c) => c.caseOpen !== null);
  // Mount each overlay on first use and keep it so its exit animation can play.
  const [indexUsed, setIndexUsed] = useState(false);
  const [caseUsed, setCaseUsed] = useState(false);
  if (indexOpen && !indexUsed) setIndexUsed(true);
  if (caseOpen && !caseUsed) setCaseUsed(true);
  const [launchDone, setLaunchDone] = useState(false);
  const seenThisSession = useSyncExternalStore(noopSubscribe, launchSeen, () => false);
  const launching = !seenThisSession && !launchDone;

  // Warm every photograph while the browser is idle so scenes never open onto an empty frame.
  useEffect(() => {
    const warm = () =>
      Object.values(photos).forEach((p) =>
        Object.assign(new window.Image(), { src: warmUrl(p.src) }),
      );
    const idle = window.requestIdleCallback as
      ((cb: () => void, opts?: { timeout: number }) => number) | undefined;
    if (idle) {
      const id = idle.call(window, warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(id);
  }, []);

  // Switching modes restarts at the top; the two layouts have different lengths.
  const previousMode = useRef(mode);
  useEffect(() => {
    if (previousMode.current !== mode) window.scrollTo(0, 0);
    previousMode.current = mode;
  }, [mode]);

  const closeIndex = useCallback(() => chrome.setIndexOpen(false), []);

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
      <Header onOpenIndex={() => chrome.setIndexOpen(true)} overIndex={indexOpen} />
      {mode === 'guided' ? (
        <div
          className={styles.track}
          data-mode={mode}
          style={{ ['--screens' as string]: TOTAL_SCREENS }}
        >
          <div className={`${styles.stage} grain`} {...{ [SCREEN_UNIT_ATTR]: '' }}>
            <Stage />
          </div>
        </div>
      ) : (
        <>
          {/* Measures one screen (the viewport height) so chrome that reads scroll in screens works here too. */}
          <div {...{ [SCREEN_UNIT_ATTR]: '' }} aria-hidden="true" className={styles.freeUnit} />
          <FreeSite />
        </>
      )}
      {caseUsed && <CaseStudyOverlay />}
      {indexUsed && <IndexOverlay open={indexOpen} onClose={closeIndex} />}
    </>
  );
}

export default AppShell;
