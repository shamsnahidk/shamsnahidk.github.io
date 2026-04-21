import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'
import { projects } from '../data/portfolio'
import type { ProjectItem } from '../data/portfolio'

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-50, 50], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-50, 50], [-6, 6]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-8 transition-colors hover:border-ink-900/30"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <motion.span
          whileHover={{ x: 2, y: -2, rotate: 12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors group-hover:border-accent group-hover:text-accent"
          aria-hidden
        >
          <ArrowUpRight size={18} />
        </motion.span>
      </div>

      <h3 className="mt-8 text-2xl font-semibold text-ink-900 md:text-3xl">{project.title}</h3>
      {project.subtitle && <p className="mt-1 text-sm text-ink-500">{project.subtitle}</p>}

      <p className="mt-5 text-sm leading-relaxed text-ink-700">{project.description}</p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm text-ink-700">
            <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink-200 bg-ink-50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-60 w-60 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.article>
  )
}

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Background word crawls horizontally as user scrolls
  const bgX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section id="projects" ref={ref} className="section-pad relative overflow-hidden bg-white/50">
      <motion.div
        aria-hidden
        style={{ x: bgX }}
        className="pointer-events-none absolute -left-10 top-[58%] z-0 select-none font-display text-[160px] font-black leading-none text-ink-900/[0.03] md:text-[280px]"
      >
        PROJECTS
      </motion.div>

      <div className="container-content relative">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects at the edge of systems and product."
          description="A curated look at distributed systems, backend platforms, and research work."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
