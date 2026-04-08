import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Cálculo Gratis — Calculadoras y Simuladores Online', template: '%s | Cálculo Gratis' },
  description: 'Calculadoras y simuladores online gratis: liquidación laboral, salario neto, interés compuesto, financiamiento, IMC, jubilación y más de 50 herramientas. Sin registro, resultados instantáneos.',
  keywords: 'calculadora online, simulador online, calculadora gratis, herramientas online',
  openGraph: { siteName: 'Cálculo Gratis', locale: 'es', type: 'website' },
  alternates: {
    canonical: 'https://calculogratis.com/es',
    languages: { 'pt-BR': 'https://calculogratis.com', 'es': 'https://calculogratis.com/es' },
  },
}

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return children
}
