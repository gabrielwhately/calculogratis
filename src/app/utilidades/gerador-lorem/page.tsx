import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorLoremForm } from '@/components/calculadoras/gerador-lorem-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-lorem')

export default function GeradorLoremPage() {
  return (
    <CalculatorPage
      slug="gerador-lorem"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de Lorem Ipsum"
      descricao="Precisa de texto de preenchimento para um layout ou protótipo? Gere parágrafos, frases ou palavras de Lorem Ipsum na quantidade que precisar."
      faqs={[
        { question: 'O que é Lorem Ipsum?', answer: 'É um texto em latim adaptado de obras do filósofo Cícero (45 a.C.) que virou o placeholder padrão do design desde a década de 1960, quando a empresa de tipografia Letraset o popularizou. Não tem significado — e é exatamente isso que o torna útil.' },
        { question: 'Por que usar Lorem Ipsum em vez de texto real?', answer: 'Quando o texto tem significado, o observador lê e avalia o conteúdo, desviando o foco do layout. Lorem Ipsum mantém a atenção onde deve estar: na tipografia, no espaçamento e na hierarquia visual. Aliás, a distribuição de letras e espaços é estatisticamente similar ao inglês, então o texto ocupa um espaço próximo ao conteúdo real.' },
        { question: 'Quantos parágrafos posso gerar?', answer: 'Até 50 unidades de qualquer tipo — parágrafos, frases ou palavras. Para visualizar uma página completa, 3 a 5 parágrafos já cobrem a maioria dos layouts. Para testar scroll em páginas longas, gere 10 ou mais.' },
        { question: 'Posso usar Lorem Ipsum em produção?', answer: 'Não — é um sinal vermelho quando aparece em produção. Lorem Ipsum é placeholder de desenvolvimento, não conteúdo de verdade. Antes de publicar, substitua por texto real, revisado e relevante para o usuário.' },
      ]}
      conteudo={
        <>
          <h2>O que e Lorem Ipsum e por que ele existe</h2>
          <p>O <strong>Lorem Ipsum</strong> e um texto de preenchimento usado no design grafico e no desenvolvimento web desde a decada de 1960. Sua origem remonta a obra <em>&ldquo;De Finibus Bonorum et Malorum&rdquo;</em>, escrita pelo filosofo romano Cicero em 45 a.C. A empresa britanica Letraset popularizou o texto em suas folhas de transferencia tipografica, e ele se tornou padrao universal quando o desktop publishing ganhou forca nos anos 1980 com softwares como o Aldus PageMaker.</p>
          <p>A grande vantagem do Lorem Ipsum e que, por nao ter significado compreensivel, ele impede que o observador se distraia lendo o conteudo e desvie o foco do que realmente importa: a <strong>tipografia</strong>, o <strong>espacamento</strong> e a <strong>hierarquia visual</strong> do layout.</p>

          <h2>Quando usar texto placeholder no seu projeto</h2>
          <p>Existem situacoes especificas em que gerar Lorem Ipsum faz sentido na pratica:</p>
          <ul>
            <li><strong>Prototipagem de interfaces:</strong> ao criar wireframes ou mockups, o texto placeholder permite avaliar proporcoes sem depender de conteudo final</li>
            <li><strong>Templates de e-mail:</strong> testar como o texto se comporta em diferentes clientes de e-mail antes de inserir o conteudo real</li>
            <li><strong>Apresentacoes para clientes:</strong> mostrar o layout proposto sem que o texto provisorio distraia a atencao do design</li>
            <li><strong>Testes de responsividade:</strong> verificar como blocos de texto se adaptam em diferentes tamanhos de tela</li>
          </ul>
          <p>Se voce precisa verificar quantos caracteres o texto gerado possui, utilize o <a href="/utilidades/contador-caracteres">Contador de Caracteres</a> para uma contagem precisa e em tempo real.</p>

          <h3>Lorem Ipsum vs. conteudo real: quando trocar</h3>
          <p>Uma regra fundamental: <em>Lorem Ipsum nunca deve chegar a producao</em>. Ele e uma ferramenta de desenvolvimento, nao conteudo de verdade. Antes de publicar qualquer pagina ou material, substitua todo o texto placeholder por conteudo revisado e relevante. Para paginas web, lembre-se de que o conteudo real influencia diretamente o <strong>SEO</strong> e a experiencia do usuario.</p>

          <h2>Como usar o gerador de Lorem Ipsum</h2>
          <p>A ferramenta oferece tres modos de geracao para atender diferentes necessidades:</p>
          <ol>
            <li><strong>Paragrafos:</strong> blocos de texto completos com multiplas frases, ideais para simular artigos, descricoes de produtos ou secoes de pagina</li>
            <li><strong>Frases:</strong> linhas individuais perfeitas para subtitulos, legendas de imagens ou campos de formulario</li>
            <li><strong>Palavras:</strong> unidades curtas para preencher botoes, tags, menus e outros elementos compactos</li>
          </ol>
          <p>Basta selecionar o tipo, definir a quantidade desejada (ate 50 unidades) e clicar em gerar. O resultado ja inclui a contagem de palavras e caracteres automaticamente.</p>

          <h2>Dicas praticas para designers e desenvolvedores</h2>
          <p>Para visualizar uma pagina completa, entre <strong>3 e 5 paragrafos</strong> geralmente cobrem a maioria dos layouts. Se precisa testar scroll em paginas longas, gere 10 ou mais. A distribuicao de letras e espacos no Lorem Ipsum e estatisticamente similar ao ingles, entao o texto ocupa um espaco visual proximo ao conteudo real.</p>
          <p>Combine esta ferramenta com o <a href="/utilidades/preview-html">Preview HTML</a> para visualizar seu layout completo direto no navegador, ou use o <a href="/utilidades/gerador-meta-tags">Gerador de Meta Tags</a> quando estiver preparando as tags de SEO da pagina final. Para projetos que exigem identificadores unicos, o <a href="/utilidades/gerador-uuid">Gerador de UUID</a> tambem pode ser util.</p>
        </>
      }
    >
      <GeradorLoremForm />
    </CalculatorPage>
  )
}
