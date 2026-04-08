import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ReajusteAluguelForm } from '@/components/calculadoras/reajuste-aluguel-form'

export const metadata: Metadata = createCalculadoraMetadata('reajuste-aluguel')

export default function ReajusteAluguelPage() {
  return (
    <CalculatorPage
      slug="reajuste-aluguel"
      categoriaSlug="financeiro"
      categoriaNome="Financeiro"
      nome="Reajuste de Aluguel"
      descricao="Aniversário do contrato chegando? Saiba exatamente quanto seu aluguel vai subir com o IGP-M ou IPCA acumulado — e se o reajuste que estão pedindo está dentro do que prevê a lei."
      conteudo={
        <>
          <h2>Como o reajuste de aluguel e calculado?</h2>
          <p>O <strong>reajuste de aluguel</strong> no Brasil segue uma formula direta, prevista em contrato e amparada pela Lei do Inquilinato (Lei 8.245/91). A cada aniversario do contrato de locacao, o valor do aluguel pode ser corrigido pelo indice acordado entre as partes:</p>
          <p><strong>Novo Valor = Aluguel Atual x (1 + Indice Acumulado / 100)</strong></p>
          <p>Por exemplo, se o aluguel atual e R$ 1.800 e o indice acumulado nos ultimos 12 meses foi de 8%, o novo valor sera: R$ 1.800 x 1,08 = <strong>R$ 1.944</strong>. O indice sempre se refere ao acumulado dos 12 meses anteriores a data de aniversario do contrato.</p>

          <h2>IGP-M vs. IPCA: qual indice e usado e qual e melhor?</h2>
          <p>Os dois indices mais comuns nos contratos de aluguel sao:</p>
          <ul>
            <li><strong>IGP-M (Indice Geral de Precos - Mercado):</strong> calculado pela FGV, incorpora precos no atacado, na construcao civil e no varejo. Por ser sensivel a variacao do dolar e commodities, pode ter oscilacoes bruscas. Em 2020 e 2021, chegou a ultrapassar 20% acumulado, gerando um impacto pesado nos alugueis.</li>
            <li><strong>IPCA (Indice de Precos ao Consumidor Amplo):</strong> calculado pelo IBGE, mede a inflacao que o consumidor final sente no bolso. E mais estavel e previsivel, e desde 2021 passou a ser a escolha preferida em novos contratos de locacao.</li>
          </ul>
          <p>Na pratica, contratos mais antigos costumam usar o IGP-M, enquanto contratos firmados a partir de 2021 ja migram predominantemente para o IPCA. Ambos sao validos legalmente — o que importa e o que esta escrito no contrato.</p>

          <h2>Direitos do inquilino e negociacao do reajuste</h2>
          <p>O inquilino tem direitos importantes quando o assunto e reajuste:</p>
          <ol>
            <li><strong>O reajuste so pode ser aplicado uma vez por ano</strong>, na data de aniversario do contrato</li>
            <li><strong>O indice deve ser o previsto em contrato</strong> — o locador nao pode aplicar um indice diferente sem acordo formal</li>
            <li><strong>Apos 3 anos de contrato</strong>, qualquer uma das partes pode solicitar revisao judicial do valor, caso o aluguel esteja fora do preco de mercado</li>
            <li><strong>E possivel negociar o indice por aditivo contratual</strong> — se o IGP-M acumulou 15% mas o mercado local subiu apenas 7%, e razoavel propor um percentual intermediario ou a migracao para o IPCA</li>
          </ol>
          <p>Sempre formalize qualquer acordo de alteracao de indice ou valor por escrito, assinado por ambas as partes.</p>

          <h2>Reajuste de aluguel e seu planejamento financeiro</h2>
          <p>O aluguel costuma ser a maior despesa fixa de uma familia. Saber antecipadamente quanto ele vai subir ajuda a planejar o orcamento com mais seguranca. Combine o calculo do reajuste com a analise do seu <a href="/trabalhista/salario-liquido">salario liquido</a> para entender o impacto real na sua renda disponivel.</p>
          <p>Se voce esta considerando trocar o aluguel por um <a href="/financeiro/financiamento">financiamento imobiliario</a>, compare o custo total projetado do aluguel (incluindo reajustes anuais ao longo de 20 ou 30 anos) com as parcelas e o custo total do financiamento. Nosso <a href="/financeiro/simulador-investimentos">simulador de investimentos</a> tambem pode ajudar a avaliar se vale mais investir o dinheiro da entrada do que usa-lo para comprar o imovel.</p>

          <h2>Dicas praticas sobre reajuste de aluguel</h2>
          <ul>
            <li>Acompanhe o indice do seu contrato ao longo do ano para nao ser surpreendido no aniversario</li>
            <li>Compare o valor do seu aluguel com imoveis similares na regiao — se estiver acima do mercado, voce tem argumento para negociar</li>
            <li>Considere usar a <a href="/matematica/porcentagem">calculadora de porcentagem</a> para entender rapidamente quanto o aumento representa em reais</li>
            <li>Se precisa calcular <a href="/utilidades/dias-entre-datas">quantos dias faltam</a> para o aniversario do contrato, use nossa ferramenta de datas</li>
          </ul>
        </>
      }
    >
      <ReajusteAluguelForm />
    </CalculatorPage>
  )
}
