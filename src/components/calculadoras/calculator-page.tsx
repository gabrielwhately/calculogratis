import { Breadcrumb } from '@/components/layout/breadcrumb'
import { AdSlot } from '@/components/layout/ad-slot'
import { Card } from '@/components/ui/card'
import { getCalculadorasByCategoria } from '@/lib/constants/calculadoras'
import { calculadoraJsonLd } from '@/lib/seo/jsonld'

interface CalculatorPageProps {
  slug: string
  categoriaSlug: string
  categoriaNome: string
  nome: string
  descricao: string
  children: React.ReactNode
  conteudo: React.ReactNode
}

export function CalculatorPage({ slug, categoriaSlug, categoriaNome, nome, descricao, children, conteudo }: CalculatorPageProps) {
  const jsonLd = calculadoraJsonLd(slug)
  const relacionadas = getCalculadorasByCategoria(categoriaSlug).filter(c => c.slug !== slug)

  return (
    <div className="container-app py-6">
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: categoriaNome, href: `/${categoriaSlug}` }, { label: `Calculadora de ${nome}` }]} />
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Calculadora de {nome}</h1>
      <p className="mt-2 text-slate-600">{descricao}</p>
      <div className="mt-6">{children}</div>
      <AdSlot position="after-result" />
      <section className="mt-8 prose prose-slate max-w-none">{conteudo}</section>
      <AdSlot position="mid-content" />
      {relacionadas.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-4">Calculadoras Relacionadas</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relacionadas.map((calc) => (
              <Card key={calc.slug} title={calc.nome} description={calc.descricao} href={`/${calc.categoriaSlug}/${calc.slug}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
