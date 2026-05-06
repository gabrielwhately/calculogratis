import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { ToastProvider } from '@/components/ui/toast'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true })

export const metadata: Metadata = {
  title: 'Calculo Gratis Embed',
  robots: 'noindex, nofollow',
}

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-transparent`}>
        <ThemeProvider>
          <ToastProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
