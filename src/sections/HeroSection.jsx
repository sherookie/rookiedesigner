import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

/* ─── Food item data (mirrors the original HTML) ────────────────────────── */
const FOOD_ITEMS = [
  // anchors — heavy, slow
  { cls: 'anchor', speed: 0.08, style: { left:'12%', top:'62%' }, src: 'images/food/plate.png',  w: 230 },
  { cls: 'anchor', speed: 0.10, style: { right:'10%',top:'57%' }, src: 'images/food/bowl.png',   w: 190 },
  // linear — utensils with rotation
  { cls: 'linear', speed: 0.22, ir: '-32deg', style: { left:'4%',  top:'18%' }, src: 'images/food/fork.png',  w: 78 },
  { cls: 'linear', speed: 0.18, ir:  '24deg', style: { right:'6%', top:'12%' }, src: 'images/food/knife.png', w: 74 },
  // medium + magnetic
  { cls: 'medium mag', speed: 0.34, str: 0.28, style: { left:'36%', top:'12%' }, src: 'images/food/rice_a.png',   w: 104 },
  { cls: 'medium mag', speed: 0.28, str: 0.32, style: { left:'62%', top:'22%' }, src: 'images/food/rice_b.png',   w: 92  },
  { cls: 'medium mag', speed: 0.40, str: 0.26, style: { left:'18%', top:'34%' }, src: 'images/food/rice_c.png',   w: 86  },
  { cls: 'medium mag', speed: 0.30, str: 0.24, style: { right:'22%',top:'8%'  }, src: 'images/food/rice_d.png',   w: 96  },
  { cls: 'medium mag', speed: 0.26, str: 0.30, style: { left:'46%', top:'58%' }, src: 'images/food/salad.png',    w: 124 },
  { cls: 'medium mag', speed: 0.38, str: 0.36, style: { right:'34%',top:'44%' }, src: 'images/food/tomato.png',   w: 78  },
  { cls: 'medium mag', speed: 0.20, str: 0.28, style: { left:'72%', top:'68%' }, src: 'images/food/mango.png',    w: 112 },
  { cls: 'medium mag', speed: 0.44, str: 0.32, style: { left:'6%',  top:'74%' }, src: 'images/food/lemon.png',    w: 72  },
  { cls: 'medium mag', speed: 0.32, str: 0.26, style: { right:'16%',top:'72%' }, src: 'images/food/carrot.png',   w: 88  },
  { cls: 'medium mag', speed: 0.24, str: 0.30, style: { left:'56%', top:'4%'  }, src: 'images/food/ice.png',      w: 84  },
  // light + magnetic — tiny, fast, whimsical
  { cls: 'light mag', speed: 0.56, str: 0.42, style: { left:'26%',  top:'7%'  }, src: 'images/food/cherry.png',       w: 52 },
  { cls: 'light mag', speed: 0.62, str: 0.48, style: { right:'40%', top:'18%' }, src: 'images/food/pinkberry_a.png', w: 46 },
  { cls: 'light mag', speed: 0.50, str: 0.38, style: { left:'84%',  top:'38%' }, src: 'images/food/pinkberry_b.png', w: 50 },
  { cls: 'light mag', speed: 0.66, str: 0.44, style: { left:'2%',   top:'46%' }, src: 'images/food/pinkberry_c.png', w: 44 },
  { cls: 'light mag', speed: 0.58, str: 0.40, style: { right:'4%',  top:'58%' }, src: 'images/food/strawberry.png',  w: 56 },
  { cls: 'light mag', speed: 0.64, str: 0.46, style: { left:'50%',  top:'82%' }, src: 'images/food/cherry.png',      w: 62 },
  { cls: 'light mag', speed: 0.72, str: 0.52, style: { left:'80%',  top:'6%'  }, src: 'images/food/star.png',        w: 42 },
]

