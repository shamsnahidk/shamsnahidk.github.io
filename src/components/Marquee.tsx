import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { marqueeSkills } from '../data/portfolio'

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Scroll-driven nudge on top of the infinite animation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const items = [...marqueeSkills, ...marqueeSkills]

  return (
    <section ref={ref} aria-hidden className="relative overflow-hidden border-y border-ink-200 bg-white py-8">
      <motion.div
        style={{ x }}
        className="pointer-events-none flex gap-10 whitespace-nowrap will-change-transform"
      >
        <div className="flex shrink-0 animate-marquee items-center gap-10">
          {items.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="font-display text-3xl font-semibold tracking-tight text-ink-300 transition-colors md:text-5xl"
            >
              {skill}
              <span className="ml-10 inline-block text-accent">•</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </section>
  )
}
