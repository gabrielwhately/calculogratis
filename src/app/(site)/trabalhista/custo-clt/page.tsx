import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CustoCLTForm } from '@/components/calculadoras/custo-clt-form'

export const metadata: Metadata = createCalculadoraMetadata('custo-clt')

export default function CustoCLTPage() {
  return (
    <CalculatorPage
      slug="custo-clt"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Custo de Funcionário CLT"
      descricao="Vai contratar alguém pela CLT e quer saber o custo total para a empresa? Além do salário, há INSS patronal, FGTS, provisões de férias e 13º — aqui você vê o número real."
      faqs={[
        {
          question: 'Qual o custo real de um funcionário CLT para a empresa?',
          answer: 'O custo de um funcionário CLT para a empresa vai muito além do salário bruto. Inclui o INSS patronal de 20%, FGTS de 8%, provisão mensal do 13º salário (1/12 do salário), provisão de férias com 1/3 constitucional e benefícios como vale-transporte e vale-refeição. No total, o custo costuma ser entre 50% e 80% acima do salário bruto.',
        },
        {
          question: 'O que é o INSS patronal?',
          answer: 'O INSS patronal é a contribuição que a empresa paga à Previdência Social sobre a folha de pagamento. A alíquota básica é de 20% sobre o salário bruto do funcionário (empresas do Simples Nacional têm regras diferentes). Essa contribuição é separada do desconto de INSS do empregado e é um custo exclusivo da empresa.',
        },
        {
          question: 'Como calcular a provisão de férias e 13º salário?',
          answer: 'A provisão mensal do 13º é de 1/12 do salário bruto. A provisão de férias é calculada como (salário / 12) × (4/3), pois inclui o 1/3 constitucional sobre as férias. Essas provisões representam um custo mensal que a empresa deve reservar para honrar esses direitos quando devidos.',
        },
      ]}
      conteudo={
        <>
          <h2>Quanto custa um funcionário CLT para a empresa em 2026</h2>
          <p>Contratar um funcionário no regime CLT envolve custos que vão <strong>muito além do salário bruto</strong> acordado em contrato. Para cada real pago ao empregado, a empresa arca com encargos sociais, provisões obrigatórias e benefícios que podem elevar o custo total em <strong>50% a 80%</strong> acima do salário nominal.</p>
          <p>Nossa calculadora detalha cada componente do custo, permitindo ao empregador planejar contratações com base em números reais e não em estimativas vagas.</p>

          <h3>Composição detalhada do custo CLT</h3>
          <p>Os encargos obrigatórios sobre a folha de pagamento incluem contribuições previdenciárias, fundiárias e provisões de benefícios anuais. Veja a estrutura completa:</p>
          <ul>
            <li><strong>INSS patronal (20%):</strong> contribuição da empresa ao INSS, inteiramente separada do desconto na folha do funcionário. Incide sobre o salário bruto total.</li>
            <li><strong>FGTS (8%):</strong> depósito mensal na conta vinculada do trabalhador no Fundo de Garantia. Em caso de <a href="/trabalhista/rescisao">demissão sem justa causa</a>, a empresa ainda paga multa de 40% sobre o saldo acumulado.</li>
            <li><strong>Provisão do <a href="/trabalhista/decimo-terceiro">13º salário</a> (1/12):</strong> reserva mensal equivalente a 8,33% do salário, mais os encargos que incidem sobre essa parcela.</li>
            <li><strong>Provisão de <a href="/trabalhista/ferias">férias</a> + 1/3 (1/9):</strong> reserva mensal de aproximadamente 11,11% do salário, considerando o acréscimo constitucional de um terço.</li>
            <li><strong>Benefícios:</strong> vale-transporte (custo além dos 6% descontados do funcionário), vale-refeição ou alimentação, plano de saúde e odontológico.</li>
          </ul>

          <h3>Exemplo prático: funcionário com salário de R$ 5.000</h3>
          <p>Para ilustrar o impacto real dos encargos, veja a estimativa mensal para um funcionário com salário bruto de <strong>R$ 5.000,00</strong>:</p>
          <ol>
            <li>Salário bruto: R$ 5.000,00</li>
            <li>INSS patronal (20%): R$ 1.000,00</li>
            <li>FGTS (8%): R$ 400,00</li>
            <li>Provisão 13º (8,33%): R$ 416,50</li>
            <li>Provisão férias + 1/3 (11,11%): R$ 555,50</li>
            <li>Encargos sobre provisões: R$ 272,00 (aproximado)</li>
            <li>Vale-transporte e refeição: R$ 500,00 a R$ 800,00</li>
          </ol>
          <p><strong>Custo total estimado: R$ 8.144 a R$ 8.444 por mês</strong> — entre 63% e 69% acima do salário bruto. Esse valor pode variar conforme os benefícios oferecidos e o regime tributário da empresa.</p>

          <h3>RAT e contribuições a terceiros</h3>
          <p>Além do INSS patronal de 20%, muitas empresas são obrigadas a recolher encargos adicionais:</p>
          <ul>
            <li><strong>RAT (Risco Ambiental do Trabalho):</strong> alíquota de 1% a 3% sobre a folha, variando conforme o grau de risco da atividade econômica da empresa. O FAP (Fator Acidentário de Prevenção) pode aumentar ou reduzir essa alíquota.</li>
            <li><strong>Terceiros (Sistema S):</strong> contribuições ao SESC, SENAI, SEBRAE, INCRA e outros, totalizando de 2,5% a 5,8% sobre a folha, dependendo do setor.</li>
          </ul>
          <p>Esses valores <em>não estão incluídos</em> no cálculo simplificado da calculadora, mas podem ser significativos para o planejamento financeiro da empresa.</p>

          <h3>Simples Nacional: regras diferenciadas</h3>
          <p>Empresas optantes pelo <strong>Simples Nacional</strong> possuem um regime tributário unificado que substitui o INSS patronal de 20%. Dependendo do anexo e da faixa de faturamento, os encargos sobre a folha podem ser consideravelmente menores. Porém, as demais obrigações (FGTS, provisões de <a href="/trabalhista/ferias">férias</a> e <a href="/trabalhista/decimo-terceiro">13º</a>) continuam válidas.</p>
          <p>Para decidir entre contratar CLT ou terceirizar via PJ, utilize a <a href="/trabalhista/pj-vs-clt">comparação PJ vs CLT</a>. Ela mostra o ponto de equilíbrio entre os dois regimes, considerando tanto a perspectiva do empregador quanto a do trabalhador.</p>

          <h3>Planejamento de contratações</h3>
          <p>Antes de abrir uma vaga, considere:</p>
          <ul>
            <li>Calcule o <strong>custo total mensal</strong> e multiplique por 13,33 (12 meses + 13º + férias) para ter a projeção anual.</li>
            <li>Inclua o custo de <a href="/trabalhista/hora-extra">horas extras</a> estimadas, caso a posição demande jornada estendida com frequência.</li>
            <li>Simule o impacto no fluxo de caixa usando a <a href="/financeiro/juros-compostos">calculadora de juros compostos</a> para avaliar o custo de oportunidade do capital comprometido com a folha.</li>
            <li>Compare com o custo de um contrato PJ equivalente, sem esquecer os riscos trabalhistas de uma contratação PJ com características de vínculo.</li>
          </ul>
        </>
      }
    >
      <CustoCLTForm />
    </CalculatorPage>
  )
}
