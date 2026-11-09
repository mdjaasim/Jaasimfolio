'use client';

import { t } from '@/content';
import styles from './error.module.css';

/** Runtime error boundary: a calm way out instead of a blank page. */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const copy = t().errorPage;
  return (
    <section className={styles.page}>
      <div>
        <p className="label muted">{copy.label}</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <button type="button" className="text-link" onClick={reset}>
          {copy.retry}
        </button>
      </div>
    </section>
  );
}
