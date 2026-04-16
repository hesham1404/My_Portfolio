'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.05] py-10 overflow-hidden">
      {/* Subtle top line glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group cursor-pointer"
          >
            <span className="font-bold text-sm text-white group-hover:text-[#A855F7] transition-colors duration-200">
              Hesham
            </span>
            <span className="text-[#A855F7] font-bold text-sm">.</span>
          </button>

          {/* Copyright */}
          <p className="text-xs text-slate-600 order-last sm:order-none">
            © {year} Mohamed Sali Hesham A. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
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
                           text-slate-600 hover:text-[#A855F7] hover:bg-[#A855F7]/[0.08]
                           border border-transparent hover:border-[#A855F7]/20
                           transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
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
