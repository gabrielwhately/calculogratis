import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { PjVsCltForm } from '@/components/calculadoras/pj-vs-clt-form'

export const metadata: Metadata = createCalculadoraMetadata('pj-vs-clt')

export default function PjVsCltPage() {
  return (
    <CalculatorPage
      slug="pj-vs-clt"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Salário PJ vs CLT"
      descricao="Te ofereceram PJ e você quer saber se compensa em relação à CLT? A comparação vai além do salário líquido — aqui entram FGTS, 13º, férias e seguro desemprego no cálculo."
      faqs={[
        { question: 'Qual a diferença entre PJ e CLT?', answer: 'Na CLT, além do salário, você acumula FGTS (8% todo mês), recebe 13º salário, tem férias com 1/3 e, se for demitido, tem direito ao seguro desemprego. No PJ você emite nota, paga menos imposto sobre o que recebe, mas todos esses benefícios precisam sair do próprio bolso — ou simplesmente não existem.' },
        { question: 'Quanto um PJ precisa ganhar para compensar a CLT?', answer: 'A regra geral é que o faturamento PJ precisa ser ao menos 30% a 40% maior que o salário bruto CLT para empatar. Isso porque os benefícios perdidos — FGTS, 13º, férias — representam cerca de 35% do custo total de um funcionário CLT. O simulador calcula exatamente esse ponto de equilíbrio para o seu caso.' },
        { question: 'O que é o Simples Nacional?', answer: 'É um regime tributário para empresas com faturamento anual de até R$ 4,8 milhões. Para prestadores de serviço no Anexo III, a alíquota começa em cerca de 6% sobre o faturamento bruto. Aliás, a escolha do anexo depende da atividade — engenheiros, advogados e consultores costumam cair no Anexo V, com alíquota bem maior.' },
      ]}
      conteudo={
        <>
          <h2>PJ vs CLT: como comparar corretamente em 2026</h2>
          <p>Recebeu uma proposta como Pessoa Jurídica e quer saber se compensa em relação à CLT? A comparação vai <strong>muito além do salário líquido</strong>. Quem olha apenas o valor mensal na conta bancária ignora que a CLT embute benefícios que representam mais de 30% da remuneração total: FGTS, <a href="/trabalhista/decimo-terceiro">13º salário</a>, <a href="/trabalhista/ferias">férias com 1/3</a>, <a href="/trabalhista/seguro-desemprego">seguro-desemprego</a> e contribuição previdenciária patronal.</p>
          <p>Nossa calculadora coloca os dois cenários lado a lado, incluindo todos os custos e benefícios ocultos, para que você tome uma decisão baseada em números reais.</p>

          <h3>O que a CLT entrega além do salário</h3>
          <p>Para entender o valor real da CLT, é preciso somar todas as parcelas que o empregador paga por você:</p>
          <ul>
            <li><strong>FGTS (8% ao mês):</strong> depositado em conta vinculada. Ao longo de um ano, equivale a quase um salário inteiro.</li>
            <li><strong>13º salário:</strong> um salário extra pago em duas parcelas (novembro e dezembro).</li>
            <li><strong>Férias + 1/3:</strong> 30 dias de descanso remunerado com acréscimo constitucional.</li>
            <li><strong>Seguro-desemprego:</strong> rede de segurança de 3 a 5 parcelas em caso de demissão sem justa causa.</li>
            <li><strong>INSS patronal:</strong> a empresa contribui com 20% para sua <a href="/previdencia/aposentadoria">aposentadoria</a>.</li>
          </ul>
          <p>Quando somados, esses benefícios podem representar de <strong>35% a 45%</strong> do custo total que a empresa tem com o funcionário. Use a <a href="/trabalhista/custo-clt">calculadora de custo CLT</a> para ver o detalhamento completo.</p>

          <h3>Quanto custa ser PJ no Simples Nacional</h3>
          <p>O regime tributário do Simples Nacional é a escolha mais comum para profissionais que atuam como PJ. Os custos fixos e variáveis incluem:</p>
          <ol>
            <li><strong>Imposto sobre faturamento:</strong> no Anexo III (prestação de serviços), a alíquota inicial é de aproximadamente 6%. No Anexo V (atividades intelectuais como engenharia, advocacia e consultoria), as alíquotas são mais elevadas.</li>
            <li><strong>Contador:</strong> entre R$ 150 e R$ 400 por mês, dependendo da complexidade.</li>
            <li><strong>INSS como contribuinte individual:</strong> se quiser manter a contribuição previdenciária, o custo é de 11% sobre o salário mínimo (plano simplificado) ou 20% sobre a remuneração declarada.</li>
            <li><strong>Pró-labore obrigatório:</strong> o sócio precisa retirar um pró-labore de pelo menos um salário mínimo, com incidência de INSS.</li>
          </ol>

          <h3>A regra prática: quanto o PJ precisa ganhar para compensar</h3>
          <p>Como referência geral, o faturamento PJ precisa ser pelo menos <strong>30% a 40% maior</strong> que o salário bruto CLT para atingir o ponto de equilíbrio. Essa margem cobre os benefícios perdidos e os custos da empresa PJ. Veja um exemplo:</p>
          <ul>
            <li>Salário CLT bruto: <strong>R$ 8.000</strong> (custo total para a empresa: cerca de R$ 12.800)</li>
            <li>Para equivaler, o contrato PJ deveria ser de pelo menos <strong>R$ 10.400 a R$ 11.200</strong></li>
            <li>Após impostos do Simples e custos do contador, o líquido ficaria próximo ao equivalente CLT</li>
          </ul>

          <h3>Disciplina financeira para quem escolhe o PJ</h3>
          <p>Sem os benefícios automáticos da CLT, o profissional PJ precisa criar suas <em>próprias reservas</em>. Uma estratégia recomendada:</p>
          <ul>
            <li>Separe <strong>8% do faturamento</strong> como &ldquo;FGTS pessoal&rdquo; em um <a href="/financeiro/simulador-investimentos">investimento de liquidez</a>.</li>
            <li>Reserve <strong>1/12 do faturamento mensal</strong> para cobrir o equivalente ao 13º e às férias.</li>
            <li>Mantenha uma reserva de emergência de 6 a 12 meses de despesas fixas.</li>
            <li>Contribua regularmente ao INSS para garantir sua <a href="/previdencia/aposentadoria">aposentadoria</a>.</li>
          </ul>
          <p>Compare também o impacto no seu <a href="/trabalhista/salario-liquido">salário líquido</a> e verifique como as <a href="/financeiro/conversor-taxas">taxas de juros</a> podem afetar decisões de crédito em cada regime.</p>
        </>
      }
    >
      <PjVsCltForm />
    </CalculatorPage>
  )
}
