/**
 * Scene ranges for the guided story, in "screens" (1 screen = one stage height).
 * Ported 1:1 from design/canvas/FullSite.dc.html. Scenes are functions of the eased
 * scroll position u; nothing here is a timer.
 */
export type Range = readonly [start: number, end: number];

export const TOTAL_SCREENS = 18;
export const SCROLL_LERP = 6; // per second, frame-rate independent

export const timeline = {
  hello: { out: [0.3, 0.8] as Range, visibleUntil: 0.95, skipAt: 0.2 },
  hero: {
    visible: [0.7, 3.3] as Range,
    letters: { start: 0.85, length: 0.5, stagger: 0.05, rightOffset: 0.25 },
    sub: [1.3, 1.8] as Range,
    spread: [1.4, 2.5] as Range,
    subOut: [1.8, 2.4] as Range,
  },
  headerMorph: { collapse: [0.04, 0.5] as Range, slash: [0.1, 0.55] as Range },
  phone: {
    rise: [0.9, 1.5] as Range,
    up: [1.5, 2.9] as Range,
    out: [7.2, 7.8] as Range,
    visible: [0.8, 7.9] as Range,
  },
  panels: {
    ink1: [2.5, 3.1] as Range,
    bone2: [7.2, 7.8] as Range,
    ink3: [10.4, 11.0] as Range,
    bone4: [12.8, 13.4] as Range,
    yellow: [16.6, 17.2] as Range,
  },
  craft: {
    visible: [2.4, 7.9] as Range,
    intro: [2.8, 3.4] as Range,
    shake: [5.8, 6.1] as Range,
    /** Screen at which the ghost word and labels start drifting. */
    driftOrigin: 2.5,
    beats: [4.0, 4.8, 5.6] as readonly number[],
    sheet: [6.1, 6.5] as Range,
    brands: [6.7, 7.0] as readonly number[],
  },
  numbers: {
    visible: [7.1, 9.8] as Range,
    count: [7.8, 8.8] as Range,
    highlight: [7.9, 8.5] as Range,
    out: [9.0, 9.6] as Range,
  },
  work: { visible: [8.9, 11.0] as Range, rowsStart: 9.0, rowStagger: 0.12, rowDuration: 0.7 },
  lab: {
    visible: [10.3, 13.5] as Range,
    fadeIn: [10.6, 11.2] as Range,
    travel: [11.0, 12.8] as Range,
  },
  path: {
    visible: [12.7, 15.9] as Range,
    draw: [13.4, 15.2] as Range,
    edu: [14.8, 15.2] as Range,
    out: [15.2, 15.8] as Range,
  },
  about: {
    visible: [15.1, 17.3] as Range,
    in: [15.2, 15.8] as Range,
    portrait: [15.4, 16.2] as Range,
    bio: [15.6, 16.1] as Range,
  },
  contact: { visible: 16.5, lines: 17.2, button: [17.4, 17.8] as Range },
  /** Header ink: dark scenes where the header turns on-ink, and where the ground floods yellow. */
  darkHeader: [
    [3.0, 7.4],
    [10.7, 13.0],
  ] as readonly Range[],
  yellowFrom: 16.9,
  /** Screens at which the current chapter changes (chapter i is active while u < bounds[i]). */
  chapterBounds: [2.5, 7.2, 9.0, 10.4, 12.8, 15.0, 16.6] as readonly number[],
  /** Index overlay targets: chapter id -> screen to travel to. */
  chapters: {
    hello: 0,
    craft: 2.9,
    numbers: 7.9,
    work: 9.6,
    lab: 11.0,
    path: 13.4,
    about: 15.4,
    contact: 17.4,
  },
} as const;

export type ChapterId = keyof typeof timeline.chapters;
