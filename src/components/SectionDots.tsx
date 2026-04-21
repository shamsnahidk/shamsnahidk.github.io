import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { sectionIds } from '../data/portfolio'
import type { SectionId } from '../data/portfolio'

const labels: Record<SectionId, string> = {
  top: 'Intro',
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  code: 'Code',
  education: 'Education',
  contact: 'Contact',
}

export function SectionDots() {
  const [active, setActive] = useState<SectionId>('top')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="space-y-3">
        {sectionIds.map((id) => {
          const isActive = active === id
          return (
            <li key={id} className="group relative">
              <a
                href={`#${id}`}
                aria-label={labels[id]}
                aria-current={isActive ? 'location' : undefined}
                className="flex items-center justify-end gap-3 py-1"
              >
                <span
                  className={[
                    'font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300',
                    isActive ? 'text-ink-900 opacity-100' : 'text-ink-500 opacity-0 group-hover:opacity-100',
                  ].join(' ')}
                >
                  {labels[id]}
                </span>
                <span
                  className={[
                    'block h-px transition-all duration-300',
                    isActive ? 'w-10 bg-ink-900' : 'w-5 bg-ink-300 group-hover:w-8 group-hover:bg-ink-500',
                  ].join(' ')}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
