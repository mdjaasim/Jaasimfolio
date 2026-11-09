The logo is the name in capitals wrapped in code tags: the wordmark `<JAASIM>` (an opening tag and a closing tag) and the short mark `<J/>` (the tag closes itself). It replaces the earlier yellow-dot logo; there is no dot in the identity any more.

- Set it in Archivo at width 125, weight 600, uppercase, tracking -2%. The tags `<` and `>` are the same size and weight at 55% opacity, 0.12em from the letters.
- Use `jc-wm` for the wordmark and `jc-mark` for the short mark; both take a size through `--wm`.
- On bone and yellow grounds the logo is `ink`; on ink it is `on-ink`. The tags always follow the text colour.
- In the launch, the finished name "MOHAMED JAASIM" is wrapped in full-strength `yellow` tags that slide in from both ends. That is the only place the tags are yellow.
- The header morph: at the top of the page the header shows `<JAASIM>`. As the visitor scrolls (0 to about half a screen) the letters AASIM collapse and fade (max-width to 0, 1s ease (.7,0,.2,1)) while a `/` fades in before the closing `>`, so the mark ends as `<J/>`. It is driven by scroll position, so scrolling back restores the full name. Use the `jc-wm--morph` class and put the letters after the J in `jc-wm__x` and the slash after them in `jc-wm__s`; toggling `is-short` plays the same motion for non-scroll uses.
- Favicon, app icon and avatar use `<J/>`; minimum size 16px for the favicon, 24px for the header mark.
- Never add a dot, an outline, a gradient or a second colour; never set the tags in yellow on bone (1.2:1).
