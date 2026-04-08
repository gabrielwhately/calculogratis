import { Breadcrumb } from '@/components/layout/breadcrumb'
import { Card } from '@/components/ui/card'
import { getCalculadorasByCategoria } from '@/lib/constants/calculadoras'

interface CategoryLandingProps { categoriaNome: string; categoriaSlug: string; descricao: string; conteudo?: React.ReactNode }

export function CategoryLanding({ categoriaNome, categoriaSlug, descricao, conteudo }: CategoryLandingProps) {
  const calculadoras = getCalculadorasByCategoria(categoriaSlug)
  return (
    <div className="container-app py-6">
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: `Calculadoras ${categoriaNome}` }]} />
      <h1 className="text-2xl font-bold text-navy dark:text-white md:text-3xl">Calculadoras {categoriaNome} Online Gratis</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{descricao}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {calculadoras.map((calc) => (<Card key={calc.slug} title={calc.nome} description={calc.descricao} href={`/${calc.categoriaSlug}/${calc.slug}`} />))}
      </div>
      {conteudo && <section className="mt-8 prose prose-slate dark:prose-invert max-w-none">{conteudo}</section>}
    </div>
  )
}
