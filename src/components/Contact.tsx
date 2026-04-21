import type { ComponentType, SVGProps } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'
import { fadeUp, viewportOnce } from '../lib/motion'
import { profile } from '../data/portfolio'
import { MagneticButton } from './MagneticButton'

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
    </svg>
  )
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.72-1.55-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.79-.01 3.17 0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  )
}

interface Channel {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  value: string
  href: string
}

const channels: Channel[] = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/[^0-9+]/g, '')}` },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/shamsnahidk', href: profile.linkedin },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/shamsnahidk', href: profile.github },
]

export function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="container-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="relative overflow-hidden rounded-[36px] border border-ink-900/10 bg-ink-900 p-10 text-white md:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top right, black, transparent 70%)',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
          />

          <motion.span variants={fadeUp} className="eyebrow text-ink-300 before:bg-ink-700">
            Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl"
          >
            Let&apos;s build something{' '}
            <span className="bg-gradient-to-r from-accent-glow to-cta bg-clip-text text-transparent">
              intelligent
            </span>{' '}
            together.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-ink-300">
            Open to AI/ML engineering roles, research collaborations, and challenging projects in computer vision and LLM systems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 grid gap-3 md:grid-cols-2"
          >
            {channels.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white">
                    <c.icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">{c.label}</p>
                    <p className="mt-1 text-sm text-white">{c.value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-ink-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-accent hover:text-white"
            >
              <Mail size={16} /> {profile.email}
            </MagneticButton>
            <span className="text-sm text-ink-400">Replies within 24 hours.</span>
          </motion.div>
        </motion.div>

        <footer className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-ink-200 pt-8 text-sm text-ink-500 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-[0.18em]">
            Designed &amp; built with care.
          </p>
        </footer>
      </div>
    </section>
  )
}
