import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'

/* ── Single project card ─────────────────────────────────────────────────── */
function ProjectCard({ project, onOpen }) {
  const cardRef = useRef(null)
  const { t }   = useLang()
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  /* 3D tilt on mouse move (desktop only) */
  const onMouseMove = (e) => {
    if (isTouch) return
    const card = cardRef.current
    const rect  = card.getBoundingClientRect()
    const x     = (e.clientX - rect.left) / rect.width  - 0.5
    const y     = (e.clientY - rect.top)  / rect.height - 0.5
    gsap.to(card, {
      rotateY:  x * 6,
      rotateX: -y * 6,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 800,
      overwrite: 'auto',
    })
  }

  const onMouseLeave = () => {
    if (isTouch) return
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    })
  }

  return (
    <article
      ref={cardRef}
      className={`card ${project.wide ? 'wide' : 'standard'}`}
      data-category={project.category}
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={`${t(project.nameZh, project.nameEn)} — click to view project details`}
    >
      <div className="card-plate" style={{ '--pc': project.plateColor }} />
      <div className="card-img">
        <img src={project.cardImg} alt={project.cardImgAlt} loading="lazy" decoding="async"/>
      </div>
      <footer className="card-foot">
        <h3 className="card-name">{t(project.nameZh, project.nameEn)}</h3>
        <p className="card-sub">{t(project.subZh, project.subEn)}</p>
        <div className="chips">
          {project.chips.map(chip => (
            <span key={chip.en} className="chip">{t(chip.zh, chip.en)}</span>
          ))}
        </div>
      </footer>
    </article>
  )
}

/* ── Portfolio section ───────────────────────────────────────────────────── */
export default function PortfolioSection() {
  const sectionRef    = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const { t } = useLang()

  /* Scroll reveal for cards and header */
  useGSAP(() => {
    gsap.from('.port-h2', {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.port-header', start: 'top 85%' },
    })

    gsap.from('.card', {
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.bento', start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section className="portfolio" id="work" ref={sectionRef}>
      <header className="port-header">
        <span className="sec-tag">{t('作品', 'Work')}</span>
        <h2 className="port-h2">{t('精選作品', 'Selected Works')}</h2>
      </header>

      <div className="bento">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setActiveProject}
          />
        ))}
      </div>

      {/* Modal renders outside the bento to avoid stacking-context issues */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}
