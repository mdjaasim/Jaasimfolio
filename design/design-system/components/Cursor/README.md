The only cursor: one 14px yellow ball that replaces the native pointer on desktop. It has no border and no shadow; it is a plain `yellow` circle (turning `ink` on the yellow Contact scene).

- Follow: it eases toward the pointer with a soft, frame-rate independent lag (about 15 per second), stretches along its path with speed, and leaves a trail of shades. Each shade is its own ghost that spawns while the ball moves fast or bounces and fades out by itself over about 0.6 seconds, so the trail lingers after a stop instead of vanishing.
- Press: the ball shrinks to 68% and gathers down about 5px.
- Release: the ball is tossed up about 70px, falls under gravity (2300 px/s²), squashes softly on landing (a spring, not a jump) and bounces three or four times, each bounce 56% as high as the last, like a game ball. It stretches tall while falling.
- Hover: `data-c="link"` grows it to 2.6x, `data-c="view"` grows it to 5.2x with the label View in ink. Everything else keeps 14px.
- Reduced motion or touch: hide it, keep the native cursor, and drop the trail, stretch and bounce.
- Never add a ring, a border, a shadow or a second colour.
