# Production Hardening Audit — Phase 0

**Site:** https://shamsnahidk.github.io
**Repo:** shamsnahidk/shamsnahidk.github.io (user site, served from repo root via `actions/deploy-pages`)
**Date:** 2026-04-20
**Mode:** Read-only baseline. No source files were modified in this phase.

---

## 1. Stack detection

| Layer | Tech | Version |
|---|---|---|
| Framework | React | 19.2.5 |
| Bundler | Vite | 8.0.9 (Rolldown) |
| Plugin | @vitejs/plugin-react | 6.0.1 |
| Language | TypeScript | ~6.0.2 |
| Styling | Tailwind CSS | 3.4.17 + PostCSS 8.5.10 + autoprefixer 10.5.0 |
| Animation | framer-motion | 12.38.0 |
| Icons | lucide-react | 1.8.0 |
| Linting | ESLint | 9.39.4 + typescript-eslint 8.58.2 |
| Router | **none** (single-page anchor scrolling) |
| State | **none** |
| Package manager | npm | 11.9.0 |
| Node (local) | 24.14.0 |
| Node (CI) | 20 (no `.nvmrc` — Phase 9 should add one) |

`base` in `vite.config.ts` is `/` (correct for user-site deployment).

---

## 2. Routes / sections

There is **one route** (`/`). Navigation is in-page anchors only:

| Anchor | Component | In nav? |
|---|---|---|
| `#top` | `Hero` | logo |
| (none) | `Marquee` | no |
| (none) | `Stats` | no |
| `#about` | `About` | yes |
| `#skills` | `Skills` | yes |
| `#experience` | `Experience` | yes |
| `#projects` | `Projects` | yes |
| `#education` | `Education` | yes |
| `#contact` | `Contact` (also contains the page `<footer>`) | yes |

There are **no sub-pages**, no project deep-dives, no `/writing`, no `/uses`, no `/404`.

---

## 3. Rendering mode — the real production blocker

**100% client-rendered SPA.** The shipped HTML body is:

```html
<body>
  <div id="root"></div>
  <noscript>
    <p ...>Shams Nahid K is a Software Developer based in Chicago, USA, building resilient backend services...</p>
  </noscript>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

`curl -sL https://shamsnahidk.github.io | sed -n '/<body>/,/<\/body>/p'` confirms zero rendered content. The 14 occurrences of "Shams" in the HTML are all in `<head>` meta tags + JSON-LD.

**Implications:**

- **Modern Googlebot** renders JS and will index correctly (with budget delay).
- **LinkedIn / Twitter / Slack / Discord / Bing / DuckDuckGo / archive.org / AI crawlers** generally do not. They see only the noscript line.
- Time-to-first-meaningful-content is gated on a 371KB JS download + parse + React hydration before any text appears.

This is the single highest-leverage thing to fix. Phase 2 (prerender) should resolve it.

---

## 4. SEO inventory (route `/`)

