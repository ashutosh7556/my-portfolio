import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { runProjectAnimations, projectHoverIn, projectHoverOut } from '../animations/projectAnimation'
import { FiGithub, FiExternalLink, FiSmartphone } from 'react-icons/fi'

const projects = [
  {
    id: 1,
    title: 'Voting System',
    desc: 'Online election platform with voter login, admin panel, candidate management, voting flow, announcements, and election results.',
    tech: ['Core PHP', 'SQL', 'PostgreSQL'],
    status: 'Live',
    color: '#6366f1',
    gradient: 'from-indigo-900/40 to-purple-900/20',
    live: 'https://voting-sysem.onrender.com/',
    github: null,
  },
  {
    id: 2,
    title: 'Skyllect AI Hub',
    desc: 'Animated AI-focused webpage built with modern frontend technologies and motion design.',
    tech: [],
    status: 'Live',
    color: '#a855f7',
    gradient: 'from-purple-900/40 to-pink-900/20',
    live: 'https://skyllect-ai-hub.vercel.app/',
    github: null,
  },
  {
    id: 3,
    title: 'MorphCall',
    desc: 'Web-based calling application designed to provide a simple and convenient communication experience.',
    tech: [],
    status: 'Completed',
    color: '#8b5cf6',
    gradient: 'from-violet-900/40 to-purple-900/20',
    live: 'https://morphcall-ten.vercel.app/',
    github: null,
  },
  {
    id: 4,
    title: 'WhatsApp AI Chatbot',
    desc: 'AI-powered chatbot that handles conversations over WhatsApp using Meta Cloud API and webhooks.',
    tech: ['Node.js', 'Express', 'Meta Cloud API', 'Webhooks'],
    status: 'Completed',
    color: '#25D366',
    gradient: 'from-emerald-900/40 to-teal-900/20',
    live: null,
    github: null,
    // Source-only project with dedicated 3D interactive mobile showcase
    hideLive: true,
    demoPath: '/projects/whatsapp-ai-chatbot',
  },
]

const statusStyle = {
  'Live': 'text-green-400 border-green-400/30',
  'In Progress': 'text-amber-400 border-amber-400/30',
  'Completed': 'text-indigo-300 border-indigo-400/30',
}

export default function Projects() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const timerRef = useRef(null)
  // Key of the link whose "Coming Soon" hint is currently showing, e.g. "1-github".
  const [hint, setHint] = useState(null)

  useEffect(() => {
    runProjectAnimations()
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const showComingSoon = (key) => {
    setHint(key)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setHint(null), 1800)
  }

  const openOrHint = (url, key) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
    else showComingSoon(key)
  }

  const handleCardClick = (project, primary) => {
    if (project.demoPath) {
      navigate(project.demoPath)
    } else {
      openOrHint(primary, `${project.id}-card`)
    }
  }

  const linkProps = (url, key, label) =>
    url
      ? { href: url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': label }
      : {
          role: 'button',
          tabIndex: 0,
          'aria-label': `${label} — coming soon`,
          onClick: (e) => {
            e.preventDefault()
            showComingSoon(key)
          },
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              showComingSoon(key)
            }
          },
        }

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="font-mono text-xs tracking-[0.4em] text-indigo-400 uppercase">Projects</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-20">
          Selected <span className="text-gradient">work</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const primary = project.live || project.github
            const showLive = !project.hideLive

            return (
            <div
              key={project.id}
              className="project-card group relative rounded-3xl overflow-hidden glass glow-hover cursor-pointer"
              onMouseEnter={(e) => projectHoverIn(e.currentTarget)}
              onMouseLeave={(e) => projectHoverOut(e.currentTarget)}
              onClick={() => handleCardClick(project, primary)}
            >
              {/* Image area */}
              <div className="project-img-wrap relative aspect-video overflow-hidden">
                <div
                  className={`project-img absolute inset-0 bg-gradient-to-br ${project.gradient} will-change-transform`}
                  style={{ transition: 'transform 0.6s ease' }}
                >
                  {/* Visual placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="font-display font-bold text-8xl" style={{ color: project.color }}>
                      {String(project.id).padStart(2, '0')}
                    </div>
                  </div>
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }} />
                </div>
                {/* Hover overlay */}
                <div className="project-overlay absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0"
                  style={{ background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(4px)' }}>
                  <div className="flex items-center justify-center gap-4">
                    {project.github && (
                      <a {...linkProps(project.github, `${project.id}-github`, `${project.title} source code`)}
                        className="magnetic-btn glass p-3 rounded-full hover:border-white/30 transition-colors"
                        onClickCapture={(e) => e.stopPropagation()}>
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.demoPath && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(project.demoPath)
                        }}
                        aria-label={`${project.title} 3D mobile showcase`}
                        title="Open 3D Mobile Showcase"
                        className="magnetic-btn glass p-3 rounded-full hover:border-emerald-400/60 hover:text-emerald-400 transition-colors text-white"
                      >
                        <FiSmartphone size={18} />
                      </button>
                    )}
                    {showLive && (
                      <a {...linkProps(project.live, `${project.id}-live`, `${project.title} live site`)}
                        className="magnetic-btn glass p-3 rounded-full hover:border-white/30 transition-colors"
                        onClickCapture={(e) => e.stopPropagation()}>
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  <span className={`font-mono text-[10px] tracking-widest uppercase text-white/70 transition-opacity duration-300 ${
                    hint && hint.startsWith(`${project.id}-`) ? 'opacity-100' : 'opacity-0'
                  }`}>
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="project-content p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-bold text-xl">{project.title}</h3>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border tracking-widest uppercase ${statusStyle[project.status]}`}>
                      {project.status}
                    </span>
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{project.desc}</p>

                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full border"
                        style={{ borderColor: `${project.color}30`, color: project.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Touch devices never get the hover overlay, so links live here too */}
                <div className="md:hidden flex items-center gap-4 mt-5">
                  {project.github && (
                    <a {...linkProps(project.github, `${project.id}-github`, `${project.title} source code`)}
                      className="flex items-center gap-2 font-mono text-xs text-white/50"
                      onClickCapture={(e) => e.stopPropagation()}>
                      <FiGithub size={14} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demoPath && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(project.demoPath)
                      }}
                      className="flex items-center gap-1.5 font-mono text-xs text-emerald-400"
                    >
                      <FiSmartphone size={14} />
                      <span>3D Demo</span>
                    </button>
                  )}
                  {showLive && (
                    <a {...linkProps(project.live, `${project.id}-live`, `${project.title} live site`)}
                      className="flex items-center gap-2 font-mono text-xs text-white/50"
                      onClickCapture={(e) => e.stopPropagation()}>
                      <FiExternalLink size={14} />
                      <span>{project.live ? 'Live' : 'Coming Soon'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
