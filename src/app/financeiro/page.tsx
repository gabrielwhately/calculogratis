import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('financeiro', 'Financeiras', 'Calculadoras financeiras online gratis: juros simples, juros compostos, financiamento imobiliario e mais.')

export default function FinanceiroPage() {
  return <CategoryLanding categoriaNome="Financeiras" categoriaSlug="financeiro" descricao="Simuladores financeiros para juros, financiamento e investimentos. Calcule gratuitamente." />
}
