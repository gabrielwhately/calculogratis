import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { AdSlot } from '@/components/layout/ad-slot'
import { Card } from '@/components/ui/card'
import { CATEGORIAS, CALCULADORAS, getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { CATEGORIAS_ES, CALCULADORAS_ES } from '@/lib/i18n/calculadoras-es'
import { calculadoraJsonLd } from '@/lib/seo/jsonld'
import { FORM_MAP } from '@/components/calculadoras/form-map'

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
  const nome = esCalc?.nome ?? calc.nome
  const catNome = esCat?.nome ?? cat.nome
  const esCatSlug = esCat?.slug ?? cat.slug
  const jsonLd = calculadoraJsonLd(calc.slug)
  const relacionadas = getCalculadorasByCategoria(cat.slug).filter(c => c.slug !== calc.slug)

  const FormComponent = FORM_MAP[calc.slug]

  return (
    <div className="container-app py-6">
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      <Breadcrumb items={[{ label: 'Inicio', href: '/es' }, { label: catNome, href: `/es/${esCatSlug}` }, { label: `Calculadora de ${nome}` }]} />
      <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">Calculadora de {nome}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{esCalc?.descricao ?? calc.descricao}</p>
      <div className="mt-6">{FormComponent ? <FormComponent /> : <p className="text-slate-500">Calculadora en desarrollo.</p>}</div>
      <AdSlot position="after-result" />
      {relacionadas.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4">Calculadoras Relacionadas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relacionadas.map((r) => {
              const esR = CALCULADORAS_ES[r.slug]
              return <Card key={r.slug} title={esR?.nome ?? r.nome} description={esR?.descricao ?? r.descricao} href={`/es/${esCatSlug}/${r.slug}`} />
            })}
          </div>
        </section>
      )}
    </div>
  )
}
