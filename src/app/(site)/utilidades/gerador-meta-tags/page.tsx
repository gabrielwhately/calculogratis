import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorMetaTagsForm } from '@/components/calculadoras/gerador-meta-tags-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-meta-tags')

export default function GeradorMetaTagsPage() {
  return (
    <CalculatorPage
      slug="gerador-meta-tags"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de Meta Tags"
      descricao="Preencha título, descrição e URL da sua página e obtenha o bloco HTML completo com meta tags de SEO, Open Graph (Facebook, LinkedIn) e Twitter Cards — pronto para colar no head."
      faqs={[
        { question: 'O que são meta tags?', answer: 'Elementos HTML dentro do &lt;head&gt; que fornecem informações sobre a página para mecanismos de busca e redes sociais. Não aparecem na página visível, mas definem como ela é indexada pelo Google e como fica o preview quando alguém compartilha o link.' },
        { question: 'O que é Open Graph?', answer: 'Protocolo criado pelo Facebook em 2010, adotado por praticamente todas as redes sociais desde então. As tags og:title, og:description e og:image controlam o título, texto e imagem do preview quando alguém cola o link no Facebook, LinkedIn, WhatsApp ou Telegram.' },
        { question: 'O que são Twitter Cards?', answer: 'Meta tags específicas do Twitter (agora X) que controlam o preview na timeline. summary_large_image mostra uma imagem de destaque com título e descrição. Sem essas tags, o Twitter usa as Open Graph como fallback — mas com Twitter Cards você tem mais controle sobre o resultado.' },
      ]}
      conteudo={
        <>
          <h2>Por que as meta tags sao fundamentais para seu site</h2>
          <p>As <strong>meta tags</strong> sao elementos HTML inseridos dentro do <code>&lt;head&gt;</code> da pagina que fornecem informacoes essenciais para mecanismos de busca e redes sociais. Embora nao aparecam na pagina visivel, elas determinam como seu conteudo e <em>indexado pelo Google</em> e como fica o preview quando alguem compartilha o link no WhatsApp, Facebook, LinkedIn ou Twitter.</p>
          <p>A <strong>meta description</strong>, por exemplo, nao afeta diretamente o ranking no Google, mas influencia significativamente a <em>taxa de cliques</em> (CTR). Uma descricao bem escrita, com o beneficio claro da pagina, converte muito mais do que uma descricao generica ou ausente.</p>

          <h2>O que o gerador de meta tags produz</h2>
          <p>A ferramenta gera automaticamente tres conjuntos de tags prontas para uso:</p>
          <ul>
            <li><strong>SEO basico:</strong> tag <code>&lt;title&gt;</code> e <code>&lt;meta name=&quot;description&quot;&gt;</code> para indexacao nos mecanismos de busca</li>
            <li><strong>Open Graph:</strong> conjunto completo com <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, <code>og:url</code> e <code>og:type</code> para previews no Facebook, LinkedIn, WhatsApp e Telegram</li>
            <li><strong>Twitter Cards:</strong> tags <code>twitter:card</code>, <code>twitter:title</code>, <code>twitter:description</code> e <code>twitter:image</code> para controlar o preview na timeline do Twitter/X</li>
          </ul>
          <p>Todo o codigo e gerado em um bloco HTML pronto para colar diretamente dentro do <code>&lt;head&gt;</code> da sua pagina.</p>

          <h3>Open Graph vs. Twitter Cards</h3>
          <p>O <strong>Open Graph</strong> e um protocolo criado pelo Facebook em 2010, hoje adotado por praticamente todas as plataformas sociais. Ja as <strong>Twitter Cards</strong> sao meta tags especificas do Twitter (agora X). Sem Twitter Cards, a plataforma usa as tags Open Graph como fallback -- mas com as tags especificas, voce tem controle total sobre como o preview aparece na timeline.</p>

          <h2>Dicas essenciais para otimizar suas meta tags</h2>
          <p>Para obter os melhores resultados em SEO e redes sociais, siga estas recomendacoes:</p>
          <ol>
            <li><strong>Title:</strong> mantenha ate 60 caracteres para evitar corte nos resultados do Google. Inclua a palavra-chave principal no inicio</li>
            <li><strong>Description:</strong> entre 130 e 155 caracteres, focada no beneficio para quem esta buscando. O limite real e medido em pixels, nao em caracteres</li>
            <li><strong>Imagem Open Graph:</strong> use dimensoes de 1200x630 pixels -- e o formato que aparece bem em todas as redes sociais</li>
            <li><strong>URL:</strong> utilize a URL canonica da pagina, sem parametros de UTM ou rastreamento</li>
          </ol>
          <p>Use o <a href="/utilidades/contador-caracteres">Contador de Caracteres</a> para verificar se seus titulos e descricoes estao dentro dos limites recomendados antes de inserir no codigo.</p>

          <h2>Ferramentas complementares para desenvolvimento web</h2>
          <p>Apos gerar suas meta tags, voce pode testa-las visualmente com o <a href="/utilidades/preview-html">Preview HTML</a>, que renderiza codigo HTML e CSS direto no navegador. Para preencher layouts enquanto trabalha no design, o <a href="/utilidades/gerador-lorem">Gerador de Lorem Ipsum</a> cria texto placeholder na quantidade necessaria. E se precisa formatar dados para APIs ou configuracoes, o <a href="/utilidades/formatador-json">Formatador JSON</a> organiza e valida seu codigo JSON de forma rapida.</p>
        </>
      }
    >
      <GeradorMetaTagsForm />
    </CalculatorPage>
  )
}
