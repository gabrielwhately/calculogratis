import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Card } from '@/components/ui/card'
import { CATEGORIAS, getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'

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
  const calculadoras = getCalculadorasByCategoria(cat.slug)
  const esCatSlug = esData?.slug ?? cat.slug

  return (
    <div className="container-app py-6">
      <Breadcrumb items={[{ label: 'Inicio', href: '/es' }, { label: `Calculadoras ${nome}` }]} />
      <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">Calculadoras {nome} Online Gratis</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{esData?.descricao ?? cat.descricao}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {calculadoras.map((calc) => {
          const esCalc = CALCULADORAS_ES[calc.slug]
          return (
            <Card key={calc.slug} title={esCalc?.nome ?? calc.nome} description={esCalc?.descricao ?? calc.descricao} href={`/es/${esCatSlug}/${calc.slug}`} />
          )
        })}
      </div>
    </div>
  )
}
