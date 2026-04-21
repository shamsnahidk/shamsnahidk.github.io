import { useEffect, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const FINE_POINTER = '(pointer: fine)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeMediaQueries(callback: () => void): () => void {
  const finePointer = window.matchMedia(FINE_POINTER)
  const reduce = window.matchMedia(REDUCED_MOTION)
  finePointer.addEventListener('change', callback)
  reduce.addEventListener('change', callback)
  return () => {
    finePointer.removeEventListener('change', callback)
    reduce.removeEventListener('change', callback)
  }
}

function getCursorBlobEnabled(): boolean {
  return (
    window.matchMedia(FINE_POINTER).matches &&
    !window.matchMedia(REDUCED_MOTION).matches
  )
}

export function CursorBlob() {
  const enabled = useSyncExternalStore(
    subscribeMediaQueries,
    getCursorBlobEnabled,
    () => false,
  )
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 220, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 28, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [enabled, x, y])

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
