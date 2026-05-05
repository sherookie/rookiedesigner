import Highlighter from '../components/Highlighter'
import Slider from '../components/Slider'
import BookPlayer from '../components/BookPlayer'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

// 共用：滾入視野時觸發 .is-visible 的小 hook
function useRevealOnView() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const targets = containerRef.current.querySelectorAll('.pro-vision-section')
    if (targets.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return containerRef
}

// ── MULTiFLY ──────────────────────────────────────────────────────────────
const MULTIFLY_SLIDER_IMAGES = [
  'images/works/butterfly/exhibition_C.jpg',
  'images/works/butterfly/exhibition_D.jpg',
  'images/works/butterfly/exhibition_E.jpg',
  'images/works/butterfly/exhibition_F.jpg',
  'images/works/butterfly/exhibition_G.jpg',
  'images/works/butterfly/exhibition_H.jpg',
  'images/works/butterfly/exhibition_I.jpg',
  'images/works/butterfly/exhibition_J.jpg',
]

function MultiFlyDetail({ t }) {

  //  1. 建立一個 Ref 來抓取這個按鈕
  const btnRef = useRef(null)
  const flowRef = useRevealOnView()

  //  2. 寫入磁吸滑鼠移動邏輯
    const onMouseMove = (e) => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch || !btnRef.current) return

    const btn = btnRef.current
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const strength = 0.2 // 磁吸強度

    gsap.to(btn, {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
      duration: 0.35, ease: 'power2.out', overwrite: 'auto'
    })
  }

  //  3. 寫入滑鼠離開時的彈回邏輯
  const onMouseLeave = () => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, { 
      x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' 
    })
  }
  // 4. 數字遞增動畫（進入視野才觸發，且只跑一次）
  const stat1Ref = useRef(null)
  const stat2Ref = useRef(null)

  useEffect(() => {
    const targets = [
      { el: stat1Ref.current, value: 99.4 },
      { el: stat2Ref.current, value: 73.5 },
    ].filter(t => t.el)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = targets.find(t => t.el === entry.target)
          if (!target) return
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target.value,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              entry.target.textContent = obj.v.toFixed(1)
            },
          })
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.4 }
    )

    targets.forEach(t => io.observe(t.el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">MULTiFLY</h2>
        <div className="pro-meta">2023.06 – 2024.05 / Tech Stack: AE, PS, PR, Midjourney</div>
      </header>

      <div className="pro-content-flow" ref={flowRef}>
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <p className="pro-intro">
              {/* 螢光筆效果：.text-highlight 替換為 <Highlighter> SVG 組件 */}
              <Highlighter color="#f7d04e">
                <span className="pro-serif-quote">
                  {t('「人人都像蝴蝶般獨特而美麗」', 'Everyone is as unique and beautiful as a butterfly')}
                </span>
              </Highlighter>
              {t('。', '. ')}<br />
              {t(
                '旨在為大眾提供皮膚問題的不同視角，讓體驗者了解身體上的皮膚斑紋。',
                'Aiming to provide different perspectives on skin conditions and promote skin diversity.'
              )}
            </p>
          </div>
          <div className="pro-intro-visual">
            <img
              src="images/works/butterfly/exhibition_B.jpg"
              alt="Concept Visual"
              className="pro-intro-img"
            />
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">
              {t('計畫願景與數位轉譯', 'Project Vision & Digital Translation')}
            </span>
            <p className="pro-body-emphasize">
              {t(
                '透過測驗結合生成式 AI，使體驗者身體上的斑紋能夠轉化為獨特且美麗的形式。此外，我們與基金會以及內部醫師合作，將最準確的醫學知識及資訊融入在體驗的過程中，希望能透過文案、活動以及周邊來募集資金，以協助合作對象提升醫療質量以及患者的治癒動機。',
                'By integrating quizzes with Generative AI, skin marks are transformed into unique and beautiful forms. Collaborating with foundations and medical professionals, we weave accurate medical insights into the experience, aiming to raise funds through copywriting, activities, and merchandise to improve medical quality and enhance patient motivation for recovery.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
        <div className="pro-section">
          <span className="pro-label">{t('我的角色', 'My Role')}</span>
          <p className="pro-body-emphasize">
            {t(
              '負責 AI 圖像生成的 Prompt 設計與風格調校、體驗流程的動畫視覺設計，以及 Showreel 的動態剪輯，並協助展場觀眾互動測試。',
              'Owned the AI prompt design and visual styling, animation visual design of the experience-flow, and the Showreel motion editing — also iterating on-site with audience feedback during the exhibition run.'
            )}
          </p>
        </div>
      </div>

        <div>
          <span className="pro-label">{t('展場實錄', 'Exhibition Gallery')}</span>
          <Slider images={MULTIFLY_SLIDER_IMAGES} />
        </div>

        <div className="pro-block">
          <span className="pro-label">{t('Showreel 製作', 'Showreel Production')}</span>
          <video
            controls
            playsInline
            className="pro-video-main"
          >
          {/* 優先讀取 WebM */}
          <source src="images/works/butterfly/Showreel.webm" type="video/webm" />
          
          {/* 如果不支援則讀取 MP4 */}
          <source src="images/works/butterfly/Showreel.mp4" type="video/mp4" />
          
          您的瀏覽器不支援影片播放。
          </video>
          <div className="pro-caption-box">
            <p>
              {t(
                '影片開頭通過受訪者的真實言論，強化我們選擇這個主題的意義和社會價值，隨後以清晰的視覺表現和流暢的敘事，逐一介紹網站的核心內容和使用者體驗。',
                'The video begins with interviews to reinforce social value, followed by clear visuals and narrative to introduce the core website experience.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
        <div className="pro-section">
          <span className="pro-label">{t('成效驗證', 'Impact & Validation')}</span>
          <p className="pro-body-emphasize" style={{ marginBottom: '1.75rem' }}>
            {t(
              '展後我們對體驗者進行問卷調查，回收的數據驗證了專案的核心目標已被達成——不僅成功傳遞醫學知識，更促成觀者對皮膚多樣性的態度轉變。',
              'A post-exhibition survey validated that the core goals were met — successfully delivering medical insight and shifting visitors\' attitudes toward skin diversity.'
            )}
          </p>

          <div className="pro-impact-grid" role="list">
            <article className="pro-impact-card" role="listitem">
              <div className="pro-impact-figure" aria-label="99.4 percent">
                <span className="pro-impact-num" ref={stat1Ref}>0.0</span>
                <span className="pro-impact-unit" aria-hidden="true">%</span>
              </div>
              <h4 className="pro-impact-title">
                {t('更了解皮膚斑紋相關知識', 'Gained knowledge about skin marks')}
              </h4>
              <p className="pro-impact-desc">
                {t(
                  '幾乎每位體驗者對皮膚斑紋的相關知識皆有所增長，達成「提升大眾對皮膚斑紋認知」的初始目標。',
                  'Nearly every participant reported increased understanding, fulfilling our goal of raising public awareness about skin marks.'
                )}
              </p>
            </article>

            <article className="pro-impact-card" role="listitem">
              <div className="pro-impact-figure" aria-label="73.5 percent">
                <span className="pro-impact-num" ref={stat2Ref}>0.0</span>
                <span className="pro-impact-unit" aria-hidden="true">%</span>
              </div>
              <h4 className="pro-impact-title">
                {t('能以欣賞角度看待自己與他人的皮膚', 'Appreciate skin in self & in others')}
              </h4>
              <p className="pro-impact-desc">
                {t(
                  '多數參與者非常認同能以欣賞的角度看待每個人的皮膚，呼應我們「尊重皮膚多樣性」的核心訴求。',
                  'A strong majority agreed they could view skin with appreciation — echoing our advocacy for skin diversity.'
                )}
              </p>
            </article>
          </div>

          <p className="pro-impact-source">
            {t('資料來源｜MULTiFLY 展後體驗者問卷調查', 'Source — MULTiFLY Post-Exhibition Audience Survey')}
          </p>
        </div>
      </div>

        <div className="pro-cta-center">
            <a
              ref={btnRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              href="https://www.instagram.com/multiflyskin?igsh=ZXV2cWhyMm5udGg%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="pro-launch-btn"
            >
              {t('Instagram @Multifly', 'Instagram')} ↗
            </a>
          </div>
      </div>
    </div>
  )
}

const EatBugs_SLIDER_IMAGES = [
  'images/works/eatbugs/bug_G.jpg',
  'images/works/eatbugs/bug_H.jpg',
  'images/works/eatbugs/bug_I.jpg',
  'images/works/eatbugs/bug_E.jpg',
]
// ── 蟲蟲探險隊 EATBUGS ────────────────────────────────────────
function EatBugsDetail({ t }) {
  const flowRef = useRevealOnView()
  const btnRef = useRef(null)
  const stat1Ref = useRef(null)
  const stat2Ref = useRef(null)
  const stat3Ref = useRef(null)

  // 磁吸按鈕
  const onMouseMove = (e) => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch || !btnRef.current) return
    const btn = btnRef.current
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    gsap.to(btn, {
      x: (e.clientX - cx) * 0.2,
      y: (e.clientY - cy) * 0.2,
      duration: 0.35, ease: 'power2.out', overwrite: 'auto'
    })
  }
  const onMouseLeave = () => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, {
      x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)', overwrite: 'auto'
    })
  }

  // 三組數字滾動進場
  useEffect(() => {
    const targets = [
      { el: stat1Ref.current, value: 70 },
      { el: stat2Ref.current, value: 65 },
      { el: stat3Ref.current, value: 40 },
    ].filter(t => t.el)
    if (targets.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = targets.find(t => t.el === entry.target)
          if (!target) return
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target.value, duration: 2, ease: 'power3.out',
            onUpdate: () => { entry.target.textContent = Math.round(obj.v) },
          })
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.4 }
    )
    targets.forEach(t => io.observe(t.el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">{t('蟲蟲探險隊', 'EATBUGS')}</h2>
        <div className="pro-meta">2023.04 – 2023.07 / Tech Stack: PS, AI, PR, IG</div>
      </header>

      <div className="pro-content-flow" ref={flowRef}>
        {/* Intro */}
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <p className="pro-intro">
              <Highlighter color="#f7d04e">
                <span className="pro-serif-quote">
                  {t('「吃蟲，是地球的解方之一」', 'Eating bugs may be one of the answers for our planet')}
                </span>
              </Highlighter>
              {t('。', '. ')}<br />
              {t(
                '蟲蟲是聯合國認證的永續食材——高蛋白、低碳排、營養匹敵牛雞豬羊。但在大眾眼中，牠們仍披著一層恐懼的外衣。我們透過 IG 內容行銷，重新介紹這個被誤解的食材。',
                'Insects are a UN-recognised sustainable protein — high in nutrients, low in carbon, nutritionally rivalling beef, chicken, and pork. Yet to most people, they still wear a coat of fear. We rebuilt the conversation through Instagram content marketing.'
              )}
            </p>
          </div>
          <div className="pro-intro-visual">
            <img
              src="images/works/eatbugs/bug_D.jpg"
              alt="EATBUGS IG mockup"
              className="pro-intro-img"
            />
          </div>
        </div>

        {/* My Role */}
        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('我的角色', 'My Role')}</span>
            <p className="pro-body-emphasize">
              {t(
                'IG 內容企劃與貼文視覺製作、影片拍攝後製，以及整體專案的概念發想與敘事節奏設計。',
                'Content strategy and visual production for the Instagram series, video shooting and post-production, plus the overall concept design and narrative pacing.'
              )}
            </p>
          </div>
        </div>

        {/* Project Vision */}
        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('企劃脈絡', 'Project Vision')}</span>
            <p className="pro-body-emphasize">
              {t(
                '我們發現大眾對食用昆蟲的抗拒主要來自「外觀」而非「味道」。整個內容企劃因此以「教育 → 研究 → 定位」三階段展開——從破除迷思開始，透過問卷數據找到行為轉折點，最終鎖定低卡飲食族群為核心受眾，將昆蟲重新定位為調味料形式進入日常飲食。',
                'We found that public resistance to eating insects stems mainly from appearance, not taste. The campaign unfolded across three phases — education, research, and positioning. Starting with myth-busting, moving through survey-driven behavioural insights, and finally targeting low-calorie dieters as the core audience, repositioning insects as a seasoning that fits into everyday meals.'
              )}
            </p>
          </div>
        </div>

        {/* Episode Timeline */}
        <div>
          <span className="pro-label">{t('三集企劃', 'The Three Episodes')}</span>
          <div className="pro-episode-grid" role="list">
            <article className="pro-episode-card" role="listitem">
              <span className="pro-episode-num">EP.01</span>
              <h4 className="pro-episode-title">{t('計畫開始', 'Launch')}</h4>
              <p className="pro-episode-desc">
                {t(
                  '從昆蟲的營養、低碳排與永續價值切入，破除「噁心」的第一道心理牆。',
                  'Open with insects\' nutrition, low carbon footprint, and sustainability — chipping away at the first wall of disgust.'
                )}
              </p>
            </article>
            <article className="pro-episode-card" role="listitem">
              <span className="pro-episode-num">EP.02</span>
              <h4 className="pro-episode-title">{t('研究數據', 'Research')}</h4>
              <p className="pro-episode-desc">
                {t(
                  '230 人問卷揭露關鍵洞察——抗拒主要來自「形體」，去蟲化後接受度大幅躍升。',
                  'A 230-person survey reveals the key insight — resistance hinges on form. De-formed, acceptance jumps sharply.'
                )}
              </p>
            </article>
            <article className="pro-episode-card" role="listitem">
              <span className="pro-episode-num">EP.03</span>
              <h4 className="pro-episode-title">{t('鎖定受眾', 'Targeting')}</h4>
              <p className="pro-episode-desc">
                {t(
                  '把昆蟲重新定位為「低卡調味料」，精準對接健康飲食族群的痛點。',
                  'Repositioned insects as low-calorie seasoning, plugging directly into the pain points of health-conscious eaters.'
                )}
              </p>
            </article>
          </div>
        </div>

        {/* Key Findings */}
        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('關鍵發現', 'Key Findings')}</span>
            <p className="pro-body-emphasize" style={{ marginBottom: '1.75rem' }}>
              {t(
                '我們在 230 人問卷中找到三個重要的行為訊號，成為整個企劃的策略依據。',
                'Three behavioural signals from a 230-person survey shaped the entire campaign strategy.'
              )}
            </p>
            <div className="pro-impact-grid" role="list">
              <article className="pro-impact-card" role="listitem">
                <div className="pro-impact-figure" aria-label="70 percent">
                  <span className="pro-impact-num" ref={stat1Ref}>0</span>
                  <span className="pro-impact-unit" aria-hidden="true">%</span>
                </div>
                <h4 className="pro-impact-title">
                  {t('對食用昆蟲存有疑慮', 'Hesitant about edible insects')}
                </h4>
                <p className="pro-impact-desc">
                  {t(
                    '230 名受訪者中，多數表達「不熟悉」或「健康疑慮」是抗拒的主因。',
                    'Most of 230 respondents cited unfamiliarity or health concerns as the main reasons for resistance.'
                  )}
                </p>
              </article>

              <article className="pro-impact-card" role="listitem">
                <div className="pro-impact-figure" aria-label="65 percent acceptance lift">
                  <span className="pro-impact-num" ref={stat2Ref}>0</span>
                  <span className="pro-impact-unit" aria-hidden="true">%</span>
                </div>
                <h4 className="pro-impact-title">
                  {t('「去蟲化」後接受度提升幅度', 'Acceptance lift after de-forming')}
                </h4>
                <p className="pro-impact-desc">
                  {t(
                    '當昆蟲以粉狀、加工形式呈現，能接受食用的受訪比例大幅提升。',
                    'When insects are presented in powdered or processed form, willingness to eat them rises sharply.'
                  )}
                </p>
              </article>

              <article className="pro-impact-card" role="listitem">
                <div className="pro-impact-figure" aria-label="40 percent">
                  <span className="pro-impact-num" ref={stat3Ref}>0</span>
                  <span className="pro-impact-unit" aria-hidden="true">%</span>
                </div>
                <h4 className="pro-impact-title">
                  {t('偏好昆蟲調味料形式', 'Prefer insect seasoning')}
                </h4>
                <p className="pro-impact-desc">
                  {t(
                    '在餅乾、能量棒、調味料三選一中，多數受訪者選擇調味料，成為產品定位依據。',
                    'When given a choice of biscuits, energy bars, or seasonings, most chose seasonings — anchoring our product direction.'
                  )}
                </p>
              </article>
            </div>
          </div>
        </div>

        <div>
          <span className="pro-label">{t('內容呈現', 'Content Showcase')}</span>
          <Slider images={EatBugs_SLIDER_IMAGES} />
        </div>

        {/* Behind the Scenes */}
        <div className="pro-block">
          <span className="pro-label">{t('幕後紀錄', 'Behind the Scenes')}</span>
          <div className="pro-behind-grid">
            <img
              src="images/works/eatbugs/bug_B.jpg"
              alt="On-site survey & taste test"
              className="pro-behind-img"
            />
            <img
              src="images/works/eatbugs/bug_C.jpg"
              alt="Cooking shoot"
              className="pro-behind-img"
            />
          </div>
          <div className="pro-caption-box">
            <p>
              {t(
                '從現場試吃問卷、訪談錄製到產品料理拍攝——數據是企劃的骨架，而每一張貼文背後都需要真實的體驗作為養分。',
                'From on-site taste tests and interview recording to product cooking shoots — data formed the campaign\'s skeleton, but every post drew its substance from lived experience.'
              )}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="pro-cta-center">
          
           <a ref={btnRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            href="https://www.instagram.com/eatbugs_/"
            target="_blank"
            rel="noreferrer"
            className="pro-launch-btn"
          >
            Instagram @eatbugs_ ↗
          </a>
        </div>
      </div>
    </div>
  )
}

