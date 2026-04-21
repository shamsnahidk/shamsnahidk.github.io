import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  href?: string
  className?: string
  children: ReactNode
  strength?: number
  external?: boolean
}

export function MagneticButton({ href, className, children, strength = 0.35, external }: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 })

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = href ? motion.a : motion.button
  const extra = href
    ? {
        href,
        target: external ? '_blank' : undefined,
        rel: external ? 'noreferrer' : undefined,
      }
    : {}

  return (
    <Comp
      {...extra}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </Comp>
  )
}
