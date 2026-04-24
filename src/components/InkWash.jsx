import { useLang } from '../context/LanguageContext'

/**
 * Full-screen ink-wash overlay.
 * The ref is wired through LanguageContext so toggleLang() can drive the GSAP sweep.
 */
export default function InkWash() {
  const { inkRef } = useLang()
  return <div className="ink-wash" ref={inkRef} aria-hidden="true" />
}
