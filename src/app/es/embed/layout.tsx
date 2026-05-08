import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/layout/providers"
import "../../globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true })

export const metadata: Metadata = {
  title: "Calculo Gratis Embed",
  robots: "noindex, nofollow",
}

export default function EmbedLayoutES({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-transparent`}>
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
