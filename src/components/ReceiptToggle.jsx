import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function ReceiptToggle() {
  const wrapRef = useRef(null)
  const { lang, receiptLang, toggleLang } = useLang()

  // 移除了 isOpen 狀態，因為現在電腦版點擊只需直接翻轉
  
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 769px)", () => {
      // --- 只保留電腦版的進場動畫 ---
      gsap.fromTo(wrapRef.current, 
        { x: 80, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.2 }
      )
    })

    // 移除了所有 max-width: 768px 的動畫，讓它不再跟 CSS 打架
    return () => mm.revert()
  }, [])

  return (
    <div className="receipt-wrap" ref={wrapRef} id="receiptWrap">
      {/* 點擊直接觸發 toggleLang */}
      <button className="receipt" onClick={toggleLang} aria-label="Toggle Language">
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