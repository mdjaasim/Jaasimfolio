/** Launch and overlay timings (ms unless noted), from the design's motion spec. */
export const launch = {
  calmPairs: 10,
  calmCutMs: 150,
  fastCuts: 46,
  fastCutStartMs: 145,
  fastCutFloorMs: 35,
  fastCutDecay: 0.91,
  shutterStartMs: 3000,
  shutterDurationMs: 2800,
  guidesStartMs: 5900,
  lettersStartMs: 6100,
  letterStaggerMs: 60,
  fillOffsetMs: 350,
  guideFadeMs: 7700,
  tagsMs: 7900,
  curtainStartMs: 8400,
  curtainDurationMs: 900,
  readyMs: 9300,
  focusMs: 9450,
  nameTargetWidthPx: 1060,
  nameMinSizePx: 48,
  nameMaxSizePx: 100,
} as const;

export const overlay = {
  enterMs: 900,
  unmountDelayMs: 1000,
  caseSwapMs: 1250,
  caseSlideMs: 1100,
} as const;

export const cursor = {
  followPerSecond: 15,
  gravity: 2300,
  restitution: 0.56,
  tossHeightPx: 68,
  pressScale: 0.68,
  pressGatherPx: 5,
  hover: { link: 2.6, view: 5.2 },
  ghostDecayPerSecond: 1.7,
  maxGhosts: 30,
} as const;

export const breakpoints = { mobileMax: 767 } as const;
