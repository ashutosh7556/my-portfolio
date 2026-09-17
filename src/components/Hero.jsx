import { useEffect, useRef } from 'react'
import { runHeroAnimation, heroParallax } from '../animations/heroAnimation'
import { FiArrowDown } from 'react-icons/fi'

const NAME = 'ASHUTOSH'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = runHeroAnimation()
    const onMove = (e) => heroParallax(e)
    window.addEventListener('mousemove', onMove)
    return () => {
      ctx?.kill?.()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div id="hero-bg" className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(168,85,247,0.08) 0%, transparent 60%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
      </div>

      {/* Content */}
      <div id="hero-content" className="relative z-10 text-center px-6 will-change-transform">
        {/* Name */}
        <div className="overflow-hidden mb-4" style={{ perspective: '800px' }}>
          <h1 className="font-display font-bold leading-none tracking-tighter"
            style={{ fontSize: 'clamp(4rem, 14vw, 14rem)' }}>
            {NAME.split('').map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block text-gradient will-change-transform"
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="hero-subtitle overflow-hidden mb-10">
          <p className="font-mono text-sm md:text-base tracking-[0.4em] text-white/50 uppercase">
            {'Full Stack Developer'.split(' ').map((word, i) => (
              <span key={i} className="inline-block mr-4">
                {word.split('').map((c, j) => (
                  <span key={j} className="inline-block">{c}</span>
                ))}
              </span>
            ))}
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex items-center justify-center gap-4 flex-wrap">
          <button

            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn group relative px-8 py-3.5 rounded-full overflow-hidden font-mono text-xs tracking-widest uppercase"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }} />
          </button>
          <button

            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn glass glass-hover px-8 py-3.5 rounded-full font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        <FiArrowDown className="text-white/30 animate-bounce" size={14} />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 font-mono text-[10px] text-white/20 tracking-widest">
        PORTFOLIO / 2024
      </div>
      <div className="absolute top-8 right-8 font-mono text-[10px] text-white/20 tracking-widest">
        FULL STACK DEV
      </div>
    </section>
  )
}
