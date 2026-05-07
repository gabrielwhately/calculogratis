import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { PrazosJudiciaisForm } from '@/components/calculadoras/prazos-judiciais-form'

export const metadata: Metadata = createCategoriaMetadata(
  'juridica/prazos-judiciais',
  'Prazos Judiciais',
  'Informe a data de intimação e a quantidade de dias para calcular o vencimento do prazo processual — em dias úteis conforme o CPC/2015 ou em dias corridos para legislações especiais.'
)

export default function PrazosJudiciaisPage() {
  return (
    <CalculatorPage
      slug="prazos-judiciais"
      categoriaSlug="juridica"
      categoriaNome="Jurídico"
      nome="Prazos Judiciais"
      descricao="Informe a data de intimação e o número de dias para calcular quando vence o prazo — em dias úteis (regra geral do CPC/2015) ou corridos (habeas corpus, Juizados, CLT)."
      faqs={[
        {
          question: 'O CPC conta prazos em dias úteis ou corridos?',
          answer: 'Dias úteis, conforme o art. 219 do CPC/2015 — regra válida para todos os prazos fixados em dias. Sábados, domingos e feriados nacionais não entram na contagem. Exceções: habeas corpus, Juizados Especiais (Lei 9.099/95), processo do trabalho e prazos fixados em meses ou anos seguem dias corridos.',
        },
        {
          question: 'Quando começa a contar o prazo judicial?',
          answer: 'No primeiro dia útil seguinte à intimação (art. 224 do CPC/2015). O dia da intimação em si não conta — só o vencimento. Para intimações pelo Diário Oficial, o prazo começa no dia útil após a publicação. Para intimações eletrônicas, a contagem pode variar conforme o sistema do tribunal.',
        },
        {
          question: 'O que acontece se o prazo vencer em feriado ou fim de semana?',
          answer: 'Prorroga automaticamente para o primeiro dia útil seguinte (art. 224, §1º do CPC/2015). A calculadora exclui fins de semana, mas feriados estaduais e municipais não são considerados — é preciso verificar o calendário forense do tribunal para garantir a data correta.',
        },
      ]}
      conteudo={
        <>
          <h2>A contagem de prazos no CPC/2015: o que mudou</h2>
          <p>Antes do CPC/2015, os prazos processuais eram contados em dias corridos. O <strong>art. 219</strong> da nova legislação alterou essa regra: todos os prazos fixados em dias passaram a ser contados em <strong>dias úteis</strong>, excluindo sábados, domingos e feriados nacionais. Essa mudança representou uma das maiores transformações práticas para advogados, procuradores e partes que lidam com processos judiciais no Brasil.</p>
          <p>Na prática, se a intimação foi publicada numa sexta-feira e o prazo é de 15 dias úteis, a contagem começa na <em>segunda-feira seguinte</em>. Cada fim de semana acrescenta dois dias corridos ao prazo real, o que significa que 15 dias úteis equivalem, em média, a 21 dias corridos. Para calcular rapidamente a diferença em dias corridos entre duas datas, use a <a href="/utilidades/dias-entre-datas">Calculadora de Dias entre Datas</a>.</p>

          <h2>Dias úteis vs. dias corridos: quando usar cada um</h2>
          <p>Embora a regra geral do CPC/2015 seja a contagem em dias úteis, existem <strong>exceções importantes</strong> em que os prazos seguem dias corridos:</p>
          <ul>
            <li><strong>Habeas corpus:</strong> prazos contados em dias corridos, dada a urgência da medida.</li>
            <li><strong>Juizado Especial (Lei 9.099/95):</strong> mantém a contagem em dias corridos, pois é regido por lei especial anterior ao CPC.</li>
            <li><strong>Processo do Trabalho (CLT):</strong> também adota dias corridos como regra, exceto quando houver previsão expressa em contrário.</li>
            <li><strong>Prazos fixados em meses ou anos:</strong> seguem o calendário civil, sem distinção entre dias úteis e não úteis.</li>
          </ul>
          <p>Profissionais que atuam na esfera trabalhista podem complementar a análise de prazos com cálculos de <a href="/trabalhista/rescisao">rescisão trabalhista</a> ou <a href="/trabalhista/salario-liquido">salário líquido</a>, ferramentas que ajudam no planejamento financeiro durante processos dessa natureza.</p>

          <h3>Como funciona a contagem na prática</h3>
          <p>A contagem de prazos segue regras claras que todo operador do Direito deve conhecer:</p>
          <ol>
            <li>O <strong>dia da intimação não conta</strong> — a contagem começa no primeiro dia útil seguinte (art. 224, CPC).</li>
            <li>Exclui-se o dia do início e inclui-se o <strong>dia do vencimento</strong>.</li>
            <li>Se o vencimento cair em dia não útil (sábado, domingo ou feriado), o prazo é <strong>prorrogado automaticamente</strong> para o primeiro dia útil seguinte.</li>
            <li>Feriados <em>estaduais e municipais</em> também excluem dias da contagem — verifique o calendário forense do tribunal competente.</li>
          </ol>

          <h2>Prazos processuais mais comuns no direito civil</h2>
          <p>Conhecer os principais prazos do CPC evita a perda de oportunidades processuais e a <strong>preclusão temporal</strong> de direitos. Os mais frequentes incluem:</p>
          <ul>
            <li><strong>Contestação:</strong> 15 dias úteis a partir da citação (art. 335)</li>
            <li><strong>Apelação:</strong> 15 dias úteis da publicação da sentença (art. 1.009)</li>
            <li><strong>Agravo de instrumento:</strong> 15 dias úteis da decisão interlocutória (art. 1.015)</li>
            <li><strong>Embargos de declaração:</strong> 5 dias úteis (art. 1.023)</li>
            <li><strong>Recurso especial e extraordinário:</strong> 15 dias úteis (arts. 1.029 e ss.)</li>
            <li><strong>Resposta a intimações em geral:</strong> 5 dias úteis, salvo disposição específica</li>
          </ul>
          <p>Quando o processo envolver valores financeiros em discussão, como correção de dívidas ou atualização de créditos, utilize a <a href="/juridica/correcao-monetaria">Calculadora de Correção Monetária</a> para determinar o valor atualizado. Se houver cobranças com multa e juros, a <a href="/juridica/multa-atraso">Calculadora de Multa por Atraso</a> permite verificar se os encargos estão dentro dos limites legais.</p>

          <h2>Dicas para não perder prazos judiciais</h2>
          <p>A perda de um prazo processual pode ter consequências graves, desde a revelia até a impossibilidade de recorrer de uma decisão desfavorável. Algumas boas práticas para profissionais do Direito:</p>
          <ul>
            <li>Calcule o prazo <strong>imediatamente</strong> após receber a intimação e registre no sistema de controle do escritório.</li>
            <li>Considere uma <strong>margem de segurança</strong> de pelo menos 2 dias úteis antes do vencimento real.</li>
            <li>Verifique sempre o <strong>calendário forense</strong> do tribunal, pois feriados locais e recessos podem alterar a contagem.</li>
            <li>Para prazos em meses, use a <a href="/utilidades/calculadora-idade">Calculadora de Idade</a> para conferir a data exata de vencimento no calendário civil.</li>
          </ul>
          <p>Esta calculadora permite informar qualquer data de início e quantidade de dias para calcular com precisao o vencimento, tanto em dias úteis quanto em dias corridos. Use-a como ferramenta de apoio, mas confirme sempre com o calendário oficial do tribunal competente.</p>
        </>
      }
    >
      <PrazosJudiciaisForm />
    </CalculatorPage>
  )
}
