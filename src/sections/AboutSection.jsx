import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../context/LanguageContext'

/* ─────────────────────────────────────────────────────────────
   AboutSection — 三幕 Scroll 劇場
   ACT 1  Kitchen Stage  : Pin Section · 主廚備料台 + 價值主張
   ACT 2  Cooking Log    : 經歷卡片 · 紙張翻動 + 印章彈跳
   ACT 3  Honor Stamps   : 獎項印章 · 啪啪蓋章
   ─────────────────────────────────────────────────────────── */

/* ── 技能標籤 ── */
const TAGS = [
  { zh: '動態影像',     en: 'Motion Graphics'  },
  { zh: '資訊轉譯',     en: 'Info Translation' },
  { zh: '互動教材開發', en: 'E-Learning Dev'   },
  { zh: '數位行銷',     en: 'Digital Marketing'},
  { zh: 'UI/UX 設計',   en: 'UI/UX Design'     },
]

/* ── 幕一：價值主張（搭配備料台食材） ── */
const VALUE_PROPS = [
  {
    num: '01',
    zh: '資訊轉譯',
    en: 'Information Translation',
    descZh: '把複雜的金融、科普、教育內容，重新熬煮成大眾能消化的視覺敘事。',
    descEn: 'Cooking complex finance, science and education content into visual stories anyone can digest.',
    ingredient: 'tomato',
  },
  {
    num: '02',
    zh: '動態敘事',
    en: 'Motion Narrative',
    descZh: '用動態圖像讓靜態資訊「活起來」，幫助訊息真正被讀進去、被記住。',
    descEn: 'Bringing static data to life through motion — so the message lands and stays.',
    ingredient: 'salad',
  },
  {
    num: '03',
    zh: '跨域整合',
    en: 'Cross-domain Integration',
    descZh: '從博物館、教育部到金融保險業，習慣在不同語言之間找出共同的設計詞彙。',
    descEn: 'From museums to ministries to financial groups — finding the common design language across fields.',
    ingredient: 'lemon',
  },
]

/* ── 幕二：經歷 ── */
const EXPERIENCES = [
  {
    period: '2023/07 – 2024/07',
    year: '2024',
    roleZh: '整合行銷實習生 / 富邦人壽',
    roleEn: 'Digital Marketing Intern / Fubon Life',
    descZh: '負責 LINE@ 官方帳號經營與內容維護；將複雜的保險金融知識與遺產稅務資訊轉譯為視覺化行銷媒材，有效提升資訊傳遞效能。',
    descEn: 'Managed LINE@ official account; translated complex insurance and tax information into visual marketing materials using Motion Graphics to enhance communication efficiency.',
  },
  {
    period: '2023/09 – 2023/10',
    year: '2023',
    roleZh: '專案助理 / 國立科學工藝博物館',
    roleEn: 'Project Assistant / NSTM',
    descZh: '參與《捕碳高手》數位補充教材之動態視覺設計，落實科普知識數位化。',
    descEn: "Participated in the motion design for 'Carbon Capture Expert' digital materials.",
  },
  {
    period: '2022/11 – 2023/01',
    year: '2022',
    roleZh: '多媒體助理 / 國立勤益科技大學',
    roleEn: 'Multimedia Assistant / NCUT',
    descZh: '協作開發教育部「因材網」動畫教材，與學科領域教師深度協作，將表演藝術教案轉化為具備教學邏輯與美感的數位媒材，優化遠距學習體驗。',
    descEn: 'Co-developed animation materials for MOE Adaptive Learning Network; collaborated with teachers to transform performing arts curricula into aesthetically pleasing digital learning media.',
  },
]

