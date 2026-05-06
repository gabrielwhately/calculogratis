import { notFound } from 'next/navigation'
import { getCalculadora, CALCULADORAS } from '@/lib/constants/calculadoras'
import { FormMap } from '@/components/calculadoras/form-map'

interface EmbedPageProps {
  params: {
    categoriaSlug: string
    slug: string
  }
}

export function generateStaticParams() {
  return CALCULADORAS.map((calc) => ({
    categoriaSlug: calc.categoriaSlug,
    slug: calc.slug,
  }))
}

export default function EmbedPage({ params }: EmbedPageProps) {
  const { slug } = params
  const calculadora = getCalculadora(slug)

  if (!calculadora) {
    notFound()
  }

  const FormComponent = FormMap[slug as keyof typeof FormMap]

  if (!FormComponent) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-600">Calculadora em desenvolvimento.</p>
      </div>
    )
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-navy dark:text-white">{calculadora.nome}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Oferecido por calculo.gratis</p>
      </div>
      <FormComponent />
      <div className="mt-4 text-center">
        <a 
          href={`/${calculadora.categoriaSlug}/${calculadora.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline"
        >
          Ver versão completa no Calculo Gratis
        </a>
      </div>
    </div>
  )
}
