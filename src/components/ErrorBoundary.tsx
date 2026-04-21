import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Last-line-of-defense error boundary.
 *
 * Catches render-time errors in the entire app tree and shows a branded fallback
 * with a recovery action. Intentionally has zero dependencies on framer-motion or
 * any other library that could itself be the source of the failure.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (typeof window !== 'undefined' && import.meta.env.DEV) {
      console.error('App error boundary caught:', error, info)
    }
  }

  handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="grid min-h-screen place-items-center bg-ink-50 px-6 py-24 text-ink-900">
        <main className="w-full max-w-xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-500">Error 500</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Something broke on this page.
          </h1>
          <p className="mt-5 text-base text-ink-700">
            An unexpected error stopped the portfolio from rendering. Reloading usually clears it.
            If it persists, the contact details below still work.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
            >
              Reload the page
            </button>
            <a
              href="mailto:nahidshams65@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-ink-300 px-6 py-3 text-sm font-medium text-ink-800 transition-colors hover:border-ink-900 hover:bg-white"
            >
              Email me directly
            </a>
          </div>
        </main>
      </div>
    )
  }
}
