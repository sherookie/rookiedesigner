import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

/**
 * Exhibition gallery slider.
 * - Arrow buttons cycle through images
 * - Clickable thumbnail strip with drag-to-scroll
 * - GSAP micro-transition on main image swap (fade-down → fade-up)
 */
export default function Slider({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const mainImgRef  = useRef(null)
  const thumbsRef   = useRef(null)

  // ── Drag-to-scroll thumbs ──────────────────────────────────
  useEffect(() => {
    const slider = thumbsRef.current
    if (!slider) return

    let isDown = false
    let startX, scrollLeft

    const onDown  = (e) => { isDown = true;  startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft }
    const onLeave = ()  => { isDown = false }
    const onUp    = ()  => { isDown = false }
    const onMove  = (e) => {
      if (!isDown) return
      e.preventDefault()
      slider.scrollLeft = scrollLeft - (e.pageX - slider.offsetLeft - startX) * 2
    }

    slider.addEventListener('mousedown',  onDown)
    slider.addEventListener('mouseleave', onLeave)
    slider.addEventListener('mouseup',    onUp)
    slider.addEventListener('mousemove',  onMove)

    return () => {
      slider.removeEventListener('mousedown',  onDown)
      slider.removeEventListener('mouseleave', onLeave)
      slider.removeEventListener('mouseup',    onUp)
      slider.removeEventListener('mousemove',  onMove)
    }
  }, [])

  // ── Main image swap with GSAP spring ──────────────────────
  const switchTo = (index) => {
    const img = mainImgRef.current
    if (!img || index === activeIndex) return

    gsap.to(img, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(index)
        requestAnimationFrame(() => {
          gsap.to(img, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.2)' })
        })
      },
    })
  }

  const changeSlide = (dir) => {
    let next = activeIndex + dir
    if (next >= images.length) next = 0
    if (next < 0) next = images.length - 1
    switchTo(next)
  }

  if (!images.length) return null

  return (
    <div className="pro-gallery-slider">
      <div className="slider-main-wrap">
        <button
          className="slider-nav prev"
          onClick={() => changeSlide(-1)}
          aria-label="Previous"
        />
        <img
          ref={mainImgRef}
          src={images[activeIndex]}
          alt=""
          className="slider-main-img"
        />
        <button
          className="slider-nav next"
          onClick={() => changeSlide(1)}
          aria-label="Next"
        />
      </div>

      <div className="slider-thumbs" ref={thumbsRef}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`thumb${i === activeIndex ? ' active' : ''}`}
            onClick={() => switchTo(i)}
            draggable={false}
          />
        ))}
      </div>
    </div>
  )
}
