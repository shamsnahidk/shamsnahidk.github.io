import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Layers, Code2, Boxes } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { fadeUp, viewportOnce } from '../lib/motion'
import { profile } from '../data/portfolio'

const pillars = [
  {
    icon: Layers,
    title: 'Backend Systems',
    body: 'Designing services and APIs with clean boundaries, sensible patterns, and the kind of structure that ages well.',
  },
  {
    icon: Boxes,
    title: 'Distributed Architecture',
    body: 'Multithreaded gRPC services, indexing layers, and integration logic — built for scale and observability.',
  },
  {
    icon: Code2,
    title: 'Full-Stack Delivery',
    body: 'End-to-end product features that land in production — from data layer to UI, with tests and refactoring in between.',
  },
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  return (
    <section id="about" ref={ref} className="section-pad">
      <div className="container-content">
        <SectionHeader
          eyebrow="About"
          title="Engineer who treats code like a craft."
          description={profile.summary}
        />

        <motion.div
          style={{ y }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
          className="mt-16 grid gap-4 md:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="card group hover:border-ink-900/20"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white transition-colors group-hover:bg-accent">
                <p.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
