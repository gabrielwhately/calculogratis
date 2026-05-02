'use client'

import { usePathname } from 'next/navigation'

const I18N = {
  pt: {
    brand: 'CalculoGratis.com',
    tagline: 'Calculadoras e simuladores online grátis',
    generatedOn: 'Relatório gerado em:',
  },
  es: {
    brand: 'CalculoGratis.com',
    tagline: 'Calculadoras y simuladores online gratis',
    generatedOn: 'Informe generado el:',
  }
}

export function PrintHeader() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  
  const date = new Date().toLocaleDateString(isSpanish ? 'es-ES' : 'pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="hidden print:flex pt-8 flex-col border-b-2 border-navy pb-4 mb-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-navy">
            Calculo<span className="text-blue-600">Gratis</span>.com
          </h1>
          <p className="text-xs text-slate-500 font-medium">{t.tagline}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.generatedOn}</p>
          <p className="text-xs text-navy font-medium">{date}</p>
        </div>
      </div>
    </div>
  )
}
