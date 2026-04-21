import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'
import { skillGroups } from '../data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="section-pad bg-white/50">
      <div className="container-content">
        <SectionHeader
          eyebrow="Toolkit"
          title="The stack behind the work."
          description="From low-level systems and gRPC services to React frontends — a toolset built across enterprise, university, and research codebases."
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
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-6"
            >
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="text-base font-semibold text-ink-900">{group.category}</h3>
                <span className="font-mono text-xs text-ink-400">
                  {String(gi + 1).padStart(2, '0')} · {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03 } },
                }}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.92, y: 6 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2 }}
                  >
                    <span className="chip">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
