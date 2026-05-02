'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Card } from '@/components/ui/card'
import { getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'

interface CategoryLandingProps { 
  categoriaNome: string; 
  categoriaSlug: string; 
  descricao: string; 
  conteudo?: React.ReactNode 
}

const I18N = {
  pt: {
    inicio: 'Início',
    prefix: 'Calculadoras',
    suffix: 'Online Grátis',
  },
  es: {
    inicio: 'Inicio',
    prefix: 'Calculadoras de',
    suffix: 'Online Gratis',
  }
}

export function CategoryLanding({ categoriaNome, categoriaSlug, descricao, conteudo }: CategoryLandingProps) {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt
  
  const calculadoras = getCalculadorasByCategoria(categoriaSlug)
  
  return (
    <div className="container-app py-6">
      <Breadcrumb items={[
        { label: t.inicio, href: isSpanish ? '/es' : '/' }, 
        { label: `${t.prefix} ${categoriaNome}` }
      ]} />
      
      <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">
        {t.prefix} {categoriaNome} {t.suffix}
      </h1>
      
      <p className="mt-2 text-slate-600 dark:text-slate-400">{descricao}</p>
      
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {calculadoras.map((calc) => {
          const esCalc = CALCULADORAS_ES[calc.slug]
          const esCat = CATEGORIAS_ES[calc.categoriaSlug]
          
          return (
            <Card 
              key={calc.slug} 
              title={isSpanish ? (esCalc?.nome ?? calc.nome) : calc.nome} 
              description={isSpanish ? (esCalc?.descricao ?? calc.descricao) : calc.descricao} 
              href={isSpanish ? `/es/${esCat?.slug ?? calc.categoriaSlug}/${calc.slug}` : `/${calc.categoriaSlug}/${calc.slug}`} 
            />
          )
        })}
      </div>
      
      {conteudo && <section className="mt-8 prose prose-slate dark:prose-invert max-w-none">{conteudo}</section>}
    </div>
  )
}
