'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useState, Suspense } from 'react'
import { getCalculadora } from '@/lib/constants/calculadoras'
import { BRAND_URL } from '@/lib/constants/branding'

function WidgetConfigContent() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug') || 'rescisao'
  const calculadora = getCalculadora(slug)

  const [width, setWidth] = useState('100%')
  const [height, setHeight] = useState('600')
  const [theme, setTheme] = useState('light')

  if (!calculadora) {
    return (
      <div className="container-app py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Calculadora não encontrada</h1>
        <Link href="/widgets" className="text-accent hover:underline">Voltar para Widgets</Link>
      </div>
    )
  }

  const embedUrl = `${BRAND_URL}/embed/${calculadora.categoriaSlug}/${calculadora.slug}?theme=${theme}`
  const embedCode = `<iframe 
  src="${embedUrl}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  scrolling="no"
></iframe>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    alert('Código copiado com sucesso!')
  }

  return (
    <div className="container-app py-12">
      <div className="mb-8">
        <Link href="/widgets" className="text-sm text-slate-500 hover:text-accent flex items-center gap-2 mb-4">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Voltar para Seleção
        </Link>
        <h1 className="text-3xl font-bold text-navy dark:text-white">Configurar Widget: {calculadora.nome}</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold mb-6 text-navy dark:text-white">Opções de Visualização</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Tema</label>
                <div className="flex gap-2">
                  {['light', 'dark', 'navy'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${theme === t ? 'bg-accent border-accent text-navy' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Largura (px ou %)</label>
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Código de Integração</h2>
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
              * Cole este código no HTML do seu site onde deseja que a calculadora apareça.
            </p>
          </section>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Prévia do Widget</h2>
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
            A prévia pode variar dependendo do tema do seu site.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WidgetConfigPage() {
  return (
    <Suspense fallback={<div className="container-app py-12 text-center">Carregando configurador...</div>}>
      <WidgetConfigContent />
    </Suspense>
  )
}
