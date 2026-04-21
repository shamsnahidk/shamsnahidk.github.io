import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../lib/motion'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      <motion.span variants={fadeUp} className="eyebrow">
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-900 md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-4 text-lg text-ink-600">
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
