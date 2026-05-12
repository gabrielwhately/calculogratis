import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CustasProcessuaisForm } from '@/components/calculadoras/custas-processuais-form'

export const metadata: Metadata = createCalculadoraMetadata('custas-processuais')

export default function CustasProcessuaisPage() {
  return (
    <CalculatorPage
      slug="custas-processuais"
      categoriaSlug="juridica"
      categoriaNome="Jurídica"
      nome="Custas Processuais"
      descricao="Estime o valor das custas processuais iniciais para entrar com uma ação na Justiça Comum brasileira."
      conteudo={
        <>
          <h2>O que são as custas processuais?</h2>
          <p>As <strong>custas processuais</strong> são taxas de natureza tributária pagas ao Estado pela utilização dos serviços do Poder Judiciário. Elas servem para custear a estrutura necessária para o processamento e julgamento das ações.</p>
          <p>O valor principal é a <strong>taxa judiciária</strong>, que geralmente é calculada como um percentual sobre o <strong>valor da causa</strong> (o benefício econômico pretendido na ação).</p>

          <h3>Como é feito o cálculo?</h3>
          <p>Cada Estado brasileiro possui sua própria lei de custas, o que faz com que os valores variem entre os Tribunais de Justiça (TJs). No entanto, a maioria segue um padrão:</p>
          <ul>
            <li><strong>Percentual:</strong> Geralmente entre 1% e 2% do valor da causa.</li>
            <li><strong>Valor Mínimo:</strong> Existe um piso para causas de valor muito baixo (ex: R$ 150,00).</li>
            <li><strong>Valor Máximo:</strong> Existe um teto para evitar taxas abusivas em causas multimilionárias (ex: R$ 50.000,00).</li>
          </ul>

          <h3>Custas em diferentes instâncias</h3>
          <p>As custas iniciais referem-se apenas ao início do processo. Caso haja necessidade de recorrer de uma decisão, será necessário pagar o <strong>preparo recursal</strong>, que costuma ter um percentual mais elevado (ex: 4% do valor da causa).</p>

          <h3>Quem tem direito à gratuidade?</h3>
          <p>Pessoas que não possuem condições financeiras de arcar com as taxas judiciárias sem prejuízo do sustento próprio ou de sua família podem solicitar a <strong>Justiça Gratuita</strong>. Se concedida pelo juiz, o autor fica isento do pagamento das custas e demais despesas processuais.</p>

          <h3>Observações Importantes</h3>
          <p>Esta ferramenta fornece uma <strong>estimativa genérica</strong> baseada na alíquota de 1%. Para valores exatos, é indispensável consultar a tabela de custas específica do Tribunal onde a ação será protocolada e contar com o auxílio de um advogado.</p>
        </>
      }
    >
      <CustasProcessuaisForm />
    </CalculatorPage>
  )
}
