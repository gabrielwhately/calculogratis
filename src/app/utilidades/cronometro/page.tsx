import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CronometroForm } from '@/components/calculadoras/cronometro-form'

export const metadata: Metadata = createCalculadoraMetadata('cronometro')

export default function CronometroPage() {
  return (
    <CalculatorPage
      slug="cronometro"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Cronômetro Online"
      descricao="Cronômetro com precisão de centésimos de segundo no navegador. Registre voltas individuais sem parar a contagem, pause e retome quando precisar."
      faqs={[
        { question: 'Qual a precisão do cronômetro?', answer: 'A exibição é em centésimos de segundo (atualização a cada 10ms). A precisão real depende do navegador — navegadores modernos têm jitter de alguns milissegundos, o que é imperceptível na prática. O cálculo usa timestamps absolutos (performance.now()), não contador de intervalos, então pausar e retomar não acumula erro.' },
        { question: 'O que é a função de volta?', answer: 'Registra um marcador de tempo sem interromper o cronômetro. Cada volta mostra dois tempos: o parcial (duração só daquela volta) e o total acumulado no momento do registro. Útil para medir séries de treino, voltas em pista, etapas de uma apresentação ou blocos de estudo.' },
        { question: 'O cronômetro continua rodando se eu trocar de aba?', answer: 'O tempo medido permanece preciso ao voltar — o cálculo é feito por diferença de timestamp, não por contagem de intervalos. Mas a exibição pode congelar em abas em segundo plano porque alguns navegadores reduzem a frequência de atualização para economizar energia.' },
      ]}
      conteudo={
        <>
          <h2>Como usar o cronometro online</h2>
          <p>O <strong>cronometro online</strong> funciona diretamente no navegador com precisao de centesimos de segundo. A interface e simples e intuitiva:</p>
          <ol>
            <li>Clique em <strong>Iniciar</strong> para comecar a contagem no formato MM:SS.cc (minutos, segundos e centesimos)</li>
            <li>Use <strong>Pausar</strong> para congelar a contagem e <strong>Continuar</strong> para retomar do ponto exato</li>
            <li>Pressione <strong>Volta</strong> para registrar um marcador sem interromper o cronometro</li>
            <li>Clique em <strong>Zerar</strong> para reiniciar do zero e limpar o historico de voltas</li>
          </ol>
          <p>O calculo utiliza timestamps absolutos (<code>performance.now()</code>) em vez de contagem de intervalos, o que significa que pausar e retomar <em>nao acumula erro</em> ao longo do tempo.</p>

          <h2>Funcao de voltas: medicao sem interrupcao</h2>
          <p>O recurso de <strong>registro de voltas</strong> e um dos mais uteis do cronometro. Ao pressionar o botao de volta, o cronometro registra o momento exato sem parar a contagem. Cada entrada no historico mostra dois tempos:</p>
          <ul>
            <li><strong>Tempo parcial:</strong> a duracao apenas daquela volta especifica</li>
            <li><strong>Tempo total acumulado:</strong> o tempo desde o inicio ate o momento do registro</li>
          </ul>
          <p>As voltas mais recentes aparecem no topo da lista, facilitando a comparacao entre etapas consecutivas. Isso e especialmente util para identificar se voce esta melhorando ou perdendo ritmo ao longo de series de exercicios ou etapas de trabalho.</p>

          <h2>Aplicacoes praticas alem do esporte</h2>
          <p>Embora treinos de natacao, corrida e ciclismo sejam os usos mais obvios, o cronometro online serve para muitas outras situacoes:</p>
          <ul>
            <li><strong>Apresentacoes e palestras:</strong> cronometrar ensaios antes de uma defesa de TCC ou apresentacao corporativa para respeitar o tempo alocado</li>
            <li><strong>Tecnica Pomodoro:</strong> ciclos de 25 minutos de foco seguidos de 5 minutos de pausa para maximizar a produtividade</li>
            <li><strong>Culinaria de precisao:</strong> medir tempos de cozimento, fermentacao ou descanso de massas com exatidao</li>
            <li><strong>Analise de processos:</strong> cronometrar etapas de fluxos de trabalho manuais para identificar gargalos e oportunidades de melhoria</li>
            <li><strong>Reunioes:</strong> acompanhar quanto tempo uma reuniao esta durando para manter o foco nos objetivos</li>
          </ul>

          <h3>Precisao e comportamento em segundo plano</h3>
          <p>O tempo medido permanece <strong>preciso mesmo ao trocar de aba</strong>, pois o calculo e feito por diferenca de timestamps. Porem, a <em>exibicao visual</em> pode congelar em abas em segundo plano, ja que alguns navegadores reduzem a frequencia de atualizacao para economizar energia. Ao retornar a aba, o tempo exibido sera atualizado corretamente.</p>

          <h2>Outras ferramentas de tempo e calculo</h2>
          <p>Se voce precisa calcular a diferenca entre duas datas especificas, utilize a ferramenta <a href="/utilidades/dias-entre-datas">Dias entre Datas</a> para obter o resultado em dias corridos, dias uteis e semanas. Para converter horarios entre diferentes regioes do mundo, o <a href="/utilidades/fuso-horario">Conversor de Fuso Horario</a> faz a conversao automatica. E para saber sua idade exata em dias vividos, a <a href="/utilidades/calculadora-idade">Calculadora de Idade</a> oferece um calculo completo e preciso.</p>
        </>
      }
    >
      <CronometroForm />
    </CalculatorPage>
  )
}
