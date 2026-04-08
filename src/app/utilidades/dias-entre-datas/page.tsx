import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { DiasEntreDatasForm } from '@/components/calculadoras/dias-entre-datas-form'

export const metadata: Metadata = createCalculadoraMetadata('dias-entre-datas')

export default function DiasEntreDatasPage() {
  return (
    <CalculatorPage
      slug="dias-entre-datas"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Dias entre Datas"
      descricao="Selecione duas datas e veja a diferença em dias corridos, dias úteis, semanas e meses. Útil para prazos contratuais, férias, períodos de experiência e qualquer contagem de tempo."
      faqs={[
        { question: 'Como são calculados os dias úteis?', answer: 'Excluindo sábados e domingos do período. Feriados nacionais e municipais não são excluídos automaticamente — para prazos judiciais ou bancários com feriados específicos, confirme as datas manualmente com o calendário do seu estado ou tribunal.' },
        { question: 'Posso calcular datas no passado?', answer: 'Sim. Funciona para qualquer combinação — passado, futuro, ou cruzando o ano atual. O resultado é sempre a diferença absoluta entre as duas datas.' },
        { question: 'O cálculo de meses é exato?', answer: 'É uma aproximação baseada em 30,44 dias por mês (média do calendário gregoriano). Para contratos que contam meses cheios — como prazo de 3 meses a partir de determinada data — use as datas exatas em vez de contar pelos meses aproximados aqui.' },
      ]}
      conteudo={
        <>
          <h2>Por que calcular dias entre datas com precisao</h2>
          <p>Saber exatamente quantos dias separam duas datas e uma necessidade recorrente em diversas areas. Um <strong>periodo de experiencia</strong> de 45 dias: quando vence exatamente? Um contrato com prazo de 180 dias a partir da assinatura: qual e a data limite? Quantos <strong>dias uteis</strong> existem em um mes de ferias? Essas sao contas que aparecem com frequencia e onde um dia a mais ou a menos pode ter consequencias legais e financeiras reais.</p>
          <p>A ferramenta calcula automaticamente a diferenca em <strong>dias corridos</strong>, <strong>dias uteis</strong>, <strong>semanas completas</strong> e <strong>meses aproximados</strong>, facilitando o planejamento de prazos e compromissos.</p>

          <h2>Dias corridos vs. dias uteis: entenda a diferenca</h2>
          <p>A distincao entre dias corridos e dias uteis e fundamental para interpretar prazos corretamente:</p>
          <ul>
            <li><strong>Dias corridos:</strong> incluem todos os dias do calendario -- sabados, domingos e feriados. E o criterio mais comum para prazos contratuais e trabalhistas</li>
            <li><strong>Dias uteis:</strong> excluem sabados e domingos do calculo. Feriados nacionais e municipais nao sao excluidos automaticamente nesta ferramenta</li>
          </ul>
          <p>Na pratica, o tipo de contagem depende do contexto:</p>
          <ol>
            <li><strong>Direito do trabalho (CLT):</strong> a maioria dos prazos usa <em>dias corridos</em>, incluindo aviso previo e ferias</li>
            <li><strong>Prazos processuais (CPC/2015):</strong> contados em <em>dias uteis</em>, excluindo sabados, domingos e feriados forenses</li>
            <li><strong>Prazos bancarios:</strong> variam conforme o contrato, podendo usar dias corridos ou uteis</li>
            <li><strong>Contratos comerciais:</strong> geralmente especificam o criterio no proprio documento</li>
          </ol>

          <h3>Como funciona o calculo de meses</h3>
          <p>O resultado em meses e uma <em>aproximacao</em> baseada em 30,44 dias por mes (media do calendario gregoriano). Para contratos que contam meses cheios -- como um prazo de 3 meses a partir de determinada data -- use as datas exatas em vez de confiar nos meses aproximados.</p>

          <h2>Exemplos praticos de uso</h2>
          <p>Veja alguns cenarios comuns onde a contagem de dias faz diferenca:</p>
          <ul>
            <li><strong>Periodo de experiencia:</strong> 45 ou 90 dias corridos a partir da admissao -- saber a data exata de vencimento evita problemas trabalhistas</li>
            <li><strong>Gestacao:</strong> calcular as 40 semanas (280 dias) a partir da data da ultima menstruacao</li>
            <li><strong>Planejamento de viagens:</strong> quantos dias dura a viagem para calcular orcamento diario e reservas</li>
            <li><strong>Prazos academicos:</strong> quantos dias uteis restam ate a entrega de um trabalho ou defesa de tese</li>
            <li><strong>Investimentos:</strong> calcular o prazo exato de vencimento de um CDB ou titulo do Tesouro Direto</li>
          </ul>

          <h2>Ferramentas complementares para calculos de tempo</h2>
          <p>Se voce precisa saber sua <strong>idade exata</strong> em anos, meses e dias a partir da data de nascimento, use a <a href="/utilidades/calculadora-idade">Calculadora de Idade</a>. Para medir tempo em tempo real com precisao de centesimos, o <a href="/utilidades/cronometro">Cronometro Online</a> e a ferramenta ideal. E para converter horarios entre diferentes regioes, acesse o <a href="/utilidades/fuso-horario">Conversor de Fuso Horario</a>. Calculos financeiros envolvendo prazos podem ser combinados com a <a href="/financeiro/juros-compostos">Calculadora de Juros Compostos</a> para projetar rendimentos ao longo do periodo.</p>
        </>
      }
    >
      <DiasEntreDatasForm />
    </CalculatorPage>
  )
}
