# THE MACCHI GROUP — Style Reference
> Cartographic minimalism. A clean white canvas, an elegant high-contrast upright serif (Cormorant Upright) for the headers, a clean serif (Louize) for the body, and a single recurring idea — the topographic contour line — standing in for the coast itself. Restraint over decoration; the map is the brand.

**Theme:** light
**Stack:** Next.js (App Router) + Tailwind CSS v4. Fonts via `next/font/google`. Simple, mostly static — minimal motion, no heavy interactions.
**Interim behavior / conversion:** primary CTAs route to a **lead-qualification quiz** at `/get-started` (a placeholder route until the quiz is built — buttons are non-functional placeholders for now). The agent's phone `(239) 825-0700` stays available as a secondary "or call" **text link** (not a button). Community rows and a few footer links point to placeholder `#` routes until those pages exist.

The Macchi Group sells coastal Southwest Florida — Naples, Bonita Springs, Fort Myers / Fort Myers Beach. This system trades the dark luxury route for clean cartographic minimalism: a white paper canvas, generous whitespace, Cormorant Upright — a high-contrast upright serif — for headlines and the wordmark, and Louize — a clean serif set Regular — for body and everything functional. The signature creative element is the **topographic contour line** — real survey-style contours rendered as faint line art behind the hero and key moments — supported by small cartographic touches (coordinate labels, hairline rules). Color is used sparingly: near-black ink for type, Oxford navy as the secondary and the contour-line color, and gold as a rare precious accent. The result should feel like a beautifully printed coastal map: quiet, precise, premium.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Paper | `#FFFFFF` | `--color-paper` | **Primary background.** The clean white canvas for nearly everything. |
| Mist | `#F4F6F7` | `--color-mist` | Subtle cool off-white for the occasional alternating section / card surface. Used sparingly. |
| Ink | `#0E1418` | `--color-ink` | **Primary text**, headings, wordmark. Near-black with a faint cool cast. |
| Oxford Navy | `#002E5C` | `--color-navy` | **Secondary.** Topographic contour lines, select headings/links, the primary button fill. |
| Dim Grey | `#706862` | `--color-muted` | Muted/secondary text, captions, metadata. |
| Silver | `#BDBDBD` | `--color-silver` | Quiet labels, disabled states. |
| Hairline | `#E4E7E6` | `--color-hairline` | 1px borders, dividers, card edges. |
| Goldenrod | `#DFAD38` | `--color-gold` | **Accent only.** A rare precious mark — small underlines, a coordinate tick, an active state. Never a fill or large area. |

### Color rules (enforced)
- White first. Mist only to gently separate a section or surface — never as a dominant background.
- **Navy and gold are restrained.** Navy carries the contour lines and one primary action; gold is a hairline accent only.
- Topographic lines are navy drawn at **8–14% opacity** so they read as texture, never as foreground.
- Body text is ink or dim-grey; never set paragraphs in silver or gold.

---

## Tokens — Typography

> Headers are set in Cormorant Upright, a high-contrast upright serif. It ships **a single Regular weight with no bold and no italic** — so emphasis is carried by the navy color and scale, never by weight or italics. Caps need air: track headers out and keep copy concise so all-caps reads monumental, not shouty. Body stays small and calm in Louize, set Regular.

### Cormorant Upright — Display / header serif
An upright-italic-structured serif: calligraphic skeleton with vertical stress, high contrast, elegant and distinctly editorial. Used for the hero wordmark, section headings, stat figures, community names, and prices. · `--font-display`
- **Family:** Cormorant Upright (provided as `CormorantUpright-Regular.ttf`). Substitute: Cormorant Garamond, Canela, EB Garamond.
- **Single weight — Regular (400) only.** There is no bold and no italic in this cut.
  - **Never let the browser fake it:** set `font-weight:400` and `font-synthesis-weight:none` on all display elements. Synthetic bold destroys the high-contrast strokes.
  - **Emphasis = navy color (and scale), never weight.** `.em { color: var(--color-navy) }`. On video, emphasis is scale/position instead, since navy won't read over footage.
- **Case:** the font *does* include lowercase, but the system sets display type in **CAPS** (`text-transform: uppercase`) to match the wordmark. Sentence case is available if a softer heading is ever wanted.
- **Sizes:** 18px → 225px. Section headings 20–36px; the hero wordmark runs to ~13.5vw, capped at 225px.
- **Tracking:** +0.05em headings, **-0.08em at wordmark scale** (condensed, per Framer source), +0.2em for the small nav wordmark.
- **Line height:** 1.2 at wordmark scale; 1.16–1.2 for multi-line headings.