export default function HeroSection() {
  const sectionRef = useRef(null)
  const sceneRef   = useRef(null)
  const { t } = useLang()

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const scene    = sceneRef.current
    const items    = scene.querySelectorAll('.fi')

    /* ── 1. CSS float animation vars ─────────────────────────── */
    items.forEach(item => {
      item.style.setProperty('--fd',   `${3.5 + Math.random() * 3}s`)
      item.style.setProperty('--fdel', `${-(Math.random() * 5)}s`)
      // linear items have a CSS rotation baked in via --ir
      const ir = item.style.getPropertyValue('--ir')
      if (ir) item.style.transform = `rotate(${ir})`
    })

    /* ── 2. Mobile: hide excess items ───────────────────────── */
    if (isMobile) {
      scene.querySelectorAll('.fi.light') .forEach((el, i) => { if (i > 2) el.style.display = 'none' })
      scene.querySelectorAll('.fi.medium').forEach((el, i) => { if (i > 4) el.style.display = 'none' })
    }

    /* ── 3. Hero entrance (pop in from scale 0.7) ───────────── */
    gsap.set(items, { opacity: 0, scale: 0.7 })
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.4)',
      stagger: { each: 0.06, from: 'random' },
      delay: 0.6,
    })

    /* ── 4. Parallax scroll ─────────────────────────────────── */
    items.forEach(item => {
      const speed  = parseFloat(item.dataset.speed || '0.2')
      const isLin  = item.classList.contains('linear')
      const isLite = item.classList.contains('light')
      const rot    = isLin ? speed * 60 : isLite ? speed * -20 : speed * 10

      gsap.to(item, {
        y: () => speed * window.innerHeight * -1.2,
        rotation: rot,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })
    })

    /* ── 5. Magnetic hover (desktop only) ───────────────────── */
    if (!isTouch) {
      scene.querySelectorAll('.fi.mag').forEach(item => {
        const strength = parseFloat(item.dataset.str || '0.3')
        const radius   = 120

        const onMove = (e) => {
          const rect = item.getBoundingClientRect()
          const dx   = e.clientX - (rect.left + rect.width  / 2)
          const dy   = e.clientY - (rect.top  + rect.height / 2)
          const dist = Math.hypot(dx, dy)
          if (dist < radius) {
            const pull = (radius - dist) / radius
            gsap.to(item, {
              x: dx * strength * pull * 1.4,
              y: dy * strength * pull * 1.4,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        }
        const onLeave = () =>
          gsap.to(item, { x: 0, y: 0, duration: 1.4, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })

        item.addEventListener('mousemove',  onMove)
        item.addEventListener('mouseleave', onLeave)
      })
    }
  }, { scope: sectionRef })

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-copy">
        <p className="hero-eyebrow">
          {t('資訊傳播 × 圖文傳播', 'Information × Graphic Arts')}
        </p>
        <h1 className="hero-title">
          {/* CSS (.lang-en) toggles display between these two spans */}
          <span className="hero-zh" lang="zh-TW">邏輯之上 <br />美學成形</span>
          <span className="hero-en" lang="en">Where Logic Meets Aesthetics</span>
        </h1>
        <p className="hero-sub">
          {t('我是趙蔆瑄，', "I'm Ling-Hsuan")}
          <br />
          {t('結合資訊邏輯與圖文美學，用設計回應生活。', '—Blending logic and aesthetics, responding to life through design.')}
        </p>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span className="scroll-lbl">{t('捲動', 'Scroll')}</span>
      </div>

      {/* Food scene — all items driven by GSAP in useGSAP above */}
      <div className="food-scene" id="foodScene" ref={sceneRef} aria-hidden="true">
        {FOOD_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`fi ${item.cls}`}
            data-speed={item.speed}
            data-str={item.str}
            style={item.ir ? { ...item.style, '--ir': item.ir } : item.style}
          >
            <img src={item.src} alt="" width={item.w} draggable={false} />
          </div>
        ))}
      </div>
    </section>
  )
}
