import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2023 — Present',
    desc: 'Building end-to-end web applications for clients across various industries. Specializing in React frontends with Laravel/Node.js backends.',
    tech: ['React', 'Laravel', 'Node.js', 'MySQL'],
  },
  {
    role: 'Backend Developer',
    company: 'Tech Startup',
    period: '2022 — 2023',
    desc: 'Developed RESTful APIs and microservices architecture. Improved system performance by 40% through query optimization and caching strategies.',
    tech: ['PHP', 'Laravel', 'MongoDB', 'Docker'],
  },
  {
    role: 'Junior Developer',
    company: 'Digital Agency',
    period: '2021 — 2022',
    desc: 'Collaborated on multiple client projects, building responsive web interfaces and integrating third-party APIs.',
    tech: ['JavaScript', 'React', 'MySQL', 'Git'],
  },
]

export default function Experience() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-label',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '#experience', start: 'top 75%' } }
      )
      gsap.fromTo('.exp-item',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '#experience', start: 'top 70%' } }
      )
      gsap.fromTo('.exp-detail',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '#experience', start: 'top 65%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const exp = experiences[active]

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="exp-label flex items-center gap-4 mb-20">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="font-mono text-xs tracking-[0.4em] text-indigo-400 uppercase">Experience</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-16">
          Where I've <span className="text-gradient">worked</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Timeline list */}
          <div className="md:col-span-2 flex flex-col gap-2">
            {experiences.map((e, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`exp-item text-left p-5 rounded-2xl transition-all duration-400 border ${
                  active === i
                    ? 'glass border-indigo-500/40 glow'
                    : 'border-transparent hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    active === i ? 'bg-indigo-400' : 'bg-white/20'
                  }`} />
                  <span className="font-display font-semibold text-sm text-white/80">{e.company}</span>
                </div>
                <div className="font-mono text-xs text-white/40 ml-5">{e.period}</div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="exp-detail md:col-span-3 glass rounded-2xl p-8">
            <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-2">{exp.period}</div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-2">{exp.role}</h3>
            <div className="font-mono text-sm text-white/40 mb-6">@ {exp.company}</div>
            <p className="text-white/60 leading-relaxed mb-8">{exp.desc}</p>
            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span key={t} className="glass px-3 py-1.5 rounded-full font-mono text-xs text-indigo-300 border border-indigo-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
