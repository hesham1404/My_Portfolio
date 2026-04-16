'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const LiquidMesh = dynamic(() => import('./LiquidMesh'), { ssr: false })

export default function ClientEffects() {
  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = String(event.reason?.message ?? event.reason ?? '')
      const stack = String(event.reason?.stack ?? '')

      if (
        message.includes('Failed to connect to MetaMask') &&
        stack.includes('chrome-extension://')
      ) {
        event.preventDefault()
      }
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection)
    return () => window.removeEventListener('unhandledrejection', onUnhandledRejection)
  }, [])

  return <LiquidMesh />
}
