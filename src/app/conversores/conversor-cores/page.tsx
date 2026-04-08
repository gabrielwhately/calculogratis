import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ConversorCoresForm } from '@/components/calculadoras/conversor-cores-form'

export const metadata: Metadata = createCalculadoraMetadata('conversor-cores')

export default function ConversorCoresPage() {
  return (
    <CalculatorPage
      slug="conversor-cores"
      categoriaSlug="conversores"
      categoriaNome="Conversores"
      nome="Conversor de Cores"
      descricao="Cole um código HEX do Figma, do Photoshop ou de qualquer CSS e veja na hora o equivalente em RGB e HSL — com preview da cor ao lado para confirmar visualmente."
      faqs={[
        { question: 'Qual a diferença entre HEX, RGB e HSL?', answer: 'São três formas de descrever a mesma cor. HEX é o mais comum em código — #FF5733, compacto para copiar e colar. RGB desmembra os canais vermelho, verde e azul de 0 a 255, útil quando você precisa manipular canais individualmente. HSL separa tom (0–360°), saturação e luminosidade, o que torna intuitivo criar versões mais claras ou escuras da mesma cor.' },
        { question: 'Como usar códigos HEX em CSS?', answer: 'Direto na propriedade: color: #FF5733. O formato curto #F53 é equivalente a #FF5533 — cada dígito é dobrado. Para adicionar transparência, use 8 dígitos: #FF573380 = 50% de opacidade. Navegadores modernos também aceitam color: #FF573380 sem precisar de rgba().' },
        { question: 'Para que serve o modelo HSL?', answer: 'HSL é o formato preferido de quem cria paletas. Quer uma versão mais escura da sua cor? Diminua L (luminosidade). Versão pastel? Reduza S (saturação). Cor complementar? Some 180 ao H (matiz). Essa lógica é direta — bem diferente de tentar ajustar R, G e B manualmente e adivinhar o resultado.' },
      ]}
      conteudo={
        <>
          <h2>Entendendo os tres modelos de cor: HEX, RGB e HSL</h2>
          <p>O <strong>conversor de cores</strong> transforma valores entre os tres formatos mais usados no desenvolvimento web e design grafico. Embora todos descrevam o mesmo espaco de cores, cada modelo tem uma logica propria:</p>
          <ul>
            <li><strong>HEX (Hexadecimal):</strong> representacao compacta com 6 digitos precedidos por #. Cada par de digitos (00 a FF) corresponde a um canal de cor: vermelho, verde e azul. Exemplo: <em>#3498DB</em> e um azul medio. E o formato mais usado em CSS e ferramentas de design como Figma e Photoshop.</li>
            <li><strong>RGB (Red, Green, Blue):</strong> separa os canais em valores decimais de 0 a 255. O mesmo azul acima seria <em>rgb(52, 152, 219)</em>. Ideal quando voce precisa manipular canais individuais ou calcular transicoes de cor programaticamente.</li>
            <li><strong>HSL (Hue, Saturation, Lightness):</strong> organiza a cor por matiz (0 a 360 graus), saturacao (0% a 100%) e luminosidade (0% a 100%). E o formato mais intuitivo para designers, pois permite ajustar claridade e vivacidade sem alterar o tom base.</li>
          </ul>

          <h2>Tabela de cores fundamentais para referencia rapida</h2>
          <p>Memorizar algumas cores basicas nos tres formatos ajuda a estimar valores sem precisar consultar ferramentas constantemente:</p>
          <ul>
            <li><strong>Vermelho puro:</strong> #FF0000 = rgb(255, 0, 0) = hsl(0, 100%, 50%)</li>
            <li><strong>Verde puro:</strong> #00FF00 = rgb(0, 255, 0) = hsl(120, 100%, 50%)</li>
            <li><strong>Azul puro:</strong> #0000FF = rgb(0, 0, 255) = hsl(240, 100%, 50%)</li>
            <li><strong>Branco:</strong> #FFFFFF = rgb(255, 255, 255) = hsl(0, 0%, 100%)</li>
            <li><strong>Preto:</strong> #000000 = rgb(0, 0, 0) = hsl(0, 0%, 0%)</li>
            <li><strong>Cinza medio:</strong> #808080 = rgb(128, 128, 128) = hsl(0, 0%, 50%)</li>
          </ul>
          <p><em>Dica:</em> tons de cinza sempre tem R = G = B em RGB, e saturacao 0% em HSL. Qualquer desvio dessa igualdade introduz um matiz de cor.</p>

          <h3>Cores secundarias e como se formam</h3>
          <p>As cores secundarias surgem da combinacao de dois canais primarios no maximo:</p>
          <ul>
            <li><strong>Ciano:</strong> verde + azul = #00FFFF = rgb(0, 255, 255)</li>
            <li><strong>Magenta:</strong> vermelho + azul = #FF00FF = rgb(255, 0, 255)</li>
            <li><strong>Amarelo:</strong> vermelho + verde = #FFFF00 = rgb(255, 255, 0)</li>
          </ul>

          <h2>Como criar paletas de cores coesas usando HSL</h2>
          <p>O modelo HSL e o preferido de designers para construir <strong>paletas de cores</strong> harmonicas. A logica e simples: mantenha o matiz (H) fixo e varie saturacao (S) e luminosidade (L) para gerar variacoes da mesma cor. Exemplo pratico com um azul base <em>hsl(210, 100%, 40%)</em>:</p>
          <ol>
            <li><strong>Versao escura (hover/active):</strong> reduza L para 25% -- hsl(210, 100%, 25%)</li>
            <li><strong>Versao padrao:</strong> mantenha L em 40% -- hsl(210, 100%, 40%)</li>
            <li><strong>Versao clara (background):</strong> aumente L para 85% -- hsl(210, 100%, 85%)</li>
            <li><strong>Versao pastel (destaque suave):</strong> reduza S para 40% e aumente L para 90% -- hsl(210, 40%, 90%)</li>
          </ol>
          <p>Para encontrar <strong>cores analogas</strong>, desloque o matiz em 30 graus (hsl(180, ...) e hsl(240, ...)). Para a <strong>cor complementar</strong>, some 180 graus ao matiz. Essas tecnicas sao a base da teoria de cores aplicada ao web design.</p>

          <h2>Transparencia e formatos avancados em CSS</h2>
          <p>Alem dos tres formatos basicos, o CSS moderno suporta transparencia (canal alfa) em todos eles:</p>
          <ul>
            <li><strong>HEX com alfa:</strong> adicione dois digitos ao final. #3498DB<em>80</em> equivale a 50% de opacidade.</li>
            <li><strong>RGBA:</strong> rgba(52, 152, 219, 0.5) -- o quarto valor define a opacidade de 0 (transparente) a 1 (opaco).</li>
            <li><strong>HSLA:</strong> hsla(204, 70%, 53%, 0.5) -- mesma logica do RGBA aplicada ao modelo HSL.</li>
          </ul>
          <p>Se voce trabalha com desenvolvimento web e precisa converter valores entre diferentes formatos numericos, experimente tambem nosso <a href="/matematica/conversor-bases">conversor de bases numericas</a> (binario, octal, hexadecimal e decimal). Para outras ferramentas uteis no dia a dia do desenvolvedor, confira o <a href="/conversores/conversor-unidades">conversor de unidades</a> e as <a href="/utilidades/fuso-horario">ferramentas de fuso horario</a>.</p>
        </>
      }
    >
      <ConversorCoresForm />
    </CalculatorPage>
  )
}
