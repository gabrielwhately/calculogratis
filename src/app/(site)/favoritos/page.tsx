'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getFavorites } from '@/lib/favorites'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { Card } from '@/components/ui/card'

const I18N = {
  pt: {
    title: 'Meus Favoritos',
    emptyTitle: 'Nenhuma calculadora favoritada ainda',
    emptyDesc: 'Clique no ícone de coração nas calculadoras para salvar aqui seus cálculos mais usados.',
  },
  es: {
    title: 'Mis Favoritos',
    emptyTitle: 'Aún no tienes calculadoras favoritas',
    emptyDesc: 'Haz clic en el icono del corazón en las calculadoras para guardar aquí tus cálculos más frecuentes.',
  }
}

export default function FavoritosPage() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [favSlugs, setFavSlugs] = useState<string[]>([])
  
  useEffect(() => { 
    setFavSlugs(getFavorites()) 
  }, [])

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
    <div className="container-app py-8">
      <h1 className="text-2xl font-bold text-navy dark:text-white mb-6 md:text-3xl">{t.title}</h1>
      
      {favoritos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mb-4">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-navy dark:text-white mb-2">{t.emptyTitle}</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">{t.emptyDesc}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoritos.map(c => {
            const esCatSlug = CATEGORIAS_ES[c.categoriaSlug]?.slug ?? c.categoriaSlug
            return (
              <Card 
                key={c.slug} 
                title={c.nome} 
                description={c.descricao} 
                href={isSpanish ? `/es/${esCatSlug}/${c.slug}` : `/${c.categoriaSlug}/${c.slug}`} 
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
