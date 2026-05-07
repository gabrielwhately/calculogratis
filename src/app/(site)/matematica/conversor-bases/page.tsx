import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ConversorBasesForm } from '@/components/calculadoras/conversor-bases-form'

export const metadata: Metadata = createCalculadoraMetadata('conversor-bases')

export default function ConversorBasesPage() {
  return (
    <CalculatorPage
      slug="conversor-bases"
      categoriaSlug="matematica"
      categoriaNome="Matemática"
      nome="Conversor de Bases Numéricas"
      descricao="Digite um número em qualquer base — decimal, binária, octal ou hexadecimal — e veja a conversão para todas as outras ao mesmo tempo. Útil para quem trabalha com programação de baixo nível."
      faqs={[
        { question: 'O que são bases numéricas?', answer: 'Cada base define quantos dígitos o sistema usa. Decimal tem 10 (0–9), binário tem 2 (0 e 1), octal tem 8 (0–7) e hexadecimal tem 16 (0–9 e A–F). Internamente, todo computador opera em binário; hex e octal existem para deixar esse binário legível para humanos.' },
        { question: 'Como converter decimal para binário?', answer: 'Divida por 2 repetidamente e leia os restos de baixo para cima. Por exemplo: 10 ÷ 2 = 5 r0, 5 ÷ 2 = 2 r1, 2 ÷ 2 = 1 r0, 1 ÷ 2 = 0 r1 → lendo de baixo: 1010. É o mesmo 10 que você conhece, só em outra representação.' },
        { question: 'Para que serve a base hexadecimal?', answer: 'Cada dígito hex representa exatamente 4 bits. Então 1 byte (8 bits) cabe em 2 dígitos hex — muito mais legível que 8 dígitos binários. Por isso hex aparece em endereços de memória, cores CSS (#FF5733), hashes SHA, depuração de código e protocolos de rede.' },
      ]}
      conteudo={
        <>
          <h2>O que são bases numéricas e por que existem</h2>
          <p>No cotidiano, usamos o <strong>sistema decimal</strong> (base 10), com dígitos de 0 a 9. Porém, computadores operam internamente com apenas dois estados — ligado e desligado — o que deu origem ao <strong>sistema binário</strong> (base 2). Para tornar a leitura de valores binários mais prática, foram adotados os sistemas <strong>octal</strong> (base 8) e <strong>hexadecimal</strong> (base 16), que agrupam bits de forma compacta e legível.</p>
          <p>Cada base tem suas aplicações específicas:</p>
          <ul>
            <li><strong>Decimal (base 10):</strong> padrão para o uso humano cotidiano, cálculos financeiros e científicos.</li>
            <li><strong>Binário (base 2):</strong> linguagem nativa dos processadores. Dígitos: 0 e 1.</li>
            <li><strong>Octal (base 8):</strong> historicamente usado em permissões de arquivos Unix/Linux (ex.: chmod 755). Dígitos: 0 a 7.</li>
            <li><strong>Hexadecimal (base 16):</strong> amplamente usado em endereços de memória, cores CSS, hashes e depuração de código. Dígitos: 0-9 e A-F.</li>
          </ul>

          <h2>Como funciona a conversão entre bases</h2>
          <p>O processo de conversão segue dois passos fundamentais, usando o <strong>decimal como intermediário</strong>:</p>
          <h3>Da base de origem para decimal</h3>
          <p>Multiplique cada dígito pela base elevada à sua posição (contando da direita para a esquerda, a partir de zero) e some os resultados. Exemplo: o binário <strong>1101</strong> equivale a 1x2^3 + 1x2^2 + 0x2^1 + 1x2^0 = 8 + 4 + 0 + 1 = <strong>13 em decimal</strong>.</p>
          <h3>Do decimal para a base de destino</h3>
          <p>Divida o número decimal sucessivamente pela base alvo e colete os restos na ordem inversa. Exemplo: 13 / 2 = 6 (resto 1), 6 / 2 = 3 (resto 0), 3 / 2 = 1 (resto 1), 1 / 2 = 0 (resto 1). Leitura inversa: <strong>1101</strong>. A calculadora automatiza todo esse processo e exibe os quatro formatos simultaneamente.</p>
          <p>Para cálculos com potências e expressões mais complexas envolvidos na conversão manual, a <a href="/matematica/calculadora-cientifica">Calculadora Científica</a> oferece suporte completo a exponenciação e outras funções matemáticas.</p>

          <h2>Valores de referência que todo programador deve conhecer</h2>
          <p>Alguns valores aparecem com tanta frequência em programação e redes que vale a pena memorizar suas representações em diferentes bases:</p>
          <ul>
            <li><strong>255 decimal</strong> = FF hex = 11111111 binário = 377 octal. Valor máximo de um byte (8 bits). Presente em máscaras de rede, canais de cor RGB e limites de variáveis de 8 bits.</li>
            <li><strong>256 decimal</strong> = 100 hex = 100000000 binário. Primeira potência de 2 que excede um byte.</li>
            <li><strong>65535 decimal</strong> = FFFF hex = 1111111111111111 binário. Valor máximo de 16 bits (2 bytes). Limite de portas TCP/UDP.</li>
            <li><strong>127 decimal</strong> = 7F hex = 1111111 binário. Maior valor positivo em um inteiro de 8 bits com sinal (complemento de dois).</li>
          </ul>

          <h3>Hexadecimal em cores CSS</h3>
          <p>No desenvolvimento web, as cores são frequentemente expressas em hexadecimal no formato <strong>#RRGGBB</strong>, onde cada par representa um canal de cor (vermelho, verde e azul) com valores de 00 a FF. Por exemplo, <strong>#FF5733</strong> significa vermelho=255, verde=87, azul=51 — um tom alaranjado. Entender hexadecimal é essencial para qualquer desenvolvedor front-end.</p>

          <h2>Aplicações práticas no dia a dia da tecnologia</h2>
          <p>O conversor de bases numéricas é uma ferramenta indispensável em diversas situações profissionais:</p>
          <ul>
            <li><strong>Depuração de software:</strong> endereços de memória e dumps de dados são exibidos em hexadecimal.</li>
            <li><strong>Redes de computadores:</strong> endereços MAC usam hexadecimal; cálculos de sub-rede envolvem operações binárias.</li>
            <li><strong>Criptografia e segurança:</strong> hashes SHA e MD5 são representados em hexadecimal. Para gerar hashes, veja o <a href="/utilidades/gerador-hash">Gerador de Hash</a>.</li>
            <li><strong>Permissões Unix:</strong> o sistema octal define permissões de leitura (4), escrita (2) e execução (1) para arquivos e diretórios.</li>
          </ul>
          <p>Se você precisa de cálculos matemáticos proporcionais em vez de conversões numéricas, a <a href="/matematica/regra-de-tres">Calculadora de Regra de Três</a> e a <a href="/matematica/porcentagem">Calculadora de Porcentagem</a> cobrem os cenários mais comuns do cotidiano.</p>
        </>
      }
    >
      <ConversorBasesForm />
    </CalculatorPage>
  )
}
