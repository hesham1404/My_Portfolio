'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const glow = glowRef.current
    if (!glow) return

    glow.style.opacity = '1'

    const onMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`
      glow.style.top  = `${e.clientY}px`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={glowRef}
      id="cursor-glow"
      style={{ opacity: 0, left: '-9999px', top: '-9999px' }}
    />
  )
}
