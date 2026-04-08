import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('conversores', 'Conversores', 'Conversores de moedas online grátis: Real para Dólar, Real para Bitcoin. Cotação atualizada em tempo real para conversão rápida e precisa.')

export default function ConversoresPage() {
  return (
    <CategoryLanding
      categoriaNome="Conversores"
      categoriaSlug="conversores"
      descricao="Real↔Dólar, Real↔Bitcoin, unidades de medida (peso, comprimento, temperatura, volume) e cores (HEX, RGB, HSL). Conversão direta, sem enrolação."
      conteudo={
        <>
          <h2>Conversores de moedas com cotação atualizada</h2>
          <p>Nossos conversores de moedas buscam a <strong>cotação atualizada em tempo real</strong> para garantir que você tenha o valor mais preciso possível. Seja para calcular quanto custa uma compra internacional em dólares, converter bitcoins para reais ou simplesmente acompanhar a variação cambial, nossas ferramentas são rápidas e gratuitas.</p>

          <h2>Real para Dólar (BRL/USD)</h2>
          <p>O <strong>dólar americano (USD)</strong> é a moeda mais negociada do mundo e referência para o comércio internacional. A cotação do dólar em relação ao real varia diariamente com base em fatores como balança comercial, taxa Selic, cenário político e fluxo de capital estrangeiro. Nosso conversor mostra a cotação comercial atualizada para conversões rápidas.</p>

          <h2>Real para Bitcoin (BRL/BTC)</h2>
          <p>O <strong>Bitcoin (BTC)</strong> é a criptomoeda mais valiosa e popular do mundo. Diferente das moedas tradicionais, o Bitcoin opera em uma rede descentralizada (blockchain) e tem oferta limitada a 21 milhões de unidades. Sua cotação é altamente volátil — pode variar significativamente em poucas horas. Nosso conversor busca o preço atualizado do Bitcoin em reais.</p>

          <h2>Quando usar um conversor de moedas?</h2>
          <p>Conversores de moedas são úteis para diversas situações do dia a dia: <strong>compras internacionais</strong> (para saber quanto vai pagar em reais), <strong>viagens ao exterior</strong> (para calcular o orçamento), <strong>remessas internacionais</strong> (para enviar ou receber dinheiro do exterior), <strong>investimentos em cripto</strong> (para acompanhar o valor do portfólio) e <strong>importação/exportação</strong> (para precificar produtos).</p>

          <h2>Atenção ao spread cambial</h2>
          <p>A cotação exibida aqui é a <strong>cotação comercial</strong> — usada como referência pelo mercado financeiro. Casas de câmbio, bancos e corretoras aplicam um <strong>spread</strong> (diferença entre compra e venda) que pode variar de 1% a 8%. Para operações reais de câmbio, compare sempre as taxas de diferentes instituições antes de fechar negócio.</p>
        </>
      }
    />
  )
}
