import { describe, expect, it } from 'vitest';
import { CursorBody } from '@/engine/cursor-physics';

const run = (body: CursorBody, seconds: number, reduce = false) => {
  for (let i = 0; i < seconds * 60; i++) body.step(1 / 60, reduce);
};

describe('CursorBody', () => {
  it('snaps to the first pointer position then eases toward later ones', () => {
    const b = new CursorBody();
    b.moveTo(100, 100, '');
    expect(b.x).toBe(100);
    b.moveTo(300, 100, '');
    b.step(1 / 60, false);
    expect(b.x).toBeGreaterThan(100);
    expect(b.x).toBeLessThan(300);
  });

  it('tosses on release, bounces lower each time and comes to rest', () => {
    const b = new CursorBody();
    b.moveTo(50, 50, '');
    b.pressDown();
    b.release(false);
    let peak = 0;
    const peaks: number[] = [];
    let prevV = b.tossV;
    for (let i = 0; i < 600; i++) {
      b.step(1 / 60, false);
      peak = Math.min(peak, b.tossY);
      if (prevV < 0 && b.tossV >= 0) peaks.push(-b.tossY);
      prevV = b.tossV;
    }
    expect(-peak).toBeLessThan(75);
    expect(-peak).toBeGreaterThan(60);
    for (let i = 1; i < peaks.length; i++) expect(peaks[i]).toBeLessThan(peaks[i - 1]!);
    expect(b.air).toBe(false);
    expect(b.tossY).toBe(0);
  });

  it('does not toss under reduced motion', () => {
    const b = new CursorBody();
    b.pressDown();
    b.release(true);
    expect(b.air).toBe(false);
  });

  it('grows on links and on view targets, shrinks while pressed', () => {
    const b = new CursorBody();
    b.moveTo(10, 10, 'link');
    run(b, 1);
    expect(b.scale).toBeCloseTo(2.6, 1);
    b.moveTo(10, 10, 'view');
    run(b, 1);
    expect(b.scale).toBeCloseTo(5.2, 1);
    b.pressDown();
    run(b, 1);
    expect(b.scale).toBeCloseTo(5.2 * 0.68, 1);
  });

  it('leaves a trail that fades out after the ball stops', () => {
    const b = new CursorBody();
    b.moveTo(0, 0, '');
    for (let i = 0; i < 20; i++) {
      b.moveTo(i * 60, 0, '');
      b.step(1 / 60, false);
    }
    expect(b.ghosts.length).toBeGreaterThan(0);
    run(b, 2);
    expect(b.ghosts.length).toBe(0);
  });
});
