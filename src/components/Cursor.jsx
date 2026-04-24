import { useEffect, useRef } from 'react'

/**
 * Custom cursor component.
 * - Smooth lerp-based follow (RAF loop)
 * - 'cursor-bite' on food image hover (dashed circle)
 * - 'cursor-big' on interactive element hover (larger ring)
 * Automatically hidden on touch devices.
 */
export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos   = { x: mouse.x, y: mouse.y }
    let rafId

    const lerp = (a, b, n) => a + (b - a) * n

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const tick = () => {
      pos.x = lerp(pos.x, mouse.x, 0.13)
      pos.y = lerp(pos.y, mouse.y, 0.13)
      cursor.style.transform = `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`
      rafId = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('mousemove', onMouseMove)

    // Use event delegation so it works for dynamically rendered content too
    const onOver = (e) => {
      if (e.target.closest('.fi img')) {
        document.body.classList.add('cursor-bite')
      } else if (e.target.closest('a, button, .card, .footer-cta')) {
        document.body.classList.add('cursor-big')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('.fi img')) {
        document.body.classList.remove('cursor-bite')
      } else if (e.target.closest('a, button, .card, .footer-cta')) {
        document.body.classList.remove('cursor-big')
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />
}
