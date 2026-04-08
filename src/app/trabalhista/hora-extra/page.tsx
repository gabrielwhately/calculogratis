import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { HoraExtraForm } from '@/components/calculadoras/hora-extra-form'

export const metadata: Metadata = createCalculadoraMetadata('hora-extra')

export default function HoraExtraPage() {
  return (
    <CalculatorPage
      slug="hora-extra"
      categoriaSlug="trabalhista"
      categoriaNome="Trabalhista"
      nome="Hora Extra"
      descricao="Ficou além do horário e quer saber quanto tem a receber? Calcule o valor das horas extras com adicional de 50%, 100% (domingos e feriados) e adicional noturno conforme a CLT."
      faqs={[
        { question: 'Quanto vale a hora extra?', answer: 'Em dias úteis, a hora extra vale 50% a mais que a hora normal. Aos domingos e feriados, o adicional sobe para 100%. Na prática: se sua hora normal vale R$ 25, a hora extra em dia útil vale R$ 37,50 — e no domingo ou feriado, R$ 50,00.' },
        { question: 'Como calcular o valor da hora normal?', answer: 'Divida o salário bruto pelo total de horas mensais da sua jornada. Para jornada de 44h semanais (o padrão CLT), o divisor é 220. Para 40h semanais, é 200. Quem ganha R$ 3.300 com jornada de 44h tem hora normal de R$ 15.' },
        { question: 'O que é adicional noturno?', answer: 'Trabalho entre 22h e 5h tem adicional de 20% sobre a hora normal. Além disso, a hora noturna é reduzida: cada hora noturna conta como 52 minutos e 30 segundos — então num turno de 8 horas noturnas, você registra mais de 9 horas. Esse detalhe costuma passar despercebido.' },
      ]}
      conteudo={
        <>
          <h2>Como calcular o valor da hora extra em 2026</h2>
          <p>A hora extra é a remuneração devida ao trabalhador que ultrapassa sua <strong>jornada contratual</strong>. O cálculo parte do valor da hora normal de trabalho — obtida dividindo o salário bruto pelo total de horas mensais — e aplica os adicionais previstos na CLT e na Constituição Federal.</p>
          <p>Nossa calculadora permite simular diferentes cenários: horas extras em dias úteis, domingos, feriados e período noturno, sempre com base no seu <a href="/trabalhista/salario-liquido">salário bruto</a> atualizado.</p>

          <h3>Passo a passo do cálculo</h3>
          <p>Para chegar ao valor correto da hora extra, siga esta sequência:</p>
          <ol>
            <li><strong>Calcule a hora normal:</strong> divida o salário bruto pelo total de horas mensais da jornada. Para a jornada padrão CLT de 44 horas semanais, o divisor é <strong>220</strong>. Para 40 horas semanais, o divisor é <strong>200</strong>.</li>
            <li><strong>Aplique o adicional:</strong> em dias úteis, a hora extra vale a hora normal multiplicada por <strong>1,5</strong> (adicional de 50%). Aos domingos e feriados, multiplique por <strong>2,0</strong> (adicional de 100%).</li>
            <li><strong>Some o adicional noturno (se aplicável):</strong> trabalho entre 22h e 5h recebe acréscimo de <strong>20%</strong> sobre o valor da hora.</li>
          </ol>
          <p>Exemplo: salário de R$ 3.300 com jornada de 44h/semana. Hora normal = R$ 15,00. Hora extra em dia útil = R$ 22,50. Em domingos/feriados = R$ 30,00.</p>

          <h3>Adicional noturno: a dupla vantagem</h3>
          <p>O trabalho noturno (entre 22h e 5h para trabalhadores urbanos) tem duas vantagens previstas na CLT que se acumulam:</p>
          <ul>
            <li><strong>Adicional de 20%:</strong> sobre o valor da hora normal, elevando a remuneração.</li>
            <li><strong>Hora reduzida:</strong> a hora noturna é computada como <em>52 minutos e 30 segundos</em>. Isso significa que uma jornada de 7 horas reais entre 22h e 5h equivale a <strong>8 horas registradas</strong>.</li>
          </ul>
          <p>Quando há hora extra em período noturno, os adicionais se somam: o trabalhador recebe o adicional de hora extra (50% ou 100%) <em>mais</em> o adicional noturno de 20%, resultando em um valor significativamente maior por hora.</p>

          <h3>Limites legais e banco de horas</h3>
          <p>A legislação trabalhista estabelece regras claras sobre limites e compensação de horas extras:</p>
          <ul>
            <li><strong>Limite diário:</strong> no máximo <strong>2 horas extras por dia</strong>, salvo acordo ou convenção coletiva.</li>
            <li><strong>Banco de horas individual:</strong> deve ser compensado em até <strong>6 meses</strong>, com acordo individual escrito.</li>
            <li><strong>Banco de horas coletivo:</strong> via acordo ou convenção coletiva, o prazo de compensação pode chegar a <strong>12 meses</strong>.</li>
            <li><strong>Horas não compensadas:</strong> banco de horas que vence sem compensação deve ser pago como hora extra, com os respectivos adicionais.</li>
          </ul>

          <h3>Impacto das horas extras em outras verbas</h3>
          <p>As horas extras habituais integram a base de cálculo de diversas outras verbas trabalhistas. Isso é especialmente relevante no momento da <a href="/trabalhista/rescisao">rescisão</a>:</p>
          <ul>
            <li>Média das horas extras reflete no cálculo do <a href="/trabalhista/decimo-terceiro">13º salário</a>.</li>
            <li>Integra a remuneração de <a href="/trabalhista/ferias">férias</a> com o terço constitucional.</li>
            <li>Compõe a base de cálculo do <strong>FGTS</strong> (o empregador deposita 8% também sobre horas extras).</li>
            <li>Aumenta a base do <a href="/trabalhista/irrf">IRRF</a> e do INSS no mês em que as horas extras são pagas.</li>
          </ul>
          <p>Por isso, trabalhadores que fazem horas extras com frequência devem acompanhar de perto o impacto no <a href="/trabalhista/salario-liquido">salário líquido</a> e nos encargos mensais. Use a <a href="/matematica/porcentagem">calculadora de porcentagem</a> para conferir rapidamente os adicionais sobre diferentes valores.</p>
        </>
      }
    >
      <HoraExtraForm />
    </CalculatorPage>
  )
}
