'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

interface Project {
  title: string
  description: string
  bullets: string[]
  stack: string[]
  github: string
  live?: string
  featured?: boolean
  gradient: string
}

const PROJECTS: Project[] = [
  {
    title: 'Virtual Mouse Website',
    description:
      'Real-time hand gesture control system for touch-free computer interaction using computer vision.',
    bullets: [
      'Built a real-time hand gesture system for touch-free computer interaction using OpenCV and MediaPipe.',
      'Translated webcam-tracked gestures into accurate mouse controls with PyAutoGUI through a Flask interface.',
    ],
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Flask', 'PyAutoGUI'],
    github: 'https://github.com/amshesham04',
    featured: true,
    gradient: 'from-[#A855F7]/15 via-[#7C3AED]/8 to-transparent',
  },
  {
    title: 'Blockchain Certificate Verification',
    description:
      'Blockchain-based system to securely verify academic certificates and prevent forgery.',
    bullets: [
      'Implemented Merkle Tree hashing to keep certificate records tamper-proof and verifiable.',
      'Built Solidity smart contracts and a responsive verification flow with upload and QR-based validation.',
    ],
    stack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Next.js (API)', 'Solidity', 'Ethereum', 'Ganache', 'Truffle'],
    github: 'https://github.com/amshesham04',
    gradient: 'from-[#C084FC]/12 via-[#A855F7]/6 to-transparent',
  },
  {
    title: 'Promark - Blockchain Proximity Marketing',
    description:
      'Blockchain-based proximity marketing system for delivering targeted ads with user consent.',
    bullets: [
      'Implemented a token-based reward system with smart contracts for secure, consent-driven ad engagement.',
      'Designed role-based workflows and a responsive interface for advertisers, agents, and customers.',
    ],
    stack: ['React.js', 'JavaScript', 'Tailwind CSS', 'Next.js', 'Solidity', 'Ethereum', 'Ganache', 'Truffle'],
    github: 'https://github.com/amshesham04',
    gradient: 'from-[#7C3AED]/15 via-[#A855F7]/8 to-transparent',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const innerRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.015)`
    if (shineRef.current) {
      shineRef.current.style.opacity = '1'
      shineRef.current.style.background =
        `linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 60%), ` +
        `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(192,132,252,0.12) 0%, transparent 60%)`
    }
  }

  const onMouseLeave = () => {
    const el = innerRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
    if (shineRef.current) {
      shineRef.current.style.opacity = '0'
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="animated-border-wrap h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={innerRef} className="animated-border-inner tilt-card group">
        <div
          className="glass relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-[17px]"
          style={{ border: 'none' }}
        >
          <div
            ref={shineRef}
            className="pointer-events-none absolute inset-0 z-10 rounded-[17px] transition-opacity duration-200"
            style={{ opacity: 0 }}
          />

          <div className={`pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${project.gradient}`} />

          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span
                className="rounded-full border border-[#A855F7]/50 bg-[#A855F7]/80 px-2 py-0.5 text-[10px]
                           font-bold uppercase tracking-wider text-white"
              >
                Featured
              </span>
            </div>
          )}

          <div className="relative flex flex-1 flex-col p-6">
            <div
              className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl glass text-slate-500
                         transition-all duration-300 group-hover:border-[#A855F7]/20 group-hover:text-[#A855F7]"
            >
              <CodeIcon />
            </div>

            <h3
              className="mb-3 pr-14 text-[17px] font-bold leading-snug text-white
                         transition-colors duration-200 group-hover:text-[#C084FC]"
            >
              {project.title}
            </h3>

            <ul className="mb-5 flex-1 space-y-2">
              {project.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-400">
                  <span className="mt-[5px] h-1 w-1 flex-shrink-0 rounded-full bg-[#A855F7]" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ y: 0 }}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: techIndex * 0.04 }}
                  className="cursor-default rounded-full border border-[#A855F7]/20 bg-[#A855F7]/8 px-2.5 py-0.5
                             text-[11px] font-semibold text-[#A855F7]"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="mb-2 h-5 overflow-hidden">
              <div
                className="flex items-center gap-1 text-[12px] font-semibold text-[#A855F7]
                           translate-y-3 opacity-0 transition-all duration-300
                           group-hover:translate-y-0 group-hover:opacity-100"
              >
                View Project -&gt;
              </div>
            </div>

            <div className="mt-auto flex items-center gap-4 border-t border-white/[0.05] pt-4">
              <MagneticButton
                onClick={() => window.open(project.github, '_blank')}
                className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[13px]
                           text-slate-500 transition-colors duration-200 hover:text-[#A855F7]"
              >
                <GithubIcon />
                <span>Source</span>
              </MagneticButton>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[13px] text-slate-500
                             transition-colors duration-200 hover:text-[#A855F7]"
                >
                  <ExternalIcon />
                  <span>Live</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div ref={ref}>
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A855F7]"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            Projects
          </motion.p>
          <motion.h2
            className="mb-3 text-[1.75rem] font-bold text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Things I&apos;ve Built
          </motion.h2>
          <motion.p
            className="mb-14 max-w-md text-[15px] text-slate-500"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Projects that showcase my approach to solving real problems with clean code.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/amshesham04"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors duration-200 hover:text-[#A855F7]"
          >
            <GithubIcon />
            <span>View all on GitHub</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">-&gt;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