/* ── 幕三：獎項 ── */
const AWARDS = [
  {
    zh: 'ISARCH 2024 Digital Award',
    en: 'ISARCH 2024 Digital Award',
    subZh: 'Communication UX 獲獎',
    subEn: 'Communication UX Winner',
    rot: -6,
  },
  {
    zh: '放視大賞 跨域組',
    en: 'Vision Get Wild',
    subZh: '優選 暨 實體參展',
    subEn: 'Excellence · Cross-disciplinary',
    rot: 4,
  },
  {
    zh: '臺灣文學館《詩意，詩境》',
    en: 'NMTL Poetry Exhibition',
    subZh: '參展',
    subEn: 'Featured Artist',
    rot: -3,
  },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const { t } = useLang()

  useGSAP(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ═══════════════════════════════════════════
       ACT 1  Kitchen Stage（Pin + Scroll-scrub）
       ─────────────────────────────────────────── */
    if (!isMobile && !reduceMotion) {
      // Pin 整個備料台，滾動高度 = 1.5 倍 viewport
      ScrollTrigger.create({
        trigger: '.kitchen-stage',
        start: 'top top',
        end: '+=150%',
        pin: '.kitchen-pin',
        pinSpacing: true,
        anticipatePin: 1,
      })

      // 標題逐行抬升
      gsap.from('.kitchen-headline .line-inner', {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.kitchen-stage',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // 食材飛入備料台（從散落 → 就定位）
      gsap.from('.ingredient-prop', {
        opacity: 0,
        scale: 0.4,
        x: () => gsap.utils.random(-280, 280),
        y: () => gsap.utils.random(-200, 100),
        rotation: () => gsap.utils.random(-180, 180),
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.kitchen-stage',
          start: 'top top',
          end: '+=60%',
          scrub: 1.2,
        },
      })

      // 餐盤、刀叉柔和推入
      gsap.from('.prep-table__plate', {
        opacity: 0, scale: 0.85, y: 24, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.kitchen-stage', start: 'top 75%' },
      })
      gsap.from('.prep-table__cutlery', {
        opacity: 0, x: -20, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.2,
        scrollTrigger: { trigger: '.kitchen-stage', start: 'top 75%' },
      })

      // 三個價值依序浮現（在 pin 進度 12% ~ 66% 完成，留 34% 緩衝期讓使用者看清楚）
      gsap.utils.toArray('.value-item').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.kitchen-stage',
            start: () => `top+=${12 + i * 18}% top`,
            end:   () => `top+=${30 + i * 18}% top`,
            scrub: 1,
          },
        })

        // 食材對應「點亮」效果
        const propEl = document.querySelector(
          `.ingredient-prop[data-prop="${el.dataset.prop}"]`
        )
        if (propEl) {
          gsap.to(propEl, {
            scale: 1.12,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
              toggleActions: 'play reverse play reverse',
            },
          })
        }
      })
    } else {
      // Mobile / reduced-motion: 簡單淡入
      gsap.from('.kitchen-headline .line-inner', {
        opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.kitchen-stage', start: 'top 80%' },
      })
      gsap.from('.value-item', {
        opacity: 0, y: 24, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.value-list', start: 'top 80%' },
      })
    }

    /* ═══════════════════════════════════════════
       ACT 2  Cooking Log（卡片 + 紙張翻動 + 印章彈跳）
       ─────────────────────────────────────────── */

    // 標籤（食材標籤）依序蓋章入場
    gsap.from('.ingredient-tag', {
      opacity: 0, y: 12, scale: 0.85,
      duration: 0.55, ease: 'back.out(2.2)', stagger: 0.06,
      scrollTrigger: { trigger: '.ingredient-tags', start: 'top 88%' },
    })

    // 卡片：左右錯位滑入 + 紙張翻動
    gsap.utils.toArray('.log-card').forEach((card, i) => {
      const fromX    = i % 2 === 0 ? -100 : 100
      const fromRotY = i % 2 === 0 ? -18 : 18
      const finalRot = i % 2 === 0 ? -1.2 : 1.2

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // 紙張：從外側滑入 + Y 軸翻動感
      tl.fromTo(
        card.querySelector('.log-card__paper'),
        {
          opacity: 0,
          x: fromX,
          rotationY: fromRotY,
          rotationZ: finalRot * 2,
          transformPerspective: 800,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          rotationZ: finalRot,
          duration: 1.1,
          ease: 'power3.out',
        }
      )

      // 印章：壓在最後啪一聲蓋下
      const stamp = card.querySelector('.log-card__stamp')
      if (stamp) {
        tl.fromTo(
          stamp,
          { opacity: 0, scale: 2.2, rotation: -45 },
          { opacity: 1, scale: 1, rotation: 8, duration: 0.55, ease: 'back.out(2.6)' },
          '-=0.25'
        )
      }

      // 文字行逐行
      tl.from(
        card.querySelectorAll('.log-card__period, .log-card__role, .log-card__desc'),
        { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
        '-=0.4'
      )
    })

    /* ═══════════════════════════════════════════
       ACT 3  Honor Stamps（依序蓋章）
       ─────────────────────────────────────────── */
    gsap.utils.toArray('.honor-stamp').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.8, rotation: -45 },
        {
          opacity: 1,
          scale: 1,
          rotation: parseFloat(el.dataset.rot || 0),
          duration: 0.7,
          ease: 'back.out(2.4)',
          delay: i * 0.18,
          scrollTrigger: { trigger: '.stamps-row', start: 'top 80%' },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section className="about about--redesigned" id="about" ref={sectionRef}>

      {/* ════════════════════════════════════════════
          ACT 1  Kitchen Stage（Pin Section）
          ════════════════════════════════════════ */}
      <div className="kitchen-stage">
        <div className="kitchen-pin">

          {/* ── 左：備料台 ── */}
          <div className="prep-table" aria-hidden="true">

            {/* 桌布（米色紙底） */}
            <div className="prep-table__cloth" />

            {/* 中央主盤 */}
            <img
              className="prep-table__plate"
              src="images/food/plate.png"
              alt=""
              draggable={false}
            />

            {/* 餐具 */}
            <img
              className="prep-table__cutlery prep-table__knife"
              src="images/food/knife.png"
              alt=""
              draggable={false}
            />
            <img
              className="prep-table__cutlery prep-table__fork"
              src="images/food/fork.png"
              alt=""
              draggable={false}
            />

            {/* 食材（與 VALUE_PROPS 對應） */}
            <img
              className="ingredient-prop ingredient-prop--tomato"
              data-prop="tomato"
              src="images/food/tomato.png"
              alt=""
              draggable={false}
            />
            <img
              className="ingredient-prop ingredient-prop--salad"
              data-prop="salad"
              src="images/food/salad.png"
              alt=""
              draggable={false}
            />
            <img
              className="ingredient-prop ingredient-prop--lemon"
              data-prop="lemon"
              src="images/food/lemon.png"
              alt=""
              draggable={false}
            />

            {/* 裝飾小點：櫻桃當主廚的 garnish */}
            <img
              className="ingredient-prop ingredient-prop--cherry"
              data-prop="cherry"
              src="images/food/cherry.png"
              alt=""
              draggable={false}
            />
          </div>

          {/* ── 右：價值主張 ── */}
          <div className="value-prop">
            <span className="sec-tag">{t('關於 / 主廚台', 'About / The Kitchen')}</span>

            <h2 className="kitchen-headline">
              <span className="line"><span className="line-inner">
                {t('在這份菜單上，', 'On this menu,')}
              </span></span>
              <span className="line"><span className="line-inner">
                {t('我能為你帶來 ──', "here's what I bring ──")}
              </span></span>
            </h2>

            <ol className="value-list">
              {VALUE_PROPS.map(v => (
                <li key={v.en} className="value-item" data-prop={v.ingredient}>
                  <span className="value-num">{v.num}</span>
                  <div className="value-body">
                    <h3 className="value-title">{t(v.zh, v.en)}</h3>
                    <p  className="value-desc">{t(v.descZh, v.descEn)}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="kitchen-foot">
              <span className="kitchen-foot__star" aria-hidden="true">✦</span>
              <span className="kitchen-foot__txt">
                {t('每道菜，現點現做', 'Every dish, made to order')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════
          ACT 2  Cooking Log（經歷筆記卡片）
          ════════════════════════════════════════ */}
      <div className="cooking-log">
        <header className="log-header">
          <span className="sec-tag">{t('經歷 / 料理筆記', 'Experience / Cooking Log')}</span>
          <h2 className="log-title">
            {t('主廚的料理日誌', "The chef's cooking log")}
          </h2>
        </header>

        {/* 食材（技能）標籤帶 */}
        <div className="ingredient-tags">
          <span className="tags-label">{t('專業食材', 'Specialties')}</span>
          {TAGS.map(tag => (
            <span key={tag.en} className="ingredient-tag">{t(tag.zh, tag.en)}</span>
          ))}
        </div>

        {/* zigzag 卡片堆 */}
        <div className="log-cards">
          {EXPERIENCES.map((exp, i) => (
            <article
              key={exp.period}
              className={`log-card log-card--${i % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="log-card__paper">
                {/* 上下撕痕 */}
                <div className="log-card__perf log-card__perf--top"    aria-hidden="true" />
                <div className="log-card__perf log-card__perf--bottom" aria-hidden="true" />

                {/* 紙張紋理 */}
                <div className="log-card__grain" aria-hidden="true" />

                {/* 圓形印章 */}
                <div className="log-card__stamp" aria-hidden="true">
                  <div className="log-card__stamp-ring" />
                  <span className="log-card__stamp-y">{exp.year}</span>
                  <span className="log-card__stamp-t">EXP</span>
                </div>

                {/* 內容 */}
                <span className="log-card__period">{exp.period}</span>
                <h3   className="log-card__role">{t(exp.roleZh, exp.roleEn)}</h3>
                <p    className="log-card__desc">{t(exp.descZh, exp.descEn)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          ACT 3  Honor Stamps（獎項印章列）
          ════════════════════════════════════════ */}
      <div className="stamp-card-section">
        <header className="stamp-header">
          <span className="sec-tag">{t('獲獎與參展', 'Honors & Exhibitions')}</span>
          <h2 className="stamp-title">
            {t('這份菜單的評鑑紀錄', 'Reviews on this menu')}
          </h2>
        </header>

        <div className="stamps-row">
          {AWARDS.map(award => (
            <div
              key={award.en}
              className="honor-stamp"
              data-rot={award.rot}
              style={{ '--stamp-rot': `${award.rot}deg` }}
            >
              <div className="honor-stamp__inner">
                <span className="honor-stamp__deco">✦  ✦  ✦</span>
                <p className="honor-stamp__title">{t(award.zh, award.en)}</p>
                <span className="honor-stamp__rule" aria-hidden="true" />
                <p className="honor-stamp__sub">{t(award.subZh, award.subEn)}</p>
                <span className="honor-stamp__deco">✦  ✦  ✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}