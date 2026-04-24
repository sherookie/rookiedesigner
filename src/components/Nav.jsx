import { useRef, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

export default function Nav() {
  const navRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const st = ScrollTrigger.create({
      start: 80,
      onEnter:     () => { nav.style.backdropFilter = 'blur(12px) saturate(180%)' },
      onLeaveBack: () => { nav.style.backdropFilter = '' },
    })
    return () => st.kill()
  }, [])

  const scrollTo = (selector) => (e) => {
    e.preventDefault()
    const target = document.querySelector(selector)
    if (!target) return
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth',
    })
  }

  return (
    <nav className="nav" role="navigation" ref={navRef}>
      <a href="#home" className="nav-logo" onClick={scrollTo('#home')}>
        <span className="logo-zh">趙蔆瑄</span>
        <span className="logo-en">Sherry</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#work" className="nav-link" onClick={scrollTo('#work')}>
            {t('作品', 'Work')}
          </a>
        </li>
        <li>
          <a href="#about" className="nav-link" onClick={scrollTo('#about')}>
            {t('關於', 'About')}
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-link" onClick={scrollTo('#contact')}>
            {t('聯絡', 'Contact')}
          </a>
        </li>
      </ul>
    </nav>
  )
}
