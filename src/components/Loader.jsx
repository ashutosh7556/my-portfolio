import { useEffect, useRef } from 'react'
import { runLoaderAnimation } from '../animations/loaderAnimation'

const PARTICLE_COUNT = 40

export default function Loader({ onComplete }) {
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    document.body.style.overflow = 'hidden'
    runLoaderAnimation(() => {
      document.body.style.overflow = ''
      onComplete()
    })
  }, [])

  return (
    <div id="loader">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="loader-particle absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#a855f7' : '#ec4899',
              opacity: 0.4 + Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)', top: '20%', left: '20%' }} />
      <div className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)', bottom: '20%', right: '20%' }} />

      {/* Logo */}
      <div className="loader-logo relative z-10 text-center">
        <div className="font-display font-bold text-6xl md:text-8xl tracking-tighter text-gradient mb-2">
          A
        </div>
        <div className="font-mono text-xs tracking-[0.4em] text-white/40 uppercase">
          Ashutosh
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 text-center">
        <div className="loader-percent font-mono text-sm text-white/50 mb-3">0%</div>
        <div className="h-px bg-white/10 w-full overflow-hidden">
          <div className="loader-bar-fill h-full bg-gradient-to-r from-indigo-500 to-purple-500 origin-left" />
        </div>
      </div>
    </div>
  )
}
