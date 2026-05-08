import { notFound } from "next/navigation"
import { getCalculadora, CALCULADORAS } from "@/lib/constants/calculadoras"
import { FORM_MAP } from "@/components/calculadoras/form-map"

interface EmbedPageProps {
  params: {
    categoriaSlug: string
    slug: string
  }
  searchParams: {
    theme?: string
  }
}

export function generateStaticParams() {
  return CALCULADORAS.map((calc) => ({
    categoriaSlug: calc.categoriaSlug,
    slug: calc.slug,
  }))
}

export default function EmbedPage({ params, searchParams }: EmbedPageProps) {
  const { slug } = params
  const { theme = 'light' } = searchParams
  const calculadora = getCalculadora(slug)

  if (!calculadora) {
    notFound()
  }

  const FormComponent = FORM_MAP[slug as keyof typeof FORM_MAP]

  if (!FormComponent) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-600">Calculadora em desenvolvimento.</p>
      </div>
    )
  }

  const themeClasses = {
    light: 'bg-white text-navy',
    dark: 'bg-slate-900 text-white dark',
    navy: 'bg-navy text-white dark'
  }[theme as keyof typeof themeClasses] || 'bg-white text-navy'

  return (
    <div className={`min-h-screen p-2 sm:p-4 transition-colors ${themeClasses}`}>
      <div className="mb-4">
        <h1 className="text-xl font-bold">{calculadora.nome}</h1>
        <p className="text-xs opacity-60">Oferecido por calculo.gratis</p>
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
