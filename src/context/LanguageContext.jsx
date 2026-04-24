import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('zh') // 控制文字的狀態
  const [receiptLang, setReceiptLang] = useState('zh') // 👉 新增：專門控制收據翻轉的狀態
  const inkRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('lang-en', lang === 'en')
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW'
  }, [lang])

  const toggleLang = useCallback(() => {
    const toEn = lang === 'zh'
    const newLang = toEn ? 'en' : 'zh'
    
    // 💡 1. 點擊瞬間，立刻讓收據翻轉！
    setReceiptLang(newLang) 

    const ink = inkRef.current
    if (!ink) {
      setLang(newLang)
      return
    }

    ink.style.background = toEn ? '#009b8d' : '#e85d26'

    gsap.timeline()
      .to(ink, {
        scaleX: 1, duration: 0.45, ease: 'power2.inOut', transformOrigin: 'left center',
      })
      // 💡 2. 等墨水蓋滿螢幕，才在背後偷偷換掉所有文字
      .call(() => setLang(newLang)) 
      .to(ink, {
        scaleX: 0, duration: 0.45, ease: 'power2.inOut', transformOrigin: 'right center',
      })
  }, [lang])

  const t = useCallback((zh, en) => (lang === 'zh' ? zh : en), [lang])

  return (
    // 記得把 receiptLang 也傳出去給 ReceiptToggle 用
    <LanguageContext.Provider value={{ lang, receiptLang, toggleLang, t, inkRef }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}