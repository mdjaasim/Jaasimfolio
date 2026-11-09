# Storyboard

One continuous, pinned story. The page is a single stage; scroll position drives everything and scenes wipe over each other. Grounds alternate bone and ink and the last scene is yellow. There is no scroll indicator, no hint text and no Continue, Skip or Next controls. Content comes from the résumé only. Scroll is measured in screens (1 screen = 900px) and is eased, so the page glides toward the scroll position instead of snapping.

## Frame (always present)
- Top left: the logo `<JAASIM>`, which becomes `<J/>` over the first half-screen of scroll. Top right: the Dubai time and the word "Index".
- Index opens a full-screen ink overlay (slides up, list rises in); choosing a chapter closes it and glides there.

## 00 · Launch (once per session, about 9.3s)
Ten word and photograph pairs at a calm 150ms; then black closes from the top and the bottom together (2.8s, ease in and out) while the cut accelerates to about 35ms; then grid lines and the name written letter by letter; yellow tags at both ends; the curtain lifts to Hello. The field takes focus.

## 01 · Hello (screen 0 to 1)
"Hello" and the field `{{ first name }}` with a blinking line. Typing a name and pressing Enter, or clicking away, turns it into "Hello, Priya." (the name in italic on a yellow highlighter) and a sentence. Scrolling continues without typing (it reads "Hello.").

## 02 · Hero (screens 0.5 to 3)
The name rises in letter by letter; "Mohamed" and "Jaasim" drift apart as the sentence fades; one phone rises from the bottom and travels to the centre.

## 03 · Craft (screens 2.5 to 7.8, ink)
The ground wipes up to ink. A ghost word CRAFT drifts at 0.4x, tech labels float at different speeds, and the same phone stays pinned. Four beats swap screen and caption: workout engine and calendar, AI-driven personalisation, UI and JS performance, and the bug-report SDK (the phone shakes, the sheet rises, the brand switcher re-themes it in three steps).

## 04 · By the numbers (screens 7.2 to 9.8, bone)
Four counters in display type tick up: 4 apps live, 5 websites, 1 SDK, 3 companies. A yellow highlighter wipes behind the 4.

## 05 · Work (screens 9 to 11)
Four typographic rows rise in. Hovering dims the others and a tech photograph follows the pointer; choosing a row opens its case study.

## 06 · Lab (screens 10.4 to 13.5, ink)
Vertical scroll turns into horizontal travel through three panels (3D Portfolio, Football Live Stats, StoryBooks), each with a photograph that moves at its own speed.

## 07 · Path (screens 12.8 to 15.9, bone)
A 1px line draws down with a small yellow ball as its head. ZYSI Tech, Hakuna Matata Solutions and Fuze appear as it reaches them, then the Fuze timeline: Mobile, SDK, Release, Web, Backend, Speed. The education line fades in at the end.

## 08 · About and stack (screens 15 to 17.3)
The portrait reveals by clip-path; the bio rises; two marquees run in opposite directions, driven by scroll.

## 09 · Contact (screens 16.6 to 18, yellow)
The ground floods yellow; the headline reveals line by line; the Say hello circle scales in with a soft overshoot; the email copies with a "Copied" pill that rises in; the cursor turns ink.

## Overlays
- Index: slides up with 40px top corners, items rise one after another.
- Case study: expands from the Work row; the next project slides up over it in 1.1s.
- 404: slides up; the yellow ball has rolled away and "Back home" rolls in as a ball.

## Responsive and fallbacks
Under 768px the Index overlay is the only navigation, the Lab becomes a native swipe and pins are shorter. Reduced motion or Free scroll: no pinning, hijack, lerp or parallax; content fades in over 200ms; the cursor is hidden.
