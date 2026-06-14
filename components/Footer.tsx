'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.04] pt-14 pb-10 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Top row — logo + nav */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-8 border-b border-white/[0.04]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group cursor-pointer flex items-center gap-1"
          >
            <span className="font-extrabold text-base text-white group-hover:text-[#A855F7] transition-colors duration-200 tracking-tight">
              Hesham
            </span>
            <span className="text-[#A855F7] font-extrabold text-base">.</span>
          </button>

          <nav className="flex items-center gap-6">
            {['About', 'Experience', 'Projects', 'Contact'].map(item => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[12px] font-medium text-slate-600 hover:text-slate-300 transition-colors duration-200 cursor-pointer uppercase tracking-wider"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/amshesham04/', icon: <LinkedInIcon /> },
              { label: 'GitHub',   href: 'https://github.com/amshesham04',       icon: <GitHubIcon   /> },
              { label: 'Email',    href: 'mailto:salihesham04@gmail.com',         icon: <EmailIcon    /> },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           text-slate-700 hover:text-[#A855F7] hover:bg-[#A855F7]/[0.08]
                           border border-white/[0.04] hover:border-[#A855F7]/20
                           transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-700">
            © {year} Mohamed Sali Hesham A. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-700 flex items-center gap-1.5">
            Built with
            <span className="text-[#A855F7]/60 text-[9px]">✦</span>
            Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
