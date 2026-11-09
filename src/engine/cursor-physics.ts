import { cursor as cfg } from '@/config/motion';

export type CursorKind = '' | 'link' | 'view';

export interface Ghost {
  x: number;
  y: number;
  scale: number;
  strength: number;
  life: number;
}

/** Pure ball physics ported from the design's Ball component (px and seconds). */
export class CursorBody {
  x = 0;
  y = 0;
  targetX = 0;
  targetY = 0;
  /** Vertical toss offset (negative is up) and its velocity. */
  tossY = 0;
  tossV = 0;
  air = false;
  squash = 0;
  squashV = 0;
  scale = 1;
  scaleV = 0;
  press = 0;
  down = false;
  kind: CursorKind = '';
  seen = false;
  speed = 0;
  angle = 0;
  stretch = 1;
  ghosts: Ghost[] = [];

  moveTo(x: number, y: number, kind: CursorKind): void {
    if (!this.seen) {
      this.seen = true;
      this.x = x;
      this.y = y;
    }
    this.targetX = x;
    this.targetY = y;
    this.kind = kind;
  }

  pressDown(): void {
    this.down = true;
  }

  /** Release: toss the ball up and let gravity bring it back. */
  release(reduceMotion: boolean): void {
    if (!this.down) return;
    this.down = false;
    if (reduceMotion) return;
    this.tossV = -Math.sqrt(2 * cfg.gravity * cfg.tossHeightPx);
    this.air = true;
  }

  step(dtRaw: number, reduceMotion: boolean): void {
    let dt = dtRaw > 0 ? dtRaw : 0.016;
    if (dt > 0.033) dt = 0.033;

    const follow = 1 - Math.exp(-dt * cfg.followPerSecond);
    const ox = this.x;
    const oy = this.y + this.tossY;
    this.x += (this.targetX - this.x) * follow;
    this.y += (this.targetY - this.y) * follow;

    this.press += ((this.down ? 1 : 0) - this.press) * (1 - Math.exp(-dt * 16));

    if (this.air) {
      this.tossV += cfg.gravity * dt;
      this.tossY += this.tossV * dt;
      if (this.tossY >= 0) {
        const impact = this.tossV;
        this.tossY = 0;
        if (impact > 150) {
          this.tossV = -impact * cfg.restitution;
          this.squashV += impact * 0.0011;
        } else {
          this.tossV = 0;
          this.air = false;
        }
      }
    }

    this.squashV += (-this.squash * 300 - this.squashV * 17) * dt;
    this.squash += this.squashV * dt;
    this.squash = Math.min(0.42, Math.max(-0.18, this.squash));

    const hover = this.kind === 'view' ? cfg.hover.view : this.kind === 'link' ? cfg.hover.link : 1;
    const goal = this.down ? hover * cfg.pressScale : hover;
    this.scaleV += ((goal - this.scale) * 240 - this.scaleV * 24) * dt;
    this.scale += this.scaleV * dt;

    const vx = (this.x - ox) / dt;
    const vy = this.y + this.tossY - oy;
    this.speed = Math.hypot(vx, vy / dt);
    if (this.speed > 60) this.angle = (Math.atan2(vy / dt, vx) * 180) / Math.PI;
    const stretchTarget = 1 + Math.min(this.speed / 2600, 0.7);
    this.stretch += (stretchTarget - this.stretch) * (1 - Math.exp(-dt * 18));

    const strength = Math.min(1, Math.max(0, (this.speed - 90) / 650));
    if (strength > 0.04 && !reduceMotion) {
      this.ghosts.push({
        x: this.x,
        y: this.y + this.tossY + this.press * cfg.pressGatherPx,
        scale: this.scale,
        strength,
        life: 1,
      });
    }
    for (const g of this.ghosts) g.life -= dt * cfg.ghostDecayPerSecond;
    this.ghosts = this.ghosts.filter((g) => g.life > 0).slice(-cfg.maxGhosts);
  }
}
