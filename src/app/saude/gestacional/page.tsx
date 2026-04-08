import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GestacionalForm } from '@/components/calculadoras/gestacional-form'

export const metadata: Metadata = createCategoriaMetadata(
  'saude/gestacional',
  'Calculadora Gestacional',
  'Informe a data da sua última menstruação e descubra quantas semanas e dias de gestação você tem, em qual trimestre está e qual é a data provável do parto.'
)

export default function GestacionalPage() {
  return (
    <CalculatorPage
      slug="gestacional"
      categoriaSlug="saude"
      categoriaNome="Saúde"
      nome="Calculadora Gestacional"
      descricao="Informe a DUM (Data da Última Menstruação) e veja em quantas semanas e dias está a gestação, em qual trimestre você se encontra e qual é a Data Provável do Parto."
      faqs={[
        {
          question: 'Como calcular a idade gestacional?',
          answer: 'Conta-se os dias desde o primeiro dia da última menstruação até hoje, depois divide-se por 7. O resultado são as semanas completas, e o resto são os dias adicionais. Por exemplo, 73 dias = 10 semanas e 3 dias. A gestação normal dura 280 dias — 40 semanas — a partir da DUM.',
        },
        {
          question: 'O que é a Data Provável do Parto (DPP)?',
          answer: 'É a data estimada somando 280 dias à DUM. Na Regra de Naegele, soma-se 7 dias ao primeiro dia da última menstruação e avança-se 9 meses no calendário. Parto a termo é entre a 37ª e 42ª semana — apenas 5% dos bebês nascem exatamente na DPP calculada.',
        },
        {
          question: 'Quais são os trimestres da gestação?',
          answer: 'Primeiro trimestre: semanas 1 a 13 — fase de formação dos órgãos, período mais crítico. Segundo trimestre: semanas 14 a 27 — geralmente o mais confortável, quando o bebê começa a se mexer. Terceiro trimestre: semana 28 até o parto — fase de crescimento acelerado e preparação para o nascimento.',
        },
      ]}
      conteudo={
        <>
          <h2>Como funciona a calculadora gestacional</h2>
          <p>A <strong>calculadora gestacional</strong> determina a idade da gestacao com base na <em>Data da Ultima Menstruacao (DUM)</em>. Basta informar o primeiro dia do seu ultimo periodo menstrual para descobrir quantas semanas e dias de gravidez voce tem, em qual trimestre se encontra e qual e a <strong>Data Provavel do Parto (DPP)</strong>.</p>
          <p>O calculo e o mesmo utilizado por obstetras em consultas de pre-natal: contam-se os dias entre a DUM e a data atual, divide-se por 7. O quociente sao as semanas completas, e o resto sao os dias adicionais. Por exemplo, 73 dias desde a DUM = <strong>10 semanas e 3 dias</strong> de gestacao.</p>

          <h3>Por que a contagem comeca na ultima menstruacao?</h3>
          <p>Embora a concepcao ocorra aproximadamente 14 dias apos o inicio da ultima menstruacao (durante a ovulacao), a data exata da fecundacao raramente e conhecida com precisao. O primeiro dia da DUM, por outro lado, e facilmente identificavel pela maioria das mulheres. Por essa razao, a obstetricia adotou a DUM como <strong>marco zero</strong> da gestacao -- o que significa que, por convencao, a gravidez &ldquo;comeca&rdquo; antes mesmo da concepcao biologica.</p>
          <p>O ultrassom do primeiro trimestre (realizado entre a 11a e a 13a semana) pode confirmar ou corrigir a idade gestacional calculada pela DUM, especialmente em mulheres com ciclos irregulares.</p>

          <h2>Os tres trimestres da gestacao em detalhe</h2>
          <p>A gravidez e dividida em tres trimestres, cada um com marcos de desenvolvimento fetal e necessidades especificas da gestante:</p>

          <h3>Primeiro trimestre (semanas 1 a 13)</h3>
          <ul>
            <li><strong>Desenvolvimento fetal:</strong> periodo de formacao dos principais orgaos e sistemas do bebe (organogenese). O coracao comeca a bater por volta da 6a semana. Ao final do trimestre, o feto mede cerca de 7 cm.</li>
            <li><strong>Sintomas comuns:</strong> nauseas matinais, vomitos, fadiga extrema, sensibilidade mamaria e alteracoes de humor.</li>
            <li><strong>Exames importantes:</strong> ultrassom entre a 11a e 13a semana para confirmar a DPP, rastrear anomalias cromossomicas e verificar a translucencia nucal.</li>
            <li><strong>Cuidados essenciais:</strong> inicio do acido folico (idealmente antes da concepcao), evitar alcool e tabaco, e consulta pre-natal inicial.</li>
          </ul>

          <h3>Segundo trimestre (semanas 14 a 27)</h3>
          <ul>
            <li><strong>Desenvolvimento fetal:</strong> o bebe comeca a se movimentar (perceptivel entre a 18a e 20a semana), desenvolve impressoes digitais e ja consegue ouvir sons externos.</li>
            <li><strong>Sintomas comuns:</strong> as nauseas geralmente diminuem, surgem dores lombares, inchacos leves e possivel aumento de apetite.</li>
            <li><strong>Exames importantes:</strong> ultrassom morfologico entre a 20a e 24a semana para avaliar a anatomia fetal detalhadamente.</li>
          </ul>

          <h3>Terceiro trimestre (semanas 28 ao parto)</h3>
          <ul>
            <li><strong>Desenvolvimento fetal:</strong> fase de crescimento acelerado. O bebe ganha peso rapidamente, os pulmoes amadurecem e ele se posiciona para o nascimento.</li>
            <li><strong>Sintomas comuns:</strong> desconforto abdominal, insonia, falta de ar, azia e contracoes de Braxton-Hicks (treino).</li>
            <li><strong>Parto a termo:</strong> ocorre entre a 37a e 42a semana. Antes de 37 semanas e considerado prematuro.</li>
          </ul>

          <h2>Data Provavel do Parto (DPP): o que voce precisa saber</h2>
          <p>A DPP e calculada somando <strong>280 dias</strong> a data da ultima menstruacao, o que equivale a 40 semanas ou 10 meses lunares. Na pratica clinica, utiliza-se a <strong>Regra de Naegele</strong>: some 7 dias ao primeiro dia da DUM e avance 9 meses no calendario.</p>
          <p>E fundamental entender que a DPP e uma <strong>estimativa</strong>. Apenas cerca de 5% dos bebes nascem exatamente na data calculada. Um parto e considerado a termo entre a 37a semana completa e 41 semanas e 6 dias. Para calcular datas e intervalos com precisao, voce pode usar tambem nossa ferramenta de <a href="/utilidades/calculadora-idade">calculo de idade</a>.</p>

          <h2>Cuidados essenciais durante a gestacao</h2>
          <p>Alem de acompanhar a idade gestacional, alguns cuidados sao fundamentais para uma gravidez saudavel:</p>
          <ol>
            <li><strong>Pre-natal regular:</strong> consultas mensais no primeiro e segundo trimestres, quinzenais a partir da 32a semana e semanais apos a 36a semana.</li>
            <li><strong>Alimentacao equilibrada:</strong> a necessidade calorica aumenta cerca de 300 kcal por dia a partir do segundo trimestre. Use a <a href="/saude/calorias-tmb">calculadora de calorias e TMB</a> como referencia para entender seu gasto energetico basal.</li>
            <li><strong>Acompanhamento do peso:</strong> o ganho de peso recomendado varia conforme o <a href="/saude/imc">IMC</a> pre-gestacional. Mulheres com IMC normal devem ganhar entre 11,5 e 16 kg durante toda a gestacao.</li>
            <li><strong>Suplementacao:</strong> acido folico, ferro e vitamina D sao os suplementos mais prescritos. Sempre sob orientacao medica.</li>
            <li><strong>Atividade fisica:</strong> exercicios leves a moderados sao recomendados, salvo contraindicacoes medicas. Caminhada, natacao e yoga pre-natal sao as opcoes mais seguras.</li>
          </ol>
          <p><em>Aviso importante:</em> esta calculadora e uma ferramenta informativa e nao substitui o acompanhamento medico. Sempre consulte seu obstetra para avaliacoes personalizadas da sua gestacao. Para verificar se seu peso esta na faixa adequada, utilize a <a href="/saude/peso-ideal">calculadora de peso ideal</a>.</p>
        </>
      }
    >
      <GestacionalForm />
    </CalculatorPage>
  )
}
