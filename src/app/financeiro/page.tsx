import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('financeiro', 'Financeiras', 'Calculadoras financeiras online grátis 2026: juros simples e compostos, financiamento imobiliário, empréstimo, simulador de investimentos, IPVA, desconto e mais.')

export default function FinanceiroPage() {
  return <CategoryLanding categoriaNome="Financeiras" categoriaSlug="financeiro" descricao="Simuladores financeiros completos: juros simples e compostos, financiamento imobiliário, empréstimo, investimentos, IPVA, desconto, reajuste de aluguel e importação. Calcule gratuitamente." />
}
