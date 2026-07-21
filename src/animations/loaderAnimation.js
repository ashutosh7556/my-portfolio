import gsap from 'gsap'

export function runLoaderAnimation(onComplete) {
  const tl = gsap.timeline({
    onComplete,
    defaults: { ease: 'power3.out' },
  })

  // Particles entrance
  tl.fromTo(
    '.loader-particle',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, stagger: { amount: 0.8, from: 'random' } },
    0
  )

  // Logo reveal
  tl.fromTo(
    '.loader-logo',
    { y: 40, opacity: 0, filter: 'blur(20px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
    0.3
  )

  // Counter
  const counter = { val: 0 }
  tl.to(
    counter,
    {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        const el = document.querySelector('.loader-percent')
        if (el) el.textContent = Math.round(counter.val) + '%'
      },
    },
    0.2
  )

  // Progress bar
  tl.fromTo(
    '.loader-bar-fill',
    { scaleX: 0 },
    { scaleX: 1, duration: 2.2, ease: 'power2.inOut', transformOrigin: 'left' },
    0.2
  )

  // Exit
  tl.to('.loader-logo', { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.2')
  tl.to('.loader-percent', { opacity: 0, duration: 0.3 }, '<')
  tl.to('#loader', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.1')

  return tl
}
