import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Highlighter({ children, color = '#FF9800' }) {
  const containerRef = useRef(null)
  const path1Ref = useRef(null)
  const path2Ref = useRef(null)

  useGSAP(() => {
    const path1 = path1Ref.current
    const path2 = path2Ref.current
    if (!path1 || !path2) return

    const tl = gsap.timeline({ delay: 0.5 })

    // 第一筆：左 -> 右 (直接把隱形的線推回 0)
    tl.to(path1, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' })
    
    // 第二筆：右 -> 左
   /* tl.to(path2, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, "+=0.1")*/
    
  }, { scope: containerRef })

  return (
    <span ref={containerRef} style={{ position: 'relative', display: 'inline-block', padding: '0 6px' }}>
      <span style={{ position: 'relative', zIndex: 10 }}>{children}</span>
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={path1Ref}
          d="M -5,75 Q 50,60 105,75" 
          stroke={color}
          strokeWidth="40"
          fill="none"
          strokeLinecap="round"
          style={{ 
            opacity: 0.6, 
            mixBlendMode: 'multiply',
            /* 💡 終極解法：直接在這裡寫死超過線條長度的數值，讓它一出生就隱形！ */
            strokeDasharray: 200, 
            strokeDashoffset: 200 
          }}
        />
        <path
          ref={path2Ref}
          d="M 105,50 Q 50,65 -5,50" 
          stroke={color}
          strokeWidth="30"
          fill="none"
          strokeLinecap="round"
          style={{ 
            opacity: 0.6, 
            mixBlendMode: 'multiply',
            /* 💡 終極解法：直接在這裡寫死超過線條長度的數值，讓它一出生就隱形！ */
            strokeDasharray: 200, 
            strokeDashoffset: 200 
          }}
        />
      </svg>
    </span>
  )
}