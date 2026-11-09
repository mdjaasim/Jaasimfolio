'use client';

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from './use-reveal';
import styles from './free.module.css';

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Stagger in ms. */
  delay?: number;
  children: ReactNode;
}

/** Fades and lifts its children in once, as they scroll into view. */
export function Reveal({ as: Tag = 'div', className, style, delay = 0, children }: RevealProps) {
  const { ref, state } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${className ?? ''}`}
      data-reveal={state}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
