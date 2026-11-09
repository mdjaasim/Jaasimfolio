import { describe, expect, it } from 'vitest';
import { launchCutTimes, launchDurations } from '@/config/launch-schedule';
import { launch } from '@/config/motion';

describe('launch schedule', () => {
  it('starts with ten calm word+photo pairs, then accelerates', () => {
    const d = launchDurations();
    expect(d.slice(0, launch.calmPairs * 2).every((ms) => ms === launch.calmCutMs)).toBe(true);
    const fast = d.slice(launch.calmPairs * 2);
    expect(fast).toHaveLength(launch.fastCuts);
    for (let i = 1; i < fast.length; i++) expect(fast[i]!).toBeLessThanOrEqual(fast[i - 1]!);
    expect(fast[fast.length - 1]!).toBeGreaterThanOrEqual(launch.fastCutFloorMs);
  });

  it('keeps the shutters from starting before the ten calm pairs are over', () => {
    const calmEnd = launchCutTimes()[launch.calmPairs * 2 - 1]!;
    expect(launch.shutterStartMs).toBeGreaterThanOrEqual(calmEnd);
  });

  it('finishes cutting before the name is written', () => {
    const times = launchCutTimes();
    expect(times[times.length - 1]!).toBeLessThanOrEqual(launch.guidesStartMs + 200);
    expect(launch.readyMs).toBeGreaterThanOrEqual(launch.curtainStartMs + launch.curtainDurationMs);
  });
});
