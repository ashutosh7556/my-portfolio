import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi'

const socials = [
  { icon: FiGithub, href: 'https://github.com/ashutosh7556', label: 'GitHub' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="relative border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="footer-item font-display font-bold text-2xl text-gradient">A.</div>

        {/* Socials */}
        <div className="footer-item flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"

              className="magnetic-btn glass glass-hover w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-item font-mono text-xs text-white/30 tracking-wider">
          © 2024 Ashutosh. All rights reserved.
        </div>

        {/* Back to top */}
        <button
          onClick={scrollTop}

          className="footer-item magnetic-btn glass glass-hover w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          <FiArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}