### Louize — Body, UI & cartographic labels (set REGULAR)
A clean serif used at **Regular (400)** for a calm, editorial body voice — pairs with Cormorant Upright as a serif-display / serif-body system, the two distinguished by case, scale, and tracking rather than by a serif/sans contrast. Body copy, nav, buttons, captions, eyebrows, and coordinate labels. · `--font-body`
- **Family:** Louize (provided as `LouizeTrial-Regular.otf`, a single static weight). This system uses **Regular (400) only**, mirroring the display face's single-weight rule. Substitute: Freight Text, Tiempos, Canela Text. *(Note: this is a trial-license file — confirm a production license before shipping to the live site.)*
- **Weight role:** everything sits at **400 (Regular)** — body, nav links, addresses, micro-labels, buttons, prices' sub-text. With no weight variation to lean on, hierarchy is carried entirely by size, case, and tracking (uppercase + wider tracking for eyebrows/labels, larger size for lead text).
- **Sizes:** 11px → 19px. Body ~15–17px, line-height ~1.7 (keep the slightly darker text color `--soft` for legibility on white).
- **Arrows:** confirm the `→` (U+2192) glyph is present in this font file before relying on a text character; inline SVG (as provided in the prototype) is the safe fallback if it's missing.
- **Eyebrow role:** 11px, 400, UPPERCASE, +0.24em — separated from the display headings by its smaller size and wide tracking.
- **Coordinate label:** 11–12px, 400, letter-spaced, dim-grey.

### Type Scale

| Role | Family | Size (clamp) | Line H | Tracking | Token |
|------|--------|-------------|--------|----------|-------|
| eyebrow | Louize 400 (caps) | 11px | 1.0 | +0.24em | `--text-eyebrow` |
| caption | Louize 400 | 12px | 1.5 | +0.02em | `--text-caption` |
| body | Louize 400 | 15–17px | 1.7 | normal | `--text-body` |
| lead | Louize 400 | 17–19px | 1.6 | normal | `--text-lead` |
| heading-sm | Cormorant Upright (caps) | 20–28px | 1.18 | +0.05em | `--text-heading-sm` |
| heading | Cormorant Upright (caps) | 24–36px | 1.16 | +0.05em | `--text-heading` |
| display | Cormorant Upright (caps) | 32–52px | 1.18 | +0.05em | `--text-display` |
| numeral | Cormorant Upright (caps) | 32–52px | 1.0 | +0.02em | `--text-numeral` |

## Tokens — The Topographic Element (signature)

The contour line is the brand's one creative device. Use it deliberately and quietly.

- **Source:** real marching-squares contours (provided as `topo-wide.svg` and `topo-island.svg`), `stroke=currentColor`, `fill=none`, `vector-effect=non-scaling-stroke`.
- **Color:** `--color-navy` at 8–14% opacity. Never above ~18%.
- **Placement:** full-bleed behind the hero (offset/cropped, not centered), and optionally one faint instance behind a CTA band or section header. **One topographic moment per screenful** — don't tile it everywhere.
- **Stroke:** ~1px effective (non-scaling). Lines stay hairline regardless of scale.
- **Pairing:** a small coordinate label nearby ties the texture to a real place.
- **Don't:** colorize it gold, raise opacity into the foreground, or place body text directly over dense line areas without enough contrast.

---

## Tokens — Spacing & Shapes

**Density:** spacious. Whitespace is the primary premium signal.

