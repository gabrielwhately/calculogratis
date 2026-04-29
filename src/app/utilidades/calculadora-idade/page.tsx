import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CalculadoraIdadeForm } from '@/components/calculadoras/calculadora-idade-form'

export const metadata: Metadata = createCalculadoraMetadata('calculadora-idade')

export default function CalculadoraIdadePage() {
  return (
    <CalculatorPage
      slug="calculadora-idade"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Calculadora de Idade"
      descricao="Informe a data de nascimento e veja a idade exata em anos, meses e dias — mais os dias totais vividos, as semanas completas e quantos dias faltam para o próximo aniversário."
      faqs={[
        { question: 'Como a calculadora computa a idade exata?', answer: 'Não é só subtrair o ano. A ferramenta verifica se o mês e dia de aniversário já passaram no ano corrente e leva em conta os anos bissextos para contar os dias corretamente. O resultado mostra anos, meses e dias completos, sem arredondamento.' },
        { question: 'O que são os dias totais vividos?', answer: 'É a contagem de todos os dias desde o nascimento até hoje — incluindo os 29 de fevereiro dos anos bissextos. Serve para contextos jurídicos e previdenciários onde a contagem em dias é necessária, ou simplesmente para satisfazer a curiosidade.' },
        { question: 'Como é calculado o próximo aniversário?', answer: 'A calculadora encontra a próxima ocorrência do dia e mês de nascimento. Se o aniversário de 2026 já passou, mostra a data de 2027. Os dias restantes são calculados a partir da data de hoje.' },
      ]}
      conteudo={
        <>
          <h2>Como a calculadora de idade funciona com precisão</h2>
          <p>Calcular a <strong>idade exata</strong> vai muito além de subtrair o ano de nascimento do ano atual. Se você nasceu em dezembro de 1990 e estamos em março de 2026, sua idade é 35 anos — não 36, mesmo que 2026 menos 1990 resulte em 36. A nossa calculadora verifica automaticamente se o aniversário do ano corrente já ocorreu, leva em conta os <em>anos bissextos</em> e apresenta o resultado em anos, meses e dias completos, sem arredondamento.</p>
          <p>Além da idade em anos, a ferramenta calcula os <strong>dias totais vividos</strong>, as <strong>semanas completas</strong> e quantos dias faltam para o próximo aniversário — informações úteis tanto para curiosidade pessoal quanto para fins práticos.</p>

          <h2>Situações práticas onde a contagem precisa importa</h2>
          <p>A idade exata em dias ou meses faz diferença concreta em diversas situações do dia a dia:</p>
          <ul>
            <li><strong>Pediatria:</strong> o desenvolvimento nos primeiros dois anos de vida é acompanhado em semanas e meses, não em anos</li>
            <li><strong>Previdência social:</strong> o tempo de contribuição para <a href="/previdencia/aposentadoria">aposentadoria</a> pode ser contado em dias, e cada dia conta para atingir o tempo mínimo</li>
            <li><strong>Processos judiciais:</strong> a maioridade civil é verificada pela data exata de nascimento, não apenas pelo ano</li>
            <li><strong>Contratos e seguros:</strong> muitas apólices e contratos usam a idade precisa na data de assinatura para calcular valores</li>
            <li><strong>Concursos públicos:</strong> editais frequentemente exigem idade máxima na data de inscrição, verificada com precisão</li>
          </ul>

          <h3>Referências úteis de tempo vivido</h3>
          <p>Para dar uma perspectiva concreta: aos <strong>18 anos</strong> (maioridade civil), você viveu aproximadamente 6.574 dias. Aos <strong>30 anos</strong>, são cerca de 10.950 dias e 1.564 semanas. Aos <strong>65 anos</strong>, a marca chega a aproximadamente 23.725 dias. Esses números ficam muito mais tangíveis quando você vê a contagem do seu próprio caso.</p>

          <h2>Como calcular intervalos entre datas</h2>
          <p>A calculadora de idade é ideal para saber quanto tempo você viveu a partir do nascimento. Mas se precisa calcular o <strong>intervalo entre duas datas quaisquer</strong> — como o prazo de um contrato, a duração de uma viagem ou o período de experiência no trabalho — utilize a ferramenta <a href="/utilidades/dias-entre-datas">Dias entre Datas</a>, que mostra a diferença em dias corridos, dias úteis, semanas e meses.</p>

          <h2>Ferramentas relacionadas para cálculos de tempo e planejamento</h2>
          <p>Se você está fazendo cálculos relacionados a tempo e planejamento, considere explorar outras ferramentas úteis da plataforma:</p>
          <ul>
            <li>O <a href="/utilidades/cronometro">Cronômetro Online</a> para medições de tempo em tempo real com registro de voltas</li>
            <li>O <a href="/utilidades/fuso-horario">Conversor de Fuso Horário</a> para saber que horas são em diferentes partes do mundo</li>
            <li>A <a href="/trabalhista/salario-liquido">Calculadora de Salário Líquido</a> para entender seus descontos trabalhistas</li>
            <li>A <a href="/matematica/porcentagem">Calculadora de Porcentagem</a> para cálculos rápidos de percentuais</li>
          </ul>
        </>
      }
    >
      <CalculadoraIdadeForm />
    </CalculatorPage>
  )
}
