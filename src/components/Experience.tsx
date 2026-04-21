import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'
import { experience } from '../data/portfolio'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 80,
    damping: 22,
  })

  return (
    <section id="experience" className="section-pad">
      <div className="container-content">
        <SectionHeader
          eyebrow="Experience"
          title="Built systems used by hundreds of users."
          description="Two roles spanning enterprise automation and university platforms — each one shipped, tested, and lived in by real people."
        />

        <div ref={ref} className="mt-16 relative">
          {/* faded backbone */}
          <div
            aria-hidden
            className="absolute left-[15px] top-2 bottom-2 w-px bg-ink-200 md:left-[19px]"
          />
          {/* animated progress line */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-accent via-accent-soft to-cta md:left-[19px]"
          />

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="space-y-12"
          >
            {experience.map((job) => (
              <motion.li key={`${job.company}-${job.role}`} variants={fadeUp} className="relative pl-12 md:pl-16">
                <motion.div
                  whileInView={{ scale: [0.6, 1.1, 1], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  viewport={viewportOnce}
                  className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-sm md:h-10 md:w-10"
                >
                  <Briefcase size={14} />
                </motion.div>

                <div className="rounded-3xl border border-ink-200 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-ink-900 md:text-2xl">
                      {job.role}
                      <span className="ml-2 text-ink-400">·</span>
                      <span className="ml-2 text-ink-700">{job.company}</span>
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-500">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-500">{job.location}</p>

                  <ul className="mt-5 space-y-3">
                    {job.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="flex gap-3 text-sm leading-relaxed text-ink-700"
                      >
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
