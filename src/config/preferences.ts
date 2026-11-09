export const storageKeys = {
  mode: 'jaasim:mode',
  name: 'jaasim:name',
  launchSeen: 'jaasim:launch-seen',
} as const;

export type Mode = 'guided' | 'free';
export const defaultMode: Mode = 'guided';

export const mediaQueries = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
  mobile: '(max-width: 767px), (max-aspect-ratio: 1/1)',
} as const;
