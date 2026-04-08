import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Footer } from '@/components/layout/footer'
import { ThemeScript } from '@/components/layout/theme-script'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Analytics } from '@/components/layout/analytics'
import { ServiceWorkerRegister } from '@/components/layout/sw-register'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', preload: true })

export const metadata: Metadata = {
  title: { default: 'Cálculo Grátis — Calculadoras e Simuladores Online', template: '%s | Cálculo Grátis' },
  description: 'Calculadoras e simuladores online grátis: rescisão trabalhista, salário líquido, juros compostos, financiamento, IMC, aposentadoria e mais de 50 ferramentas. Sem cadastro, resultados instantâneos.',
  metadataBase: new URL('https://calculogratis.com'),
  keywords: 'calculadora online, simulador online, calculadora grátis, ferramentas online, cálculos trabalhistas, cálculos financeiros',
  openGraph: { siteName: 'Cálculo Grátis', locale: 'pt_BR', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none">
            Pular para conteúdo principal
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen pb-20 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <Analytics />
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  )
}
