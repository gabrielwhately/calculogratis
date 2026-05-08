'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getSavedResults, deleteSavedResult, clearSavedResults, SavedResult } from '@/lib/saved-results'

const I18N = {
  pt: {
    title: 'Meu Histórico',
    emptyTitle: 'Nenhum cálculo salvo ainda',
    emptyDesc: 'Ao realizar um cálculo, clique no ícone de salvar para guardar o resultado aqui.',
    clearAll: 'Limpar histórico',
    delete: 'Remover',
    date: 'Data:',
    back: 'Voltar para Calculadoras',
    confirmClear: 'Tem certeza que deseja limpar todo o histórico?'
  },
  es: {
    title: 'Mi Historial',
    emptyTitle: 'Aún no hay cálculos guardados',
    emptyDesc: 'Al realizar un cálculo, haz clic en el icono de guardar para almacenar el resultado aquí.',
    clearAll: 'Limpiar historial',
    delete: 'Eliminar',
    date: 'Fecha:',
    back: 'Volver a Calculadoras',
    confirmClear: '¿Estás seguro de que quieres borrar todo el historial?'
  }
}

export default function HistoricoPage() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  const homePath = isSpanish ? '/es' : '/'

  const [results, setResults] = useState<SavedResult[]>([])
  
  useEffect(() => { 
    setResults(getSavedResults()) 
  }, [])

  const handleDelete = (id: string) => {
    const updated = deleteSavedResult(id)
    setResults(updated)
  }

  const handleClear = () => {
    if (confirm(t.confirmClear)) {
      clearSavedResults()
      setResults([])
    }
  }

  return (
    <div className="container-app py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">{t.title}</h1>
        {results.length > 0 && (
          <button 
            onClick={handleClear}
            className="text-xs font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          >
            {t.clearAll}
          </button>
        )}
      </div>
      
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-navy dark:text-white mb-2">{t.emptyTitle}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-6">{t.emptyDesc}</p>
          <Link href={homePath} className="inline-flex items-center px-6 py-3 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-xl transition-all hover:scale-105">
            {t.back}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {results.map(r => (
            <div key={r.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6 relative group">
              <button 
                onClick={() => handleDelete(r.id)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors"
                title={t.delete}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <div className="mb-4">
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{r.title}</p>
                <p className="text-3xl font-bold text-navy dark:text-white">{r.mainValue}</p>
                <p className="text-sm text-slate-500">{r.mainLabel}</p>
              </div>

              {r.items.length > 0 && (
                <div className="grid gap-2 border-t border-slate-100 dark:border-slate-700 pt-4 mb-4">
                  {r.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-slate-500">{item.label}</span>
                      <span className={item.highlight ? 'font-bold text-navy dark:text-white' : 'text-slate-700 dark:text-slate-300'}>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>{t.date} {new Date(r.date).toLocaleString(isSpanish ? 'es-ES' : 'pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
