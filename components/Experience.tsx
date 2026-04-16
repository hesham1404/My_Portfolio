'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface Exp {
  role: string
  company: string
  period: string
  type: string
  color: string
  bullets: string[]
}

const EXPERIENCES: Exp[] = [
  {
    role: 'Web Developer',
    company: 'MATT Engineering Solution',
    period: 'June 2025 – Present',
    type: 'Full-time',
    color: '#A855F7',
    bullets: [
      'Learning to build websites using React and Next.js with clean and responsive designs.',
      'Learning how to integrate APIs, manage data, and improve the performance of web applications.',
      'Working with the team to develop clean, user-friendly interfaces and deliver quality web solutions.',
    ],
  },
  {
    role: 'Software Tester',
    company: 'Wenoxo Technologies',
    period: 'Feb 2025 – March 2025',
    type: 'Internship',
    color: '#C084FC',
    bullets: [
      'Gaining hands-on experience in manual testing, executing test cases, and reporting bugs.',
      'Learning software testing processes, including functional, regression, and usability testing.',
      'Collaborating with teams to ensure software quality and improve testing efficiency.',
    ],
  },
]

/* ── Individual experience card ─────────────────────────────── */
function ExpCard({ exp, index }: { exp: Exp; index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.1 }}
      className="relative pl-8 group"
    >
      {/* Timeline dot with pulse ring */}
      <div className="absolute left-[-1px] top-5" style={{ zIndex: 2 }}>
        <div
          className="timeline-dot"
          style={{ background: exp.color, boxShadow: `0 0 0 4px ${exp.color}20, 0 0 14px ${exp.color}40` }}
        />
        {/* Pulse ring — triggers when card enters view */}
        {inView && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut' }}
            style={{ background: exp.color }}
          />
        )}
      </div>

      {/* Card */}
      <div className="glass card-glow card-top-border rounded-2xl overflow-hidden transition-all duration-300">
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
        />

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <h3 className="text-[17px] font-bold text-white mb-1">{exp.role}</h3>
              <p className="text-sm font-semibold" style={{ color: exp.color }}>{exp.company}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span
                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider"
                style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}0f` }}
              >
                {exp.type}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <CalendarIcon />
                {exp.period}
              </span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {exp.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 + i * 0.07 }}
                className="flex gap-3 text-[13.5px] text-slate-400 leading-relaxed"
              >
                <span className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                {b}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Animated timeline track ────────────────────────────────── */
function TimelineTrack() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={trackRef} className="absolute left-0 top-5 bottom-5 w-px overflow-visible">
      {/* Static track (faint) */}
      <div className="absolute inset-0 bg-white/[0.05]" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(to bottom, #A855F7, #C084FC, transparent)',
          height: '100%',
        }}
      />
    </div>
  )
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div ref={ref}>
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A855F7] mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            Experience
          </motion.p>
          <motion.h2
            className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-white mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Where I&apos;ve Worked
          </motion.h2>
        </div>

        <div className="relative">
          <TimelineTrack />

          <div className="space-y-7">
            {EXPERIENCES.map((exp, i) => (
              <ExpCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
