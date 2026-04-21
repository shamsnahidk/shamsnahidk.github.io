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
import { Education } from './components/Education'
import { Contact } from './components/Contact'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <CursorBlob />
      <Navbar />
      <SectionDots />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App
