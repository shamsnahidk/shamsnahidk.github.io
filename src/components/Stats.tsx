import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { fadeUp, viewportOnce } from '../lib/motion'
import { stats } from '../data/portfolio'

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="border-y border-ink-200 bg-white">
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="text-center md:border-l md:border-ink-200 md:px-6 md:first:border-l-0"
            >
              <div className="font-display text-5xl font-semibold tracking-tight text-ink-900 md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
