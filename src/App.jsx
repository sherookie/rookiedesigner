import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

import { LanguageProvider } from './context/LanguageContext'

import Cursor        from './components/Cursor'
import InkWash       from './components/InkWash'
import Nav           from './components/Nav'
import ReceiptToggle from './components/ReceiptToggle'

import HeroSection      from './sections/HeroSection'
import AboutSection     from './sections/AboutSection'
import PortfolioSection from './sections/PortfolioSection'
import FooterSection    from './sections/FooterSection'

/* Register GSAP plugins once at the module level */
gsap.registerPlugin(ScrollTrigger, Flip)

export default function App() {
  useEffect(() => {
    /* Prevent browser restoring previous scroll position */
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    ScrollTrigger.clearScrollMemory('manual')

    /* Refresh ScrollTrigger after all fonts are loaded */
    document.fonts.ready.then(() => ScrollTrigger.refresh())

    /* Debounced resize → ScrollTrigger.refresh() */
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 250)
    }
    window.addEventListener('resize', onResize)

    /* Dev watermark */
    console.log(
      '%c趙蔆瑄 Portfolio%c\nChao, Ling-Hsuan · Graphic Arts & Communication',
      'color:#e85d26;font-family:serif;font-size:1.5em;font-weight:bold;',
      'color:#9e9b94;font-size:0.85em;'
    )

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <LanguageProvider>
      {/* ── Fixed overlays ── */}
      <div className="site-halftone" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <InkWash />
      <Cursor />

      {/* ── UI chrome ── */}
      <ReceiptToggle />
      <Nav />

      {/* ── Page sections ── */}
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
      </main>
      <FooterSection />
    </LanguageProvider>
  )
}
