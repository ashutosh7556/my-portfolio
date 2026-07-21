import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function runProjectAnimations() {
  document.querySelectorAll('.project-card').forEach((card, i) => {
    const img = card.querySelector('.project-img-wrap')
    const content = card.querySelector('.project-content')

    gsap.fromTo(
      img,
      { clipPath: 'inset(0 100% 0 0)', scale: 1.1 },
      {
        clipPath: 'inset(0 0% 0 0)',
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: card, start: 'top 75%' },
      }
    )

    gsap.fromTo(
      content.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 70%' },
      }
    )
  })
}

export function projectHoverIn(card) {
  gsap.to(card.querySelector('.project-img'), { scale: 1.06, duration: 0.6, ease: 'power2.out' })
  gsap.to(card.querySelector('.project-overlay'), { opacity: 1, duration: 0.4 })
}

export function projectHoverOut(card) {
  gsap.to(card.querySelector('.project-img'), { scale: 1, duration: 0.6, ease: 'power2.out' })
  gsap.to(card.querySelector('.project-overlay'), { opacity: 0, duration: 0.4 })
}
