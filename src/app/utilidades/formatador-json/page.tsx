import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { FormatadorJSONForm } from '@/components/calculadoras/formatador-json-form'

export const metadata: Metadata = createCalculadoraMetadata('formatador-json')

export default function FormatadorJSONPage() {
  return (
    <CalculatorPage
      slug="formatador-json"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Formatador JSON"
      descricao="Recebeu um JSON minificado de uma API e não consegue enxergar a estrutura? Cole aqui, formate com 2 ou 4 espaços e veja onde está o problema. Valida sintaxe automaticamente."
      faqs={[
        { question: 'O que é JSON?', answer: 'JSON (JavaScript Object Notation) é o formato padrão de troca de dados na web. Praticamente toda API REST retorna e recebe JSON. Ele representa objetos (chave-valor), arrays, strings, números, booleanos e null — estruturas que tanto humanos quanto máquinas entendem bem.' },
        { question: 'Qual a diferença entre formatar e minificar JSON?', answer: 'Formatar (pretty print) adiciona indentação e quebras de linha para leitura humana. Minificar remove tudo isso, deixando o JSON em uma linha só. Na produção, JSON minificado é preferido porque reduz o tamanho do payload em até 30%, acelerando transferências. No debug, você quer o formatado.' },
        { question: 'Esta ferramenta valida se o JSON é válido?', answer: 'Sim. O processamento tenta fazer parse do JSON via JSON.parse(). Se a sintaxe estiver errada — vírgula sobrando, chave não fechada, aspas simples em vez de duplas — aparece uma mensagem de erro apontando o problema. Útil para encontrar o bug antes de debugar a aplicação inteira.' },
        { question: 'Posso formatar JSONs grandes?', answer: 'Sim, tudo roda no navegador. JSONs de dezenas de kilobytes são processados sem problema. Para arquivos de vários megabytes, o desempenho depende do seu dispositivo — mas para a maioria dos casos de debug cotidiano, funciona sem travar.' },
      ]}
      conteudo={
        <>
          <h2>Por que formatar JSON faz diferenca no desenvolvimento</h2>
          <p>O JSON (JavaScript Object Notation) e o formato padrao de troca de dados na web moderna. Praticamente toda <strong>API REST</strong> retorna e recebe dados em JSON. Porem, APIs frequentemente retornam o JSON minificado -- compactado em uma unica linha sem indentacao -- o que torna a leitura e o debug extremamente dificeis.</p>
          <p>Compare um JSON compacto como <code>{`{"user":{"id":42,"name":"Joao","roles":["admin","editor"]}}`}</code> com a versao formatada, onde cada nivel de aninhamento aparece recuado com indentacao clara. Em respostas com dezenas de campos e objetos aninhados, a diferenca e enorme para identificar a estrutura dos dados e localizar problemas.</p>

          <h2>Funcionalidades do formatador</h2>
          <p>Esta ferramenta oferece recursos essenciais para o trabalho diario com JSON:</p>
          <ul>
            <li><strong>Formatacao (pretty print):</strong> adiciona indentacao e quebras de linha para facilitar a leitura humana, com opcao de 2 ou 4 espacos</li>
            <li><strong>Minificacao:</strong> remove toda indentacao e espacos desnecessarios, reduzindo o tamanho do payload em ate 30%</li>
            <li><strong>Validacao de sintaxe:</strong> identifica erros como virgulas extras, chaves nao fechadas e aspas incorretas</li>
          </ul>

          <h3>Quando usar formatacao vs minificacao</h3>
          <p>A regra e simples: durante o <em>desenvolvimento e debug</em>, use sempre o JSON formatado para facilitar a analise. Em <em>producao</em>, o JSON minificado e preferivel porque reduz o tamanho das respostas e economiza banda. Para <strong>arquivos de configuracao</strong> versionados no Git, o formato legivel e mais adequado porque facilita a revisao de diffs em pull requests.</p>

          <h2>Erros comuns de sintaxe JSON</h2>
          <p>O padrao JSON e mais restrito do que muitos desenvolvedores imaginam, especialmente os que vem do JavaScript. Os erros mais frequentes incluem:</p>
          <ol>
            <li><strong>Aspas simples:</strong> JSON exige aspas duplas para strings e chaves. <code>{`{'nome': 'valor'}`}</code> e invalido</li>
            <li><strong>Virgula no ultimo elemento:</strong> diferente de JavaScript, JSON nao permite <em>trailing comma</em> apos o ultimo item de um array ou objeto</li>
            <li><strong>Valores nao suportados:</strong> <code>undefined</code>, <code>NaN</code>, <code>Infinity</code> e comentarios nao existem no padrao JSON</li>
            <li><strong>Chaves sem aspas:</strong> <code>{`{nome: "valor"}`}</code> e valido em JavaScript, mas nao em JSON</li>
          </ol>
          <p>A validacao automatica desta ferramenta detecta todos esses problemas e aponta a localizacao exata do erro, economizando tempo de debug.</p>

          <h2>Ferramentas uteis para desenvolvedores</h2>
          <p>Combine o formatador JSON com outras ferramentas do Calculo Gratis para otimizar seu fluxo de desenvolvimento:</p>
          <ul>
            <li><a href="/utilidades/conversor-base64">Conversor Base64</a> -- decodifique payloads JWT e headers de autenticacao que frequentemente contêm JSON codificado</li>
            <li><a href="/utilidades/gerador-hash">Gerador de Hash</a> -- gere hashes de conteudo JSON para verificacao de integridade</li>
            <li><a href="/utilidades/preview-html">Preview HTML</a> -- visualize HTML que consome dados JSON formatados</li>
            <li><a href="/utilidades/gerador-uuid">Gerador de UUID</a> -- crie IDs unicos para usar como chaves em documentos JSON</li>
            <li><a href="/utilidades/gerador-lorem">Gerador de Lorem Ipsum</a> -- gere texto placeholder para popular estruturas JSON de teste</li>
          </ul>
        </>
      }
    >
      <FormatadorJSONForm />
    </CalculatorPage>
  )
}
