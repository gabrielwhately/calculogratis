'use client'

import { useState, useEffect } from 'react'
import { getFavorites } from '@/lib/favorites'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { Card } from '@/components/ui/card'

export default function FavoritosESPage() {
  const [favSlugs, setFavSlugs] = useState<string[]>([])
  useEffect(() => { setFavSlugs(getFavorites()) }, [])
  
  const favoritos = CALCULADORAS.filter(c => favSlugs.includes(c.slug))

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-navy dark:text-white mb-4">Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">Aún no tienes calculadoras favoritas.</p>
          <p className="text-sm text-slate-500 mt-2">Haz clic en el icono del corazón en las calculadoras para guardar aquí tus cálculos más frecuentes.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {favoritos.map(c => {
            const esCalc = CALCULADORAS_ES[c.slug]
            const esCatSlug = CATEGORIAS_ES[c.categoriaSlug]?.slug ?? c.categoriaSlug
            return (
              <Card 
                key={c.slug} 
                title={esCalc?.nome ?? c.nome} 
                description={esCalc?.descricao ?? c.descricao} 
                href={'/es/' + esCatSlug + '/' + c.slug} 
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
