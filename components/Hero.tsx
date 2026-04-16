'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const ROLES = [
  'Full Stack Developer',
  'React & Next.js Specialist',
  'REST API & Prisma Integration',
]

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex]     = useState(0)
  const [isDeleting, setIsDeleting]   = useState(false)
  const [glitching, setGlitching]     = useState(false)
  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── typing effect ──────────────────────────────────────── */
  useEffect(() => {
    const role  = ROLES[roleIndex]
    const speed = isDeleting ? 45 : 85

    if (!isDeleting && displayText === role) {
      timer.current = setTimeout(() => setIsDeleting(true), 2200)
      return
    }

    if (isDeleting && displayText === '') {
      timer.current = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex(i => (i + 1) % ROLES.length)
      }, speed)
      return
    }

    timer.current = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? role.slice(0, displayText.length - 1)
          : role.slice(0, displayText.length + 1)
      )
    }, speed)

    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [displayText, roleIndex, isDeleting])

  /* ── periodic glitch on "Hesham" ────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 200)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  /* ── split heading to target "Hesham" for glitch ─── */
  const firstPart = "Hi, I'm "
  const lastWord  = 'Hesham'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000000]">

      {/* Dot-grid */}
      <div className="dot-grid absolute inset-0 opacity-40" />

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">

        {/* Badge with pulse dot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8
                     bg-[#A855F7]/[0.08] border border-[#A855F7]/25 text-[#A855F7] text-xs font-semibold tracking-wide uppercase"
        >
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
          Open to opportunities
        </motion.div>

        {/* Name with scramble + glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white mb-4"
        >
          {firstPart}
          <span
            className={`glitch-text gradient-text${glitching ? ' glitching' : ''}`}
            data-text={lastWord}
          >
            {lastWord}
          </span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-1 min-h-[2.75rem] mb-5"
        >
          <span className="text-[clamp(1.1rem,3.5vw,1.75rem)] font-semibold text-slate-300 tracking-tight">
            {displayText}
          </span>
          <span className="cursor-blink inline-block w-[2px] h-7 sm:h-8 bg-[#A855F7] rounded-full ml-0.5" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto leading-relaxed mb-10"
        >
          I build clean, fast, and responsive web experiences that leave a lasting impression.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-shine group relative px-7 py-3 rounded-xl font-semibold text-sm tracking-wide cursor-pointer
                       bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white
                       hover:from-[#B76FF9] hover:to-[#A855F7]
                       shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:shadow-[0_0_36px_rgba(168,85,247,0.55)]
                       transition-all duration-200"
          >
            View My Work
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
          </MagneticButton>

          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm tracking-wide
                       border border-[#A855F7]/25 text-slate-300
                       hover:border-[#A855F7]/50 hover:text-[#C084FC] hover:bg-[#A855F7]/[0.06]
                       transition-all duration-200"
          >
            <DownloadIcon />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          {[
            { label: 'GitHub',   href: 'https://github.com/hesham1404',       icon: <GithubIcon /> },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/amshesham04/', icon: <LinkedInIcon /> },
            { label: 'Email',    href: 'mailto:salihesham04@gmail.com',         icon: <EmailIcon /> },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded-lg
                         text-slate-500 hover:text-[#A855F7] hover:bg-[#A855F7]/[0.08]
                         border border-transparent hover:border-[#A855F7]/25
                         transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#A855F7]/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
