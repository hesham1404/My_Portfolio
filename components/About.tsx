'use client'

import { useEffect, useRef, useState } from 'react'
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
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

const SKILLS = [
  { name: 'HTML5',         color: '#E34F26', icon: SiHtml5 },
  { name: 'CSS3',          color: '#1572B6', icon: SiCss },
  { name: 'JavaScript',    color: '#F7DF1E', icon: SiJavascript },
  { name: 'TypeScript',    color: '#3178C6', icon: SiTypescript },
  { name: 'React',         color: '#61DAFB', icon: SiReact },
  { name: 'Next.js',       color: '#ffffff', icon: SiNextdotjs },
  { name: 'Tailwind CSS',  color: '#06B6D4', icon: SiTailwindcss },
  { name: 'Node.js',       color: '#339933', icon: SiNodedotjs },
  { name: 'PostgreSQL',    color: '#4169E1', icon: SiPostgresql },
  { name: 'REST APIs',     color: '#FF6C37', icon: SiPostman },
  { name: 'Prisma ORM',    color: '#5A67D8', icon: SiPrisma },
  { name: 'Git',           color: '#F05032', icon: SiGit },
  { name: 'GitHub',        color: '#ffffff', icon: SiGithub },
  { name: 'VS Code',       color: '#007ACC', icon: VscVscode },
  { name: 'n8n',           color: '#EA4B71', icon: SiN8N },
  { name: 'Microsoft Office', color: '#D83B01', icon: FaMicrosoft },
  { name: 'Vercel',        color: '#ffffff', icon: SiVercel },
  { name: 'Postman',       color: '#FF6C37', icon: SiPostman },
]

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    color: '#A855F7',
    names: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Frameworks & UI',
    color: '#06B6D4',
    names: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'Backend & Database',
    color: '#22C55E',
    names: ['Node.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs'],
  },
  {
    label: 'Tools & DevOps',
    color: '#F59E0B',
    names: ['Git', 'GitHub', 'VS Code', 'Postman', 'n8n', 'Vercel', 'Microsoft Office'],
  },
]

const SOFT_SKILLS = [
  { label: 'Problem Solving',  icon: '◈' },
  { label: 'Critical Thinking', icon: '◈' },
  { label: 'Team Work',         icon: '◈' },
  { label: 'Time Management',   icon: '◈' },
]

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '')
  const normalized = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean
  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/* ── Count-up animation ──────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.min(Math.round(eased * target), target))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, inView, duration])
  return count
}

/* ── Stat card with count-up ─────────────────────────── */
function StatCard({
  value, suffix, label, inView, delay,
}: {
  value: number; suffix: string; label: string; inView: boolean; delay: number
}) {
  const count = useCountUp(value, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07]
                 bg-white/[0.025] px-5 py-6 text-center
                 hover:border-[#A855F7]/30 hover:bg-[#A855F7]/[0.04]
                 transition-all duration-300 cursor-default"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(168,85,247,0.18), transparent 65%)' }}
      />
      {/* Bottom line */}
      <div
        className="absolute bottom-0 inset-x-8 h-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #A855F7, transparent)' }}
      />
      <span className="stat-value">{inView ? count : 0}{suffix}</span>
      <span className="stat-label mt-1.5">{label}</span>
    </motion.div>
  )
}

/* ── Skill pill (horizontal) ─────────────────────────── */
function SkillPill({ skill, index, inView }: {
  skill: (typeof SKILLS)[number]; index: number; inView: boolean
}) {
  const Icon = skill.icon as IconType

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.05 + index * 0.038 }}
      className="group relative flex items-center gap-3 overflow-hidden rounded-xl
                 border border-white/[0.06] bg-white/[0.02] px-3 py-2.5
                 transition-all duration-300 cursor-default
                 hover:-translate-y-0.5 hover:border-white/[0.11]
                 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
    >
      {/* Side glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at 0% 50%, ${hexToRgba(skill.color, 0.2)}, transparent 70%)` }}
      />

      {/* Icon box */}
      <div
        className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg
                   transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: hexToRgba(skill.color, 0.12),
          border: `1px solid ${hexToRgba(skill.color, 0.25)}`,
        }}
      >
        <Icon size={16} color={skill.color} />
      </div>

      <span className="relative z-10 text-[12px] font-semibold text-slate-400 group-hover:text-white transition-colors duration-200 leading-tight truncate">
        {skill.name}
      </span>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-3 right-3 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
      />
    </motion.div>
  )
}

