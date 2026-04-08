import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { PreviewHtmlForm } from '@/components/calculadoras/preview-html-form'

export const metadata: Metadata = createCalculadoraMetadata('preview-html')

export default function PreviewHtmlPage() {
  return (
    <CalculatorPage
      slug="preview-html"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Preview / Renderizador HTML"
      descricao="Cole HTML e CSS e veja o resultado renderizado na mesma tela — sem criar arquivo, sem servidor, sem instalar nada. Aceita JavaScript básico dentro do sandbox."
      faqs={[
        { question: 'O que é um renderizador HTML online?', answer: 'Uma sandbox que executa código HTML, CSS e JavaScript diretamente no navegador, mostrando o resultado visual em tempo real. Útil para testar trechos isolados sem precisar de ambiente configurado.' },
        { question: 'Posso usar JavaScript no preview?', answer: 'Sim, scripts básicos funcionam — o iframe roda com allow-scripts no sandbox. Mas recursos externos podem ser bloqueados pelo navegador por política de CORS ou Content Security Policy. Para testar lógica simples, eventos DOM e animações CSS, funciona bem.' },
        { question: 'Meu código é salvo em algum lugar?', answer: 'Não. O código fica só no seu navegador e é perdido ao recarregar a página. Se quiser preservar um snippet, salve localmente antes de sair. Nenhum dado é enviado para nenhum servidor.' },
      ]}
      conteudo={
        <>
          <h2>O que voce pode testar no renderizador HTML online</h2>
          <p>O <strong>Preview HTML</strong> e uma sandbox completa que executa codigo <em>HTML</em>, <em>CSS</em> e <em>JavaScript basico</em> diretamente no navegador, sem necessidade de instalar nada. Ele e ideal para uma variedade de cenarios praticos:</p>
          <ul>
            <li><strong>Templates de e-mail:</strong> valide a estrutura e o visual de e-mails transacionais antes de enviar para plataformas como Mailchimp ou SendGrid</li>
            <li><strong>Prototipagem rapida:</strong> teste componentes isolados com HTML e CSS para validar ideias de layout antes de integrar ao projeto principal</li>
            <li><strong>Snippets de CSS:</strong> experimente efeitos de hover, animacoes, transicoes e layouts com flexbox ou grid em tempo real</li>
            <li><strong>Aprendizado:</strong> para quem esta comecando com desenvolvimento web, ver o resultado imediato de cada alteracao acelera muito o aprendizado</li>
          </ul>
          <p>Se precisar de texto placeholder para preencher seus layouts de teste, o <a href="/utilidades/gerador-lorem">Gerador de Lorem Ipsum</a> cria paragrafos, frases ou palavras na quantidade que voce precisar.</p>

          <h2>Como funciona o isolamento e a seguranca</h2>
          <p>O preview e renderizado dentro de um <strong>iframe</strong> com atributo <code>sandbox</code>, o que garante isolamento total entre o codigo executado e a pagina principal. Na pratica, isso significa que:</p>
          <ol>
            <li>O codigo nao pode ler cookies nem acessar o localStorage da pagina principal</li>
            <li>Nenhuma acao fora do iframe e permitida</li>
            <li>Scripts basicos funcionam normalmente com <em>allow-scripts</em>, mas requisicoes externas podem ser bloqueadas</li>
          </ol>
          <p>Esse e o mesmo mecanismo de seguranca utilizado por editores online como CodePen e JSFiddle. <strong>Nenhum dado e enviado para servidores</strong> -- todo o processamento acontece localmente no seu navegador.</p>

          <h3>Limitacoes importantes</h3>
          <p>E fundamental conhecer as restricoes antes de testar seu codigo:</p>
          <ul>
            <li>Requisicoes a <strong>APIs externas</strong> podem ser bloqueadas por politicas de CORS</li>
            <li>Recursos de outros dominios (fontes, imagens) dependem da politica do servidor de origem</li>
            <li>O codigo e perdido ao recarregar a pagina -- salve localmente antes de sair</li>
            <li>Para testes que exigem integracao com APIs reais ou backend, voce precisara de um ambiente local</li>
          </ul>

          <h2>Ferramentas complementares para desenvolvimento web</h2>
          <p>O Preview HTML funciona muito bem em conjunto com outras ferramentas disponiveis na plataforma. Use o <a href="/utilidades/gerador-meta-tags">Gerador de Meta Tags</a> para criar as tags de SEO e Open Graph da sua pagina. O <a href="/utilidades/formatador-json">Formatador JSON</a> ajuda a organizar dados de API que voce esteja testando. Para codificar e decodificar dados, experimente o <a href="/utilidades/conversor-base64">Conversor Base64</a>.</p>
          <p>Se voce trabalha com projetos que exigem contagem precisa de texto, o <a href="/utilidades/contador-caracteres">Contador de Caracteres</a> permite verificar limites de meta descriptions e outros campos com restricao de tamanho.</p>

          <h2>Dicas para aproveitar melhor o renderizador</h2>
          <p>Para obter os melhores resultados, inclua o CSS inline ou dentro de uma tag <code>&lt;style&gt;</code> no proprio HTML. Mantenha o codigo simples e focado no trecho que deseja testar. Se estiver prototipando uma pagina completa, comece pela estrutura basica com <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> e <code>&lt;body&gt;</code> para evitar comportamentos inesperados na renderizacao.</p>
        </>
      }
    >
      <PreviewHtmlForm />
    </CalculatorPage>
  )
}
