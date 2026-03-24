import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('utilidades', 'Utilidades', 'Geradores e ferramentas uteis: CPF, CNPJ e mais. Gratis e online.')

export default function UtilidadesPage() {
  return <CategoryLanding categoriaNome="Utilidades" categoriaSlug="utilidades" descricao="Geradores e ferramentas uteis para o dia a dia. CPF, CNPJ e outras utilidades gratuitas." />
}
