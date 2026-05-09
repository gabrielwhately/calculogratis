'use client'

import { useState, useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getFavorites } from '@/lib/favorites'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { Card } from '@/components/ui/card'
import { getSavedResults, deleteSavedResult, clearSavedResults, SavedResult } from '@/lib/saved-results'
import { Icons } from '@/components/ui/icons'

const I18N = {
  pt: {
    title: 'Meus Itens Salvos',
    tabFavorites: 'Favoritos',
    tabHistory: 'Histórico',
    favEmptyTitle: 'Nenhuma calculadora favoritada ainda',
    favEmptyDesc: 'Clique no ícone de coração nas calculadoras para salvar aqui seus cálculos mais usados.',
    histEmptyTitle: 'Nenhum cálculo salvo ainda',
    histEmptyDesc: 'Ao realizar um cálculo, clique no ícone de salvar para guardar o resultado aqui.',
    clearAll: 'Limpar histórico',
    delete: 'Remover',
    date: 'Data:',
    back: 'Voltar para Calculadoras',
    confirmClear: 'Tem certeza que deseja limpar todo o histórico?',
    loading: 'Carregando...'
  },
  es: {
    title: 'Mis Ítems Guardados',
    tabFavorites: 'Favoritos',
    tabHistory: 'Historial',
    favEmptyTitle: 'Aún no tienes calculadoras favoritas',
    favEmptyDesc: 'Haz clic en el icono del corazón en las calculadoras para guardar aquí tus cálculos más frecuentes.',
    histEmptyTitle: 'Aún no hay cálculos guardados',
    histEmptyDesc: 'Al realizar un cálculo, haz clic en el icono de guardar para almacenar el resultado aquí.',
    clearAll: 'Limpiar historial',
    delete: 'Eliminar',
    date: 'Fecha:',
    back: 'Volver a Calculadoras',
    confirmClear: '¿Estás seguro de que quieres borrar todo el historial?',
    loading: 'Cargando...'
  }
}

export default function SalvosPage() {
  return (
    <Suspense fallback={<div className="container-app py-8 animate-pulse text-slate-400">...</div>}>
      <SalvosContent />
    </Suspense>
  )
}

function SalvosContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  const prefix = isSpanish ? '/es' : ''
  
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>(
    (searchParams.get('tab') as 'favorites' | 'history') || 'favorites'
  )

  const [favSlugs, setFavSlugs] = useState<string[]>([])
  const [results, setResults] = useState<SavedResult[]>([])
  
  useEffect(() => { 
    setFavSlugs(getFavorites()) 
    setResults(getSavedResults())
  }, [])

  const handleTabChange = (tab: 'favorites' | 'history') => {
    setActiveTab(tab)
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tab)
    window.history.pushState({}, '', url)
  }

  const handleDeleteResult = (id: string) => {
    const updated = deleteSavedResult(id)
    setResults(updated)
  }

  const handleClearHistory = () => {
    if (confirm(t.confirmClear)) {
      clearSavedResults()
      setResults([])
    }
  }

  const favoritos = CALCULADORAS.filter(c => favSlugs.includes(c.slug)).map(c => {
    if (isSpanish) {
      const esCalc = CALCULADORAS_ES[c.slug]
      return {
        ...c,
        nome: esCalc?.nome ?? c.nome,
        descricao: esCalc?.descricao ?? c.descricao
      }
    }
    return c
  })

  return (
    <div className="container-app py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-navy dark:text-white mb-8">{t.title}</h1>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
        <button
          onClick={() => handleTabChange('favorites')}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 -mb-[2px] ${
            activeTab === 'favorites' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Icons.Heart className={`h-4 w-4 ${activeTab === 'favorites' ? 'fill-current' : ''}`} />
            {t.tabFavorites}
            {favoritos.length > 0 && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full text-[10px]">
                {favoritos.length}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => handleTabChange('history')}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 -mb-[2px] ${
            activeTab === 'history' 
              ? 'border-accent text-accent' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Icons.Clock className="h-4 w-4" />
            {t.tabHistory}
            {results.length > 0 && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full text-[10px]">
                {results.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="animate-in fade-in duration-300">
        {activeTab === 'favorites' ? (
          favoritos.length === 0 ? (
            <EmptyState 
              icon={<Icons.Heart className="h-8 w-8 text-red-400" />}
              title={t.favEmptyTitle}
              desc={t.favEmptyDesc}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoritos.map(c => {
                const esCatSlug = CATEGORIAS_ES[c.categoriaSlug]?.slug ?? c.categoriaSlug
                return (
                  <Card 
                    key={c.slug} 
                    title={c.nome} 
                    description={c.descricao} 
                    href={`${prefix}/${isSpanish ? esCatSlug : c.categoriaSlug}/${c.slug}`} 
                  />
                )
              })}
            </div>
          )
        ) : (
          results.length === 0 ? (
            <EmptyState 
              icon={<Icons.Clock className="h-8 w-8 text-slate-400" />}
              title={t.histEmptyTitle}
              desc={t.histEmptyDesc}
              showButton
              btnText={t.back}
              btnHref={prefix || '/'}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button 
                  onClick={handleClearHistory}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                >
                  <Icons.Copy className="h-3 w-3" />
                  {t.clearAll}
                </button>
              </div>
              <div className="grid gap-6">
                {results.map(r => (
                  <div key={r.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6 relative group">
                    <button 
                      onClick={() => handleDeleteResult(r.id)}
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
            </div>
          )
        )}
      </div>
    </div>
  )
}

function EmptyState({ icon, title, desc, showButton, btnText, btnHref }: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string, 
  showButton?: boolean,
  btnText?: string,
  btnHref?: string
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center bg-slate-50/50 dark:bg-slate-900/50">
      <div className="mx-auto w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-navy dark:text-white mb-2">{title}</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto mb-6">{desc}</p>
      {showButton && btnHref && (
        <Link href={btnHref} className="inline-flex items-center px-6 py-3 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-xl transition-all hover:scale-105">
          {btnText}
        </Link>
      )}
    </div>
  )
}
