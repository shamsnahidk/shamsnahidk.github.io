# Production-ready — close-out report

Closes the 10-phase production hardening plan for **shamsnahidk.github.io**.
All gates green locally. Manual validators below should be run against the deployed URL after the next push to `main`.

---

## What shipped, by phase

| Phase | Theme | Outcome |
|-------|-------|---------|
| 0 | Audit | Baseline captured in [AUDIT.md](AUDIT.md) — content gaps, a11y issues, perf hot spots, missing meta. |
| 1 | SEO + discoverability | Canonical link, full OG/Twitter card stack, JSON-LD `Person` + `WebSite`, `sitemap.xml`, `robots.txt`, PWA `site.webmanifest`, favicon set (SVG + 32 + 192 + 512 + maskable + apple-touch-180), generated `og-image.png`. |
| 2 | Prerender / SSG | `scripts/prerender.mjs` SSRs `App` via Vite's `ssrLoadModule` + `renderToString`; client picks up with `hydrateRoot`. Output is a substantive 86 KB pre-rendered HTML (was an empty `<div id="root">`). |
| 3 | Content depth | `ProjectItem` schema extended with `year` / `status` / `repo` / `demo`; status badges + external links rendered without breaking layout. |
| 4 | GitHub integration | Build-time `scripts/fetch-github.mjs` pulls top public repos (stars, then recency); fail-soft preserves last-good `src/data/github.ts` when API is unreachable. New GitHub section + nav entry. |
| 5 | Performance | Self-hosted fonts (`@fontsource/*` — no Google CDN round-trip), manual vendor chunks (`react`, `framer`, `icons`), animation simplifications (Hero letter reveal, "Hi, I'm" text). |
| 6 | Accessibility (WCAG 2.2 AA) | Skip-link, global `:focus-visible` ring, sequential heading order, `aria-current="location"` on active section dot, all external `rel="noopener noreferrer"`, `motion-reduce` on infinite animations, Stats counter respects `prefers-reduced-motion`, contrast pass across Hero / Skills / Experience / SectionDots. |
| 7 | Contact + privacy-first analytics | `CopyEmailButton` with `aria-live` confirmation; `Analytics.tsx` is env-gated and renders **nothing** unless `VITE_PLAUSIBLE_DOMAIN` or `VITE_GOATCOUNTER_CODE` is set at build time. Both providers are cookieless / DNT-respecting / no consent-banner needed. GA explicitly excluded. |
| 8 | Polish | Class-based `ErrorBoundary` wraps the hydration root with a branded fallback (zero deps on framer/lucide so it survives a render crash in either); standalone `public/404.html` with `noindex` + canonical-to-home; print stylesheet that strips chrome/animation and expands link URLs inline. |
| 9 | CI / CD | `.github/workflows/deploy.yml` rewritten as **CI / Deploy** with `quality` + `deploy` jobs. PRs run lint → typecheck → build → verify (no deploy). Pushes to `main` additionally upload + deploy. `GITHUB_TOKEN` raises Actions API quota from 60/hr → 5000/hr. `.github/dependabot.yml` adds weekly grouped npm + monthly GitHub Actions PRs. New `scripts/verify-build.mjs` runs 27 post-build content probes. |

---

## Final local gate (run before every push)

```bash
npm run lint        # ESLint flat config — 0 errors
npm run build       # tsc -b && vite build && prerender — currently ~600ms
npm run verify      # 27 probes across 5 sections — must exit 0
```

Latest local run: **27/27 probes pass**, 1 advisory warning (no analytics env var configured — expected; turn it on with one Repository Variable).

---

## Bundle weight (`dist/`)

| Asset | Size |
|-------|------|
| `dist/index.html` (prerendered) | 86 KB (target window 40–250 KB ✓) |
| JS (5 chunks: react / framer / icons / index / rolldown-runtime) | **375 KB** |
| CSS (`style-*.css`) | **47 KB** |
| Self-hosted fonts (`@fontsource/*` woff2 + woff fallbacks) | 516 KB |
| HTML (index + 404 + manifest) | 90 KB |
| **Total transferred per cold visit** | ~**1.26 MB** |

Hot visits hit the immutable-hashed asset cache; only the HTML re-fetches.

---

## Manual validators — run against the live URL

These can only run against a deployed origin (or with browser tooling), so they're outside the local pipeline:

