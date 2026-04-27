import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function ReceiptToggle() {
  const wrapRef = useRef(null)
  const { lang, receiptLang, toggleLang } = useLang()
  const [isOpen, setIsOpen] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  // 處理點擊邏輯
  const handleClick = () => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      if (!isOpen) {
        setIsOpen(true) // 手機版第一下：拉出來
      } else {
        toggleLang()    // 手機版第二下：翻轉
        setTimeout(() => setIsOpen(false), 1000) // 翻轉完縮回去
      }
    } else {
      toggleLang() // 電腦版：直接翻轉
    }
  }

  // 點擊外側自動縮回
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('touchstart', handleOutsideClick)
    return () => document.removeEventListener('touchstart', handleOutsideClick)
  }, [isOpen])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 769px)", () => {
      // --- 電腦版：確保完全顯示在原本的位置 ---
      gsap.fromTo(wrapRef.current, 
        { x: 80, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.2 }
      )
      // 確保電腦版不會被手機的 isOpen 狀態影響
      gsap.set(wrapRef.current, { x: 0, scale: 1 })
    })

    mm.add("(max-width: 768px)", () => {
      // --- 手機版：進場並縮排（露出小角） ---
      gsap.set(wrapRef.current, { scale: 0.8, transformOrigin: 'right center' })
      
      gsap.fromTo(wrapRef.current, 
        { x: 100, opacity: 0 }, 
        { x: -10, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      )
    })

    return () => mm.revert()
  }, [])

  // 專門處理手機版「拉出/縮回」的動畫
  useGSAP(() => {
    if (window.innerWidth <= 768) {
      gsap.to(wrapRef.current, {
        x: isOpen ? -10 : 60, 
        duration: 0.4,
        ease: 'back.out(1.2)',
        overwrite: 'auto'
      })
    }
  }, { dependencies: [isOpen], scope: wrapRef })

  return (
    <div className="receipt-wrap" ref={wrapRef} id="receiptWrap">
      <button className="receipt" onClick={handleClick} aria-label="Toggle Language">
        <div className="receipt-teeth receipt-teeth--top" />
        
        <div className={`receipt-body${receiptLang === 'en' ? ' flipped' : ''}`}>
  
          <div className="receipt-face receipt-face--front">
            <span className={lang === 'zh' ? 'r-active' : 'r-dim'}>中</span>
            <span className="r-slash">／</span>
            <span className={lang === 'en' ? 'r-active' : 'r-dim'}>EN</span>
          </div>

         
          <div className="receipt-face receipt-face--back">
            <span className={lang === 'zh' ? 'r-active' : 'r-dim'}>中</span>
            <span className="r-slash">／</span>
            <span className={lang === 'en' ? 'r-active' : 'r-dim'}>EN</span>
          </div>

        </div>

        <div className="receipt-teeth receipt-teeth--bottom" />
      </button>
    </div>
  )
}