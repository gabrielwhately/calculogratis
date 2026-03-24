import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Calculo Gratis - Calculadoras Online Gratis', template: '%s | Calculo Gratis' },
  description: 'Calculadoras e simuladores online gratis. Rescisao, salario liquido, financiamento, juros, aposentadoria e mais.',
  metadataBase: new URL('https://calculogratis.com'),
  openGraph: { siteName: 'Calculo Gratis', locale: 'pt_BR', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
