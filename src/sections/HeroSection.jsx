import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const FOOD_ITEMS = [
  { cls: 'anchor', speed: 0.08, style: { left:'12%', top:'62%' }, src: 'images/food/plate.png',  w: 230 },
  { cls: 'anchor', speed: 0.10, style: { right:'10%',top:'57%' }, src: 'images/food/bowl.png',   w: 190 },
  { cls: 'linear', speed: 0.22, ir: '-32deg', style: { left:'4%',  top:'18%' }, src: 'images/food/fork.png',  w: 78 },
  { cls: 'linear', speed: 0.18, ir:  '24deg', style: { right:'6%', top:'12%' }, src: 'images/food/knife.png', w: 74 },
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
  const wrapRef    = useRef(null)   // 整張卡（含上下 perf 條）
  const cardRef    = useRef(null)   // 菜單卡本體（白紙部分）
  const { t, lang } = useLang()

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const scene    = sceneRef.current
    const items    = scene.querySelectorAll('.fi')

    /* ── 1. CSS float animation vars ──────────────────────── */
    items.forEach(item => {
      item.style.setProperty('--fd',   `${3.5 + Math.random() * 3}s`)
      item.style.setProperty('--fdel', `${-(Math.random() * 5)}s`)
      const ir = item.style.getPropertyValue('--ir')
      if (ir) item.style.transform = `rotate(${ir})`
    })

    /* ── 2. Mobile: hide excess items ─────────────────────── */
    if (isMobile) {
      scene.querySelectorAll('.fi.light') .forEach((el, i) => { if (i > 2) el.style.display = 'none' })
      scene.querySelectorAll('.fi.medium').forEach((el, i) => { if (i > 4) el.style.display = 'none' })
    }

    /* ── 3. Food entrance ─────────────────────────────────── */
    gsap.set(items, { opacity: 0, scale: 0.7 })
    gsap.to(items, {
      opacity: 1, scale: 1,
      duration: 0.9, ease: 'back.out(1.4)',
      stagger: { each: 0.06, from: 'random' },
      delay: 0.6,
    })

    /* ── 4. Menu card stamp entrance ─────────────────────── */
    const card  = cardRef.current
    const rules = card.querySelectorAll('.mc-rule')
    const texts = card.querySelectorAll('.mc-anim')
    const seal  = card.querySelector('.mc-seal')

    // 整張卡（含 perf）像橡皮印章壓下來
    gsap.set(wrapRef.current, { opacity: 0, scale: 0.88, rotation: -1.8, y: -32 })
    gsap.to(wrapRef.current, {
      opacity: 1, scale: 1, rotation: 0, y: 0,
      duration: 1.05, ease: 'back.out(2.4)', delay: 0.15,
    })

    // 橫線從左往右畫出（印刷走紙感）
    gsap.set(rules, { scaleX: 0, transformOrigin: 'left center' })
    gsap.to(rules, {
      scaleX: 1, duration: 0.6, ease: 'power3.out',
      stagger: 0.13, delay: 0.8,
    })

    // 文字行逐行浮現
    gsap.set(texts, { opacity: 0, y: 7 })
    gsap.to(texts, {
      opacity: 1, y: 0, duration: 0.42,
      ease: 'power2.out', stagger: 0.08, delay: 0.95,
    })

    // 印章最後轉入
    if (seal) {
      gsap.set(seal, { opacity: 0, scale: 0.3, rotation: -45 })
      gsap.to(seal, {
        opacity: 1, scale: 1, rotation: 8,
        duration: 0.65, ease: 'back.out(2.0)', delay: 1.6,
      })
    }

    /* ── 5. Parallax scroll ───────────────────────────────── */
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

    // 卡片視差較慢——像被釘在紙上慢慢抬起
    gsap.to(wrapRef.current, {
      y: () => window.innerHeight * -0.10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8,
        invalidateOnRefresh: true,
      },
    })

    /* ── 6. Magnetic hover — desktop only ────────────────── */
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
              duration: 0.4, ease: 'power2.out', overwrite: 'auto',
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

      {/* ── 菜單卡（含收據孔洞） ─────────────────────────────────── */}
      <div className="menu-card-wrap" ref={wrapRef}>

        {/* 上方收據撕孔條 — 與 ReceiptToggle 完全一樣的技術 */}
        <div className="mc-perf mc-perf--top" aria-hidden="true" />

        {/* 菜單卡本體（白紙） */}
        <div className="menu-card" ref={cardRef}>

          {/* 紙張噪點紋理（繼承全站 noise-overlay 技術，但更濃） */}
          <div className="mc-paper-grain" aria-hidden="true" />

          {/* 右上角橘色印章 */}
          <div className="mc-seal" aria-hidden="true">
            <span>PORT<br />FOLIO<br />✦<br />2025</span>
          </div>

          {/* ── Header 橫線 ── */}
          <header className="mc-header mc-anim">
            <div className="mc-rule" />
            <span className="mc-eyebrow">— TODAY'S SPECIAL —</span>
            <div className="mc-rule" />
          </header>

          {/* ── 主廚姓名
              中文：Shippori Mincho（--f-mincho）與收據正面「中」字同字形
              英文：Syne（--f-syne）與收據正面「EN」同字形
              名字設計上刻意保留雙語並排，是整張卡的設計核心
          ── */}
          {/* ── 主廚姓名 (動態語言切換) ── */}
          <div className="mc-name-block mc-anim">
            <span className="mc-label">CHEF</span>
            <div className="mc-name-row">
              {/* 💡 根據當前語言，只渲染對應的名字 */}
              {lang === 'zh' ? (
                <span className="mc-zh-name">趙蔆瑄</span>
              ) : (
                <span className="mc-en-name">LING-HSUAN CHAO</span>
              )}
            </div>
          </div>

          {/* 點點分隔線 */}
          <div className="mc-dots mc-anim" aria-hidden="true">
            · · · · · · · · · · · · · · ·
          </div>

          {/* ── 順便幫你把下方的菜色列表也加上完整的語言切換 ── */}
          <div className="mc-rows">
            <div className="mc-row mc-anim">
              <span className="mc-label">SPECIALTY</span>
              <span className="mc-leader" aria-hidden="true" />
              <span className="mc-value">{t('資訊設計 × 圖文傳播', 'Information × Graphic Arts')}</span>
            </div>
            <div className="mc-row mc-anim">
              <span className="mc-label">STYLE</span>
              <span className="mc-leader" aria-hidden="true" />
              {/* 加入 t() 讓這裡也能隨語言切換 */}
              <span className="mc-value">{t('邏輯之上，美學成形', 'Logic Meets Aesthetics')}</span>
            </div>
            <div className="mc-row mc-anim">
              <span className="mc-label">ORIGIN</span>
              <span className="mc-leader" aria-hidden="true" />
              <span className="mc-value">{t('台灣 · 台北', 'Taiwan · Taipei')}</span>
            </div>
          </div>
          
          {/* 底部橫線 */}
          <div className="mc-rule mc-rule--full mc-anim" />

          {/* Footer */}
          <footer className="mc-footer mc-anim">
            <span className="mc-footer-txt">EST. 2025</span>
            <span className="mc-footer-star" aria-hidden="true">✦</span>
            <span className="mc-footer-txt">OPEN FOR COLLABORATION</span>
          </footer>

        </div>

        {/* 下方收據撕孔條 */}
        <div className="mc-perf mc-perf--bottom" aria-hidden="true" />

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span className="scroll-lbl">{t('捲動', 'Scroll')}</span>
      </div>

      {/* Food scene */}
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