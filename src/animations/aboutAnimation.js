import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function runAboutAnimation() {
  // Image reveal
  gsap.fromTo(
    '.about-image-wrap',
    { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.about-image-wrap', start: 'top 80%' },
    }
  )

  // Text lines
  gsap.fromTo(
    '.about-line',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-text', start: 'top 75%' },
    }
  )

  // Parallax bg
  gsap.to('.about-bg-orb', {
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    },
  })
}
