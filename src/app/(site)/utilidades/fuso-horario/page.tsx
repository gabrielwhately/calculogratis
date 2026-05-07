import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FusoHorarioForm } from '@/components/calculadoras/fuso-horario-form'

export const metadata: Metadata = createCalculadoraMetadata('fuso-horario')

export default function FusoHorarioPage() {
  return (
    <CalculatorPage
      slug="fuso-horario"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Conversor de Fuso Horário"
      descricao="Qual horário é em Lisboa quando são 14h em Brasília? E em Tóquio? Selecione os fusos e veja a conversão — com diferença em horas calculada automaticamente."
      faqs={[
        { question: 'O que é fuso horário?', answer: 'Uma região do planeta que adota o mesmo horário oficial. A referência é o meridiano de Greenwich (UTC/GMT 0). Fusos a leste de Greenwich têm horas adiantadas (UTC+1, +2…), a oeste têm horas atrasadas (UTC-1, -2…). O Brasil continental fica em UTC-3.' },
        { question: 'O Brasil tem vários fusos horários?', answer: 'Quatro, oficialmente. Brasília e a maior parte do país: GMT-3. Manaus e Amazonas (exceto cidades do extremo oeste): GMT-4. Rio Branco e Acre: GMT-5. Fernando de Noronha: GMT-2. O horário de Brasília é o padrão nacional para transmissões, horário de funcionamento de bancos e órgãos federais.' },
        { question: 'A ferramenta considera horário de verão?', answer: 'Sim. A conversão usa a base IANA (a mesma que o seu sistema operacional usa), atualizada regularmente com as regras de horário de verão de cada país. O Brasil aboliu o horário de verão em 2019, mas países como EUA e europeus ainda adotam — a ferramenta reflete isso automaticamente.' },
      ]}
      conteudo={
        <>
          <h2>Como funciona a conversao de fuso horario</h2>
          <p>O <strong>conversor de fuso horario</strong> utiliza a API <code>Intl.DateTimeFormat</code> do JavaScript com os identificadores da base <em>IANA</em> (Internet Assigned Numbers Authority) -- a mesma base utilizada por sistemas operacionais, bancos de dados e linguagens de programacao ao redor do mundo. Ela e atualizada automaticamente sempre que algum pais altera suas regras de fuso ou horario de verao, garantindo conversoes sempre precisas.</p>
          <p>Basta selecionar o fuso de origem, o fuso de destino e informar o horario desejado. A diferenca em horas e calculada automaticamente, levando em conta as regras vigentes de horario de verao de cada regiao.</p>

          <h2>Principais fusos horarios e suas referencias</h2>
          <p>Conhecer os fusos mais utilizados facilita o planejamento de reunioes, viagens e operacoes internacionais:</p>
          <ul>
            <li><strong>Brasilia (GMT-3):</strong> horario padrao do Brasil continental, referencia para bancos, orgaos federais e transmissoes nacionais</li>
            <li><strong>Nova York (GMT-5 / GMT-4 no verao):</strong> costa leste dos EUA, referencia para mercados financeiros como NYSE e Nasdaq</li>
            <li><strong>Londres (GMT / GMT+1 no verao):</strong> meridiano zero de Greenwich, base do sistema UTC</li>
            <li><strong>Paris e Berlim (GMT+1 / GMT+2 no verao):</strong> Europa Central, fuso da Uniao Europeia continental</li>
            <li><strong>Dubai (GMT+4):</strong> nao adota horario de verao, referencia para negocios no Oriente Medio</li>
            <li><strong>Toquio (GMT+9):</strong> tambem sem horario de verao, principal referencia para o mercado asiatico</li>
          </ul>

          <h3>Os fusos horarios do Brasil</h3>
          <p>O Brasil possui oficialmente quatro fusos horarios. <strong>Brasilia (GMT-3)</strong> cobre a maior parte do territorio. <strong>Manaus (GMT-4)</strong> abrange o Amazonas. <strong>Rio Branco (GMT-5)</strong> cobre o Acre. E <strong>Fernando de Noronha (GMT-2)</strong> tem o fuso mais adiantado do pais. Desde 2019, o Brasil nao adota mais o horario de verao.</p>

          <h2>Situacoes praticas onde a conversao de fuso e essencial</h2>
          <p>A diferenca de fuso horario impacta diretamente diversas atividades do cotidiano:</p>
          <ol>
            <li><strong>Reunioes remotas:</strong> uma reuniao marcada para 9h em Sao Paulo corresponde a 13h em Lisboa e 5h da manha em Los Angeles -- alguem sempre precisa se adaptar</li>
            <li><strong>Mercados financeiros:</strong> a NYSE abre as 9h30 de Nova York, equivalente a 11h30 em Brasilia no horario padrao. Investidores precisam dessa conversao diariamente</li>
            <li><strong>Suporte tecnico global:</strong> entender quando cada regiao esta em horario comercial e essencial para escalar equipes de atendimento 24/7</li>
            <li><strong>Viagens internacionais:</strong> ajustar relogios e planejar conexoes de voos exige conhecer os fusos de cada escala</li>
          </ol>

          <h2>Ferramentas complementares para gestao de tempo</h2>
          <p>Se voce precisa medir intervalos de tempo com precisao, o <a href="/utilidades/cronometro">Cronometro Online</a> oferece contagem com centesimos de segundo e registro de voltas. Para calcular a diferenca entre duas datas especificas, use a ferramenta <a href="/utilidades/dias-entre-datas">Dias entre Datas</a>. E se precisa saber sua idade exata em anos, meses e dias, a <a href="/utilidades/calculadora-idade">Calculadora de Idade</a> faz o calculo completo com contagem de dias vividos.</p>
        </>
      }
    >
      <FusoHorarioForm />
    </CalculatorPage>
  )
}
