import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

export const cardLift: Variants = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

export const viewportOnce = { once: true, amount: 0.2 } as const
