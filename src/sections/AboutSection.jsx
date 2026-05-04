import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useLang } from '../context/LanguageContext'

const TAGS = [
  { zh: '動態影像',    en: 'Motion Graphics'  },
  { zh: '資訊轉譯',    en: 'Info Translation' },
  { zh: '互動教材開發', en: 'E-Learning Dev'   },
  { zh: '數位行銷',    en: 'Digital Marketing' },
  { zh: 'UI/UX 設計',  en: 'UI/UX Design'     },
]

const EXPERIENCES = [
  {
    period: '2023/07 – 2024/07',
    roleZh: '數位行銷實習生 / 富邦人壽',
    roleEn: 'Digital Marketing Intern / Fubon Life',
    descZh: '負責 LINE@ 官方帳號經營與內容維護；將複雜的保險金融知識與遺產稅務資訊轉譯為視覺化行銷媒材，有效提升資訊傳遞效能。',
    descEn: 'Managed LINE@ official account; translated complex insurance and tax information into visual marketing materials using Motion Graphics to enhance communication efficiency.',
  },
  {
    period: '2023/09 – 2023/10',
    roleZh: '專案助理 / 國立科學工藝博物館',
    roleEn: 'Project Assistant / NSTM',
    descZh: '參與「海洋教育巡迴推廣計畫」，主導《捕碳高手》數位補充教材之動態視覺開發，並協助專案時程控管與跨單位溝通，落實科普知識數位化。',
    descEn: 'Participated in the Marine Education Project; led the motion design for \'Carbon Capture Expert\' digital materials and assisted in project coordination and scheduling.',
  },
  {
    period: '2022/11 – 2023/01',
    roleZh: '多媒體助理 / 國立勤益科技大學',
    roleEn: 'Multimedia Assistant / NCUT',
    descZh: '協作開發教育部「因材網」動畫教材，與學科領域教師深度協作，將表演藝術教案轉化為具備教學邏輯與美感的數位媒材，優化遠距學習體驗。',
    descEn: 'Co-developed animation materials for MOE Adaptive Learning Network; collaborated with teachers to transform performing arts curricula into aesthetically pleasing digital learning media.',
  },
]

const AWARDS = [
  {
    zh: 'ISARCH 2024 Digital Award｜Communication UX 獲獎',
    en: 'ISARCH 2024 Digital Award - Communication UX Student Winner',
  },
  {
    zh: '放視大賞 跨域組｜優選 暨 實體參展',
    en: 'Vision Get Wild - Excellence Award (Cross-disciplinary)',
  },
  {
    zh: '國立臺灣文學館《詩意，詩境》｜參展',
    en: 'National Museum of Taiwan Literature Exhibition',
  },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.from('.about-h2', {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-h2', start: 'top 82%' },
    })

    gsap.to('.js-reveal', {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: '.experience-list', start: 'top 80%' },
    })

    gsap.from('.tag', {
      opacity: 0, y: 12, scale: 0.92, duration: 0.55, ease: 'back.out(2)', stagger: 0.08,
      scrollTrigger: { trigger: '.tags', start: 'top 88%' },
    })

    gsap.from('.info-row', {
      opacity: 0, x: 20, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.info-dl', start: 'top 82%' },
    })

    gsap.from('.agency-card', {
      opacity: 0, y: 30, scale: 0.97, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.agency-card', start: 'top 85%' },
    })
  }, { scope: sectionRef })

  
  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-grid">

        {/* ── Left label column ── */}
        <div className="about-label-col">
          <span className="sec-tag">{t('關於', 'About')}</span>
          <div className="about-deco" />
        </div>

        {/* ── Main column ── */}
        <div className="about-main-col">
          <h2 className="about-h2">
            {t('持續探索日常：', 'Tracing everyday narratives:')}
            <br />
            {t('我的學習與實踐軌跡', 'A journey of learning and practice')}
          </h2>

          <div className="tags">
            {TAGS.map(tag => (
              <span key={tag.en} className="tag">{t(tag.zh, tag.en)}</span>
            ))}
          </div>

          <div className="experience-list">
            {EXPERIENCES.map(exp => (
              <div key={exp.period} className="exp-item js-reveal">
                <div className="exp-time">{exp.period}</div>
                <div className="exp-details">
                  <h3 className="exp-role">{t(exp.roleZh, exp.roleEn)}</h3>
                  <p className="exp-desc">{t(exp.descZh, exp.descEn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Info / awards column ── */}
        <div className="about-info-col">
          <dl className="info-dl">
            <div className="info-row">
              <dt>{t('學校', 'School')}</dt>
              <dd>{t('國立臺灣師範大學', 'NTNU')}</dd>
            </div>
            <div className="info-row">
              <dt>{t('系所', 'Dept.')}</dt>
              <dd>{t('圖文傳播學系研究所', 'Graphic Arts & Comm.')}</dd>
            </div>
            <div className="info-row">
              <dt>{t('年級', 'Year')}</dt>
              <dd>{t('碩士一年級', 'M.A. Year 1')}</dd>
            </div>
          </dl>

          <div className="agency-card">
            <span className="agency-word">{t('獲獎與參展', 'Honors & Exhibitions')}</span>
            <div className="agency-def">
              <ul className="award-list">
                {AWARDS.map(award => (
                  <li key={award.en}>
                    <span className="award-title">{t(award.zh, award.en)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
