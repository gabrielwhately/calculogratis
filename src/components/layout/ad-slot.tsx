'use client'

import { useEffect, useRef } from 'react'

interface AdSlotProps { position: 'after-result' | 'mid-content' | 'footer' | 'sidebar'; className?: string }

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

export function AdSlot({ position, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (!AD_CLIENT || initialized.current) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle as unknown[]
      if (adsbygoogle) {
        adsbygoogle.push({})
        initialized.current = true
      }
    } catch {
      // AdSense not loaded
    }
  }, [])

  if (!AD_CLIENT) {
    return (
      <div className={`my-6 flex items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-400 dark:text-slate-500 ${className}`}
        data-ad-position={position} aria-hidden="true">Espaco publicitario</div>
    )
  }

  return (
    <div className={`my-6 min-h-[90px] ${className}`} data-ad-position={position}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={position}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
