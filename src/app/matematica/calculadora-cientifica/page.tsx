import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { CalculadoraCientificaForm } from '@/components/calculadoras/calculadora-cientifica-form'

export const metadata: Metadata = createCalculadoraMetadata('calculadora-cientifica')

export default function CalculadoraCientificaPage() {
  return (
    <CalculatorPage
      slug="calculadora-cientifica"
      categoriaSlug="matematica"
      categoriaNome="Matemática"
      nome="Calculadora Científica"
      descricao="Seno, cosseno, logaritmos, potências, raiz cúbica — tudo em uma expressão só, sem precisar instalar nada. Digite como você escreveria no papel."
      faqs={[
        { question: 'O que é uma calculadora científica?', answer: 'Vai além das quatro operações: suporta trigonometria (sin, cos, tan e inversas), logaritmos (log base 10 e ln natural), potências, raízes e constantes como pi e e. Serve para física, engenharia, estatística e qualquer disciplina que exija funções avançadas.' },
        { question: 'Como usar as funções trigonométricas?', answer: 'Os argumentos são em radianos. Então sin(pi/2) retorna 1, cos(0) retorna 1. Para trabalhar em graus, converta primeiro: ângulo × pi ÷ 180. Por exemplo, sin(30 graus) = sin(30 × pi/180) ≈ 0,5.' },
        { question: 'Como calcular logaritmos?', answer: 'Use log( para base 10 — log(1000) retorna 3. Use ln( para logaritmo natural — ln(1) retorna 0, ln(e) retorna 1. Para outras bases, lembre que log_b(x) = ln(x) ÷ ln(b).' },
        { question: 'Como usar potências e raiz quadrada?', answer: 'O operador ^ eleva à potência: 2^10 = 1024. Para raiz quadrada, use sqrt(16) = 4. Raiz cúbica: cbrt(27) = 3. Outras raízes podem ser expressas como potência fracionária: 32^(1/5) = 2.' },
      ]}
      conteudo={
        <>
          <h2>Como usar a calculadora científica online</h2>
          <p>Esta <strong>calculadora científica</strong> funciona diretamente no navegador, sem necessidade de instalação ou download. Você pode clicar nos botões da interface ou digitar a expressão diretamente no campo de entrada. A sintaxe segue o padrão matemático: use <strong>parênteses</strong> para agrupar termos, <strong>^</strong> para potência e os <strong>nomes das funções</strong> seguidos de parênteses.</p>
          <p>Exemplos rápidos: <strong>(3+4)^2</strong> retorna 49, e <strong>sin(pi/6)</strong> retorna 0,5. Pressione o botão de igual ou a tecla Enter para calcular. Para cálculos percentuais mais simples, como descontos e variações, a <a href="/matematica/porcentagem">Calculadora de Porcentagem</a> oferece uma interface mais direta.</p>

          <h2>Funções e operações disponíveis</h2>
          <p>A calculadora oferece um conjunto completo de funções para atender desde estudantes do ensino médio até profissionais de engenharia e ciências exatas:</p>
          <h3>Funções trigonométricas</h3>
          <ul>
            <li><strong>sin, cos, tan:</strong> seno, cosseno e tangente. Os argumentos devem estar em <em>radianos</em>. Para converter graus em radianos, multiplique por pi/180.</li>
            <li><strong>asin, acos, atan:</strong> funções trigonométricas inversas (arco seno, arco cosseno, arco tangente). O resultado é dado em radianos.</li>
          </ul>
          <h3>Funções exponenciais e logarítmicas</h3>
          <ul>
            <li><strong>exp:</strong> exponencial (e elevado a x). Exemplo: exp(1) = 2,71828...</li>
            <li><strong>log:</strong> logaritmo na base 10. Exemplo: log(1000) = 3.</li>
            <li><strong>ln:</strong> logaritmo natural (base e). Exemplo: ln(e) = 1.</li>
          </ul>
          <h3>Raízes, potências e constantes</h3>
          <ul>
            <li><strong>sqrt:</strong> raiz quadrada. Exemplo: sqrt(144) = 12.</li>
            <li><strong>cbrt:</strong> raiz cúbica. Exemplo: cbrt(27) = 3.</li>
            <li><strong>^:</strong> potência. Exemplo: 2^10 = 1024. Para raízes de ordem superior, use potência fracionária: 32^(1/5) = 2.</li>
            <li><strong>abs:</strong> valor absoluto. Exemplo: abs(-7) = 7.</li>
            <li><strong>Constantes:</strong> pi (3,14159...) e e (2,71828...).</li>
          </ul>

          <h2>Exemplos práticos para testar</h2>
          <p>Experimente estas expressões para verificar o funcionamento da calculadora:</p>
          <ol>
            <li><strong>2^8</strong> = 256 (potência de 2, comum em computação)</li>
            <li><strong>sin(pi/2)</strong> = 1 (seno de 90 graus)</li>
            <li><strong>log(1000)</strong> = 3 (logaritmo decimal)</li>
            <li><strong>ln(e^3)</strong> = 3 (propriedade do logaritmo natural)</li>
            <li><strong>sqrt(2)</strong> = 1,41421... (diagonal de um quadrado unitário)</li>
            <li><strong>(3+4)*2^2</strong> = 28 (precedência de operadores)</li>
          </ol>
          <p>Para quem trabalha com programação e precisa converter resultados entre sistemas numéricos diferentes, o <a href="/matematica/conversor-bases">Conversor de Bases Numéricas</a> permite visualizar qualquer valor em decimal, binário, octal e hexadecimal simultaneamente.</p>

          <h2>Ordem de precedência das operações</h2>
          <p>A calculadora respeita a <strong>precedência padrão da matemática</strong>, na seguinte ordem:</p>
          <ol>
            <li><strong>Funções</strong> (sin, cos, log, sqrt, etc.) e <strong>parênteses</strong> — avaliados primeiro.</li>
            <li><strong>Potências</strong> (^) — avaliadas da direita para a esquerda.</li>
            <li><strong>Multiplicação e divisão</strong> (*,/) — avaliadas da esquerda para a direita.</li>
            <li><strong>Adição e subtração</strong> (+, -) — avaliadas por último.</li>
          </ol>
          <p>Se precisar alterar a ordem natural, envolva os termos em parênteses. Exemplo: <strong>10/(3+2)</strong> = 2 (sem parênteses, a divisão aconteceria antes da soma). Sempre feche os parênteses das funções para evitar erros de sintaxe.</p>

          <h2>Quando usar a calculadora científica</h2>
          <p>Esta ferramenta é ideal para situações que vão além das quatro operações básicas. Alguns contextos onde ela se mostra indispensável:</p>
          <ul>
            <li><strong>Estudantes:</strong> resolução de exercícios de trigonometria, logaritmos, potências e raízes em provas e vestibulares.</li>
            <li><strong>Engenheiros e arquitetos:</strong> cálculos de ângulos, áreas e volumes em projetos técnicos.</li>
            <li><strong>Profissionais de finanças:</strong> fórmulas de <a href="/financeiro/juros-compostos">juros compostos</a> com exponenciação e logaritmos para determinar prazos de investimento.</li>
            <li><strong>Programadores:</strong> verificação de cálculos matemáticos em algoritmos, complementando o uso do <a href="/matematica/conversor-bases">Conversor de Bases</a> para representações numéricas.</li>
          </ul>
          <p>Para cálculos de proporcionalidade simples (quanto custa X unidades se Y unidades custam Z?), a <a href="/matematica/regra-de-tres">Calculadora de Regra de Três</a> é mais prática e direta.</p>
        </>
      }
    >
      <CalculadoraCientificaForm />
    </CalculatorPage>
  )
}
