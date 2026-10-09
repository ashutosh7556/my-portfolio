import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import PhoneMockup from '../components/PhoneMockup'
import gsap from 'gsap'

export default function WhatsAppDemo() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.demo-center-phone',
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.demo-nav-bar',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col justify-between overflow-x-hidden">
      {/* Background Subtle Purple & Cyan Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/15 via-cyan-500/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      {/* Minimal Top Navigation */}
      <header className="demo-nav-bar relative z-30 w-full max-w-7xl mx-auto px-6 pt-4 sm:pt-5 flex items-center justify-start">
        <div className="flex items-center pl-10 sm:pl-14 md:pl-16">
          <Link
            to="/#projects"
            className="magnetic-btn glass glass-hover px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs text-white/70 hover:text-white flex items-center gap-2 transition-all border border-white/10 hover:border-cyan-500/30"
          >
            <FiArrowLeft size={14} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </header>

      {/* Centerpiece: Large 3D Mobile Phone */}
      <main className="demo-center-phone relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <PhoneMockup defaultVideo="/videos/Chatboat_video.mp4" />
      </main>

      {/* Subtle Bottom Credit */}
      <footer className="relative z-10 py-4 text-center font-mono text-[11px] text-white/30">
        <span>WhatsApp AI Chatbot • Demo Video Showcase</span>
      </footer>
    </div>
  )
}
