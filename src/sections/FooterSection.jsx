import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

/* ─────────────────────────────────────────────────────────────
   FooterSection — 主廚簽名版 (Chef's Signature)
   全黑底 / ✦ 裝飾線 / 情感標語 / 純文字 CTA / 主廚簽名
   設計哲學：減法。Footer 不重新開場，只留下主廚的氣息。
   ─────────────────────────────────────────────────────────── */

export default function FooterSection() {
  const footerRef = useRef(null)
  const ctaRef    = useRef(null)
  const { t }     = useLang()

  const year = new Date().getFullYear()

  useGSAP(() => {
    /* 進場動畫：自上而下，stagger（裝飾線 → 標語 → CTA → 簽名） */
    gsap.from(
      ['.footer-deco', '.footer-h2', '.footer-cta', '.footer-rule', '.footer-bottom'],
      {
        opacity: 0,
        y: 16,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    /* 磁吸（保留你網站的標誌互動） */
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch && ctaRef.current) {
      const cta = ctaRef.current
      const strength = 0.18

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
        gsap.to(cta, {
          x: 0, y: 0,
          duration: 1.2, ease: 'elastic.out(1, 0.4)', overwrite: 'auto'
        })
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

        {/* ── 頂部 ✦ 裝飾線 ── */}
        <span className="footer-deco" aria-hidden="true">
          ✦  ✦  ✦
        </span>

        {/* ── 情感主標 ── */}
        <h2 className="footer-h2">
          {t('如果有任何想法', 'Always open to new ideas.')}
          <br />
          {t('歡迎隨時交流', "Let's connect!")}
        </h2>

        {/* ── 純文字 CTA：聯絡我 → ── */}
        <a
          href="mailto:sherrychao0816@gmail.com"
          className="footer-cta"
          ref={ctaRef}
          aria-label={t('寄信給趙蔆瑄', 'Send email to Sherry Chao')}
        >
          <span>{t('聯絡我', 'Get in touch')}</span>
          <span className="footer-cta-arrow" aria-hidden="true">→</span>
        </a>

        {/* ── 簽名分隔線 ── */}
        <hr className="footer-rule" aria-hidden="true" />

        {/* ── 底部簽名 ── */}
        <div className="footer-bottom">
          <span className="footer-sign" aria-hidden="true">✦</span>
          <span className="footer-name">趙蔆瑄 · Chao, Ling Hsuan</span>
          <span className="footer-sep" aria-hidden="true">·</span>
          <span className="footer-copy">© {year}</span>
        </div>

      </div>
    </footer>
  )
}