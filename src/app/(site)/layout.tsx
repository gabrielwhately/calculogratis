import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Footer } from "@/components/layout/footer"
import { PrintHeader } from "@/components/layout/print-header"
import { ThemeScript } from "@/components/layout/theme-script"
import { SkipToContent } from "@/components/layout/skip-to-content"
import { Providers } from "@/components/layout/providers"
import { BRAND_NAME, BRAND_URL, BRAND_TAGLINE } from "@/lib/constants/branding"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })

export const metadata: Metadata = {
  title: { default: `${BRAND_NAME} — ${BRAND_TAGLINE}`, template: `%s | ${BRAND_NAME}` },
  description: "Calculadoras e simuladores online grátis: rescisão trabalhista, salário líquido, juros compostos, financiamento, IMC, aposentadoria e mais de 50 ferramentas. Sem cadastro, resultados instantâneos.",
  metadataBase: new URL(BRAND_URL),
  keywords: "calculadora online, simulador online, calculadora grátis, ferramentas online, cálculos trabalhistas, cálculos financeiros",
  openGraph: { siteName: BRAND_NAME, locale: "pt_BR", type: "website" },
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
        <Providers>
          <SkipToContent />
          <Navbar />
          <main id="main-content" className="min-h-screen pb-20 md:pb-0">
            <PrintHeader />
            {children}
          </main>
          <Footer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  )
}
