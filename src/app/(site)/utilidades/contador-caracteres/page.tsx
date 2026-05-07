import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ContadorCaracteresForm } from '@/components/calculadoras/contador-caracteres-form'

export const metadata: Metadata = createCalculadoraMetadata('contador-caracteres')

export default function ContadorCaracteresPage() {
  return (
    <CalculatorPage
      slug="contador-caracteres"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Contador de Caracteres"
      descricao="Cole ou escreva o texto e veja em tempo real a contagem de caracteres (com e sem espaços), palavras, frases e parágrafos. Útil para posts, meta descriptions e redações com limite."
      faqs={[
        { question: 'Qual o limite de caracteres no Twitter/X?', answer: '280 caracteres para contas gratuitas. Assinantes do X Premium têm limite maior. Na prática, posts mais curtos tendem a ter mais engajamento — mas para comunicados técnicos ou threads, os 280 são usados.' },
        { question: 'Qual o limite de caracteres na meta description?', answer: 'O Google exibe até ~155–160 caracteres antes de cortar com reticências. O limite real é medido em pixels, não em caracteres — letras largas como W consomem mais espaço que i ou l. Uma boa meta description tem entre 130 e 155 caracteres para ter margem segura.' },
        { question: 'Espaços contam como caracteres?', answer: 'Sim, cada espaço é um caractere. Por isso a ferramenta mostra os dois: total com espaços (que é o que plataformas geralmente contam) e sem espaços (útil para alguns editores acadêmicos e concursos que especificam esse critério).' },
      ]}
      conteudo={
        <>
          <h2>Como funciona o contador de caracteres</h2>
          <p>O <strong>contador de caracteres online</strong> analisa seu texto em <em>tempo real</em>, conforme voce digita ou cola o conteudo. Nao e necessario clicar em nenhum botao -- os resultados atualizam instantaneamente. A ferramenta contabiliza:</p>
          <ul>
            <li><strong>Caracteres totais:</strong> incluindo espacos, que e o criterio usado pela maioria das plataformas</li>
            <li><strong>Caracteres sem espacos:</strong> util para editores academicos e concursos que especificam esse criterio</li>
            <li><strong>Palavras:</strong> separadas por espaco ou quebra de linha</li>
            <li><strong>Frases:</strong> identificadas por pontuacao final (ponto, exclamacao ou interrogacao)</li>
            <li><strong>Paragrafos:</strong> separados por linha em branco</li>
          </ul>

          <h2>Limites de caracteres por plataforma</h2>
          <p>Cada plataforma possui seus proprios limites, e conhece-los evita que seu conteudo seja cortado de forma inesperada:</p>
          <ul>
            <li><strong>Twitter/X:</strong> 280 caracteres para contas gratuitas</li>
            <li><strong>Instagram:</strong> 2.200 caracteres na legenda, mas o feed exibe apenas os primeiros ~125 antes do &ldquo;ver mais&rdquo;</li>
            <li><strong>LinkedIn post:</strong> 3.000 caracteres</li>
            <li><strong>Meta description (SEO):</strong> 155 a 160 caracteres antes do corte com reticencias nos resultados do Google</li>
            <li><strong>Title tag (SEO):</strong> 50 a 60 caracteres para exibicao completa</li>
            <li><strong>Google Ads headline:</strong> 30 caracteres por campo</li>
            <li><strong>WhatsApp status:</strong> 700 caracteres</li>
          </ul>
          <p>Para otimizar suas meta tags de SEO com os tamanhos corretos, utilize o <a href="/utilidades/gerador-meta-tags">Gerador de Meta Tags</a>, que cria o bloco HTML completo pronto para uso.</p>

          <h3>A diferenca entre contar caracteres e contar pixels</h3>
          <p>E importante saber que o Google mede o espaco de exibicao em <em>pixels</em>, nao em caracteres. Letras largas como &ldquo;W&rdquo; e &ldquo;M&rdquo; consomem mais espaco do que &ldquo;i&rdquo; ou &ldquo;l&rdquo;. Por isso, manter a meta description entre <strong>130 e 155 caracteres</strong> oferece uma margem segura para a maioria dos textos.</p>

          <h2>Aplicacoes praticas alem das redes sociais</h2>
          <p>O contador de caracteres e util em muitas situacoes do dia a dia:</p>
          <ol>
            <li><strong>Redacoes e trabalhos academicos:</strong> professores frequentemente pedem textos com limite de palavras ou laudas</li>
            <li><strong>Concursos publicos:</strong> editais definem numero maximo de caracteres para respostas discursivas</li>
            <li><strong>Formularios de candidatura:</strong> campos de &ldquo;sobre voce&rdquo; ou &ldquo;motivacao&rdquo; costumam ter limite de 500 a 2.000 caracteres</li>
            <li><strong>SMS marketing:</strong> cada mensagem SMS comporta 160 caracteres, e ultrapassar esse limite divide a mensagem em partes</li>
            <li><strong>Legendas de videos:</strong> plataformas como YouTube limitam o titulo a 100 caracteres e a descricao a 5.000</li>
          </ol>

          <h2>Ferramentas relacionadas para criacao de conteudo</h2>
          <p>Se voce esta trabalhando com conteudo para web, explore outras ferramentas uteis: o <a href="/utilidades/gerador-lorem">Gerador de Lorem Ipsum</a> para criar texto placeholder durante a prototipagem, o <a href="/utilidades/preview-html">Preview HTML</a> para visualizar paginas diretamente no navegador, e o <a href="/utilidades/gerador-qrcode">Gerador de QR Code</a> para criar codigos que direcionam para seu conteudo. Para calculos de porcentagem relacionados a metricas de engajamento, a <a href="/matematica/porcentagem">Calculadora de Porcentagem</a> pode ser util.</p>
        </>
      }
    >
      <ContadorCaracteresForm />
    </CalculatorPage>
  )
}