### Spacing Scale
| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--space-4` |
| 8 | 8px | `--space-8` |
| 16 | 16px | `--space-16` |
| 24 | 24px | `--space-24` |
| 40 | 40px | `--space-40` |
| 64 | 64px | `--space-64` |
| 96 | 96px | `--space-96` |
| 144 | 144px | `--space-144` |
| 180 | 180px | `--space-180` |

### Border Radius
| Element | Value |
|---------|-------|
| images / hero | 0px |
| cards / panels | 3px |
| buttons / inputs | 3px |

Clean, near-square. Refinement lives in spacing and hairlines.

### Brand Voice & Copy

**Who they are.** The Macchi Group is a *boutique* Southwest Florida real estate team built on relationships and results, known for a highly personalized, **white-glove** experience. The core belief: real estate is far more than a transaction — it's a long-term partnership.

**The three pillars (use as the approach trio / values):**
- **Strategic guidance** — clear, considered advice at every step.
- **An exceptional client experience** — personalized, discreet service, end to end.
- **An unwavering commitment** — fully invested in the client's success.

**The principals (about/team copy):**
- **Tyler Macchi** — born and raised in Southwest Florida; unmatched local knowledge of the region's coastal communities.
- **Brandon Shirk** — shaped by years inside some of the country's most exclusive golf clubs; rare insight into luxury lifestyles and private club living.

**Markets:** Naples, Bonita Springs, Fort Myers / Fort Myers Beach.

**Tone.** Refined, warm, confident, understated. Plainspoken about results; never hype or hard-sell. Speak in first-person plural for the brand ("we", "our clients"). Body copy in sentence case; let the proof points ($197.75M+ volume, 150+ transactions, Top 1% with Coldwell Banker) carry credibility rather than adjectives. The relationship-first ethos shows in soft CTAs ("a direct conversation is the best place to start — no forms, no funnels").

**Signature lines / vocabulary:** "Experience The Coastal Life" (hero); "More than a transaction — a partnership"; "boutique"; "white-glove"; "relationships and results"; "long-term partnership".

**Do:** lead with partnership and service; keep claims specific; stay calm and editorial.
**Don't:** use generic agent-speak ("your dream home awaits!"), exclamation marks, pushy urgency, or stock superlatives without proof.

---

## Layout
- **Page max-width:** 1200px content; hero & contour washes full-bleed.
- **Section vertical padding:** 96px → 180px (clamped).
- **Side gutters:** 24px → 72px (clamped).
- **Borders:** 1px `--color-hairline` for structure; gold reserved for a rare accent underline.
- **Rhythm:** eyebrow → heading ~22px; heading → body ~24px. Let blocks breathe.

---

## Components

### Top Navigation
Fixed, and **transparent over the hero** — white links, a white-outline `Get started` button, and **no wordmark** (the giant hero wordmark is doing that job). Past the hero (~72% viewport scrolled) it transitions to `rgba(255,255,255,.94)` + blur with a hairline bottom border: links turn ink, the CTA becomes a solid navy button, and the small Cormorant Upright wordmark (+0.2em tracking) fades in from the left. Transition ~0.4s. Links: Louize 13px/400 with an underline on hover.

### Hero (full-viewport video + wordmark reveal)  ← signature moment
The single most important composition on the site. Built from the Framer design.

**Structure:** `<header>` at exactly one viewport (`height:100svh`, min 560px), content anchored **bottom-left**.
- **Background:** full-bleed looping video, `object-fit:cover` — top-down aerial surf/shoreline footage. `<video autoPlay muted loop playsInline poster>`; final file at `/public/media/hero-coastline.mp4`, poster at `/public/media/hero-poster.jpg`.
- **Scrim:** two soft gradients only — a light top wash for nav legibility and a diagonal bottom-left wash (~52% → 0) so the white wordmark holds over bright surf. Keep it subtle; the footage should stay bright and airy.
- **Wordmark:** `THE / MACCHI / GROUP` stacked on three lines, Cormorant Upright caps, white, `clamp(3.5rem, 13.5vw, 14.0625rem)` (225px cap, matching the Framer source), line-height **1.2**, tracking **-0.08em**. It sits at the page gutter, ~48–86px off the bottom. This is the only place the wordmark appears at scale.
- **Above it:** a small white coordinate label (`26.142° N · 81.795° W — SOUTHWEST FLORIDA`).
- **Bottom-right:** a small `SCROLL` cue that fades in last.
- **No buttons in the hero.** The composition stays pure per the design; conversion lives in the always-visible nav CTA and the sections below.

**Motion — masked line reveal (the "invisible frame"):** each line is wrapped in a clipping span (`overflow:hidden`) with an inner span that starts at `translateY(108%)` and animates to `0`. The lines rise from behind an invisible edge and stop flush.
- **Duration:** 1.15s · **Easing:** `cubic-bezier(.16,.84,.44,1)` (fast out, long settle) · **Stagger:** coordinate label 0.05s, then lines at 0.15s / 0.29s / 0.43s · `SCROLL` cue fades in at 0.95s.
- Fires once on load. **`prefers-reduced-motion`: no transform, no animation — everything renders in place.**

```html
<h1 class="wordmark">
  <span class="rv"><span>The</span></span>
  <span class="rv"><span>Macchi</span></span>
  <span class="rv"><span>Group</span></span>
