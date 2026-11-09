# References

Four sites studied. "Observed" means I loaded the site in a real browser and measured it; "proposed" means it is my idea, not something I saw. Only patterns and public font names are taken; no code, copy or assets are copied.

## HelloAsso brand book (brand.helloasso.com)
- Observed: a blank white screen. Thin construction guide lines (baseline, cap height, margins) draw in. The name appears as outlined letterforms, then fills solid, and the tagline lands underneath. Fonts: ITC Franklin Gothic Demi Compressed 700 at 132px for the name, ABC Diatype Rounded for text. Built with GSAP and ScrollTrigger on Astro with a client router; the native cursor is hidden.
- We take: the grid and the letter-by-letter writing, then yellow code tags at both ends of the finished name.

## LCG (lcg.media)
- Observed: a calm warm-grey launch where abstract black shapes assemble into the logo, then the page slides in. Headlines in Soehne Breit Kraftig (a wide, extended grotesque) at 74px, body in PP Mori. A single crimson accent line inside a black headline. Headlines reveal line by line. Lenis smooth scroll, custom cursor, circle-cropped imagery.
- We take: the wide extended display face (stand-in Archivo at width 125), one accent-coloured line per headline, line-by-line mask reveals.

## Davide Carusio (davidecarusio.it/en)
- Observed: a dark charcoal start with the small name, which lifts away like a curtain to reveal a warm bone page. The name is set in huge lowercase, edge to edge, anchored to the bottom of the hero; a small intro paragraph sits top right with a mono label. Geist (500, 600, 700), Geist Mono and Funnel Display. GSAP 3.15 with ScrollTrigger, SplitText and CustomEase, Lenis, and a soft WebGL shape in the background.
- Not observed: the video previews on hover. I could not see them in my capture; they are my proposal for Work.
- We take: the slide-up curtain, the giant name anchored to the bottom edge, and the unhurried feel (custom easing with Lenis).

## Sruthi (worksruthi.com)
- Observed: a Next.js site. It opens on a black screen with giant red words flashing, then the home asks "HELLO {{ first name }}" with a typing caret in mono. The cursor is a 14px red ball (`tc-ball`) whose transform follows with a spring (0.34s, cubic-bezier(.22, 1, .36, 1)). Impact for display, Geist and Geist Mono for text. The site carries a notice asking AI agents not to summarise or reproduce its content, so I took only the interaction idea, nothing else.
- We take: the personalised hello (the visitor types a name and the page greets them) and the ball cursor with squash and bounce.

## What we improvise
| Moment | Ours |
| --- | --- |
| Launch | Sruthi-style cut between giant words and photographs that speeds up while black closes from the top and the bottom, then HelloAsso-style grid and letter-by-letter writing, ending with yellow code tags. |
| Hello | The curtain slides up (Davide) to "Hello {{ your name }}". The field is `{{ first name }}` with a blinking line. Typing a name and pressing Enter or clicking away turns it into "Hello, *Priya.*" with the name in Fraunces italic over a yellow highlighter, the one accent per viewport. Skip gives "Hello." The name is kept only in the visitor's own browser and returns in the Contact scene ("Thanks, Priya"). |
| Cursor | One yellow ball with no border or shadow. It follows softly, stretches with speed and leaves a fading trail. Press shrinks it, release tosses it up and it bounces like a game ball. It grows on links and with "View" on Work. |
| Work | Typographic rows with a preview that follows the ball; the preview becomes a muted video loop on hover (proposed). |
| Type | Wide grotesque for display (LCG), Geist for text and Geist Mono for labels (Davide, Sruthi), Fraunces italic for the single accent word. |

## What we leave out
Cookie and sound banners, scrolling ticker banners, cut-out photo collages, soft gradient backgrounds and any second accent colour.

## Decisions for you
- Display face: Archivo Expanded is free and close to Soehne Breit; the real Soehne Breit is a paid licence.
- Geist for text and labels: free, and used by both Davide and Sruthi.