// ── 富邦人壽 ───────────────────────────────────────────────────────────────
function FubonDetail({ t }) {
  const flowRef = useRevealOnView()
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">
          {t('富邦人壽整合行銷', 'Fubon Life Integrated Marketing')}
        </h2>
        <div className="pro-meta">2023.07 – 2024.07 / Tech Stack: AE, PS, PR, AI</div>
      </header>
      
     <div className="pro-content-flow" ref={flowRef}>
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <div className="pro-section">
              <p className="pro-intro-text">
                {t(
                  '為金融商品做翻譯——把保單條款與遺產稅階梯從艱澀文字，重塑成一支支可被理解的動態圖示。',
                  'Translating finance into motion — rewriting dense policy clauses and estate-tax tiers into animations a viewer can grasp in seconds.'
                )}
              </p>
            </div>
          </div>
          <div className="pro-intro-visual">
            <img
              src="images/works/fubon/fubon_A.png"
              alt="Fubon Visual"
              className="pro-intro-img"
              style={{ borderRadius: '4px' }}
            />
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('挑戰', 'The Challenge')}</span>
            <p className="pro-body-emphasize">
              {t(
                '保險與稅務內容的資訊密度高、術語門檻陡。理財顧問需要在 LINE 對話視窗有限的滑動範圍內，讓客戶在 30 秒內看懂一個複雜概念——這是動畫設計真正的考題。',
                'Insurance and tax content is jargon-heavy by nature. Advisors needed clients to understand a complex concept within 30 seconds inside a LINE chat — that constraint became the real design brief.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('我的解法', 'My Approach')}</span>
            <p className="pro-body-emphasize">
              {t(
                '把每個條款拆解為 3–5 秒的視覺節拍，以動態圖示替代純文字、以節奏控制資訊流。例如將「遺產稅階梯計算」轉譯為一支 90 秒可在客戶說明會開場使用的 Motion Graphics。',
                'I broke each clause into 3- to 5-second visual beats, replacing text with motion icons paced for comprehension. The estate-tax tier calculation, for example, became a 90-second Motion Graphic used to open client meetings.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('產出', 'Output')}</span>
            <p className="pro-body-emphasize">
              {t(
                '動畫被內部理財顧問實際採用為客戶說明會的開場素材，為一年內 LINE@ 官方帳號累積產出的多支主題影片之一。',
                'Adopted by in-house advisors as briefing material for client sessions, alongside a year of themed videos produced for the official LINE@ account.'
              )}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

// ── 雪莉與 Rookie ──────────────────────────────────────────────────────────
const STORYBOOK_PAGES = [
  'images/works/storybook/page_1.png',
  'images/works/storybook/page_2.png',
  'images/works/storybook/page_3.png',
  'images/works/storybook/page_4.png',
  'images/works/storybook/page_5.png',
  'images/works/storybook/page_6.png',
  'images/works/storybook/page_7.png',
  'images/works/storybook/page_8.png',
  'images/works/storybook/page_9.png',
  'images/works/storybook/page_10.png',
  'images/works/storybook/page_11.png',
  'images/works/storybook/page_12.png',
  'images/works/storybook/page_13.png',
  'images/works/storybook/page_14.png',
  'images/works/storybook/page_15.png',
  'images/works/storybook/page_16.png',
  'images/works/storybook/page_17.png',
  'images/works/storybook/page_18.png',
  'images/works/storybook/page_19.png',
  'images/works/storybook/page_20.png',
  'images/works/storybook/page_21.png',
  'images/works/storybook/page_22.png',
  'images/works/storybook/page_23.png',
  'images/works/storybook/page_24.png',
  'images/works/storybook/page_25.png',
  'images/works/storybook/page_26.png',
  'images/works/storybook/page_27.png',
  'images/works/storybook/page_28.png',
  'images/works/storybook/page_29.png',
  'images/works/storybook/page_30.png',
  'images/works/storybook/page_31.png',
  'images/works/storybook/page_32.png',
  'images/works/storybook/page_33.png',
  'images/works/storybook/page_34.png',
  'images/works/storybook/page_35.png',
  'images/works/storybook/page_36.png',
  'images/works/storybook/page_37.png',
  'images/works/storybook/page_38.png',
]

function StorybookDetail({ t }) {
  const flowRef = useRevealOnView()
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">
          {t('雪莉與 Rookie 繪本', 'Sherry & Rookie Picture Book')}
        </h2>
        <div className="pro-meta">2024.08 / Tools: Procreate, InDesign</div>
      </header>

      <div className='pro-content-flow' ref={flowRef}>
        <div className='pro-intro-split'>
          <div className='pro-intro-text'>
            <div className='pro-section'>
              <p className='pro-intro-text'>
                {t(
                  '一本獻給家中靈犬 Rookie 的小繪本——把牠搶襪子、追陽光、對著電風扇發呆的瞬間，重新編織為牠擁有自己幻想宇宙的故事。',
                  'A picture book for Rookie, our family dog. Everyday moments — stealing socks, chasing sunbeams, zoning out in front of a fan — reimagined as scenes from his own private fantasy universe.'
                )}
              </p>
            </div>
          </div>
          
          <div className="pro-intro-visual">
            <img
            src="images/works/storybook/storybook_B.png"
            alt=""
            style={{ width: '100%', borderRadius: '4px' }}
          />
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('創作起點', 'Why')}</span>
            <p className="pro-body-emphasize">
              {t(
                '想練習把日常觀察轉譯為角色與場景敘事，於是從最熟悉的對象開始——以 Rookie 為原型，反覆觀察牠的肢體語言與性格特徵，再放大為一個完整的奇想世界。',
                'I wanted to practise translating daily observation into character-driven narrative, and started with the subject I knew best. Rookie became the prototype — his body language and quirks studied, then scaled into a full imaginative world.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('創作流程', 'Process')}</span>
            <p className="pro-body-emphasize">
              {t(
                '從角色設定、分鏡草圖到 Procreate 完稿，共經歷 38 頁。',
                '38 pages of iteration — character sheets, storyboard thumbnails.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-block">
          <span className="pro-label">
            {t('繪本（拖曳邊角翻頁）', 'Picture Book (Interactive Book)')}
          </span>
          <div className="issuu-container">
          <BookPlayer pages={STORYBOOK_PAGES} />
          </div>
          <div className="pro-caption-box">
            <p>
              {t(
                '38 個畫面各自描繪一個迷人場景：穿越雲朵的飛行、漫步神秘森林、與星星對話——每一頁都希望讀者能感受到 Rookie 眼中世界的色彩與活力。',
                'Each of the 38 spreads captures one captivating scene — flights through clouds, wanders through mysterious forests, conversations with stars. Every page reaches for the colour and aliveness of the world as Rookie sees it.'
              )}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

// ── 捕碳高手 ───────────────────────────────────────────────────────────────
function CarbonDetail({ t }) {
  const flowRef = useRevealOnView()
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">
          {t('捕碳高手科普動畫', 'Carbon Capture Animation')}
        </h2>
        <div className="pro-meta">2023.09 – 2023.10 / AE, PR, AI</div>
      </header>

      <div className='pro-content-flow' ref={flowRef}>
        <div className='pro-intro-split'>
          <div className='pro-intro-text'>
            <div className='pro-section'>
              <p className='pro-intro-text'>
                {t(
                  '為國立科學工藝博物館製作的科普動畫——把「碳捕捉與封存」這個抽象議題，轉譯為兒童與成人都能直覺理解的視覺敘事。',
                  'A science-communication animation for the National Science and Technology Museum, translating carbon capture and storage — an inherently abstract topic — into a visual narrative both kids and adults can follow.'
                )}
              </p>
            </div>
          </div>
          <div className="pro-intro-visual">
            <img
            src="images/works/C/C_B.png"
            alt=""
            style={{ width: '100%', borderRadius: '4px' }}
          />
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('合作模式', 'Engagement Model')}</span>
              <p className="pro-body-emphasize">
                {t(
                  '此案由合作公司承接國立科學工藝博物館的科普動畫委託，我以外部動畫製作方加入——腳本與素材由公司方完成定稿後交付，我據此產出最終動畫成品。',
                  'A subcontracted role on a commission held by the lead studio for the National Science and Technology Museum. Scripts and source assets were finalised upstream and handed off to me — my job was producing the final animation from that brief.'
                )}
              </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('我的角色', 'My Role')}</span>
            <p className="pro-body-emphasize">
              {t(
                '動畫腳本、Motion Graphics 設計、剪輯，以及團隊內素材回收與排程管理。',
                'Animation script, motion graphics, editing — plus internal asset management and production scheduling.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('我的收穫', 'Takeaway')}</span>
            <p className="pro-body-emphasize">
              {t(
                '學會在「下游製作方」的位置上用最少的修改回合精準對齊上游需求——當你不擁有腳本決策權，動畫師的核心能力反而是把抽象的編輯回饋翻譯為可執行的視覺判斷。',
                'Learning how to deliver — from a downstream production seat — with the fewest possible revision rounds. When you don\'t own script decisions, the animator\'s real edge is translating abstract editorial feedback into executable visual choices.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-block">
          <span className="pro-label">{t('捕碳高手', 'Carbon Capture')}</span>
          <video 
            controls
            playsInline
            className="pro-video-main"
  
            style={{ width: '100%', borderRadius: '4px', marginBottom: '1rem' }}
          >
            {/* 優先讀取 WebM */}
          <source src="/images/works/C/Cvideo.webm" type="video/webm" />
          
          {/* 如果不支援則讀取 MP4 */}
          <source src="images/works/C/Cvideo.mp4" type="video/mp4" />
          
          您的瀏覽器不支援影片播放。
          </video>
        </div>
      </div>
    </div>
  )
}

// ── 因材網教學動畫 ──────────────────────────────────────────────────────────
function AdaptiveLearningDetail({ t }) {
  const flowRef = useRevealOnView()
  return (

    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title pro-title-inline">
          <img
            src="images/works/adapativelearning/adapativelearning_logo.png"
            className="pro-inline-logo"
            alt="Logo"
          />
          {t('因材網教學動畫', 'MOE E-Learning Animations')}
        </h2>
        <div className="pro-meta">2022.11 – 2023.01 / Tools: AE, PR</div>
      </header>
      
      <div className="pro-content-flow" ref={flowRef}>
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <div className="pro-section">
              <p className="pro-intro-text">
                {t(
                  '為教育部「因材網」平台製作數位動畫教材，優化遠距學習情境下的學生體驗。',
                  'Digital animation modules for the Ministry of Education\'s Adaptive Learning Network, designed to support remote learning in junior-high classrooms.'
                )}
              </p>
            </div>
          </div>
          <div className="pro-intro-visual">
            <img
            src="images/works/adapativelearning/adapativelearning_B.png"
            alt=""
            style={{ width: '100%', borderRadius: '4px' }}
          />
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('跨域共備', 'Collaboration')}</span>
            <p className="pro-body-emphasize">
              {t(
                '與國中表演藝術科教師深度共備教案，把抽象的劇場語彙拆解為視覺步驟。我負責動畫設計、剪輯，確保內容兼具教學邏輯與視覺節奏。',
                'Built lesson plans together with junior-high performing-arts teachers, breaking abstract theatrical vocabulary into visual steps. I owned the motion design, editing — making sure each piece carried both pedagogical logic and visual rhythm.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('成果與收穫', 'Outcome & Takeaway')}</span>
            <p className="pro-body-emphasize">
              {t(
                '動畫成品上架於教育部因材網，作為全國國中表演藝術科教師的遠距教學素材。與第一線教師共備的過程也讓我意識到：動畫設計師的工作不只是「把內容做好看」，而是必須先理解「課堂節奏」與「學生注意力曲線」，再讓視覺去服務教學。',
                'Published on the official Adaptive Learning Network and distributed nationwide as remote-teaching material. Co-designing with frontline teachers also reframed the work for me — animation isn\'t just making content look good; it\'s understanding classroom pacing and student attention first, then letting visuals serve the lesson.'
              )}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── 空襲 Air Raid ──────────────────────────────────────────────────────────
const AirRaid_SLIDER_IMAGES = [
  'images/works/interactivebook/page_2.png',
  'images/works/interactivebook/page_3.png',
  'images/works/interactivebook/page_4.png',
  'images/works/interactivebook/page_5.png',
]

function AirRaidDetail({ t }) {
  //  1. 建立一個 Ref 來抓取這個按鈕
  const btnRef = useRef(null)
  const flowRef = useRevealOnView()
  //  2. 寫入磁吸滑鼠移動邏輯
  const onMouseMove = (e) => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch || !btnRef.current) return

    const btn = btnRef.current
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const strength = 0.2 // 磁吸強度

    gsap.to(btn, {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
      duration: 0.35, ease: 'power2.out', overwrite: 'auto'
    })
  }

  //  3. 寫入滑鼠離開時的彈回邏輯
  const onMouseLeave = () => {
    if (!btnRef.current) return
    gsap.to(btnRef.current, { 
      x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' 
    })
  }
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">{t('空襲', 'Air Raid Interactive Book')}</h2>
        <div className="pro-meta">2023.03 / Tech Stack: HTML, CSS, JS, Kaiber</div>
      </header>

       <div className="pro-content-flow" ref={flowRef}>
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <p className="pro-intro">
              {t(
              '將詩人鯨向海的文字化為一本互動電子書。',
              'Transforming poet Jing Xiang-hai\'s words into an interactive e-book.'
            )}
            </p>
          </div>
          <div className="pro-intro-visual">
            <img
              src='images/works/interactivebook/page_1.png'
              alt="Concept Visual"
              className="pro-intro-img"
            />
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">
              {t('技術轉譯', 'Digital Translation')}
            </span>
            <p className="pro-body-emphasize">
              {t(
                '運用網頁前端技術重塑物理手感——透過將文本轉譯與埋設於特定座標的音景觸發，讓讀者主動掀開詩的下一層隱喻。',
                'Front-end techniques used to rebuild a sense of physical tactility — text translation paired with coordinate-anchored soundscapes invite readers to actively peel back each new metaphor.'
              )}
            </p>
          </div>
        </div>

        <div className="pro-vision-section">
          <div className="pro-section">
            <span className="pro-label">{t('我的角色', 'My Role')}</span>
            <p className="pro-body-emphasize">
              {t(
                '全站前端開發（HTML / CSS / JS），以及 Kaiber AI 動態素材生成；文本選編由合作對象共同完成。',
                'Full-site front-end (HTML / CSS / JS), plus AI motion assets generated with Kaiber. Text curation handled in collaboration.'
              )}
            </p>
          </div>
        </div>

        <div>
          <span className="pro-label">{t('繪本', 'Exhibition Gallery')}</span>
          <Slider images={AirRaid_SLIDER_IMAGES} />
          <div className="pro-cta-center">
            <a
              ref={btnRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              href="https://sherookie.github.io/Book/"
              target="_blank"
              rel="noreferrer"
              className="pro-launch-btn"
            >
              {t('進入體驗', 'Launch Experience')} ↗
            </a>
          </div>
        </div>
        </div>
      </div>               
      
  )
}

// ── Master project list ─────────────────────────────────────────────────────
// Each project maps to a card in the bento grid.
// `Detail` receives `{ t }` from ProjectModal so it can localise text.
export const projects = [
  {
    id: 'multifly',
    category: 'Interactive',
    wide: true,
    plateColor: '#e85d26',
    cardImg: 'images/works/butterfly/exhibition_A.jpg',
    cardImgAlt: 'MULTiFLY',
    nameZh: 'MULTiFLY',
    nameEn: 'MULTiFLY',
    subZh: '支持皮膚多樣性｜AI 生成互動專案',
    subEn: 'Skin Diversity x AI Interactive',
    chips: [
      { zh: '互動裝置', en: 'Installation' },
      { zh: 'AI生成',  en: 'AI Prompt' },
    ],
    Detail: MultiFlyDetail,
  },
  /*{
    id: 'eatbugs',
    category: 'Marketing',
    wide: true,
    plateColor: '#f7d04e',
    cardImg: 'images/works/eatbugs/bug_A.png',
    cardImgAlt: 'EATBUGS',
    nameZh: '蟲蟲探險隊',
    nameEn: 'EATBUGS',
    subZh: '永續食材 IG 內容行銷',
    subEn: 'Sustainable Food IG Campaign',
    chips: [
      { zh: 'IG 行銷', en: 'IG Marketing' },
      { zh: '內容企劃', en: 'Content Strategy' },
    ],
    Detail: EatBugsDetail,
  },*/
  {
    id: 'fubon',
    category: 'Design',
    wide: false,
    plateColor: '#50b3f9',
    cardImg: 'images/works/fubon/fubon_A.png',
    cardImgAlt: 'Fubon',
    nameZh: '金融保單教學動畫',
    nameEn: 'Instructional Motion Graphics for Insurance Policies',
    subZh: '整合行銷與數位內容',
    subEn: 'Integrated Marketing',
    chips: [
      { zh: '動態設計', en: 'Motion Graphics' },
      { zh: '資訊轉譯', en: 'Info Design' },
    ],
    Detail: FubonDetail,
  },
  {
    id: 'storybook',
    category: 'Illustration',
    wide: false,
    plateColor: '#009b8d',
    cardImg: 'images/works/storybook/storybook_A.jpg',
    cardImgAlt: 'Book',
    nameZh: '雪莉與 Rookie',
    nameEn: 'Sherry & Rookie',
    subZh: '個人原創繪本',
    subEn: 'Original Picture Book',
    chips: [
      { zh: '插畫設計', en: 'Illustration' },
      { zh: '角色設定', en: 'Character Design' },
    ],
    Detail: StorybookDetail,
  },
  {
    id: 'carbon',
    category: 'Animation',
    wide: true,
    plateColor: '#f4a7b0',
    cardImg: 'images/works/C/C_A.png',
    cardImgAlt: 'Carbon',
    nameZh: '捕碳高手',
    nameEn: 'Carbon Capture',
    subZh: '科工館科普動畫製作',
    subEn: 'NSTM Science Animation',
    chips: [
      { zh: '動態設計', en: 'Motion Graphics' },
      { zh: '進度管理', en: 'Self-Scheduling' },
    ],
    Detail: CarbonDetail,
  },
  {
    id: 'adaptive',
    category: 'Animation',
    wide: true,
    plateColor: '#c8e6a0',
    cardImg: 'images/works/adapativelearning/adapativelearning_A.jpg',
    cardImgAlt: 'MOE',
    nameZh: '因材網教學動畫',
    nameEn: 'E-Learning',
    subZh: '教育部表演藝術教材製作',
    subEn: 'Arts Curriculum Animation',
    chips: [{ zh: '數位教材', en: 'E-Learning' }],
    Detail: AdaptiveLearningDetail,
  },
  {
    id: 'airraid',
    category: 'Interactive',
    wide: false,
    plateColor: '#1a1a18',
    cardImg: 'images/works/interactivebook/interactivebook_A.jpg',
    cardImgAlt: 'Air Raid',
    nameZh: '鯨向海《空襲》',
    nameEn: 'Air Raid',
    subZh: '文學跨界 × 數位轉譯',
    subEn: 'Literary Crossover × Web Interactive',
    chips: [
      { zh: 'AI 轉譯',  en: 'AI Translation' },
      { zh: '互動設計', en: 'Interaction' },
    ],
    Detail: AirRaidDetail,
  },
]