</h1>
```
```css
.rv{display:block;overflow:hidden}
.rv > span{display:block;transform:translateY(108%);animation:rise 1.15s cubic-bezier(.16,.84,.44,1) forwards}
@keyframes rise{to{transform:translateY(0)}}
```

### Eyebrow / Coordinate Label
Louize 11px, 400, uppercase, +0.24em, navy or dim-grey, optionally preceded by a short hairline or gold tick.

### Stat Row
Three figures (`$197.75M+`, `150+`, `TOP 1%`) in Cormorant Upright caps at restrained scale, ink with the unit/percent in navy, and Louize 400 uppercase labels beneath and thin hairline dividers between. Generous spacing; on white or mist.

### Property Card
White card, 1px hairline, 3px radius. Image area on top (0px radius). Below, comfortable padding: status label (`FOR SALE` in navy or gold), price in Cormorant Upright caps ~22px ink, address in Louize 400 ~15px dim-grey, bed/bath/sqft caption (12px) with thin dividers. A quiet **Inquire** phone link. Until photography is wired in, use a mist placeholder with a faint topographic motif.

### Community List
Cartographic index: each row is a community name in Cormorant Upright caps with its region + (optional) coordinate in a Louize caption, separated by hairlines. A small **→** affordance; minimal hover (color shift only). Reads like a map legend.

### CTA Band
White or mist with one faint topographic instance. Cormorant Upright caps heading (emphasis word in navy), short Louize (Regular) lead, and a primary `Get started` button to the quiz, with a small "or call" phone text link beneath.

### Buttons / Controls (primary CTAs → quiz `/get-started`)
- **Primary:** navy fill, paper label, Louize 400 13px, +0.1em, 3px radius. Hover: ink fill.
- **Secondary:** ink label, 1px hairline border; hover border→navy.
- **Text link:** ink/navy with a thin underline; gold underline for the rare accent.
- **"or call" link:** the phone is a small secondary **text link** beneath the primary button (`or call (239) 825-0700`), never a styled button — quiz is the primary path.
- Focus: 2px navy focus ring, always visible.

### Footer
White, 1px hairline top. Columns: wordmark + line; nav anchors; contact (phone → tel, `550 5th Ave S, Naples FL 34102`); social. Coldwell Banker / Fair Housing compliance text in 11–12px dim-grey at the base. Optional faint contour line above the legal row.

---

## Do's and Don'ts

### Do
- Keep the canvas white and the layout calm; let whitespace do the work.
- Use the topographic contour as the one signature element — quiet, navy, low opacity.
- Set headlines in Cormorant Upright caps; carry emphasis with weight 600 + navy (no italic exists).
- Keep type small and restrained; track Cormorant Upright caps out and keep headings concise.
- Set body in Louize Regular (400) throughout — one weight only, so let case, size, and tracking carry emphasis instead of weight, same as the display face.
- Add cartographic touches (coordinates, hairlines) sparingly for flavor.
- Point every CTA at the phone number for now.

### Don't
- Don't reintroduce dark/onyx backgrounds or heavy gradients — this is a light system.
- Don't tile the topographic lines everywhere or raise them into the foreground.
- Don't colorize contours gold or use gold as a fill.
- Don't add scroll animations, parallax, or other "bells and whistles" — the hero wordmark reveal is the *only* animation on the site.
- Don't crowd; don't shrink the section padding to fit more in.
- Don't set body copy or long sentences in Cormorant Upright caps; don't track it negative; don't fake an italic.
- Don't mix in a second body weight — Louize stays Regular (400) everywhere; carry emphasis with case/size/tracking, never bold.

---

## Surfaces & Elevation

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Paper | `#FFFFFF` | Page background |
| 1 | Mist | `#F4F6F7` | Occasional section/card surface |

Elevation is expressed through hairlines and spacing, not shadow. At most a single very soft shadow on a hovered card; prefer borders.

---

## Imagery

Waterfront architecture, refined interiors, aerial coastline. Treated clean and full-bleed, 0px radius, true color on white (no heavy filters). Until the photo/MLS library is wired in, use mist placeholders carrying a faint topographic motif so layouts read correctly. The hero uses the aerial coastal drone video as the single motion moment; every other section is static. Below the hero, photography sits clean and full-bleed on white.

---

## Layout

