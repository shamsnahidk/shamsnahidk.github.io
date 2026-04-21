import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-content">
        <div
          className={[
            'mt-4 flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300',
            scrolled
              ? 'border-ink-200 bg-white/80 shadow-sm backdrop-blur-xl'
              : 'border-transparent bg-transparent',
          ].join(' ')}
        >
          <a
            href="#top"
            className="flex items-center gap-2 pl-2 text-sm font-display font-semibold tracking-tight text-ink-900"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink-900 text-[11px] font-bold text-white">
              {profile.firstName[0]}
              {profile.lastName[0]}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded-full px-3 py-1.5 text-sm text-ink-600 transition-colors hover:text-ink-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Let&apos;s talk
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden rounded-full p-2 text-ink-800 hover:bg-ink-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-content md:hidden"
          >
            <div className="mt-2 rounded-3xl border border-ink-200 bg-white/95 p-2 backdrop-blur-xl">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-ink-700 hover:bg-ink-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-2xl bg-ink-900 px-4 py-3 text-center text-sm font-medium text-white"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
