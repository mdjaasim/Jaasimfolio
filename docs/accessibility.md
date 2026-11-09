# Accessibility

What is built in, and how it is checked.

- **Automated**: `tests/e2e/a11y.spec.ts` runs axe (WCAG 2.0/2.1 A and AA) on every chapter in guided and free mode, on both overlays and on the 404, at desktop and mobile sizes.
- **Keyboard**: every control is a real button or link. `Esc` closes the Index and case-study overlays from anywhere; both trap focus while open and return it to where it came from. Visible 2px focus ring everywhere (inverted on ink grounds).
- **Structure**: one `h1` for the page (visually hidden, the visible "Hello" and name are presentation), `h2` per chapter, a skip link, labelled name field, decorative type (ghost word, marquees, written launch name) is `aria-hidden` with the real text available to assistive tech.
- **Reduced motion** (`prefers-reduced-motion`): the free layout is used, the ball cursor and its trail are off, the launch is a 300ms wordmark, reveals fade for 200ms with no travel, marquees stop.
- **Free scroll** is the fully linear way through the site; the guided story is an enhancement of it. The choice is in the Index overlay and is remembered.
- **Contrast**: ink on bone 16.1:1, on-ink on ink 16.1:1, ink on yellow 13.2:1; muted labels meet 4.5:1 on their own grounds (see the token notes in `design/design-system`). Yellow is never used for text on bone.
- **Cursor**: the ball is hidden for touch and coarse pointers, and the native cursor returns under reduced motion.
