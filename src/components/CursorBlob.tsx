import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorBlob() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 })

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || reduce) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[420px] w-[420px] rounded-full opacity-60 mix-blend-multiply"
    >
      <div className="h-full w-full rounded-full bg-accent/15 blur-3xl" />
    </motion.div>
  )
}
