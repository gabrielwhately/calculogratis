import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIAS } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES } from '@/lib/i18n/calculadoras-es'
import { CategoryLanding } from '@/components/layout/category-landing'

function findCategoriaByEsSlug(esSlug: string) {
  return CATEGORIAS.find(c => CATEGORIAS_ES[c.slug]?.slug === esSlug || c.slug === esSlug)
}

export function generateStaticParams() {
  return CATEGORIAS.map(c => ({ categoria: CATEGORIAS_ES[c.slug]?.slug ?? c.slug }))
}

export function generateMetadata({ params }: { params: { categoria: string } }): Metadata {
  const cat = findCategoriaByEsSlug(params.categoria)
  if (!cat) return {}
  const esData = CATEGORIAS_ES[cat.slug]
  const nome = esData?.nome ?? cat.nome
  const desc = esData?.descricao ?? cat.descricao
  return {
    title: `Calculadoras ${nome} Online Gratis 2026`,
    description: desc,
    openGraph: { title: `Calculadoras ${nome} Online Gratis 2026 | Cálculo Gratis`, description: desc, url: `https://calculogratis.com/es/${params.categoria}`, type: 'website' },
    alternates: { canonical: `https://calculogratis.com/es/${params.categoria}`, languages: { 'pt-BR': `https://calculogratis.com/${cat.slug}` } },
  }
}

export default function CategoriaESPage({ params }: { params: { categoria: string } }) {
  const cat = findCategoriaByEsSlug(params.categoria)
  if (!cat) notFound()
  const esData = CATEGORIAS_ES[cat.slug]
  const nome = esData?.nome ?? cat.nome

  return (
    <CategoryLanding 
      categoriaNome={nome} 
      categoriaSlug={cat.slug} 
      descricao={esData?.descricao ?? cat.descricao} 
    />
  )
}
