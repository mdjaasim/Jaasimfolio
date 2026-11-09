'use client';

import { t } from '@/content';

/** Runtime error boundary: a calm way out instead of a blank page. */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const copy = t().errorPage;
  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div>
        <p className="label muted">{copy.label}</p>
        <h1 style={{ font: 'var(--text-display-m)', fontStretch: '125%', margin: '1rem 0 2rem' }}>
          {copy.title}
        </h1>
        <button type="button" className="text-link" onClick={reset}>
          {copy.retry}
        </button>
      </div>
    </section>
  );
}
