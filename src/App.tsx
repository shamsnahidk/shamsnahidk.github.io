import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { CursorBlob } from './components/CursorBlob'
import { SectionDots } from './components/SectionDots'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Stats } from './components/Stats'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { GitHub } from './components/GitHub'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Analytics } from './components/Analytics'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-ink-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <CursorBlob />
      <Navbar />
      <SectionDots />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHub />
        <Education />
        <Contact />
      </main>
      <Analytics />
    </div>
  )
}

export default App
