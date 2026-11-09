import { describe, expect, it } from 'vitest';
import { TOTAL_SCREENS, timeline } from '@/config/timeline';

describe('timeline config', () => {
  it('chapters stay inside the track and in order', () => {
    const stops = Object.values(timeline.chapters);
    expect(stops).toEqual([...stops].sort((a, b) => a - b));
    expect(Math.max(...stops)).toBeLessThan(TOTAL_SCREENS);
  });

  it('every range starts before it ends', () => {
    const walk = (o: unknown): void => {
      if (Array.isArray(o) && o.length === 2 && o.every((n) => typeof n === 'number')) {
        expect(o[0]).toBeLessThan(o[1] as number);
      } else if (o && typeof o === 'object') Object.values(o).forEach(walk);
    };
    walk(timeline);
  });

  it('every chapter target lands after its own content has finished arriving', () => {
    expect(timeline.chapters.contact).toBeGreaterThanOrEqual(timeline.contact.button[1]);
  });
});
