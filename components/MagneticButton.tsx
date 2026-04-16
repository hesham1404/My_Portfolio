'use client'

import React, { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouch.current) return

    const el = ref.current
    if (!el) return

    const RADIUS  = 60
    const PULL    = 0.3

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < RADIUS) {
        gsap.to(el, {
          x: dx * PULL,
          y: dy * PULL,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {children}
    </button>
  )
}