/* ── Enhanced code block ─────────────────────────────── */
function TiltCodeBlock() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(id)
  }, [])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`
    if (glareRef.current)
      glareRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(168,85,247,0.12) 0%, transparent 60%)`
  }

  const onMouseLeave = () => {
    const el = wrapRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    if (glareRef.current) glareRef.current.style.background = 'transparent'
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-card overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080312]"
      style={{ willChange: 'transform' }}
    >
      <div ref={glareRef} className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-[background] duration-100" />

      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f5780]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e80]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c84080]" />
        </div>
        <span className="text-[10px] font-mono font-medium text-slate-600 tracking-wider">profile.ts</span>
        <span className="text-[10px] font-mono text-[#A855F7]/40">TypeScript</span>
      </div>

      {/* Top accent line */}
      <div className="h-[1px] bg-gradient-to-r from-[#A855F7]/60 via-[#C084FC]/30 to-transparent" />

      {/* Code body */}
      <div className="relative p-5 font-mono text-[12.5px] leading-[1.85]">
        <Line>
          <T c="#6C7FA8">{'// Developer profile'}</T>
        </Line>
        <Line>
          <T c="#A855F7">const </T><T c="#C084FC">Hesham</T><T c="#e2e8f0"> = {'{'}</T>
        </Line>
        <Line indent>
          <T c="#7DD3FC">role</T><T c="#e2e8f0">:&nbsp;</T><T c="#86EFAC">&quot;Full Stack Developer&quot;</T><T c="#e2e8f0">,</T>
        </Line>
        <Line indent>
          <T c="#7DD3FC">location</T><T c="#e2e8f0">:&nbsp;</T><T c="#86EFAC">&quot;Nagercoil, India&quot;</T><T c="#e2e8f0">,</T>
        </Line>
        <Line indent>
          <T c="#7DD3FC">stack</T><T c="#e2e8f0">:&nbsp;[</T>
          <T c="#86EFAC">&quot;React&quot;</T><T c="#e2e8f0">, </T>
          <T c="#86EFAC">&quot;Next.js&quot;</T><T c="#e2e8f0">, </T>
          <T c="#86EFAC">&quot;Node.js&quot;</T>
          <T c="#e2e8f0">],</T>
        </Line>
        <Line indent>
          <T c="#7DD3FC">available</T><T c="#e2e8f0">:&nbsp;</T><T c="#A855F7">true</T>
        </Line>
        <Line>
          <T c="#e2e8f0">{'}'}</T>
          <span
            className="ml-0.5 inline-block w-[2px] h-[14px] rounded-sm align-middle bg-[#A855F7]"
            style={{ opacity: cursor ? 1 : 0, transition: 'opacity 0.1s' }}
          />
        </Line>
      </div>
    </div>
  )
}

function Line({ children, indent }: { children: React.ReactNode; indent?: boolean }) {
  return <div className={indent ? 'pl-6' : ''}>{children}</div>
}
function T({ c, children }: { c: string; children: React.ReactNode }) {
  return <span style={{ color: c }}>{children}</span>
}

