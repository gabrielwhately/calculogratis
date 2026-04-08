import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('trabalhista', 'Trabalhistas', 'Calculadoras trabalhistas online grátis 2026: rescisão, salário líquido, seguro desemprego, férias, 13º salário, hora extra, IRRF, PJ vs CLT e custo CLT.')

export default function TrabalhistaPage() {
  return <CategoryLanding categoriaNome="Trabalhistas" categoriaSlug="trabalhista" descricao="Calcule seus direitos trabalhistas de forma rápida e gratuita. Rescisão, salário líquido, seguro desemprego, férias, 13º, hora extra, IRRF e mais — tudo conforme a CLT atualizada." />
}
