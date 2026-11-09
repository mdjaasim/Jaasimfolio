import Link from 'next/link';
import { Logo } from '../logo/logo';
import { t } from '@/content';
import styles from './not-found-scene.module.css';

/** 404: the yellow ball has rolled away; "Back home" rolls in as a ball. */
export function NotFoundScene() {
  const copy = t().notFound;
  return (
    <section className={styles.scene}>
      <div className="frame">
        <div className={styles.top}>
          <Logo />
          <span className={styles.label}>{copy.error}</span>
        </div>
        <p className={styles.sub}>
          {copy.body}
          <span className="highlight">{copy.accent}</span>
        </p>
        <h1 className={styles.code}>{copy.code}</h1>
        <span className={styles.rolled} aria-hidden="true" />
        <span className={styles.rolledTrail} aria-hidden="true" />
        <Link href="/" className={styles.back} data-cursor="link">
          {copy.back}
        </Link>
      </div>
    </section>
  );
}

export default NotFoundScene;