| Validator | URL / how-to | What to look for |
|-----------|--------------|------------------|
| **Lighthouse (mobile)** | https://pagespeed.web.dev/?url=https%3A%2F%2Fshamsnahidk.github.io%2F&form_factor=mobile | All four categories ≥ 95. CLS < 0.1. LCP < 2.5s. |
| **Lighthouse (desktop)** | Same URL, switch tab. | Should comfortably hit 100 / 100 / 100 / 100. |
| **schema.org validator** | https://validator.schema.org/#url=https%3A%2F%2Fshamsnahidk.github.io%2F | `Person` + `WebSite` graph entries should both parse with no errors. |
| **Google Rich Results** | https://search.google.com/test/rich-results?url=https%3A%2F%2Fshamsnahidk.github.io%2F | Confirms `Person` is eligible for knowledge-panel surfaces. |
| **Twitter Card Validator** | https://cards-dev.twitter.com/validator | Paste URL — `summary_large_image` should preview with `og-image.png`. |
| **Facebook Sharing Debugger** | https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fshamsnahidk.github.io%2F | Confirms OG title / description / image / type. Click "Scrape Again" once after deploy to refresh FB's cache. |
| **WAVE accessibility** | https://wave.webaim.org/report#/https://shamsnahidk.github.io/ | 0 errors. Contrast warnings should be ≤ what's listed in [AUDIT.md](AUDIT.md). |
| **Mobile-friendly** | https://search.google.com/test/mobile-friendly?url=https%3A%2F%2Fshamsnahidk.github.io%2F | Should pass — viewport meta + min 16px body. |
| **Security headers** | https://securityheaders.com/?q=https%3A%2F%2Fshamsnahidk.github.io%2F | GitHub Pages doesn't ship a CSP; document this is a known limitation of the host. |

---

## Post-deploy smoke test

After the first push to `main` runs the new CI:

- [ ] **CI workflow ran the `quality` job and the `deploy` job both finished green.** Re-run with `workflow_dispatch` if the very first run misses `pages: write` permission until Pages is enabled in repo Settings.
- [ ] **GitHub Pages source is set to GitHub Actions** (Settings → Pages → Source = "GitHub Actions"). One-time setup; old branch-based config will conflict with `actions/deploy-pages@v4`.
- [ ] **Site loads at https://shamsnahidk.github.io/** with no console errors (open DevTools → Console).
- [ ] **View source** shows the prerendered HTML — name, hero copy, all section IDs visible **before JS executes**. Disable JS in DevTools and confirm the page is still readable / navigable.
- [ ] **Skip-link works:** Tab once from a fresh load, "Skip to main content" appears, Enter jumps to `<main id="main">`.
- [ ] **Tab-through:** focus ring visible on every interactive element; tab order matches visual order.
- [ ] **Section nav:** scroll the page; right-side dots update `aria-current="location"` per section.
- [ ] **Copy-email button** copies to clipboard and announces "Email copied to clipboard" via screen reader.
- [ ] **404:** visit `/this-does-not-exist` and confirm `404.html` renders with the branded fallback + `noindex` meta.
- [ ] **Print:** Cmd/Ctrl+P — preview shows no nav / no animation / external URLs expanded inline.
- [ ] **Reduced motion:** OS-level "Reduce motion" → reload — Hero status dot, marquee, counters all stop or skip; layout unchanged.
- [ ] **Dependabot:** within ~24h after push, check Insights → Dependency graph → Dependabot to see the schedule register.

---

## Open content gaps (from `CONTENT_TODO.md`, prioritized)

These are non-blocking but each meaningfully raises the floor:

**Highest signal**
1. `public/resume.pdf` — `profile.resume` already points at `/resume.pdf`; without it any "Download résumé" CTA 404s.
2. Headshot (square, ≥ 512px) — unlocks `Person.image` JSON-LD + a real About photo + a personalized OG fallback.
3. `year` field per project — currently only Learning Modules has it.

**Medium**
4. Pick an analytics provider (Plausible vs GoatCounter vs none) and set the corresponding GH Actions Variable. Pipeline already gates on this; zero-bytes today.
5. Twitter/X handle for `twitter:site` + `twitter:creator` + `Person.sameAs`.
6. Confirm display-name standard: "Shams Nahid" (one place) vs "Shams Nahid K" (everywhere else).

**Optional**
7. Per-project `repo` + `demo` URLs.
8. Per-project cover image (16:9 ≥ 1280px).
9. Writing channel (RSS / dev.to / Medium) — would unlock the deferred Writing section.
10. "Currently exploring" one-liner for About momentum.

---

## Known limitations (host-imposed)

- **No custom HTTP headers.** GitHub Pages serves a fixed set; no CSP / HSTS / Permissions-Policy can be added from the repo. If those become required, fronting with Cloudflare Pages or moving to Vercel would unblock it.
- **No server runtime.** All forms must be `mailto:` or use a third-party endpoint (Formspree / Web3Forms / Resend). Documented decision in `CONTENT_TODO.md`.
- **OG/Twitter cards cache aggressively.** First share on a platform may show stale meta until the validator's "scrape again" button is clicked.

---

## Roll-back

Every phase is a separate commit on `main`. To revert any single phase: `git revert <sha>` and push — CI redeploys the previous state automatically.

---

_Generated 2026-04-21. Re-run `npm run verify` after any content change before relying on this report._
