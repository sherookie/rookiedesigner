import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function FooterSection() {
  const footerRef = useRef(null)
  const ctaRef = useRef(null) // 👉 給按鈕一個 Ref
  const { t } = useLang()

  useGSAP(() => {
    // 1. 捲動進場動畫
    gsap.from('.footer-h2', {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
    })
    gsap.from(ctaRef.current, {
      opacity: 0, y: 20, scale: 0.96, duration: 0.8, ease: 'back.out(1.5)', delay: 0.2,
      scrollTrigger: { trigger: footerRef.current, start: 'top 75%' },
    })

    // 2. 磁吸效果 (Desktop only)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch && ctaRef.current) {
      const cta = ctaRef.current
      const strength = 0.2

      const onMove = (e) => {
        const rect = cta.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        gsap.to(cta, {
          x: (e.clientX - cx) * strength,
          y: (e.clientY - cy) * strength,
          duration: 0.35, ease: 'power2.out', overwrite: 'auto'
        })
      }
      const onLeave = () => {
        gsap.to(cta, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
      }

      cta.addEventListener('mousemove', onMove)
      cta.addEventListener('mouseleave', onLeave)
      return () => {
        cta.removeEventListener('mousemove', onMove)
        cta.removeEventListener('mouseleave', onLeave)
      }
    }
  }, { scope: footerRef })

  return (
    <footer className="footer" id="contact" ref={footerRef}>
      <div className="footer-inner">
        <h2 className="footer-h2">
          {t('如果有任何想法', 'Always open to new ideas.')}<br />{t('歡迎隨時交流', "Let's connect!")}
        </h2>

        <a
          href="mailto:sherrychao0816@gmail.com"
          className="footer-cta mag"
          ref={ctaRef} // 👉 綁定 Ref
        >
          {t('聯絡我', 'Get in touch')}
        </a>

        <div className="footer-bottom">
          <span>趙蔆瑄 Chao, Ling-Hsuan</span>
          <span>© 2025 All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}