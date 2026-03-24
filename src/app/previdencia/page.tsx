import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('previdencia', 'Previdencia', 'Simuladores de aposentadoria e previdencia social online gratis.')

export default function PrevidenciaPage() {
  return <CategoryLanding categoriaNome="Previdencia" categoriaSlug="previdencia" descricao="Simule sua aposentadoria e planeje seu futuro previdenciario com nossas calculadoras gratuitas." />
}
