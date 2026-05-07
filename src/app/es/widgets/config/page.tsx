'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { getCalculadora } from '@/lib/constants/calculadoras'
import { CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { BRAND_URL } from '@/lib/constants/branding'

export default function WidgetConfigSpanishPage() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug') || 'rescisao'
  const calculadora = getCalculadora(slug)
  const esCalc = CALCULADORAS_ES[slug]

  const [width, setWidth] = useState('100%')
  const [height, setHeight] = useState('600')

  if (!calculadora) {
    return (
      <div className="container-app py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Calculadora no encontrada</h1>
        <Link href="/es/widgets" className="text-accent hover:underline">Volver a Widgets</Link>
      </div>
    )
  }

  const embedUrl = `${BRAND_URL}/es/embed/${calculadora.categoriaSlug}/${calculadora.slug}`
  const embedCode = `<iframe 
  src="${embedUrl}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  scrolling="no"
></iframe>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    alert('¡Código copiado con éxito!')
  }

  return (
    <div className="container-app py-12">
      <div className="mb-8">
        <Link href="/es/widgets" className="text-sm text-slate-500 hover:text-accent flex items-center gap-2 mb-4">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Volver a la Selección
        </Link>
        <h1 className="text-3xl font-bold text-navy dark:text-white">Configurar Widget: {esCalc?.nome ?? calculadora.nome}</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold mb-6 text-navy dark:text-white">Opciones de Visualización</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Ancho (px o %)</label>
                <input 
                  type="text" 
                  value={width} 
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Altura (px)</label>
                <input 
                  type="text" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-slate-900 p-6 rounded-2xl shadow-xl text-slate-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Código de Integración</h2>
              <button 
                onClick={copyToClipboard}
                className="text-xs font-bold text-accent hover:text-white transition-colors"
              >
                Copiar Código
              </button>
            </div>
            <pre className="font-mono text-xs leading-relaxed overflow-x-auto p-4 bg-black/30 rounded-xl border border-white/5">
              {embedCode}
            </pre>
            <p className="mt-4 text-[10px] text-slate-500 italic">
              * Pegue este código en el HTML de su sitio donde desea que aparezca la calculadora.
            </p>
          </section>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Vista Previa del Widget</h2>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-inner min-h-[600px] flex items-center justify-center">
             <iframe 
               src={embedUrl} 
               width={width} 
               height={height} 
               style={{ border: 'none' }}
               title="Preview"
             ></iframe>
          </div>
          <p className="text-center text-xs text-slate-500">
            La vista previa puede variar según el tema de su sitio.
          </p>
        </div>
      </div>
    </div>
  )
}
