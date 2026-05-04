import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'

/* ─────────────────────────────────────────────────────────────
   PortfolioSection — 主廚精選 Chef's Selection
   擺盤式 Bento + 菜單元素 + 黃色「主廚推薦」紙籤印章
   ─────────────────────────────────────────────────────────── */

/* 類別中英對照（原本 project.category 是英文 enum，這裡轉成可顯示文案） */
const CATEGORY_LABEL = {
  Interactive:  { zh: '互動設計',  en: 'Interactive'  },
  Design:       { zh: '視覺設計',  en: 'Design'       },
  Illustration: { zh: '插畫',      en: 'Illustration' },
  Animation:    { zh: '動態設計',  en: 'Animation'    },
}

/* Wide card → 主廚推薦印章。所有跨欄作品自動掛章 */
const isFeatured = (project) => project.wide

/* 印章微旋角度（Wide cards 各自略不同，避免單調） */
const STAMP_ROTATIONS = [-7, 5, -4]

/* ── Single project card ───────────────────────────────────── */
function ProjectCard({ project, index, featuredIndex, onOpen }) {
  const cardRef = useRef(null)
  const { t }   = useLang()

  const number   = String(index + 1).padStart(2, '0')
  const category = CATEGORY_LABEL[project.category] || { zh: project.category, en: project.category }
  const featured = isFeatured(project)
  const stampRot = featured ? STAMP_ROTATIONS[featuredIndex % STAMP_ROTATIONS.length] : 0

  return (
    <article
      ref={cardRef}
      className={`card ${project.wide ? 'wide' : 'standard'} project-card project-card--menu`}
      data-category={project.category}
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      aria-label={`${t(project.nameZh, project.nameEn)} — click to view project details`}
    >
      <div className="card-plate" style={{ '--pc': project.plateColor }} />

      <div className="card-img">
        <img src={project.cardImg} alt={project.cardImgAlt} loading="lazy" decoding="async"/>
      </div>

     

      <footer className="card-foot">
        {/* ── 菜單條目：編號 ─── 類別 ── */}
        <div className="card-meta">
          <span className="card-meta-num">{number}</span>
          <span className="card-meta-leader" aria-hidden="true" />
          <span className="card-meta-cat">{t(category.zh, category.en)}</span>
        </div>

        <h3 className="card-name">{t(project.nameZh, project.nameEn)}</h3>
        <p  className="card-sub">{t(project.subZh, project.subEn)}</p>

        {/* chips → 食材列表（加圓點） */}
        <div className="chips">
          {project.chips.map(chip => (
            <span key={chip.en} className="chip">
              <span className="chip-mark" aria-hidden="true">⊙</span>
              {t(chip.zh, chip.en)}
            </span>
          ))}
        </div>
      </footer>
    </article>
  )
}

/* ── Portfolio section ─────────────────────────────────────── */
export default function PortfolioSection() {
  const sectionRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const { t } = useLang()

  /* 計算 wide cards 在所有作品中的相對 index（讓印章角度規律） */
  let featuredCounter = 0
  const projectsWithFeaturedIdx = projects.map(p => {
    const fi = isFeatured(p) ? featuredCounter++ : -1
    return { ...p, featuredIndex: fi }
  })

  useGSAP(() => {
    /* 標題三段式進場 */
    gsap.from('.port-eyebrow, .port-h2, .port-sub', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.port-header--menu',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    /* 卡片：擺盤式入場（從下方滑入 + 微旋 + 微縮放） */
    const cards = gsap.utils.toArray('.project-card--menu')
    cards.forEach((card, i) => {
      const fromRot = i % 2 === 0 ? -1.8 : 1.8

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
          rotation: fromRot,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      /* Wide cards：印章 0.4s 後啪一聲蓋下 */
      const stamp = card.querySelector('.card-feature-stamp')
      if (stamp) {
        const finalRot = parseFloat(
          getComputedStyle(stamp).getPropertyValue('--stamp-rot')
        ) || -6

        gsap.fromTo(
          stamp,
          { opacity: 0, scale: 2, rotation: finalRot - 35 },
          {
            opacity: 1,
            scale: 1,
            rotation: finalRot,
            duration: 0.6,
            ease: 'back.out(2.6)',
            delay: 0.45,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })
  }, { scope: sectionRef })

  return (
    <section className="portfolio portfolio--menu" id="work" ref={sectionRef}>

      {/* ── 三段式標題 ── */}
      <header className="port-header port-header--menu">
        <span className="sec-tag port-eyebrow">
          {t('作品 / 精選', 'Work / Selected')}
        </span>
        <h2 className="port-h2">
          {t('主廚精選', "Chef's Selection")}
        </h2>
      </header>

      {/* ── Bento Grid ── */}
      <div className="bento">
        {projectsWithFeaturedIdx.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            featuredIndex={project.featuredIndex}
            onOpen={setActiveProject}
          />
        ))}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}