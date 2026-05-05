import type { Metadata } from 'next'
import { BRAND_NAME, BRAND_URL } from '@/lib/constants/branding'

export const metadata: Metadata = {
  title: { default: `${BRAND_NAME} — Calculadoras y Simuladores Online`, template: `%s | ${BRAND_NAME}` },
  description: 'Calculadoras y simuladores online gratis: liquidación laboral, salario neto, interés compuesto, financiamiento, IMC, jubilación y más de 50 herramientas. Sin registro, resultados instantáneos.',
  keywords: 'calculadora online, simulador online, calculadora gratis, herramientas online',
  openGraph: { siteName: BRAND_NAME, locale: 'es', type: 'website' },
  alternates: {
    canonical: `${BRAND_URL}/es`,
    languages: { 'pt-BR': BRAND_URL, 'es': `${BRAND_URL}/es` },
  },
}

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return children
}
