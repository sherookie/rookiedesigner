import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLang } from '../context/LanguageContext'

export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null)
  const cardRef     = useRef(null)
  const [displayed, setDisplayed] = useState(null)
  const { t } = useLang()

  // 1. 當點擊卡片傳入 project 時，先把資料設給 displayed 讓 React 把 HTML 畫出來
  useEffect(() => {
    if (project) setDisplayed(project)
  }, [project])

  // 2. 當 displayed 更新，而且 HTML 畫好之後，GSAP 才進場做動畫
  useGSAP(() => {
    if (displayed && project) {
      document.body.classList.add('modal-open')
      // 確保初始狀態是隱藏的
      gsap.set(cardRef.current, { scale: 0.9, y: 50, opacity: 0 })
      
      gsap.timeline()
        .to(backdropRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        .to(cardRef.current, { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.8)' }, '-=0.2')
    }
  }, [displayed, project]) 

  const handleClose = () => {
    gsap.to(cardRef.current, {
      scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 })
        document.body.classList.remove('modal-open')
        setDisplayed(null)
        onClose()
      },
    })
  }

  if (!displayed) return null

  const { Detail } = displayed

  return (
    <div className="pro-modal" style={{ visibility: 'visible' }} role="dialog">
      <div className="pro-modal-backdrop" ref={backdropRef} style={{ opacity: 0 }} onClick={handleClose} />
      <div className="pro-modal-wrapper">
        <div className="pro-modal-card" ref={cardRef} style={{ opacity: 0 }}>
          <button className="pro-modal-close" onClick={handleClose}>✕ CLOSE</button>
          <div className="pro-modal-scroll-area">
            <Detail t={t} />
          </div>
        </div>
      </div>
    </div>
  )
}