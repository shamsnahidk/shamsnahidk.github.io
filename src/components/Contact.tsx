import { useEffect, useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, ArrowUpRight, Copy, Check } from 'lucide-react'
import { fadeUp, viewportOnce } from '../lib/motion'
import { profile } from '../data/portfolio'
import { MagneticButton } from './MagneticButton'
import { LinkedinIcon, GithubIcon } from './icons/Brand'

interface Channel {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  value: string
  href: string
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const handleClick = async () => {
    try {
      if (!navigator.clipboard) throw new Error('clipboard unsupported')
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      setHidden(true)
    }
  }

  if (hidden) return null

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${email}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
      >
        {copied ? (
          <>
            <Check size={16} aria-hidden /> Copied
          </>
        ) : (
          <>
            <Copy size={16} aria-hidden /> Copy email
          </>
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </>
  )
}

const channels: Channel[] = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/[^0-9+]/g, '')}` },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/nahid5', href: profile.linkedin },
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
              thoughtful
            </span>{' '}
            together.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg text-ink-300">
            Open to software engineering roles, collaborations, and ambitious projects across backend, distributed systems, and full-stack.
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
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
            <CopyEmailButton email={profile.email} />
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
