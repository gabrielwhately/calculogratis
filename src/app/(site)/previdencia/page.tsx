import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('previdencia', 'Previdência', 'Simuladores de aposentadoria e previdência social online grátis 2026. Calcule tempo de contribuição, regras de transição e valor estimado do benefício INSS.')

export default function PrevidenciaPage() {
  return <CategoryLanding categoriaNome="Previdência" categoriaSlug="previdencia" descricao="Simule sua aposentadoria pelo INSS e planeje seu futuro previdenciário. Calcule tempo de contribuição restante, regras de transição e valor estimado do benefício — grátis e atualizado." />
}
