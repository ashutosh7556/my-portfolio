import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiSend, FiCheck } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const TYPED_TEXT = '> Ready to collaborate...'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [typed, setTyped] = useState('')
  const sectionRef = useRef(null)
  const typedRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-panel',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#contact', start: 'top 70%' } }
      )

      // Typing effect
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top 70%',
        once: true,
        onEnter() {
          let i = 0
          const interval = setInterval(() => {
            setTyped(TYPED_TEXT.slice(0, i + 1))
            i++
            if (i >= TYPED_TEXT.length) clearInterval(interval)
          }, 60)
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const btn = e.currentTarget.querySelector('button[type=submit]')
    gsap.to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    setTimeout(() => {
      setSent(true)
      gsap.fromTo('.success-msg', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    }, 600)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-48">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, #6366f1, transparent)' }} />

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="font-mono text-xs tracking-[0.4em] text-indigo-400 uppercase">Contact</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-16">
          Let's <span className="text-gradient">connect</span>
        </h2>

        <div className="contact-panel glass rounded-3xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="font-mono text-xs text-white/30 ml-4">contact.sh</span>
          </div>

          <div className="p-8">
            {/* Typed line */}
            <div className="font-mono text-sm text-green-400 mb-8 flex items-center gap-1">
              <span>{typed}</span>
              <span className="w-2 h-4 bg-green-400 animate-pulse" />
            </div>

            {sent ? (
              <div className="success-msg text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <FiCheck size={28} className="text-green-400" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-2">Message sent!</h3>
                <p className="font-mono text-sm text-white/40">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-xs text-white/40 tracking-widest uppercase block mb-2">
                      $ name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-white/40 tracking-widest uppercase block mb-2">
                      $ email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-white/40 tracking-widest uppercase block mb-2">
                    $ message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"

                  className="magnetic-btn group flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm tracking-widest uppercase transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                >
                  <span>Send Message</span>
                  <FiSend size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
