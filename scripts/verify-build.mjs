// Post-build content probes.
// Runs against ./dist after `npm run build` to catch silent regressions:
//   - Prerender produced an empty / missing root HTML
//   - Critical SEO/social meta tags got stripped
//   - Public assets weren't copied (sitemap, robots, 404, favicon)
//   - GitHub data fetch wrote a malformed module
// Designed to be the last gate before deploy.

import { existsSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const DIST = resolve(process.cwd(), 'dist')

const failures = []
const warnings = []

function check(label, condition, detail = '') {
  if (condition) {
    console.log(`  ok  ${label}`)
  } else {
    console.error(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`)
    failures.push(label)
  }
}

function warn(label, detail = '') {
  console.warn(`  warn  ${label}${detail ? ` — ${detail}` : ''}`)
  warnings.push(label)
}

// ─── 1. dist tree exists ─────────────────────────────────────────────
console.log('\n[1] Build artifacts')
check('dist/ exists', existsSync(DIST))
check('dist/index.html exists', existsSync(join(DIST, 'index.html')))
check('dist/404.html exists', existsSync(join(DIST, '404.html')))
check('dist/sitemap.xml exists', existsSync(join(DIST, 'sitemap.xml')))
check('dist/robots.txt exists', existsSync(join(DIST, 'robots.txt')))
check('dist/site.webmanifest exists', existsSync(join(DIST, 'site.webmanifest')))
check('dist/favicon.svg exists', existsSync(join(DIST, 'favicon.svg')))
check('dist/og-image.png exists', existsSync(join(DIST, 'og-image.png')))

if (failures.length > 0) {
  console.error('\nMissing build artifacts; aborting further probes.')
  process.exit(1)
}

// ─── 2. index.html sanity ────────────────────────────────────────────
console.log('\n[2] dist/index.html prerender content')
const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const bytes = statSync(join(DIST, 'index.html')).size

check('contains owner name "Shams Nahid"', html.includes('Shams Nahid'))
check('contains contact email', html.includes('nahidshams65@gmail.com'))
check('canonical link present', /<link\s+rel="canonical"/.test(html))
check('OG image meta present', /<meta\s+property="og:image"/.test(html))
check('twitter:card meta present', /<meta\s+name="twitter:card"/.test(html))
check('Person JSON-LD present', html.includes('"@type": "Person"'))
check('skip-link "Skip to main content"', html.includes('Skip to main content'))
check('main landmark id="main"', /<main[^>]*id="main"/.test(html))
check('Contact section id="contact"', /id="contact"/.test(html))
check('Projects section id="projects"', /id="projects"/.test(html))
check('GitHub section id="code"', /id="code"/.test(html))
check('Skills section id="skills"', /id="skills"/.test(html))
check('aria-current on active section', html.includes('aria-current'))
check('all external rel="noopener noreferrer"', !/rel="noreferrer"(?!\s+noreferrer)/.test(html))

// Bundle/prerender weight sanity — page should be substantive but not bloated
check(
  `dist/index.html size sane (${(bytes / 1024).toFixed(1)} KB, expected 40–250 KB)`,
  bytes > 40 * 1024 && bytes < 250 * 1024,
  `${bytes} bytes`,
)

// ─── 3. 404.html sanity ──────────────────────────────────────────────
console.log('\n[3] dist/404.html')
const html404 = readFileSync(join(DIST, '404.html'), 'utf8')
check('404 has noindex', /content="noindex/.test(html404))
check('404 has back-to-home link', /href="\/"/.test(html404))
check('404 has canonical to home', /<link\s+rel="canonical"\s+href="https:\/\/shamsnahidk\.github\.io\/"/.test(html404))

// ─── 4. sitemap + robots cross-check ─────────────────────────────────
console.log('\n[4] sitemap + robots')
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8')
check('sitemap.xml has homepage URL', sitemap.includes('shamsnahidk.github.io'))
check('robots.txt references sitemap', /Sitemap:/i.test(robots))

// ─── 5. analytics opt-in correctness ─────────────────────────────────
console.log('\n[5] analytics gating')
const plausibleSet = !!process.env.VITE_PLAUSIBLE_DOMAIN
const goatcounterSet = !!process.env.VITE_GOATCOUNTER_CODE
const hasPlausible = html.includes('plausible.io/js/script.js')
const hasGoatcounter = html.includes('gc.zgo.at/count.js')

if (plausibleSet) check('Plausible script injected (env var set)', hasPlausible)
else check('No Plausible script (env var unset)', !hasPlausible)

if (goatcounterSet) check('GoatCounter script injected (env var set)', hasGoatcounter)
else check('No GoatCounter script (env var unset)', !hasGoatcounter)

if (!plausibleSet && !goatcounterSet) {
  warn('No analytics provider configured', 'set VITE_PLAUSIBLE_DOMAIN or VITE_GOATCOUNTER_CODE to enable')
}

// ─── final report ────────────────────────────────────────────────────
console.log('')
if (failures.length > 0) {
  console.error(`✖ ${failures.length} probe(s) failed.`)
  process.exit(1)
}
console.log(`✓ All probes passed${warnings.length > 0 ? ` (${warnings.length} warning${warnings.length === 1 ? '' : 's'})` : ''}.`)
