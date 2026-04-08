import type { Metadata } from 'next'
import { createCategoriaMetadata } from '@/lib/seo/metadata'
import { CategoryLanding } from '@/components/layout/category-landing'

export const metadata: Metadata = createCategoriaMetadata('matematica', 'Matemática', 'Calculadoras de matemática online grátis: porcentagem, regra de três simples e inversa. Resultados instantâneos com explicação passo a passo.')

export default function MatematicaPage() {
  return (
    <CategoryLanding
      categoriaNome="Matemática"
      categoriaSlug="matematica"
      descricao="Porcentagem (5 modos), regra de três direta e inversa, calculadora científica e conversor de bases numéricas. A fórmula aparece junto com o resultado."
      conteudo={
        <>
          <h2>Calculadoras de matemática do dia a dia</h2>
          <p>Porcentagem e regra de três estão entre os cálculos mais buscados na internet brasileira — e não é por acaso. São ferramentas matemáticas fundamentais que usamos o tempo todo: para calcular descontos em compras, entender aumentos de preço, converter proporções em receitas, distribuir valores entre pessoas e muito mais.</p>

          <h2>Calculadora de porcentagem</h2>
          <p>Nossa <strong>calculadora de porcentagem</strong> oferece 5 modos de cálculo para cobrir todas as situações:</p>
          <ul>
            <li><strong>Quanto é X% de Y?</strong> — o cálculo mais clássico. Exemplo: 15% de R$ 200 = R$ 30.</li>
            <li><strong>Aumento percentual:</strong> calcule o valor final após um aumento. Exemplo: R$ 100 + 25% = R$ 125.</li>
            <li><strong>Desconto percentual:</strong> descubra o preço com desconto. Exemplo: R$ 80 - 30% = R$ 56.</li>
            <li><strong>Variação percentual:</strong> qual foi o aumento ou queda entre dois valores? Se subiu de R$ 50 para R$ 65, a variação é de 30%.</li>
            <li><strong>Representação:</strong> X representa quantos por cento de Y? R$ 25 de R$ 200 = 12,5%.</li>
          </ul>

          <h2>Calculadora de regra de três</h2>
          <p>A <strong>regra de três</strong> resolve problemas de proporcionalidade — quando sabemos três valores e precisamos encontrar o quarto. Oferecemos os dois tipos:</p>
          <p><strong>Regra de três direta:</strong> quando as grandezas são diretamente proporcionais (se uma aumenta, a outra também). Exemplo: se 3 metros de tecido custam R$ 45, quanto custam 7 metros? Resposta: R$ 105.</p>
          <p><strong>Regra de três inversa:</strong> quando as grandezas são inversamente proporcionais (se uma aumenta, a outra diminui). Exemplo: se 4 operários constroem um muro em 6 dias, em quantos dias 8 operários constroem? Resposta: 3 dias.</p>

          <h2>Dica: como identificar se a regra de três é direta ou inversa?</h2>
          <p>Pergunte-se: &ldquo;se eu aumento a primeira grandeza, a segunda aumenta ou diminui?&rdquo; Se <strong>aumenta junto</strong>, é direta. Se <strong>diminui</strong>, é inversa. Mais quantidade = mais preço? Direta. Mais pessoas = menos tempo? Inversa.</p>
        </>
      }
    />
  )
}
