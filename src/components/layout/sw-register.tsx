'use client'

import { useEffect } from 'react'
import { useToast } from '@/components/ui/toast'
import { usePathname } from 'next/navigation'

const I18N = {
  pt: 'Nova versão disponível! Recarregue para atualizar.',
  es: '¡Nueva versión disponible! Recargue para actualizar.',
}

export function ServiceWorkerRegister() {
  const { showToast } = useToast()
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const message = isSpanish ? I18N.es : I18N.pt

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showToast(message, 'info')
              }
            })
          }
        })
      }).catch(() => {
        // SW registration failed — non-critical
      })
    }
  }, [showToast, message])
  return null
}
