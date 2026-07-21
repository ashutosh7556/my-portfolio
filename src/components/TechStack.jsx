import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const layers = [
  { label: 'Frontend', items: ['React', 'Tailwind', 'GSAP'], color: '#6366f1' },
  { label: 'Backend', items: ['Laravel', 'Node.js', 'REST API'], color: '#a855f7' },
  { label: 'Database', items: ['MySQL', 'MongoDB', 'Redis'], color: '#ec4899' },
  { label: 'Deployment', items: ['Docker', 'Linux', 'Git'], color: '#06b6d4' },
]

export default function TechStack() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nodes entrance
      gsap.fromTo('.arch-layer',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '#techstack', start: 'top 70%' },
        }
      )

      // Connector lines draw
      gsap.fromTo('.arch-connector',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 0.5, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: '#techstack', start: 'top 65%' },
        }
      )

      // Pulse nodes
      gsap.to('.arch-node', {
        boxShadow: '0 0 20px rgba(99,102,241,0.5)',
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { amount: 1.5, from: 'random' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="techstack" ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #a855f7, transparent)' }} />

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="font-mono text-xs tracking-[0.4em] text-indigo-400 uppercase">Architecture</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-20">
          How I <span className="text-gradient">build</span>
        </h2>

        <div className="flex flex-col items-center gap-0">
          {layers.map((layer, i) => (
            <div key={layer.label} className="w-full flex flex-col items-center">
              <div className="arch-layer w-full glass rounded-2xl p-6 border"
                style={{ borderColor: `${layer.color}20` }}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="arch-node w-3 h-3 rounded-full"
                      style={{ background: layer.color, boxShadow: `0 0 10px ${layer.color}60` }} />
                    <span className="font-display font-semibold text-lg" style={{ color: layer.color }}>
                      {layer.label}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {layer.items.map((item) => (
                      <span key={item} className="font-mono text-xs px-3 py-1.5 rounded-full"
                        style={{ background: `${layer.color}15`, color: layer.color, border: `1px solid ${layer.color}25` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {i < layers.length - 1 && (
                <div className="arch-connector flex flex-col items-center py-2">
                  <div className="w-px h-8 bg-gradient-to-b"
                    style={{ backgroundImage: `linear-gradient(${layers[i].color}, ${layers[i + 1].color})` }} />
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: layers[i + 1].color }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