| Item | Status | Notes |
|---|---|---|
| `<title>` | ⚠ | Present, but **76 chars** — Google SERP truncates ~60. Needs trim. |
| `<meta name="description">` | ⚠ | Present, but **~250 chars** — Google truncates ~155. Needs trim. |
| `<meta name="keywords">` | ⚠ | Present but ignored by Google; harmless. |
| `<meta name="robots">` | ✅ | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| `<link rel="canonical">` | ✅ | `https://shamsnahidk.github.io/` |
| `og:title` / `og:description` / `og:url` / `og:type` / `og:locale` / `og:site_name` | ✅ | All present. |
| `og:image` (1200×630) | ✅ | `og-image.png`, 181KB, with `og:image:width/height/type/secure_url/alt` |
| `twitter:card` (`summary_large_image`) | ✅ | + `twitter:title` / `:description` / `:image` / `:image:alt` |
| `twitter:site` / `twitter:creator` | ❌ | No Twitter handle wired (low priority). |
| JSON-LD `Person` | ✅ | name, jobTitle, image, address, alumniOf, knowsAbout, sameAs |
| JSON-LD `WebSite` | ✅ | url, name, description, inLanguage, publisher → Person |
| `og:type` should be `profile` on `/` | ⚠ | Currently `website`. Person sites are conventionally `profile`. |
| `theme-color` | ✅ | `#0F172A` |
| `lang="en"` | ✅ | On `<html>` |
| `viewport` | ✅ | width=device-width, initial-scale=1.0 |
| `robots.txt` | ✅ | Allows all, links sitemap. |
| `sitemap.xml` | ✅ | One URL (homepage). Adequate for a single-route site; will need expansion when case-study pages are added. |
| Favicon `.svg` | ✅ | 9.5KB (slightly large for an icon) |
| Favicon 32 PNG | ❌ | Older browsers / Slack / Discord prefer PNG. |
| `apple-touch-icon` 180 PNG | ❌ | iOS home-screen will fall back to default. |
| Web App Manifest (`site.webmanifest`) | ❌ | No PWA install hint, no Android home-screen icon. |
| 192/512 PNG icons | ❌ | Android Chrome needs these for splash. |
| `BreadcrumbList` JSON-LD | n/a | Not needed (no sub-pages yet). |
| `Article` / `BlogPosting` JSON-LD | n/a | No writing yet. |

---

## 5. Asset inventory

### `public/`

| File | Size | Purpose |
|---|---|---|
| `favicon.svg` | 9.5 KB | Site icon |
| `icons.svg` | 5.0 KB | **Unreferenced** — `grep -rn "icons.svg"` returns nothing. Dead asset. |
| `og-image.png` | 181 KB | Social preview, 1200×630 |
| `og-image.svg` | 6.8 KB | Source SVG for the OG image |
| `robots.txt` | 75 B | |
| `sitemap.xml` | 273 B | |
| `.nojekyll` | 0 B | Disables Jekyll on Pages |

**No raster images are shipped.** No project screenshots, no architecture diagrams, no avatar, no resume PDF.

### Fonts

