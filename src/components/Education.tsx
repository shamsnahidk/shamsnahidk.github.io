import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'
import { education } from '../data/portfolio'

export function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="container-content">
        <SectionHeader
          eyebrow="Education"
          title="Trained across CS, signals, and systems."
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
          {education.map((ed) => (
            <motion.div
              key={ed.school}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="card flex flex-col"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-xl font-semibold text-ink-900">{ed.school}</h3>
              {ed.location && <p className="mt-1 text-sm text-ink-500">{ed.location}</p>}
              <p className="mt-4 text-sm font-medium text-ink-800">{ed.degree}</p>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-500 mt-1">{ed.period}</p>

              <ul className="mt-5 space-y-2">
                {ed.notes.map((n) => (
                  <li key={n} className="flex gap-3 text-sm text-ink-700">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
