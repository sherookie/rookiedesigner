import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

export default function ReceiptToggle() {
  const wrapRef = useRef(null)
  // 👉 這裡把 receiptLang 拿出來用
  const { lang, receiptLang, toggleLang } = useLang()

  useGSAP(() => {
    gsap.from(wrapRef.current, {
      x: 80, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 1.2,
    })
  }, [])

  return (
    <div className="receipt-wrap" ref={wrapRef} id="receiptWrap">
      <button className="receipt" onClick={toggleLang} aria-label="Toggle Language">
        <div className="receipt-teeth receipt-teeth--top" />

        {/* 👉 卡片的翻轉由 receiptLang 決定，所以會立刻翻！ */}
        <div className={`receipt-body${receiptLang === 'en' ? ' flipped' : ''}`}>
          <div className="receipt-face receipt-face--front">
            {/* 文字的發亮狀態一樣由 lang 決定 */}
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