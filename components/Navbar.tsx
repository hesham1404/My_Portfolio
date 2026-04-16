'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Education',  href: '#education'  },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      let current = ''
      for (const { href } of NAV_LINKS) {
        const el = document.getElementById(href.slice(1))
        if (el && window.scrollY >= el.offsetTop - 130) current = href.slice(1)
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 inset-x-0 z-50 overflow-hidden"
    >
      {/* Backdrop bar */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '0.5px solid rgba(168,85,247,0.2)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
        }}
      />

      <nav
        className="relative max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between transition-all duration-300 w-full"
        style={{ height: scrolled ? '52px' : '64px' }}
      >

        {/* ── Logo ── */}
        <MagneticButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group cursor-pointer bg-transparent border-0 p-0"
        >
          <span className="font-bold text-[15px] tracking-tight text-white group-hover:text-[#A855F7] transition-colors duration-200">
            Hesham
          </span>
          <span className="text-[#A855F7] font-bold text-[15px]">.</span>
        </MagneticButton>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.07]">
          {NAV_LINKS.map(({ label, href }) => {
            const active = activeSection === href.slice(1)
            return (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer nav-link-hover"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(168,85,247,0.15)',
                        border: '1px solid rgba(168,85,247,0.25)',
                        boxShadow: '0 0 12px rgba(168,85,247,0.2)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className={`relative transition-colors duration-200 ${active ? 'text-[#A855F7]' : 'text-slate-400 hover:text-slate-200'}`}>
                    {label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden relative px-5 pb-4 pt-2"
            style={{
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '0.5px solid rgba(168,85,247,0.15)',
            }}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const active = activeSection === href.slice(1)
                return (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        active
                          ? 'text-[#A855F7] bg-[#A855F7]/10 border border-[#A855F7]/15'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
