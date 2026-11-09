import { timeline } from '@/config/timeline';
import { ease, seg, within } from '@/engine/math';

/** Where the single persistent phone is, from the hero through Craft, as ratios of the frame height. */
export function phoneState(u: number) {
  const { phone } = timeline;
  const rise = ease(seg(u, phone.rise));
  const up = ease(seg(u, phone.up));
  const out = seg(u, phone.out);
  const [shakeStart, shakeEnd] = timeline.craft.shake;
  const shake =
    u >= shakeStart && u <= shakeEnd
      ? Math.sin((u - shakeStart) * 90) * 5 * (1 - seg(u, [shakeStart, shakeEnd]))
      : 0;
  const designY = 900 - 250 * rise - 510 * up - 1100 * out;
  return {
    yRatio: designY / 900,
    rotationDeg: -2 * up + shake,
    visible: within(u, [phone.visible]),
  };
}

export type Beat = 1 | 2 | 3 | 4;
export type Brand = 1 | 2 | 3;

/** Which Craft beat (and so which phone screen) is active. */
export function craftBeat(u: number): Beat {
  const [b2, b3, b4] = timeline.craft.beats;
  return u < b2! ? 1 : u < b3! ? 2 : u < b4! ? 3 : 4;
}

/** Which brand theme the SDK sheet shows. */
export function brandAt(u: number): Brand {
  const [second, third] = timeline.craft.brands;
  return u >= third! ? 3 : u >= second! ? 2 : 1;
}
