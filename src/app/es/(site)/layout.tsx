import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Footer } from "@/components/layout/footer"
import { PrintHeader } from "@/components/layout/print-header"
import { ThemeScript } from "@/components/layout/theme-script"
import { SkipToContent } from "@/components/layout/skip-to-content"
import { Providers } from "@/components/layout/providers"
import { BRAND_NAME, BRAND_URL } from "@/lib/constants/branding"
import "../../globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })

export const metadata: Metadata = {
  title: { default: `${BRAND_NAME} — Calculadoras y Simuladores Online`, template: `%s | ${BRAND_NAME}` },
  description: "Calculadoras y simuladores online gratis: liquidación laboral, salario neto, interés compuesto, financiamiento, IMC, jubilación y más de 50 herramientas. Sin registro, resultados instantáneos.",
  keywords: "calculadora online, simulador online, calculadora gratis, herramientas online",
  openGraph: { siteName: BRAND_NAME, locale: "es", type: "website" },
  alternates: {
    canonical: `${BRAND_URL}/es`,
    languages: { "pt-BR": BRAND_URL, "es": `${BRAND_URL}/es` },
  },
}

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
