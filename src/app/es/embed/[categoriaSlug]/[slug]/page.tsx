import { notFound } from "next/navigation"
import { getCalculadora, CALCULADORAS, CATEGORIAS } from "@/lib/constants/calculadoras"
import { FORM_MAP } from "@/components/calculadoras/form-map"
import { CALCULADORAS_ES, CATEGORIAS_ES } from "@/lib/i18n/calculadoras-es"

interface EmbedPageProps {
  params: {
    categoriaSlug: string
    slug: string
  }
}

export function generateStaticParams() {
  const params: { categoriaSlug: string; slug: string }[] = []
  for (const cat of CATEGORIAS) {
    const esCatSlug = CATEGORIAS_ES[cat.slug]?.slug ?? cat.slug
    const calcs = CALCULADORAS.filter(c => c.categoriaSlug === cat.slug)
    for (const calc of calcs) {
      params.push({ categoriaSlug: esCatSlug, slug: calc.slug })
    }
  }
  return params
}

export default function EmbedPageES({ params }: EmbedPageProps) {
  const { slug } = params
  const calculadora = getCalculadora(slug)

  if (!calculadora) {
    notFound()
  }

  const esCalc = CALCULADORAS_ES[slug]
  const esCatSlug = CATEGORIAS_ES[calculadora.categoriaSlug]?.slug ?? calculadora.categoriaSlug

  const FormComponent = FORM_MAP[slug as keyof typeof FORM_MAP]

  if (!FormComponent) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-600">Calculadora en desarrollo.</p>
      </div>
    )
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-navy dark:text-white">{esCalc?.nome ?? calculadora.nome}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Ofrecido por calculo.gratis</p>
      </div>
      <FormComponent />
      <div className="mt-4 text-center">
        <a 
          href={`/es/${esCatSlug}/${calculadora.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline"
        >
          Ver versión completa en Calculo Gratis
        </a>
      </div>
    </div>
  )
}
