import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('utilidades', 'Utilidades', 'Ferramentas online grátis: gerador de CPF, CNPJ, senhas, QR Code, UUID, Hash, validadores, formatador JSON, cronômetro e mais de 20 utilidades.')

export default function UtilidadesPage() {
  return <CategoryLanding categoriaNome="Utilidades" categoriaSlug="utilidades" descricao="Mais de 20 ferramentas online grátis: geradores de CPF, CNPJ, senhas e QR Code, validadores, formatador JSON, cronômetro, contador de caracteres e muito mais para o dia a dia." />
}