```
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

- **Render-blocking** (loaded via CSS `@import`, not `<link rel="preload">`).
- **Way too many weights** — Archivo loads 7 weights, Space Grotesk 5, JetBrains Mono 2. The site visibly uses ~3–4 of these.
- Should be self-hosted via `@fontsource/*` or trimmed to weights actually used + preloaded.

### External origins

- `fonts.googleapis.com` — preconnected ✅
- `fonts.gstatic.com` — preconnected (`crossorigin`) ✅
- No analytics, no tracking pixels, no third-party scripts. ✅

---

## 6. Accessibility scan

Ran `npx @axe-core/cli https://shamsnahidk.github.io --tags wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa`:

```
0 violations found!
```

Important caveat: axe ran in headless Chrome which **executes JS**, so it scans the hydrated DOM, not the noscript shell. Crawler-visible accessibility is effectively nil because there's no body content for screen readers without JS.

### Manual landmark + structure review

| Item | Status | Notes |
|---|---|---|
| One `<h1>` per page | ✅ | `Hero.tsx:112` |
| `<h2>` per section | ✅ | via `SectionHeader` |
| Heading hierarchy h1→h2→h3 (no skips) | ✅ | About/Education/Experience/Projects use h3 inside sections that have h2 from SectionHeader |
| `<header>` landmark | ✅ | Navbar (`<motion.header>`) |
| `<main>` landmark | ✅ | App.tsx |
| `<nav>` landmark | ✅ | Navbar + SectionDots (with aria-label) |
| `<footer>` landmark | ⚠ | Inside Contact section (not a top-level sibling of `<main>`). Acceptable but unconventional. |
| Skip-to-content link | ❌ | Missing; first tab lands on logo, then through long nav. |
| Visible focus rings | ⚠ | Present on `.btn-primary`/`.btn-ghost` (`focus:ring-2`); generic anchor links inherit only browser defaults. |
| Decorative SVGs `aria-hidden` | ✅ | Marquee, blobs, orbs |
| Icon-only buttons have `aria-label` | ✅ | Mobile menu toggle, SectionDots |
| Reduced-motion respect | ✅ | `useReducedMotion` in Hero, CursorBlob |
| Color contrast | ⚠ | `text-ink-500` (#64748B) on white = 4.65:1 (AA pass); `text-ink-400` (#94A3B8) on white = 2.85:1 (**fails AA**). Eyebrows + `text-ink-400` captions need to be checked. |
| `prefers-color-scheme` dark mode | ❌ | Site is light-only. |
| Form a11y | n/a | No forms exist. |

---

## 7. Lighthouse baseline

**Could not obtain automated scores in this environment.**

- `npx lighthouse ... --headless` (Chrome 122, Win11): **`NO_FCP`** runtime error — headless Chrome on Windows backgrounded and never painted.
- `googleapis.com/pagespeedonline/v5` (PSI API): **`Quota exceeded`** for the day.

**Recommended action:** Re-run from your machine via Chrome DevTools → Lighthouse panel, or wait for PSI quota reset. Targets per the brief (mobile): Perf ≥95, LCP <2.0s, CLS <0.05, TBT <150ms, INP <200ms.

### Educated estimate based on what's measurable

| Vector | Likely score / risk |
|---|---|
| **Performance** | ⚠ 70–85 estimated. 371KB single-chunk JS + render-blocking Google Fonts CSS @import + no critical CSS = LCP risk on slow 4G. |
| **Accessibility** | Likely 95–100 (axe is clean). |
| **Best Practices** | Likely 95–100 (no console errors expected; HTTPS via Pages). |
| **SEO** | Likely 90–100 (all meta present; the only deduction risk is the noscript-only body, but Lighthouse's SEO check is lenient about this). |

---

## 8. Bundle size

```
dist/index.html                   5.88 kB │ gzip:   1.65 kB
dist/assets/index-BasR0h6z.css   25.97 kB │ gzip:   5.54 kB
dist/assets/index-oqIK9-8l.js   371.30 kB │ gzip: 117.84 kB
```

- **Single JS chunk, no code splitting at all.** The site is one route, but framer-motion (~150KB) could be lazy-loaded into below-the-fold sections.
- 117KB gzip JS is borderline acceptable for a portfolio; not great on slow 3G/4G.
- CSS at 25KB raw / 5.5KB gz is fine — Tailwind's purge is working.
- HTML at 5.88KB is mostly JSON-LD + meta tags (acceptable cost).

---

## 9. Content gaps (hiring-manager POV)

| Missing / weak | Impact |
|---|---|
| **No deep-dive case studies** (`/projects/<slug>` with architecture, decisions, tradeoffs) | High — this is the single most differentiating page on a developer portfolio. |
| **No resume PDF** (`/resume.pdf` referenced in data but file does not exist) | High — recruiters expect a one-click download. |
| **No GitHub activity / pinned repos panel** | Medium — proves you actually ship. |
| **No writing / blog** | Medium — but only do this if there's real content; empty blogs hurt more than they help. |
| **No avatar / photo** | Low–Medium — humanizes the page; not required. |
| **No testimonials / references** | Low — nice-to-have. |
| **No contact form** — only `mailto:` links | Medium — many users won't open their mail client; conversion drops. |
| **Stats are unverifiable** (`500+ users`, `15+ tools`) | Low — fine for now, but case studies should ground these. |
| **Education's "Final Project" is one-line** | Low. |
| **No "What I'm working on now" / status indicator** | Low. |

---

## 10. Broken / weak things found

### 🔴 Bug — leftover AI/ML copy after pivot

**`src/components/Contact.tsx:88`** still reads:

> Open to AI/ML engineering roles, research collaborations, and challenging projects in computer vision and LLM systems.

This contradicts the Software Developer positioning everywhere else. **Should be fixed in Phase 1.**

### 🔴 Placeholder external URLs

`src/data/portfolio.ts:48-49`:

```ts
linkedin: 'https://www.linkedin.com/',   // placeholder
github:   'https://github.com/',          // placeholder
```

`index.html:97-98` `Person.sameAs` array:

```json
"https://github.com/shamsnahidk",
"https://www.linkedin.com/"
```

The GitHub URL guesses a handle; the LinkedIn URL is the root of linkedin.com. The real LinkedIn (per memory) is **https://www.linkedin.com/in/nahid5/** — needs to be wired.

### 🟠 Title + description over recommended SERP length

- Title: 76 chars (target 50–60)
- Description: ~250 chars (target 140–160)

### 🟠 OG type should be `profile` on a personal site

Currently `og:type=website`. Convention for a personal/profile homepage is `profile` (with `profile:first_name` / `profile:last_name` / `profile:username`).

### 🟠 Render-blocking Google Fonts

`src/index.css:1` uses `@import url(...)` which serializes after CSS parse. Should be either:
- `<link rel="preload" as="style" ...>` + `<link rel="stylesheet" ...>` in `index.html`, or
- Self-hosted via `@fontsource/*` (eliminates network hop entirely).

Also, 7 weights of Archivo + 5 of Space Grotesk are loaded; only ~4 are used.

### 🟠 Single 371KB JS chunk (no splitting)

Framer Motion alone is ~150KB raw. Below-the-fold sections that use it (`Marquee`, `Stats`, `MagneticButton` orchestration) could be `React.lazy()`-loaded.

### 🟡 Dead asset

`public/icons.svg` (5KB) is not referenced anywhere — `grep -rn "icons.svg" src index.html` returns nothing.

### 🟡 Missing PNG favicons + webmanifest

No `favicon-32.png`, `apple-touch-icon-180.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`. This is why some social platforms / iOS home-screens render a generic placeholder.

### 🟡 Footer landmark nesting

`<footer>` is rendered inside `Contact`'s `<section id="contact">`. Per HTML spec it's valid (sectioning footers are allowed), but the document-level footer convention is to place it as a sibling of `<main>`. Cleaner to lift it.

### 🟡 GitHub Actions workflow gaps

- No typecheck step (TS errors only fail at build via `tsc -b`).
- No lint step.
- No Lighthouse CI gate.
- No `.nvmrc` (CI uses node 20, local is 24).

### 🟡 README is the Vite default template

No project-specific docs. Should explain how to run locally, regenerate the OG image, deploy, etc.

### 🟢 Things that are actually fine

- HTTPS by default (GitHub Pages).
- No console errors expected (no third-party scripts).
- No tracking cookies, no consent banner needed (no analytics yet).
- `aria-hidden` correctly used on decorative orbs/marquee.
- `prefers-reduced-motion` honored where applied.
- Typescript strict mode enabled (per tsconfig assumption — Phase 1 should verify).

---

## Summary — what Phase 1 should target first

In rough priority order:

1. **Fix the AI/ML regression** in `Contact.tsx:88` (5-min cleanup, ships immediately).
2. **Wire real LinkedIn URL** (`https://www.linkedin.com/in/nahid5/`) into `data/portfolio.ts` + `index.html` `sameAs`.
3. **Trim title + description** to SERP-friendly lengths.
4. **Switch `og:type` to `profile`** on the homepage.
5. **Add full favicon set + `site.webmanifest`**.
6. **Self-host fonts** (or at minimum preload + drop unused weights).
7. **Plan the prerender approach for Phase 2** — `vite-plugin-prerender` or `react-snap` are the two realistic choices for staying on Vite+React.
8. **Resume PDF** and **case-study deep-dive page** (Phases 3) are the biggest hiring-signal wins.

---

## Phase 0 deliverables — checklist

- [x] Stack detection
- [x] Routes / sections inventory
- [x] Rendering-mode analysis with curl evidence
- [x] SEO inventory per route
- [x] Asset inventory with sizes
- [x] Accessibility quick scan (axe via headless Chrome)
- [x] Lighthouse baseline — **blocked** in this environment; documented and recommended next steps
- [x] Bundle size from build output
- [x] Content gaps from hiring-manager POV
- [x] Broken / weak things list
- [x] No source files modified

**Awaiting your `proceed` to begin Phase 1.**
