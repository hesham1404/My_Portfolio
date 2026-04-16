'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import MagneticButton from './MagneticButton'

const INPUT_CLASS = `
  w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600
  bg-white/[0.04] border border-white/[0.08]
  focus:outline-none focus:border-[#A855F7]/40 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#A855F7]/10
  transition-all duration-200
`.trim()

type FormState = {
  name: string
  email: string
  message: string
}

function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const button = e.currentTarget
  const rect = button.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const ripple = document.createElement('span')

  Object.assign(ripple.style, {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    width: '10px',
    height: '10px',
    top: `${y - 5}px`,
    left: `${x - 5}px`,
    animation: 'ripple-expand 0.6s ease-out forwards',
    pointerEvents: 'none',
  })

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 650)
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    if (status !== 'idle') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.')
      }

      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message.')
    }
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText('salihesham04@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#A855F7]/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div ref={ref} className="mb-14">
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A855F7]"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            Contact
          </motion.p>
          <motion.h2
            className="mb-3 text-4xl font-bold text-white sm:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Let&apos;s Work Together
          </motion.h2>
          <motion.p
            className="max-w-sm text-[15px] text-slate-500"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have a project or just want to say hello? I&apos;d love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="space-y-4"
          >
            <div className="glass card-glow group flex items-center gap-4 rounded-xl p-4">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:[transform:rotate(360deg)]"
                style={{ background: '#A855F712', color: '#A855F7', border: '1px solid #A855F725' }}
              >
                <EmailIcon />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-600">Email</p>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:salihesham04@gmail.com"
                    className="truncate text-[13px] text-slate-300 transition-colors duration-200 hover:text-white"
                  >
                    salihesham04@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    title="Copy email"
                    className="flex-shrink-0 cursor-pointer text-slate-600 transition-colors duration-200 hover:text-[#A855F7]"
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>
              </div>
            </div>

            <div className="glass card-glow group flex items-center gap-4 rounded-xl p-4">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:[transform:rotate(360deg)]"
                style={{ background: '#A855F712', color: '#A855F7', border: '1px solid #A855F725' }}
              >
                <LinkedInIcon />
              </div>
              <div className="min-w-0">
                <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-600">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/amshesham04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-[13px] text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  linkedin.com/in/amshesham04
                </a>
              </div>
            </div>

            <div className="glass card-glow group flex items-center gap-4 rounded-xl p-4">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:[transform:rotate(360deg)]"
                style={{ background: '#A855F712', color: '#A855F7', border: '1px solid #A855F725' }}
              >
                <GithubIcon />
              </div>
              <div className="min-w-0">
                <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-600">GitHub</p>
                <a
                  href="https://github.com/hesham1404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-[13px] text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  github.com/amshesham04
                </a>
              </div>
            </div>

            <div className="glass card-glow group flex items-center gap-4 rounded-xl p-4">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:[transform:rotate(360deg)]"
                style={{ background: '#A855F712', color: '#A855F7', border: '1px solid #A855F725' }}
              >
                <LocationIcon />
              </div>
              <div className="min-w-0">
                <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-600">Location</p>
                <p className="truncate text-[13px] text-slate-400">Nagercoil, Tamil Nadu, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <div className="glass overflow-hidden rounded-2xl">
              <div className="h-[2px] bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-transparent" />
              <form onSubmit={onSubmit} className="space-y-5 p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={onChange}
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={onChange}
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={onChange}
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-[#FCA5A5]">{errorMessage}</p>
                )}

                <MagneticButton
                  type="submit"
                  disabled={status === 'sending'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    if (status !== 'sending') addRipple(e)
                  }}
                  className="btn-shine relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r
                             from-[#A855F7] to-[#9333EA] py-3 text-sm font-semibold tracking-wide text-white
                             shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200
                             hover:from-[#B76FF9] hover:to-[#A855F7]
                             hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]
                             disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'sending' && (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
                      Sending...
                    </span>
                  )}
                  {status === 'sent' && 'Message sent successfully'}
                  {status === 'error' && 'Try Again'}
                  {status === 'idle' && 'Send Message ->'}
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border
                       border-[#A855F7]/30 bg-[#1a0a2e] px-4 py-3 text-sm font-medium text-white
                       shadow-xl shadow-[#A855F7]/10"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A855F7]/20 text-xs text-[#A855F7]">
              OK
            </span>
            Email copied!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 4-1.23 4-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
