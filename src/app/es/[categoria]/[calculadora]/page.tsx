import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIAS, CALCULADORAS, getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FORM_MAP } from '@/components/calculadoras/form-map'
import { ES_CONTENT_MAP } from '@/components/calculadoras/es-content-map'

function findCategoriaByEsSlug(esSlug: string) {
  return CATEGORIAS.find(c => CATEGORIAS_ES[c.slug]?.slug === esSlug || c.slug === esSlug)
}

export function generateStaticParams() {
  const params: { categoria: string; calculadora: string }[] = []
  for (const cat of CATEGORIAS) {
    const esCatSlug = CATEGORIAS_ES[cat.slug]?.slug ?? cat.slug
    const calcs = getCalculadorasByCategoria(cat.slug)
    for (const calc of calcs) {
      params.push({ categoria: esCatSlug, calculadora: calc.slug })
    }
  }
  return params
}

export function generateMetadata({ params }: { params: { categoria: string; calculadora: string } }): Metadata {
  const calc = CALCULADORAS.find(c => c.slug === params.calculadora)
  if (!calc) return {}
  const esCalc = CALCULADORAS_ES[calc.slug]
  const nome = esCalc?.nome ?? calc.nome
  const desc = esCalc?.descricao ?? calc.descricao
  const cat = findCategoriaByEsSlug(params.categoria)
  const esCatSlug = cat ? (CATEGORIAS_ES[cat.slug]?.slug ?? cat.slug) : params.categoria
  return {
    title: `Calculadora de ${nome} Online Gratis 2026`,
    description: desc,
    keywords: esCalc?.keywords ?? calc.keywords,
    openGraph: { title: `Calculadora de ${nome} Online Gratis 2026 | Cálculo Gratis`, description: desc, url: `https://calculogratis.com/es/${esCatSlug}/${calc.slug}`, type: 'website' },
    alternates: { canonical: `https://calculogratis.com/es/${esCatSlug}/${calc.slug}`, languages: { 'pt-BR': `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}` } },
  }
}

export default function CalculadoraESPage({ params }: { params: { categoria: string; calculadora: string } }) {
  const calc = CALCULADORAS.find(c => c.slug === params.calculadora)
  if (!calc) notFound()
  const cat = findCategoriaByEsSlug(params.categoria)
  if (!cat) notFound()

  const esCalc = CALCULADORAS_ES[calc.slug]
  const esCat = CATEGORIAS_ES[cat.slug]
  
  const FormComponent = FORM_MAP[calc.slug]
  const localizedContent = ES_CONTENT_MAP[calc.slug]

  return (
    <CalculatorPage
      slug={calc.slug}
      categoriaSlug={cat.slug}
      categoriaNome={esCat?.nome ?? cat.nome}
      nome={esCalc?.nome ?? calc.nome}
      descricao={esCalc?.descricao ?? calc.descricao}
      conteudo={localizedContent || <div className="text-slate-500 italic">Próximamente: información detallada sobre esta calculadora en español.</div>}
    >
      {FormComponent ? <FormComponent /> : <p className="text-slate-500">Calculadora en desarrollo.</p>}
    </CalculatorPage>
  )
}
