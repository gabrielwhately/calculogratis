'use client'

import { usePathname } from 'next/navigation'
import { BRAND_DOMAIN, BRAND_TAGLINE } from '@/lib/constants/branding'

const I18N = {
  pt: {
    brand: BRAND_DOMAIN,
    tagline: BRAND_TAGLINE,
    generatedOn: 'Relatório gerado em:',
  },
  es: {
    brand: BRAND_DOMAIN,
    tagline: BRAND_TAGLINE,
    generatedOn: 'Informe generado en:',
  }
}

export function PrintHeader() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  
  const date = new Date().toLocaleString(isSpanish ? 'es-ES' : 'pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  })

  return (
    <div className="hidden print:block mb-8">
      <div className="flex justify-between items-end border-b-2 border-navy pb-4">
        <div>
          <h1 className="text-2xl font-bold text-navy uppercase tracking-tight">{t.brand}</h1>
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
