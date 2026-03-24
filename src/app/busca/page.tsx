'use client'

import { useState, useMemo } from 'react'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { Card } from '@/components/ui/card'

export default function BuscaPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    if (!query.trim()) return CALCULADORAS
    const q = query.toLowerCase()
    return CALCULADORAS.filter(c => c.nome.toLowerCase().includes(q) || c.descricao.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-navy mb-4">Buscar Calculadora</h1>
      <input type="search" placeholder="Digite para buscar..." value={query} onChange={e => setQuery(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 mb-6" autoFocus />
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map(c => <Card key={c.slug} title={c.nome} description={c.descricao} href={`/${c.categoriaSlug}/${c.slug}`} />)}
      </div>
      {results.length === 0 && <p className="text-slate-500 text-center py-8">Nenhuma calculadora encontrada.</p>}
    </div>
  )
}
