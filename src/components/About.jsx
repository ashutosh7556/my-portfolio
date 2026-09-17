import { useEffect } from 'react'
import { runAboutAnimation } from '../animations/aboutAnimation'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
  { value: '5+', label: 'Happy Clients' },
]

export default function About() {
  useEffect(() => {
    runAboutAnimation()
  }, [])

  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background orb */}
      <div className="about-bg-orb absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="font-mono text-xs tracking-[0.4em] text-indigo-400 uppercase">About Me</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image side */}
          <div className="about-image-wrap relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass">
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))' }}>
                <div className="text-center">
                  <div className="font-display font-bold text-8xl text-gradient opacity-60">A</div>
                  <div className="font-mono text-xs tracking-widest text-white/30 mt-2">ASHUTOSH</div>
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)',
                }} />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 glow">
              <div className="font-mono text-xs text-white/50 mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-sm text-green-400">Available for work</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="about-text">
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-8">
              <div className="about-line overflow-hidden">
                <span className="block">Crafting digital</span>
              </div>
              <div className="about-line overflow-hidden">
                <span className="block text-gradient">experiences</span>
              </div>
              <div className="about-line overflow-hidden">
                <span className="block">that matter.</span>
              </div>
            </h2>

            <p className="about-line text-white/50 leading-relaxed mb-4">
              I'm a Full Stack Developer passionate about building scalable web applications
              with clean architecture and exceptional user experiences.
            </p>
            <p className="about-line text-white/50 leading-relaxed mb-10">
              From crafting pixel-perfect frontends with React to engineering robust backends
              with Laravel and Node.js — I bring ideas to life end-to-end.
            </p>

            <button

              className="magnetic-btn group flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              <span>Download Resume</span>
              <div className="w-8 h-px bg-white/30 group-hover:w-12 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {stats.map((s) => (
            <div key={s.label} className="stat-card glass glass-hover rounded-2xl p-6 text-center glow-hover">
              <div className="font-display font-bold text-4xl text-gradient mb-2">{s.value}</div>
              <div className="font-mono text-xs text-white/40 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
