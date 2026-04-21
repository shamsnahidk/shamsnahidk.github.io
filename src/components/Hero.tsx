import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Sparkles, MapPin } from 'lucide-react'
import { profile } from '../data/portfolio'
import { MagneticButton } from './MagneticButton'

const lineOne = ['Software', 'that', 'feels']
const lineTwo = ['inevitable.']

function Letters({ words, baseDelay = 0 }: { words: string[]; baseDelay?: number }) {
  let charIndex = 0
  return (
    <>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="mr-3 inline-block whitespace-nowrap md:mr-5">
          {word.split('').map((ch) => {
            const i = charIndex++
            return (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: baseDelay + i * 0.025,
                }}
                className="inline-block will-change-transform"
              >
                {ch}
              </motion.span>
            )
          })}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const yOrb = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-36 pb-28 md:pt-44 md:pb-40"
    >
      {/* Animated background grid (parallax) */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yBg }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* Floating orbs (parallax + autonomous drift) */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            style={{ y: yOrb }}
            className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[460px] w-[460px] rounded-full bg-accent/15 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute top-1/2 -right-32 -z-10 h-[380px] w-[380px] rounded-full bg-cta/10 blur-3xl"
          />
        </>
      )}

      <motion.div style={reduce ? undefined : { opacity, scale }} className="container-content">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-5xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/80 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-ink-700 backdrop-blur"
          >
            <Sparkles size={12} className="text-accent" />
            Open to Software roles
          </motion.span>

          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink-900 md:text-7xl lg:text-[96px]">
            <motion.span
              variants={{ hidden: { y: 18 }, visible: { y: 0 } }}
              transition={{ duration: 0.6 }}
              className="block text-ink-500"
            >
              Hi, I&apos;m
            </motion.span>

            <span className="mt-1 block overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="block"
              >
                {profile.name}.
              </motion.span>
            </span>

            <span className="mt-6 block text-3xl font-medium leading-tight text-ink-700 md:text-5xl lg:text-6xl">
              <span className="block overflow-hidden">
                <Letters words={lineOne} baseDelay={0.45} />
              </span>
              <span className="block overflow-hidden">
                <Letters words={lineTwo} baseDelay={0.85} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  className="ml-1 inline-block h-[0.9em] w-[0.08em] translate-y-[0.1em] bg-accent align-middle"
                />
              </span>
            </span>
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 1.5 }}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-2xl text-lg text-ink-600 md:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" className="btn-primary group">
              See my work
              <ArrowDownRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost" strength={0.25}>
              Get in touch
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="mt-14 flex flex-wrap items-center gap-6 text-sm text-ink-500"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
              {profile.yearsExperience} years experience
            </span>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        {!reduce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="mt-20 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-ink-500"
          >
            <span>Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-8 w-px bg-ink-300"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
