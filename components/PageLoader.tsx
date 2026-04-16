'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #6D28D9 100%)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-white font-extrabold text-3xl tracking-tight"
          >
            Hesham
            <span className="text-white/50">.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
