import { launch } from './motion';

/** Duration of every cut in the launch, in ms: calm pairs first, then the accelerating timelapse. */
export function launchDurations(): number[] {
  const calm = Array.from({ length: launch.calmPairs * 2 }, () => launch.calmCutMs);
  const fast = Array.from({ length: launch.fastCuts }, (_, i) =>
    Math.round(
      launch.fastCutFloorMs +
        (launch.fastCutStartMs - launch.fastCutFloorMs) * Math.pow(launch.fastCutDecay, i),
    ),
  );
  return [...calm, ...fast];
}

/** Cumulative end time (ms) of each cut. */
export function launchCutTimes(): number[] {
  let acc = 0;
  return launchDurations().map((d) => (acc += d));
}
