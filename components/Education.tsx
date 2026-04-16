'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="relative pt-24 sm:pt-32 pb-12 sm:pb-[60px]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A855F7]">
            Education
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">Academic Background</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="glass card-glow card-top-border overflow-hidden rounded-2xl"
        >
          <div className="h-[2px] bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-transparent" />

          <div className="p-7 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="glass flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-[#A855F7]">
                <GraduationIcon />
              </div>

              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full border border-[#A855F7]/25 bg-[#A855F7]/10 px-2.5 py-0.5 text-[11px]
                               font-bold uppercase tracking-wider text-[#C084FC]"
                  >
                    Completed
                  </span>
                </div>

                <h3 className="mb-1 text-xl font-bold leading-snug text-white">
                  Bachelor of Engineering
                </h3>
                <p className="mb-1 text-sm font-semibold text-[#C084FC]">
                  Computer Science and Engineering
                </p>
                <p className="mb-6 text-sm text-slate-500">
                  Rohini College of Engineering &amp; Technology, Kanyakumari
                </p>

                <div className="max-w-[260px]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">CGPA</span>
                    <span className="text-sm font-bold text-[#A855F7]">7.9 / 10.0</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '79%' } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#A855F7] to-[#C084FC]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function GraduationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}
