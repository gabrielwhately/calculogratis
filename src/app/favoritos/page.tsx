'use client'

import { useState, useEffect } from 'react'
import { getFavorites } from '@/lib/favorites'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { Card } from '@/components/ui/card'

export default function FavoritosPage() {
  const [favSlugs, setFavSlugs] = useState<string[]>([])
  useEffect(() => { setFavSlugs(getFavorites()) }, [])
  const favoritos = CALCULADORAS.filter(c => favSlugs.includes(c.slug))

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-navy dark:text-white mb-4">Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400 text-center py-8">Nenhuma calculadora favoritada ainda. Use a estrela nas calculadoras para salvar aqui.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {favoritos.map(c => <Card key={c.slug} title={c.nome} description={c.descricao} href={`/${c.categoriaSlug}/${c.slug}`} />)}
        </div>
      )}
    </div>
  )
}
