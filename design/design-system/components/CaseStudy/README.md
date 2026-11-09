A project opens as a case study without a page cut, and moves to the next project without a hard swap.

- Open: choosing a Work row expands the cover from the middle of the screen (clip-path from `inset(34% 30% 34% 30% round 28px)` to the full screen, 1s, ease (.7,0,.2,1)). Closing plays it in reverse. Nothing is shown or hidden instantly.
- Cover: a full-bleed `ink` panel with `radius-xl` bottom corners, one photograph (760x430, `radius-lg`) and one tall crop (230x440, `radius-xl`), the project name set huge at the bottom left (280px, tracking -6%). Each piece rises in with a stagger of about 150ms.
- Body: a meta column (Role, Stack, Year, Live) at 300px, then Problem, What I built and Outcome in `body` at 20/30, and a gallery of two photographs. Use résumé facts only; leave [YEAR] and [LIVE LINK] as marked placeholders until real values exist.
- Next project: a full-width `ink` row at the end of the page with the next project's name at 170px. Choosing it slides the next project up over the current one in 1.1s, ease (.7,0,.2,1), while the current one drifts up 14%; then the layers swap with no visible jump and the scroll returns to the top.
- A "← Work" control sits top left in white with `mix-blend-mode: difference`, so it stays legible on ink and on bone.
- Reduced motion: a 200ms fade instead of the expand and the slide.
