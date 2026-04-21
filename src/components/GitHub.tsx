import { motion } from 'framer-motion'
import { Star, GitFork, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { GithubIcon } from './icons/Brand'
import { fadeUp, viewportOnce } from '../lib/motion'
import { githubData } from '../data/github'
import type { GithubRepo } from '../data/github'

const languageColor: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diffMs = Date.now() - then
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
  if (days < 1) return 'Today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

function formatFetchedAt(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function RepoCard({ repo, index, total }: { repo: GithubRepo; index: number; total: number }) {
  const dotColor = repo.language ? languageColor[repo.language] ?? '#94a3b8' : '#cbd5e1'

  return (
    <motion.a
      variants={fadeUp}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 transition-colors hover:border-ink-900/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-ink-50 text-ink-700">
            <GithubIcon className="h-4 w-4" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <ArrowUpRight
          size={16}
          className="text-ink-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink-900 break-words">{repo.name}</h3>
      {repo.description ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{repo.description}</p>
      ) : (
        <p className="mt-2 text-sm italic text-ink-500">No description.</p>
      )}

      {repo.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink-200 bg-ink-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-600"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-xs text-ink-500">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star size={12} aria-hidden /> {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork size={12} aria-hidden /> {repo.forks}
          </span>
        )}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
          {formatRelative(repo.pushedAt)}
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.a>
  )
}

export function GitHub() {
  if (githubData.repos.length === 0) return null

  const fetchedLabel = formatFetchedAt(githubData.fetchedAt)

  return (
    <section id="code" className="section-pad">
      <div className="container-content">
        <SectionHeader
          eyebrow="Code"
          title="Public on GitHub."
          description="A live snapshot of recent public work — pulled at build time from the GitHub API, not a marketing shot."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {githubData.repos.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} index={i} total={githubData.repos.length} />
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-500">
          <a
            href={githubData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-medium text-ink-900 transition-colors hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" />
            See all on github.com/{githubData.username}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          {fetchedLabel && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
              Synced {fetchedLabel}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
