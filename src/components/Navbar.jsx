import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
      gsap.fromTo('.mobile-link',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
        scrolled ? 'glass py-3 mx-4' : ''
      }`}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="magnetic-btn font-display font-bold text-xl text-gradient"
        >
          A.
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="magnetic-btn font-mono text-xs tracking-widest text-white/50 hover:text-white transition-colors duration-300 uppercase"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="magnetic-btn glass glass-hover px-5 py-2 rounded-full font-mono text-xs tracking-widest text-white/80 hover:text-white transition-all duration-300"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div ref={menuRef} className="md:hidden glass mx-4 mt-2 rounded-2xl p-6">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="mobile-link block w-full text-left font-mono text-sm tracking-widest text-white/60 hover:text-white py-3 border-b border-white/5 last:border-0 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
