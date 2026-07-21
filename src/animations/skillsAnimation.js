import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function runSkillsAnimation() {
  gsap.fromTo(
    '.skill-card',
    { y: 60, opacity: 0, scale: 0.85 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: { amount: 0.8, from: 'random' },
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '#skills', start: 'top 70%' },
    }
  )

  // Floating loop per card
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    gsap.to(card, {
      y: `${-8 - (i % 3) * 4}`,
      rotation: (i % 2 === 0 ? 1 : -1) * 1.5,
      duration: 2.5 + (i % 4) * 0.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.15,
    })
  })
}
