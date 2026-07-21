import { useEffect } from 'react'
import { runSkillsAnimation } from '../animations/skillsAnimation'
import {
  SiReact, SiLaravel, SiPhp, SiNodedotjs, SiMongodb, SiMysql,
  SiJavascript, SiGit, SiDocker, SiLinux,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'

const skills = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
  { name: 'REST APIs', icon: TbApi, color: '#6366f1' },
]

export default function Skills() {
  useEffect(() => {
    runSkillsAnimation()
  }, [])

  return (
    <section id="skills" className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, #6366f1, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-indigo-500" />
          <span className="font-mono text-xs tracking-[0.4em] text-indigo-400 uppercase">Tech Stack</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mb-20">
          Tools I <span className="text-gradient">master</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card glass glass-hover rounded-2xl p-5 flex flex-col items-center gap-3 glow-hover will-change-transform"
              style={{ '--skill-color': skill.color }}
            >
              <skill.icon
                size={32}
                style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color}40)` }}
              />
              <span className="font-mono text-xs text-white/60 tracking-wider">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
