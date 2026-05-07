'use client'

import { ThemeProvider } from './theme-provider'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from './analytics'
import { ServiceWorkerRegister } from './sw-register'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
        <Analytics />
        <ServiceWorkerRegister />
      </ToastProvider>
    </ThemeProvider>
  )
}
