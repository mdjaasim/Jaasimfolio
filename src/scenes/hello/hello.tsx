'use client';

import { timeline } from '@/config/timeline';
import { t } from '@/content';
import { useGreeting } from '@/engine/greeting';
import { seg } from '@/engine/math';
import { sp } from '@/engine/units';
import { Frame } from '@/components/frame/frame';
import { NameField } from '@/components/name-field/name-field';
import styles from './hello.module.css';

/** 01 Hello: asks for a first name, then greets the visitor by it. Fades up and away as the hero arrives. */
export function Hello({ u }: { u: number }) {
  const copy = t().hello;
  const { name, greeted } = useGreeting();
  if (u >= timeline.hello.visibleUntil) return null;

  const away = seg(u, timeline.hello.out);
  const answered = greeted || u > timeline.hello.skipAt;

  return (
    <Frame className={styles.scene}>
      <p className="visually-hidden" role="status">
        {name ? `${copy.wordNamed} ${name}.` : ''}
      </p>
      <div
        style={{ opacity: 1 - away, transform: `translateY(${sp(-away * 80)})` }}
        className={styles.inner}
      >
        <div className={styles.layer} data-on={!answered} aria-hidden={answered}>
          <div className={`${styles.row} ${styles.ask}`}>
            <p className={styles.word}>{copy.word}</p>
            <NameField />
          </div>
        </div>
        <div className={styles.layer} data-on={answered} aria-hidden={!answered}>
          <div className={`${styles.row} ${styles.greeted}`}>
            <p className={styles.word}>{name ? copy.wordNamed : copy.wordAnon}</p>
            {name && <p className={styles.name}>{`${name}.`}</p>}
          </div>
          <p className={styles.intro}>{copy.intro}</p>
        </div>
      </div>
    </Frame>
  );
}

export default Hello;