Simple single-column vertical scroll with abundant whitespace: **hero (full-viewport video + bottom-left wordmark reveal) → about/team (boutique positioning, the two principals, the three pillars) → stat row → featured properties (2–3 cards) → community index → phone CTA band → footer.** Content sits in a 1200px max-width column with wide gutters; the contour art and CTA washes go full-bleed. Sections separated by hairlines and 96–180px gaps. Sticky white nav with a hairline border.

---

## Agent Prompt Guide

**Quick Reference**
- background: `#FFFFFF` (paper), `#F4F6F7` (mist, sparingly)
- text: `#0E1418` (ink) / `#706862` (dim-grey)
- secondary + contour lines: `#002E5C` (navy)
- accent: `#DFAD38` (gold) — rare hairline/tick only
- primary CTAs → quiz `/get-started` (placeholder); phone `(239) 825-0700` = secondary "or call" text link
- type: Cormorant Upright (display, CAPS, single weight; emphasis via navy) + Louize Regular (body/UI serif, 400 throughout); eyebrows 11px uppercase +0.24em; arrows as inline SVG (confirm native → glyph before relying on text)

**Example component prompts**
1. **Hero:** Full-viewport (100svh) looping muted autoplay aerial surf video, `object-fit:cover`, with a light top scrim and a diagonal bottom-left scrim. Anchored bottom-left at the page gutter: a small white coordinate label, then the wordmark `THE / MACCHI / GROUP` on three lines in Cormorant Upright caps, white, clamp(3.5rem,13.5vw,14.0625rem), line-height 1.2, tracking -0.08em. Each line masked in an `overflow:hidden` wrapper and animated from `translateY(108%)` to 0 over 1.15s `cubic-bezier(.16,.84,.44,1)`, staggered .15/.29/.43s. Small `SCROLL` cue bottom-right fading in at .95s. No buttons in the hero. Honor prefers-reduced-motion (render in place).
2. **Stat row:** Three Cormorant Upright caps figures ($197.75M+, 150+, TOP 1%) in ink (unit/percent in navy) with Louize 400 uppercase labels and hairline dividers, generous spacing, white background.
3. **Community index:** Hairline-separated rows; each row a Cormorant Upright caps community name + Louize region/coordinate caption and a small → ; minimal color-shift hover.
4. **Primary button:** Navy fill, paper label, Louize 400 13px +0.08em, 3px radius, hover→ink fill, 2px navy focus ring; href `/get-started` (the lead-qualification quiz).

---

## Similar / Reference Brands
- **Field Notes / topographic survey aesthetics** — contour-line cartography as graphic language.
- **Christie's International Real Estate** — clean, editorial, restrained luxury.
- **Aman (light materials)** — quiet premium, generous whitespace.
- **Upright-italic serifs (Cormorant Upright, Canela)** — calligraphic structure set vertically; luxury editorial lettering.

---

## Quick Start

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-paper: #FFFFFF;
  --color-mist: #F4F6F7;
  --color-ink: #0E1418;
  --color-soft: #2A3036; /* body text on white */
  --color-navy: #002E5C;
  --color-muted: #706862;
  --color-silver: #BDBDBD;
  --color-hairline: #E4E7E6;
  --color-gold: #DFAD38;

  /* Fonts */
  --font-display: "Cormorant Upright", Georgia, serif;
  --font-body: "Louize", Georgia, "Times New Roman", serif;

  /* Type scale (clamped) */
  --text-eyebrow: 0.6875rem;   /* 11px, uppercase, +0.24em */
  --text-caption: 0.75rem;
  --text-body: clamp(0.9375rem, 0.9rem + 0.2vw, 1rem);
  --text-lead: clamp(1.0625rem, 1rem + 0.3vw, 1.125rem);
  --text-heading-sm: clamp(1.375rem, 1.2rem + 0.9vw, 1.75rem);
  --text-heading: clamp(1.875rem, 1.45rem + 2vw, 2.75rem);
  --text-display: clamp(2.5rem, 1.8rem + 3.1vw, 4rem);
  --text-numeral: clamp(2.25rem, 1.7rem + 2.6vw, 3.75rem);

  /* Topographic line */
  --topo-color: #002E5C;
  --topo-opacity: 0.10;

  /* Spacing */
  --space-4:4px; --space-8:8px; --space-16:16px; --space-24:24px;
  --space-40:40px; --space-64:64px; --space-96:96px; --space-144:144px; --space-180:180px;

  /* Radius */
  --radius-card: 3px;
  --radius-button: 3px;

  /* Layout */
  --page-max: 1200px;
  --section-pad: clamp(96px, 12vw, 180px);
  --gutter: clamp(24px, 5vw, 72px);

  /* Motion — hero reveal only */
  --reveal-duration: 1.15s;
  --reveal-ease: cubic-bezier(.16,.84,.44,1);
  --reveal-offset: 108%;

  /* Conversion */
  --quiz-route: "/get-started"; /* lead-qualification quiz (to build) */
  --agent-phone: "tel:+12398250700"; /* secondary text link only */
}
```

### Tailwind v4 `@theme`
```css
@theme {
  --color-paper: #FFFFFF;
  --color-mist: #F4F6F7;
  --color-ink: #0E1418;
  --color-navy: #002E5C;
  --color-muted: #706862;
  --color-silver: #BDBDBD;
  --color-hairline: #E4E7E6;
  --color-gold: #DFAD38;

  --font-display: "Cormorant Upright", Georgia, serif;
  --font-body: "Louize", Georgia, serif;

  --radius-card: 3px;
  --radius-button: 3px;
}
```

### Next.js font setup (`app/layout.tsx`)
```ts
import localFont from "next/font/local";

