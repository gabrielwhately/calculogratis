import { Card } from '@/components/ui/card'
import { CATEGORIAS, CALCULADORAS } from '@/lib/constants/calculadoras'

export default function Home() {
  return (
    <div className="container-app py-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-navy md:text-4xl">Calculadoras Online Gratis</h1>
        <p className="mt-3 text-lg text-slate-600">Calcule rescisao, salario liquido, financiamento, juros e muito mais. Rapido, gratis e sem cadastro.</p>
      </section>
      <section id="categorias" className="mt-10">
        <h2 className="text-xl font-bold text-navy mb-4">Categorias</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CATEGORIAS.map((cat) => (<Card key={cat.slug} title={`Calculadoras ${cat.nome}`} description={cat.descricao} href={`/${cat.slug}`} />))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-bold text-navy mb-4">Todas as Calculadoras</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULADORAS.map((calc) => (<Card key={calc.slug} title={calc.nome} description={calc.descricao} href={`/${calc.categoriaSlug}/${calc.slug}`} />))}
        </div>
      </section>
    </div>
  )
}
