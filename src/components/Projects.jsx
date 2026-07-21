import { useEffect, useRef } from 'react'
import { runProjectAnimations, projectHoverIn, projectHoverOut } from '../animations/projectAnimation'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    desc: 'Full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    tech: ['React', 'Laravel', 'MySQL', 'Stripe'],
    color: '#6366f1',
    gradient: 'from-indigo-900/40 to-purple-900/20',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'Task Management SaaS',
    desc: 'Collaborative project management tool with real-time updates, team workspaces, and analytics.',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    color: '#a855f7',
    gradient: 'from-purple-900/40 to-pink-900/20',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'API Gateway Service',
    desc: 'Microservices API gateway with rate limiting, authentication, logging, and load balancing.',
    tech: ['Node.js', 'Docker', 'Redis', 'Linux'],
    color: '#ec4899',
    gradient: 'from-pink-900/40 to-rose-900/20',
    github: '#',
    live: '#',
  },
  {
    id: 4,
    title: 'Real-time Analytics',
    desc: 'Live data visualization dashboard with WebSocket streams, custom charts, and export features.',
    tech: ['React', 'PHP', 'MySQL', 'Chart.js'],
    color: '#06b6d4',
    gradient: 'from-cyan-900/40 to-blue-900/20',
    github: '#',
    live: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    runProjectAnimations()
  }, [])

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
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card group relative rounded-3xl overflow-hidden glass glow-hover cursor-none"
              onMouseEnter={(e) => projectHoverIn(e.currentTarget)}
              onMouseLeave={(e) => projectHoverOut(e.currentTarget)}
              data-cursor="VIEW"
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
                <div className="project-overlay absolute inset-0 flex items-center justify-center gap-4 opacity-0"
                  style={{ background: 'rgba(5,5,5,0.6)', backdropFilter: 'blur(4px)' }}>
                  <a href={project.github} data-cursor="OPEN"
                    className="magnetic-btn glass p-3 rounded-full hover:border-white/30 transition-colors"
                    onClick={(e) => e.stopPropagation()}>
                    <FiGithub size={18} />
                  </a>
                  <a href={project.live} data-cursor="OPEN"
                    className="magnetic-btn glass p-3 rounded-full hover:border-white/30 transition-colors"
                    onClick={(e) => e.stopPropagation()}>
                    <FiExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="project-content p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-bold text-xl">{project.title}</h3>
                  <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full border"
                      style={{ borderColor: `${project.color}30`, color: project.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
