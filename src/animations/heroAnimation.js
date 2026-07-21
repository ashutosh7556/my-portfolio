import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function runHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Chars animate in
  tl.fromTo(
    '.hero-char',
    { y: '110%', opacity: 0, rotateX: -80 },
    { y: '0%', opacity: 1, rotateX: 0, duration: 1, stagger: 0.04 },
    0
  )

  tl.fromTo(
    '.hero-subtitle span',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
    0.6
  )

  tl.fromTo(
    '.hero-cta',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    1
  )

  tl.fromTo(
    '.hero-scroll-indicator',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6 },
    1.2
  )

  // Scroll-out
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate(self) {
      const p = self.progress
      gsap.set('#hero-content', { y: p * 120, opacity: 1 - p * 1.5 })
      gsap.set('#hero-bg', { scale: 1 + p * 0.08 })
    },
  })

  return tl
}

export function heroParallax(e) {
  const { clientX, clientY } = e
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const dx = (clientX - cx) / cx
  const dy = (clientY - cy) / cy
  gsap.to('#hero-bg', { x: dx * 20, y: dy * 20, duration: 1.2, ease: 'power2.out' })
  gsap.to('.hero-char', { x: dx * 8, y: dy * 8, duration: 1.4, ease: 'power2.out', stagger: 0.01 })
}
