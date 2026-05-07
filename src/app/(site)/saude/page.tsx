import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('saude', 'Saúde', 'Calculadoras de saúde online grátis: IMC (Índice de Massa Corporal) e mais. Descubra se você está no peso ideal de forma rápida e gratuita.')

export default function SaudePage() {
  return (
    <CategoryLanding
      categoriaNome="Saúde"
      categoriaSlug="saude"
      descricao="IMC, calorias diárias (TMB), idade gestacional com data provável do parto e peso ideal por diferentes fórmulas. Números que ajudam a cuidar da saúde."
      conteudo={
        <>
          <h2>Calculadora de IMC online e gratuita</h2>
          <p>O <strong>Índice de Massa Corporal (IMC)</strong> é o método mais utilizado mundialmente para avaliar se uma pessoa está no peso adequado para sua altura. Desenvolvido pelo matemático belga Adolphe Quetelet, o IMC é calculado pela fórmula: <strong>IMC = peso (kg) / altura (m)²</strong>.</p>

          <h2>Tabela de classificação do IMC</h2>
          <p>A Organização Mundial da Saúde (OMS) classifica o IMC nas seguintes faixas:</p>
          <ul>
            <li><strong>Abaixo de 18,5:</strong> abaixo do peso — pode indicar desnutrição ou problemas de saúde.</li>
            <li><strong>18,5 a 24,9:</strong> peso normal — faixa considerada saudável pela OMS.</li>
            <li><strong>25,0 a 29,9:</strong> sobrepeso — aumenta o risco de doenças cardiovasculares.</li>
            <li><strong>30,0 a 34,9:</strong> obesidade grau I.</li>
            <li><strong>35,0 a 39,9:</strong> obesidade grau II.</li>
            <li><strong>40,0 ou mais:</strong> obesidade grau III (mórbida).</li>
          </ul>

          <h2>Limitações do IMC</h2>
          <p>Embora seja uma ferramenta útil e rápida, o IMC tem limitações. Ele não diferencia massa muscular de gordura corporal — por isso, atletas e praticantes de musculação podem ter IMC elevado sem estarem acima do peso. O IMC também não considera a distribuição de gordura no corpo, idade ou composição óssea. Para uma avaliação completa, consulte um profissional de saúde.</p>

          <h2>Dicas para manter o peso saudável</h2>
          <p>A combinação de <strong>alimentação equilibrada</strong> e <strong>atividade física regular</strong> é a forma mais eficaz e sustentável de manter o peso na faixa ideal. Evite dietas restritivas sem acompanhamento profissional. Pequenas mudanças de hábito — como caminhar 30 minutos por dia, reduzir o açúcar e aumentar o consumo de fibras — geram resultados expressivos a longo prazo.</p>
        </>
      }
    />
  )
}
