import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import About         from '@/components/About'
import Experience    from '@/components/Experience'
import Projects      from '@/components/Projects'
import Education     from '@/components/Education'
import Contact       from '@/components/Contact'
import Footer        from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import CursorGlow    from '@/components/CursorGlow'
import ClientEffects from '@/components/ClientEffects'

export default function Home() {
  return (
    <>
      {/* Fixed/global UI — canvas background + page loader */}
      <ClientEffects />

      {/* Scroll + cursor overlays */}
      <ScrollProgress />
      <CursorGlow />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
