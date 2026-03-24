import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('trabalhista', 'Trabalhistas', 'Calculadoras trabalhistas online gratis: rescisao, salario liquido, seguro desemprego e mais.')

export default function TrabalhistaPage() {
  return <CategoryLanding categoriaNome="Trabalhistas" categoriaSlug="trabalhista" descricao="Calcule seus direitos trabalhistas de forma rapida e gratuita. Rescisao, salario liquido, seguro desemprego e mais." />
}
