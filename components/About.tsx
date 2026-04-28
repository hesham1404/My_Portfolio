'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaMicrosoft } from 'react-icons/fa6'
import {
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiN8N,
  SiNextdotjs,
  SiPostman,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const SKILLS = [
  { name: 'HTML5', color: '#E34F26', icon: SiHtml5 },
  { name: 'CSS3', color: '#1572B6', icon: SiCss },
  { name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript },
  { name: 'TypeScript', color: '#3178C6', icon: SiTypescript },
  { name: 'React', color: '#61DAFB', icon: SiReact },
  { name: 'Next.js', color: '#ffffff', icon: SiNextdotjs },
  { name: 'Tailwind CSS', color: '#06B6D4', icon: SiTailwindcss },
  { name: 'REST APIs', color: '#FF6C37', icon: SiPostman },
  { name: 'Prisma ORM', color: '#5A67D8', icon: SiPrisma },
  { name: 'Git', color: '#F05032', icon: SiGit },
  { name: 'GitHub', color: '#ffffff', icon: SiGithub },
  { name: 'VS Code', color: '#007ACC', icon: VscVscode },
  { name: 'n8n', color: '#EA4B71', icon: SiN8N },
  { name: 'Microsoft Office', color: '#D83B01', icon: FaMicrosoft },
  { name: 'Vercel', color: '#ffffff', icon: SiVercel },
  { name: 'Postman', color: '#FF6C37', icon: SiPostman },
]

const SOFT_SKILLS = [
  { label: 'Problem Solving' },
  { label: 'Critical Thinking' },
  { label: 'Team Work' },
  { label: 'Time Management' },
]

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '')
  const normalized =
    clean.length === 3
      ? clean
          .split('')
          .map((char) => char + char)
          .join('')
      : clean

  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof SKILLS)[number]
  index: number
  inView: boolean
}) {
  const Icon = skill.icon as IconType

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.15 + index * 0.04 }}
      className="group relative flex flex-col items-center justify-center gap-2.5 overflow-hidden
                 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-4
                 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.13]
                 hover:bg-white/[0.05]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${hexToRgba(skill.color, 0.24)}, transparent 70%)`,
        }}
      />

      <div
        className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[10px]"
        style={{
          backgroundColor: hexToRgba(skill.color, 0.12),
          border: `0.5px solid ${hexToRgba(skill.color, 0.25)}`,
        }}
      >
        <Icon size={28} color={skill.color} />
      </div>

      <span className="relative text-[11px] font-medium tracking-tight leading-tight text-center text-white">
        {skill.name}
      </span>

      <div
        className="absolute bottom-0 inset-x-6 h-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
      />
    </motion.div>
  )
}

function TiltCodeBlock() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(168,85,247,0.1) 0%, transparent 60%)`
    }
  }

  const onMouseLeave = () => {
    const el = wrapRef.current
    if (!el) return
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)'
    if (glareRef.current) glareRef.current.style.background = 'transparent'
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card glass overflow-hidden rounded-2xl"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-[background] duration-100"
      />
      <div className="relative p-5 font-mono text-xs leading-6">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] text-slate-600">profile.ts</span>
        </div>
        <div>
          <span className="text-[#A855F7]">const </span>
          <span className="text-[#C084FC]">Hesham</span>
          <span className="text-white"> = {'{'}</span>
        </div>
        <div className="pl-4">
          <span className="text-slate-400">role</span>
          <span className="text-white">: </span>
          <span className="text-[#C084FC]">&quot;Frontend Developer&quot;</span>
          <span className="text-white">,</span>
        </div>
        <div className="pl-4">
          <span className="text-slate-400">location</span>
          <span className="text-white">: </span>
          <span className="text-[#C084FC]">&quot;Nagercoil, India&quot;</span>
          <span className="text-white">,</span>
        </div>
        <div className="pl-4">
          <span className="text-slate-400">available</span>
          <span className="text-white">: </span>
          <span className="text-[#A855F7]">true</span>
        </div>
        <div className="text-white">{'}'}</div>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div ref={ref} className="mb-14">
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A855F7]"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            About
          </motion.p>
          <motion.h2
            className="text-[1.75rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Building with craft,
            <br />
            <span className="text-[#A855F7]">shipping with speed.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-7"
          >
            <div className="space-y-4 text-[15px] leading-[1.8] text-slate-400">
              <p>
                Aspiring Frontend Developer with a strong foundation in modern web technologies,
                specializing in building responsive and user-friendly web applications using{' '}
                <span className="font-medium text-[#C084FC]">React.js</span> and{' '}
                <span className="font-medium text-[#C084FC]">Next.js</span>. Skilled in developing
                clean interfaces, integrating REST APIs, and managing data efficiently with Prisma ORM.
              </p>
              <p>
                Passionate about solving real-world problems through intuitive design and optimized
                performance, with hands-on experience in both development and software testing.
                Committed to continuous learning and delivering high-quality, scalable solutions.
              </p>
            </div>

            <TiltCodeBlock />

            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((skill, index) => (
                  <motion.span
                    key={skill.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + index * 0.05 }}
                    className="soft-badge"
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Technologies &amp; Tools
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
              {SKILLS.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} inView={inView} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
