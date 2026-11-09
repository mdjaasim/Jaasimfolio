import type { Range } from '@/config/timeline';
import { timeline } from '@/config/timeline';

export const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

/** Progress (0..1) of `u` through a range of screens. */
export const seg = (u: number, [a, b]: Range): number => clamp01((u - a) / (b - a));

/** The house ease-out used by every scroll-linked reveal. */
export const ease = (t: number): number => 1 - Math.pow(1 - t, 3);

export const round2 = (n: number): number => Math.round(n * 100) / 100;

/** Frame-rate independent exponential smoothing step. */
export const lerpStep = (
  current: number,
  target: number,
  dt: number,
  ratePerSecond: number,
): number => current + (target - current) * (1 - Math.exp(-dt * ratePerSecond));

/** Ground panel that wipes up: translateY percent and top corner radius (design px, straightens to 0). */
export function panel(
  u: number,
  range: Range,
  cornerPx: number,
): { translateYPercent: number; radiusPx: number } {
  const e = ease(seg(u, range));
  return { translateYPercent: round2((1 - e) * 100), radiusPx: round2(cornerPx * (1 - e)) };
}

/** True while `u` is inside any of the given ranges. */
export const within = (u: number, ranges: readonly Range[]): boolean =>
  ranges.some(([a, b]) => u > a && u < b);

/** Index of the active chapter for the Index overlay and navigation state. */
export function currentChapter(u: number): number {
  const i = timeline.chapterBounds.findIndex((bound) => u < bound);
  return i === -1 ? timeline.chapterBounds.length : i;
}

/** Header ink state at a scroll position. */
export function headerTone(u: number): 'dark' | 'light' | 'yellow' {
  if (u > timeline.yellowFrom) return 'yellow';
  return within(u, timeline.darkHeader) ? 'dark' : 'light';
}
