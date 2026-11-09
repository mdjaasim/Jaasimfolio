import { describe, expect, it } from 'vitest';
import { brandAt, craftBeat, phoneState } from '@/scenes/phone-track';

describe('phone track', () => {
  it('rises from below the frame, travels up, and leaves after Craft', () => {
    expect(phoneState(0.8).yRatio).toBeCloseTo(1, 1);
    expect(phoneState(1.5).yRatio).toBeLessThan(phoneState(0.9).yRatio);
    expect(phoneState(3).yRatio).toBeLessThan(0.2);
    expect(phoneState(7.9).visible).toBe(false);
    expect(phoneState(5).visible).toBe(true);
  });

  it('shakes only during the SDK beat', () => {
    expect(phoneState(5.95).rotationDeg).not.toBe(phoneState(3.5).rotationDeg);
    expect(phoneState(6.5).rotationDeg).toBeCloseTo(phoneState(6.6).rotationDeg, 5);
  });

  it('maps scroll to the four Craft beats and three brands', () => {
    expect([3, 4.2, 5, 6].map(craftBeat)).toEqual([1, 2, 3, 4]);
    expect([6, 6.8, 7.2].map(brandAt)).toEqual([1, 2, 3]);
  });
});
