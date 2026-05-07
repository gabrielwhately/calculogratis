import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { RegraDeTresForm } from '@/components/calculadoras/regra-de-tres-form'

export const metadata: Metadata = createCalculadoraMetadata('regra-de-tres')

export default function RegraDeTresPage() {
  return (
    <CalculatorPage
      slug="regra-de-tres"
      categoriaSlug="matematica"
      categoriaNome="Matemática"
      nome="Regra de Três"
      descricao="Informe três valores e a calculadora encontra o quarto proporcional — tanto para grandezas diretas quanto inversas. Útil em cálculos de receita, escala, velocidade e muito mais."
      faqs={[
        { question: 'O que é regra de três?', answer: 'É um método para encontrar um valor desconhecido quando você conhece três valores relacionados por proporção. Por exemplo: se 2 kg de café custam R$ 28, quanto custam 5 kg? Esse tipo de conta é regra de três.' },
        { question: 'Qual a diferença entre regra de três direta e inversa?', answer: 'Na direta, as grandezas crescem juntas — mais produto, mais preço. Na inversa, uma sobe enquanto a outra cai — mais operários, menos dias para terminar a obra. A chave é perguntar: se eu dobrar um valor, o outro dobra ou cai pela metade?' },
        { question: 'Quando usar regra de três inversa?', answer: 'Quando as grandezas são inversamente proporcionais. Clássico: 4 pessoas pintam uma casa em 6 dias. Quantos dias levariam 8 pessoas? A resposta é 3 dias — dobrou a equipe, caiu o tempo. Fórmula: X = (A × B) ÷ C.' },
      ]}
      conteudo={
        <>
          <h2>O que é regra de três e como funciona</h2>
          <p>A <strong>regra de três</strong> é um dos métodos matemáticos mais utilizados no cotidiano. Ela permite encontrar um valor desconhecido quando se conhecem três valores que mantêm uma relação de <em>proporcionalidade</em> entre si. O método se divide em dois tipos fundamentais:</p>
          <ul>
            <li><strong>Regra de três direta:</strong> as grandezas são diretamente proporcionais — quando uma aumenta, a outra também aumenta na mesma proporção. Formula: X = (B x C) / A.</li>
            <li><strong>Regra de três inversa:</strong> as grandezas são inversamente proporcionais — quando uma aumenta, a outra diminui. Formula: X = (A x B) / C.</li>
          </ul>
          <p>Para cálculos que envolvem especificamente proporções percentuais (quanto um valor representa de outro, aumentos e descontos), a <a href="/matematica/porcentagem">Calculadora de Porcentagem</a> oferece modos dedicados que simplificam ainda mais o processo.</p>

          <h2>Exemplos práticos de regra de três direta</h2>
          <p>A regra de três direta aparece em inúmeras situações do dia a dia. Veja alguns exemplos resolvidos:</p>
          <ol>
            <li><strong>Preço por quantidade:</strong> se 3 metros de tecido custam R$ 45, quanto custam 5 metros? X = (45 x 5) / 3 = <strong>R$ 75,00</strong>.</li>
            <li><strong>Consumo de combustível:</strong> se um carro percorre 12 km com 1 litro, quantos litros precisa para percorrer 180 km? X = (1 x 180) / 12 = <strong>15 litros</strong>. Para uma análise mais completa de custo por quilômetro, veja a <a href="/utilidades/combustivel">Calculadora de Combustível</a>.</li>
            <li><strong>Receita culinária:</strong> se a receita original serve 4 pessoas e usa 300g de farinha, para 10 pessoas seriam necessários: X = (300 x 10) / 4 = <strong>750g de farinha</strong>.</li>
          </ol>

          <h2>Exemplos práticos de regra de três inversa</h2>
          <p>Na regra de três inversa, o raciocínio se inverte: mais de um recurso significa menos de outro. Exemplos comuns:</p>
          <ol>
            <li><strong>Mão de obra:</strong> se 3 costureiras terminam um lote em 10 dias, 5 costureiras terminam em quantos? X = (3 x 10) / 5 = <strong>6 dias</strong>.</li>
            <li><strong>Velocidade e tempo:</strong> se a 60 km/h uma viagem leva 4 horas, a 80 km/h levaria: X = (60 x 4) / 80 = <strong>3 horas</strong>.</li>
            <li><strong>Equipe e prazo:</strong> se 8 programadores entregam um projeto em 15 dias, 12 programadores entregariam em: X = (8 x 15) / 12 = <strong>10 dias</strong>.</li>
          </ol>

          <h3>Como identificar se a relação é direta ou inversa</h3>
          <p>A chave para montar corretamente a regra de três é identificar a natureza da relação entre as grandezas. Faça a seguinte pergunta: <em>se eu aumentar a primeira grandeza, a segunda aumenta ou diminui?</em></p>
          <ul>
            <li><strong>Aumenta junto:</strong> relação direta. Exemplos: preço e quantidade, distância e tempo (a velocidade constante), salário e horas trabalhadas.</li>
            <li><strong>Diminui:</strong> relação inversa. Exemplos: número de trabalhadores e dias para concluir, velocidade e tempo de viagem, tamanho da equipe e carga individual.</li>
          </ul>

          <h2>A regra de três no contexto financeiro e profissional</h2>
          <p>Embora pareça um conceito simples da matemática básica, a regra de três é a base de diversos cálculos profissionais e financeiros. Alguns exemplos de aplicação prática:</p>
          <ul>
            <li><strong>Cálculos trabalhistas:</strong> proporcionalidade de férias, 13o salário e rescisão são essencialmente regras de três aplicadas a períodos. A <a href="/trabalhista/rescisao">Calculadora de Rescisão</a> automatiza esses cálculos.</li>
            <li><strong>Conversão de taxas:</strong> transformar uma taxa mensal em anual (ou vice-versa) envolve proporções. Use o <a href="/financeiro/conversor-taxas">Conversor de Taxas</a> para essas conversões.</li>
            <li><strong>Análise de investimentos:</strong> projetar rendimentos proporcionais ao capital investido é uma aplicação direta da regra de três, complementada pela <a href="/financeiro/juros-compostos">Calculadora de Juros Compostos</a> para cenários de longo prazo.</li>
          </ul>
          <p>Para expressões matemáticas mais elaboradas que envolvam funções trigonométricas, logaritmos ou potências, a <a href="/matematica/calculadora-cientifica">Calculadora Científica</a> oferece os recursos necessários. E para trabalhar com sistemas numéricos diferentes (binário, octal, hexadecimal), utilize o <a href="/matematica/conversor-bases">Conversor de Bases Numéricas</a>.</p>
        </>
      }
    >
      <RegraDeTresForm />
    </CalculatorPage>
  )
}
