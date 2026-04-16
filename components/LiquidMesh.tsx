'use client'

import { useEffect, useRef } from 'react'

interface BlobDef {
  cx: number
  cy: number
  rx: number
  ry: number
  r: number
  color: string
  tx: number
  ty: number
  sx: number
  sy: number
}

export default function LiquidMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const createBlobs = (): BlobDef[] => [
      { cx: W * 0.15, cy: H * 0.25, rx: 90,  ry: 110, r: 500, color: '#4C1D95', tx: 0,   ty: 0.5, sx: 0.0005, sy: 0.0004 },
      { cx: W * 0.80, cy: H * 0.75, rx: 110, ry: 80,  r: 400, color: '#6D28D9', tx: 1.5, ty: 0,   sx: 0.0004, sy: 0.0006 },
      { cx: W * 0.50, cy: H * 0.50, rx: 130, ry: 90,  r: 350, color: '#7C3AED', tx: 2.5, ty: 1.5, sx: 0.0006, sy: 0.0005 },
      { cx: W * 0.75, cy: H * 0.15, rx: 95,  ry: 115, r: 450, color: '#2E1065', tx: 1,   ty: 2,   sx: 0.0003, sy: 0.0004 },
    ]

    let blobs = isMobile ? createBlobs().slice(0, 2) : createBlobs()
    const opacity = isMobile ? 0.2 : 0.35

    let t = 0
    let rafId = 0
    let paused = false

    const draw = () => {
      if (paused) return
      rafId = requestAnimationFrame(draw)
      t += 1

      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.globalCompositeOperation = 'screen'

      for (const b of blobs) {
        const x = b.cx + Math.sin(t * b.sx + b.tx) * b.rx
        const y = b.cy + Math.cos(t * b.sy + b.ty) * b.ry

        const grd = ctx.createRadialGradient(x, y, 0, x, y, b.r)
        grd.addColorStop(0,   b.color)
        grd.addColorStop(0.4, b.color + 'aa')
        grd.addColorStop(1,   'transparent')

        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(x, y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    draw()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      blobs = isMobile ? createBlobs().slice(0, 2) : createBlobs()
    }

    const onVisibility = () => {
      paused = document.hidden
      if (!paused) draw()
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
