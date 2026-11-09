import { round2 } from './math';

/** A design-pixel length that scales with the stage: `sp(80)` -> `calc(80 * var(--s))`. */
export const sp = (n: number): string => `calc(${round2(n)} * var(--s))`;
