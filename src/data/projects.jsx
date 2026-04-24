import Highlighter from '../components/Highlighter'
import Slider from '../components/Slider'
import BookPlayer from '../components/BookPlayer'
import { useRef } from 'react'
import gsap from 'gsap'
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
        <h2 className="pro-title">MULTiFLY</h2>
        <div className="pro-meta">2023.06 – 2024.05 / Tech Stack: AE, PS, PR, Midjourney</div>
      </header>

      <div className="pro-content-flow">
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <p className="pro-intro">
              {/* ✨ 螢光筆效果：.text-highlight 替換為 <Highlighter> SVG 組件 */}
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

        <div>
          <span className="pro-label">{t('展場實錄', 'Exhibition Gallery')}</span>
          <Slider images={MULTIFLY_SLIDER_IMAGES} />
        </div>

        <div className="pro-block">
          <span className="pro-label">{t('Showreel 製作', 'Showreel Production')}</span>
          <iframe className="pro-video-main" width="960" height="540" src="https://www.youtube-nocookie.com/embed/Mo8MS3R_JCs?si=kgoLMUNo5NChvjGz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          
          <div className="pro-caption-box">
            <p>
              {t(
                '影片開頭通過受訪者的真實言論，強化我們選擇這個主題的意義和社會價值，隨後以清晰的視覺表現和流暢的敘事，逐一介紹網站的核心內容和使用者體驗。',
                'The video begins with interviews to reinforce social value, followed by clear visuals and narrative to introduce the core website experience.'
              )}
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
              {t('Instagram 行銷', 'Instagram')} ↗
            </a>
          </div>
      </div>
    </div>
  )
}

// ── 富邦人壽 ───────────────────────────────────────────────────────────────
function FubonDetail({ t }) {
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">
          {t('富邦人壽整合行銷', 'Fubon Life Integrated Marketing')}
        </h2>
        <div className="pro-meta">2023.07 – 2024.07 / Tech Stack: AE, PS, PR, AI</div>
      </header>
      
      <div className="pro-content-flow">
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <div className="pro-section">
              <p className="pro-intro-text">
                {t(
                  '在不同領域之間建立橋樑，將設計和創意引入金融環境中。',
                  'Bridging two different fields by bringing design and creativity into a corporate financial environment.'
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
            <span className="pro-label">{t('負責項目', 'Responsibilities')}</span>
            <p className="pro-body-emphasize">
              {t(
                'LINE@ 官方帳號維護，並製作保險商品與遺產稅務動畫等內容，將複雜資訊轉譯為易懂的視覺語言。',
                'Managed LINE@ content and produced Motion Graphics for insurance and estate tax concepts, translating complex information into visual language.'
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
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">
          {t('雪莉與 Rookie 繪本', 'Sherry & Rookie Picture Book')}
        </h2>
        <div className="pro-meta">2024.08 / Tools: Procreate, InDesign</div>
      </header>

      <div className='pro-content-flow'>
        <div className='pro-intro-split'>
          <div className='pro-intro-text'>
            <div className='pro-section'>
              <p className='pro-intro-text'>
                {t(
                  '創作了一個充滿童趣的小繪本，',
                  'I created a picture book filled with childlike wonder,'
                )}<br/>
                {t(
                  '將狗的行為擬人化，融入天馬行空的幻想。',
                  'personifying everyday behaviors into imaginative fantasies.'
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
                '每個頁面都描繪了一個迷人的場景，展示了書中人物在各個場景的互動，無論是穿越雲朵的飛行還是漫步在神秘的森林中，都充滿了色彩和活力。',
                'Each page illustrates a captivating scene, showcasing the interactions of the characters. From flying through the clouds to wandering in a mysterious forest, every moment is vibrant.'
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
  return (
    <div className="pro-inner">
      <header className="pro-hero">
        <h2 className="pro-title">
          {t('捕碳高手科普動畫', 'Carbon Capture Animation')}
        </h2>
        <div className="pro-meta">2023.09 – 2023.10 / AE, PR, AI</div>
      </header>

      <div className='pro-content-flow'>
        <div className='pro-intro-split'>
          <div className='pro-intro-text'>
            <div className='pro-section'>
              <p className='pro-intro-text'>
                {t(
              '透過視覺化的教學動畫，將複雜的科學概念轉化為通俗易懂的內容，提升觀眾對環保議題的認識。',
              'Transforming complex scientific concepts into accessible visual animations to raise environmental awareness.'
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
        <div className="pro-block">
          <span className="pro-label">{t('捕碳高手', 'Carbon Capture')}</span>
          <iframe className="pro-video-main" width="960" height="540" src="https://www.youtube.com/embed/zCKXEZnUw1k?si=uqRXxnYCgt2osAg6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  )
}

// ── 因材網教學動畫 ──────────────────────────────────────────────────────────
function AdaptiveLearningDetail({ t }) {
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
      
      <div className="pro-content-flow">
        <div className="pro-intro-split">
          <div className="pro-intro-text">
            <div className="pro-section">
              <p className="pro-intro-text">
                {t(
              '製作教育部「因材網」平台的數位動畫教材，優化學生的遠距學習體驗。',
              'Produced digital animation materials for the Ministry of Education\'s Adaptive Learning Network to optimize remote learning experiences.'
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
            <span className="pro-label">{t('跨領域協作', 'Cross-Disciplinary Work')}</span>
            <p className="pro-body-emphasize">
              {t(
                '與國中老師深度討論教案，負責教學影片的動畫設計、剪輯與平台測試上架，確保內容兼具教學邏輯與美感。',
                'Collaborated closely with performing arts teachers. Handled motion design, editing, and platform deployment, ensuring a perfect balance of logic and aesthetics.'
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

       <div className="pro-content-flow">
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
                '運用網頁前端技術重塑物理手感。透過將文本轉譯和埋設於特定座標的音景觸發，讓讀者主動掀開詩的下一層隱喻。',
                'Utilizing front-end tech to rebuild physical tactile feedback. Through translating text and coordinate-based audio triggers, readers uncover the poem\'s metaphors.'
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
      { zh: '專案管理', en: 'Project Mgmt' },
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
