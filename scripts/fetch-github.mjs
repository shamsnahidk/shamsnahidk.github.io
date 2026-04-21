import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const dataFile = path.join(root, 'src', 'data', 'github.ts')

const USERNAME = 'shamsnahidk'
const PROFILE = `https://github.com/${USERNAME}`
const MAX_REPOS = 6

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${USERNAME}-portfolio-build`,
}
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
if (token) headers.Authorization = `Bearer ${token}`

function escapeString(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function tsLiteral(value) {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return String(value)
  if (typeof value === 'string') return '`' + escapeString(value) + '`'
  if (Array.isArray(value)) return '[' + value.map(tsLiteral).join(', ') + ']'
  if (typeof value === 'object') {
    const entries = Object.entries(value).map(([k, v]) => `    ${k}: ${tsLiteral(v)}`)
    return '{\n' + entries.join(',\n') + ',\n  }'
  }
  return 'null'
}

function renderModule(data) {
  const reposLiteral = data.repos
    .map((r) => {
      const fields = Object.entries(r)
        .map(([k, v]) => `      ${k}: ${tsLiteral(v).replace(/\n {4}/g, '\n      ')}`)
        .join(',\n')
      return `    {\n${fields},\n    }`
    })
    .join(',\n')

  return `// Updated by scripts/fetch-github.mjs at build time.
// Edits will be overwritten on the next fetch.

export interface GithubRepo {
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  topics: string[]
  pushedAt: string
}

export interface GithubData {
  username: string
  profileUrl: string
  fetchedAt: string | null
  repos: GithubRepo[]
}

export const githubData: GithubData = {
  username: ${tsLiteral(data.username)},
  profileUrl: ${tsLiteral(data.profileUrl)},
  fetchedAt: ${tsLiteral(data.fetchedAt)},
  repos: [
${reposLiteral}${data.repos.length ? ',' : ''}
  ],
}
`
}

async function main() {
  const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`
  let res
  try {
    res = await fetch(url, { headers })
  } catch (err) {
    console.warn(`fetch-github: network error — keeping existing src/data/github.ts (${err.message})`)
    return
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.warn(
      `fetch-github: HTTP ${res.status} ${res.statusText} — keeping existing src/data/github.ts. Body: ${text.slice(0, 200)}`,
    )
    return
  }

  const all = await res.json()
  if (!Array.isArray(all)) {
    console.warn('fetch-github: unexpected response shape, keeping existing data')
    return
  }

  const filtered = all
    .filter((r) => !r.fork && !r.archived && !r.disabled && !r.private)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    })
    .slice(0, MAX_REPOS)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description ?? null,
      language: r.language ?? null,
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      topics: Array.isArray(r.topics) ? r.topics : [],
      pushedAt: r.pushed_at,
    }))

  const data = {
    username: USERNAME,
    profileUrl: PROFILE,
    fetchedAt: new Date().toISOString(),
    repos: filtered,
  }

  await writeFile(dataFile, renderModule(data), 'utf-8')
  console.log(
    `fetch-github: wrote ${filtered.length} repo(s) to src/data/github.ts (rate limit remaining: ${
      res.headers.get('x-ratelimit-remaining') ?? 'unknown'
    })`,
  )
}

main().catch((err) => {
  console.warn(`fetch-github: unexpected failure — keeping existing data (${err?.message || err})`)
})