/* ── Main component ──────────────────────────────────── */
export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/25 to-transparent" />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 rounded-full opacity-[0.05]"
        style={{ width: 600, height: 600, background: 'radial-gradient(circle, #7C3AED, transparent 70%)', filter: 'blur(50px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 rounded-full opacity-[0.04]"
        style={{ width: 400, height: 400, background: 'radial-gradient(circle, #A855F7, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Header ── */}
        <div ref={ref} className="mb-12">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow-num">01</span>
            About
          </motion.p>

          <motion.h2
            className="text-[1.75rem] font-extrabold leading-tight text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Building with craft,{' '}
            <span className="gradient-text">shipping with speed.</span>
          </motion.h2>

          <motion.p
            className="mt-4 max-w-xl text-[15px] text-slate-500 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A full-stack developer who cares about every detail — from pixel-perfect UI to robust backend logic.
          </motion.p>
        </div>

        {/* ── Stats row ── */}
        <div className="mb-14 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
          <StatCard value={6}  suffix="+" label="Projects Built"  inView={inView} delay={0.18} />
          <StatCard value={18} suffix="+" label="Technologies"    inView={inView} delay={0.26} />
          <StatCard value={1}  suffix="+"  label="Yrs Experience"  inView={inView} delay={0.34} />
        </div>

        {/* ── Two-column ── */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — bio + code + soft skills */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Bio text with left accent */}
            <div className="relative pl-5 space-y-4 text-[15px] leading-[1.85] text-slate-400">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-[#A855F7]/60 via-[#A855F7]/20 to-transparent" />
              <p>
                Full-stack developer with a strong foundation in modern web technologies,
                specializing in building responsive, user-friendly applications using{' '}
                <span className="font-semibold text-[#C084FC] hover:text-white transition-colors duration-200 cursor-default">React.js</span> and{' '}
                <span className="font-semibold text-[#C084FC] hover:text-white transition-colors duration-200 cursor-default">Next.js</span>.
                Skilled in clean interface development, REST API integration, and data management with{' '}
                <span className="font-semibold text-[#C084FC] hover:text-white transition-colors duration-200 cursor-default">PostgreSQL</span> and Prisma ORM.
              </p>
              <p>
                Passionate about solving real-world problems through intuitive design and optimized
                performance — with hands-on experience in both development and software testing.
                Committed to continuous learning and delivering high-quality, scalable solutions.
              </p>
            </div>

            {/* Code block */}
            <TiltCodeBlock />

            {/* Soft skills */}
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
                Soft Skills
                <span className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
              </p>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.3 + i * 0.06 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                               border border-[#A855F7]/18 bg-[#A855F7]/[0.05]
                               text-[12px] font-semibold text-[#C084FC]/80
                               hover:border-[#A855F7]/35 hover:bg-[#A855F7]/[0.10] hover:text-[#C084FC]
                               transition-all duration-200 cursor-default"
                  >
                    <span className="text-[#A855F7]/50 text-[9px]">✦</span>
                    {skill.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — skills grouped by category */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Section header */}
            <div className="mb-6 flex items-center gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A855F7]/70">
                Technologies &amp; Tools
              </p>
              <span className="flex-1 h-px bg-gradient-to-r from-[#A855F7]/20 to-transparent" />
              <span className="text-[10px] font-mono text-slate-700">{SKILLS.length} skills</span>
            </div>

            {/* Panel */}
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-5 space-y-5">
              {SKILL_CATEGORIES.map((cat, ci) => {
                const catSkills = cat.names
                  .map(n => SKILLS.find(s => s.name === n))
                  .filter((s): s is (typeof SKILLS)[number] => Boolean(s))
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + ci * 0.07 }}
                  >
                    {/* Category label */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                      />
                      <span
                        className="text-[9.5px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: cat.color }}
                      >
                        {cat.label}
                      </span>
                      <span
                        className="flex-1 h-px"
                        style={{ background: `linear-gradient(90deg, ${cat.color}30, transparent)` }}
                      />
                      <span className="text-[9px] font-mono" style={{ color: `${cat.color}70` }}>
                        {catSkills.length}
                      </span>
                    </div>

                    {/* Skill pills */}
                    <div className="grid grid-cols-2 gap-2">
                      {catSkills.map((skill, i) => (
                        <SkillPill key={skill.name} skill={skill} index={ci * 6 + i} inView={inView} />
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
