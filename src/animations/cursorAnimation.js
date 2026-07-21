import gsap from 'gsap'

let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0
let rafId = null

export function initCursor() {
  const dot = document.getElementById('cursor-dot')
  const ring = document.getElementById('cursor-ring')
  const label = document.getElementById('cursor-label')

  if (!dot || !ring) return

  const onMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' })
  }

  const lerp = (a, b, t) => a + (b - a) * t

  const loop = () => {
    ringX = lerp(ringX, mouseX, 0.12)
    ringY = lerp(ringY, mouseY, 0.12)
    gsap.set(ring, { x: ringX, y: ringY })
    if (label) gsap.set(label, { x: ringX, y: ringY })
    rafId = requestAnimationFrame(loop)
  }

  loop()
  window.addEventListener('mousemove', onMove)

  // Hover effects
  const addHover = () => {
    document.querySelectorAll('a, button, .magnetic-btn, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('expanded')
        const cursorText = el.dataset.cursor || ''
        if (label && cursorText) {
          label.textContent = cursorText
          gsap.to(label, { opacity: 1, duration: 0.2 })
        }
      })
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('expanded')
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 })
      })
    })
  }

  // Re-run on DOM changes
  const observer = new MutationObserver(addHover)
  observer.observe(document.body, { childList: true, subtree: true })
  addHover()

  return () => {
    window.removeEventListener('mousemove', onMove)
    cancelAnimationFrame(rafId)
    observer.disconnect()
  }
}

export function initMagnetic() {
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.35
      const dy = (e.clientY - cy) * 0.35
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    })
  })
}
