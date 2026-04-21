# Content TODO — items needing user input

These are gaps the hardening process surfaced. None block deploy, but each makes the site stronger when filled.

## Identity & social
- [NEEDS COPY: Twitter/X handle, if any?] — would unlock `twitter:site` + `twitter:creator` meta tags and `sameAs` entry.
- [NEEDS COPY: Confirm preferred display name everywhere — currently "Shams Nahid K". Some surfaces use "Shams Nahid" — should we standardize?]
- [NEEDS ASSET: Headshot / profile photo (square, ≥512px, neutral background)] — used for Person JSON-LD `image`, About section, and as fallback OG.

## Resume
- [NEEDS ASSET: `public/resume.pdf`] — currently `profile.resume` points to `/resume.pdf` but the file is missing. Until then any "Download résumé" CTA 404s.
- [NEEDS COPY: One-line résumé caption for the download button?]

## Verifiable stats (Stats section)
Current stats in `src/data/portfolio.ts`:
- 2+ years building software — verifiable from experience dates ✓
- 500+ users served — [NEEDS CONFIRMATION: source of this number?]
- 4 production projects shipped — matches projects array ✓
- 15+ languages, tools & frameworks — matches skills array ✓

## Project depth
Phase 3 added schema fields (`year`, `status`, `repo`, `demo`) to `ProjectItem`. Each project needs:
- [NEEDS COPY: `year` per project (e.g. "2024", "2023–2024")]
  - Distributed File Retrieval Engine — when?
  - Puzzle Solver — when?
  - Face Swapping & Morphing System — when?
  - Learning Modules Platform — pre-filled "2023–2025" from Experience dates ✓
- [NEEDS COPY: `repo` URL per project — GitHub repo for each, if public]
- [NEEDS COPY: `demo` URL per project — live demo / writeup / paper, if any]
- [NEEDS ASSET: Optional cover image / screenshot per project, 16:9 ≥1280px]
- [NEEDS COPY: Approximate tech-stack version / scale numbers (e.g. "indexed 2M docs", "trained on 1.8M images")]
- [NEEDS CONFIRMATION: pre-filled `status` values are: Distributed File Retrieval = `coursework`, Learning Modules = `shipped`, Puzzle Solver = `research`, Face Swapping = `personal`. Override any?]

## "Currently exploring" (About section depth)
- [NEEDS COPY: One-line "right now I'm focused on X" — e.g. "Distributed systems patterns and clean Python architectures." This adds a sense of momentum to About without fabricating a project.]

## Writing / GitHub integration (Phase 4)
- ✅ GitHub section is live — pulls top 6 public repos (sorted by stars, then recency) at build time via `scripts/fetch-github.mjs`. Fail-soft: if the API is unreachable the existing committed `src/data/github.ts` is preserved so the build never breaks.
- [NEEDS DECISION: Want to pin specific repos rather than auto-rank? If so, list the 3-6 repo names to feature.]
- [OPTIONAL ENHANCEMENT: Set `GITHUB_TOKEN` (or `GH_TOKEN`) in the GitHub Actions deploy workflow during Phase 9 — raises the API rate limit from 60/hr to 5,000/hr. Not required for now.]
- [NEEDS COPY: Do you publish anywhere — dev.to, Medium, personal blog? If so, RSS/Atom URL.] — Writing section deferred until this is provided; adding a stub would violate the "no stub components" rule.

## Contact (Phase 7)
- [NEEDS DECISION: Keep mailto-only contact, or add a form (Formspree/Web3Forms/Resend)?]
- [NEEDS DECISION: Show phone number publicly, or gate behind a click?]

## Analytics / consent (Phase 7)
- [NEEDS DECISION: Privacy-friendly analytics? Recommended: Plausible (paid) or Umami self-hosted. No GA without consent banner.]

## Accessibility / brand (Phase 6)
- [NEEDS COPY: Alt text for headshot once provided.]
- [NEEDS DECISION: Reduced-motion fallback should still feel branded. OK to keep static gradient + dot grid?]