// Both faces are local, single-weight files.
const display = localFont({
  src: "./fonts/CormorantUpright-Regular.ttf",
  weight: "400", display: "swap", variable: "--font-display",
});
const body = localFont({
  src: "./fonts/LouizeTrial-Regular.otf",
  weight: "400", display: "swap", variable: "--font-body",
});
// add `${display.variable} ${body.variable}` to <html>
// Display type is set uppercase via `text-transform`; pin `font-weight:400` + `font-synthesis-weight:none` (single-weight font).
// Body weight = 400 (Regular) everywhere — no light/medium split. Arrows render as inline SVG unless the → glyph is confirmed present.
// NOTE: LouizeTrial-Regular.otf is a trial-license file — swap in the licensed version before production launch.
```

### Topographic SVG usage
```tsx
// Place provided topo-wide.svg in /public. Render faint, cropped, behind content.
<div className="topo" aria-hidden>{/* inline <svg> with stroke=currentColor */}</div>
```
```css
.topo{ position:absolute; inset:0; color:var(--topo-color); opacity:var(--topo-opacity);
  pointer-events:none; overflow:hidden; }
.topo svg{ position:absolute; width:140%; height:140%; top:-20%; right:-20%; }
```

### Hero video (Next.js)
```tsx
// Final file goes in /public/media/. Optimized 1080p placeholder + poster provided.
<video className="hero__video" autoPlay muted loop playsInline poster="/media/hero-poster.jpg">
  <source src="/media/hero-coastline.mp4" type="video/mp4" />
</video>
// Onyx scrims over the video for legibility; pause + show poster on prefers-reduced-motion.
```

### CTA patterns (quiz primary, phone secondary)
```tsx
// Primary conversion → lead-qualification quiz (placeholder route until built)
<a href="/get-started" className="btn btn--primary">Get started</a>

// Phone stays available as a secondary text link, never a button
<a href="tel:+12398250700" className="call-link">or call (239) 825-0700</a>
```

---

## Open Build Decisions (carry into the project)
- **Lead-qualification quiz:** build the `/get-started` multi-step quiz form — the primary conversion target all CTAs point to (define the qualifying questions + where submissions route). Buttons are placeholders until then.
- **Agent phone:** confirm `(239) 825-0700` for the secondary "or call" links (alt on file: 239-218-4825).
- **MLS / IDX:** property search + live listings data source for a later phase.
- **Hero video:** final top-down aerial surf/shoreline clip to be added at `/public/media/hero-coastline.mp4` (+ `hero-poster.jpg`). A different aerial coastline clip is embedded in the prototype as a stand-in; an optimized 1080p version + poster are in `/media`. Target ≤6–8s seamless loop, muted, ~1080p, H.264 faststart.
- **Team:** confirm each principal's title/role.
- **Imagery library:** property/neighborhood photo source; topographic placeholders used until then.
- **Fonts:** Cormorant Upright (headers/wordmark) + Louize Regular (body) — locked. Body font file is a trial license (`LouizeTrial-Regular.otf`) — confirm/purchase the production license before launch.
- **Branding:** Coldwell Banker co-branding degree + compliance text placement.
