import { useRef, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function Nav() {
  const navRef = useRef(null)
  
  // 解構語言相關變數
  const { t, lang, toggleLang } = useLang()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // --- 1. 背景模糊特效 ---
    const blurTrigger = ScrollTrigger.create({
      start: 80,
      onEnter:     () => { nav.style.backdropFilter = 'blur(12px) saturate(180%)' },
      onLeaveBack: () => { nav.style.backdropFilter = '' },
    })

    // --- 2. 往下滑動自動隱藏，往上滑動顯示 ---
    const navHeight = nav.offsetHeight

    const showAnim = gsap.from(nav, { 
      y: -navHeight, 
      paused: true,  
      duration: 0.3, 
      ease: "power2.out"
    }).progress(1)

    const hideTrigger = ScrollTrigger.create({
      start: "top top", 
      onUpdate: (self) => {
        // 向下滾動 (direction === 1) 且超過 100px 時收起
        if (self.direction === 1 && self.scrollY > 100) {
          showAnim.reverse()
        } 
        // 向上滾動 (direction === -1) 時展開
        else if (self.direction === -1) {
          showAnim.play()
        }
      }
    })

    // --- 清除動畫 ---
    return () => {
      blurTrigger.kill()
      hideTrigger.kill()
    }
  }, []) // 依賴陣列為空，代表只在掛載時執行一次

  // 平滑捲動功能
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
    <nav className="nav" ref={navRef}>
      {/* 1. Logo 區塊 */}
      <div className="nav-logo">
        <span className="logo-zh">趙蔆瑄</span>
        <span className="logo-en">Sherry</span>
      </div>

      {/* 2. 電腦版導覽連結 */}
      <div className="nav-links">
        <a href="#work" className="nav-link" onClick={scrollTo('#work')}>
          {t('作品', 'Work')}
        </a>
        <a href="#about" className="nav-link" onClick={scrollTo('#about')}>
          {t('關於', 'About')}
        </a>
        <a href="#contact" className="nav-link" onClick={scrollTo('#contact')}>
          {t('聯絡', 'Contact')}
        </a>
      </div>

      {/* 3. 新增的手機版文字語系切換按鈕 */}
      <button className="nav-lang-btn" onClick={toggleLang} aria-label="Toggle Language">
        <span className={lang === 'zh' ? 'active' : 'dim'}>中</span>
        <span className="slash"> / </span>
        <span className={lang === 'en' ? 'active' : 'dim'}>EN</span>
      </button>
    </nav>
  )
}