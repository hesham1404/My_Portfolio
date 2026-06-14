'use client'

const ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
  'REST APIs', 'Prisma ORM', 'Tailwind CSS', 'Git', 'Vercel',
  'Python', 'Blockchain', 'Solidity', 'OpenAI GPT',
]

export default function MarqueeBanner() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] py-4 bg-[#030007]/40">
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="marquee-track flex items-center gap-0 w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 whitespace-nowrap hover:text-slate-400 transition-colors duration-200 cursor-default">
              {item}
            </span>
            <span className="text-[#A855F7]/30 text-[10px] select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
