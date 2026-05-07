import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ConversorBase64Form } from '@/components/calculadoras/conversor-base64-form'

export const metadata: Metadata = createCalculadoraMetadata('conversor-base64')

export default function ConversorBase64Page() {
  return (
    <CalculatorPage
      slug="conversor-base64"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Conversor Base64"
      descricao="Codifique texto para Base64 ou decodifique de volta — útil para inspecionar tokens JWT, testar headers de autenticação HTTP Basic ou embedar imagens em CSS."
      faqs={[
        { question: 'O que é Base64?', answer: 'É um esquema de codificação que transforma dados binários em texto ASCII usando 64 caracteres (A–Z, a–z, 0–9, + e /). Surgiu para resolver um problema específico: protocolos como e-mail (SMTP) só aceitam texto — Base64 permite transmitir qualquer dado binário nesses meios.' },
        { question: 'Base64 é criptografia?', answer: 'Não. Base64 é só uma mudança de representação — qualquer pessoa com acesso ao texto codificado pode decodificá-lo em segundos. Não protege dados sensíveis. Para sigilo, use criptografia de verdade (AES, RSA). Para integridade, use hashing (SHA-256). Base64 serve para transportar dados, não para escondê-los.' },
        { question: 'Por que o texto Base64 é maior que o original?', answer: 'Cada 3 bytes de dado original viram 4 caracteres Base64 — overhead de 33%. Então 100 bytes viram ~133 caracteres. É o custo de representar dado binário arbitrário em ASCII puro. Para imagens embedadas em CSS via data URI, isso explica por que os arquivos crescem.' },
        { question: 'Quais caracteres são suportados na entrada?', answer: 'Para codificar: qualquer texto Unicode, incluindo acentos do português, emoji e símbolos. A ferramenta converte para UTF-8 antes do Base64. Para decodificar: apenas os 64 caracteres válidos do alfabeto Base64 mais o padding (=). Caracteres fora desse conjunto causam erro.' },
      ]}
      conteudo={
        <>
          <h2>O que e Base64 e para que serve</h2>
          <p>Base64 e um <strong>esquema de codificacao</strong> que transforma dados binarios em texto ASCII puro, usando um alfabeto de 64 caracteres: letras maiusculas (A-Z), minusculas (a-z), digitos (0-9), e os simbolos &ldquo;+&rdquo; e &ldquo;/&rdquo;. O caractere &ldquo;=&rdquo; e usado como padding para alinhar o tamanho final quando necessario.</p>
          <p>O Base64 surgiu para resolver um problema pratico: protocolos como <em>SMTP (e-mail)</em> e <em>HTTP</em> foram projetados para transmitir apenas texto. Para enviar dados binarios -- como imagens, arquivos ou credenciais -- por esses canais, e necessario converte-los para uma representacao textual. E exatamente isso que o Base64 faz.</p>

          <h3>Base64 nao e criptografia</h3>
          <p>Um equivoco comum e confundir codificacao Base64 com criptografia. Base64 e apenas uma <strong>mudanca de representacao</strong> -- qualquer pessoa com acesso ao texto codificado pode decodifica-lo instantaneamente. Para proteger dados sensiveis, utilize criptografia real (AES, RSA). Para verificar integridade, use hashing -- nosso <a href="/utilidades/gerador-hash">Gerador de Hash</a> suporta SHA-256, MD5 e outros algoritmos.</p>

          <h2>Casos de uso comuns do Base64</h2>
          <p>O Base64 esta presente em diversas situacoes do desenvolvimento web e de software:</p>
          <ul>
            <li><strong>Autenticacao HTTP Basic:</strong> credenciais (usuario:senha) sao codificadas em Base64 no header <code>Authorization</code></li>
            <li><strong>Tokens JWT:</strong> o header e o payload de um JSON Web Token sao segmentos Base64url que podem ser decodificados para inspecao</li>
            <li><strong>Data URIs:</strong> imagens pequenas podem ser embedadas diretamente em CSS e HTML como <code>data:image/png;base64,...</code>, eliminando requisicoes HTTP adicionais</li>
            <li><strong>Anexos de e-mail:</strong> o protocolo MIME usa Base64 para transmitir arquivos binarios como parte do corpo do e-mail</li>
            <li><strong>Armazenamento em JSON/XML:</strong> dados binarios podem ser armazenados como strings Base64 em formatos que nao suportam binario nativamente</li>
          </ul>

          <h2>Como usar o conversor Base64</h2>
          <p>A ferramenta oferece dois modos de operacao:</p>
          <ol>
            <li><strong>Codificar:</strong> cole texto comum e obtenha a versao em Base64. Util para criar headers de autenticacao, data URIs e payloads codificados</li>
            <li><strong>Decodificar:</strong> cole texto em Base64 e veja o conteudo original. Perfeito para inspecionar tokens JWT, debugar headers HTTP e analisar dados codificados</li>
          </ol>
          <p>O resultado inclui <strong>estatisticas de tamanho</strong> mostrando a diferenca entre entrada e saida. Lembre-se: cada 3 bytes de dado original viram 4 caracteres Base64, um overhead de aproximadamente 33%.</p>

          <h3>Suporte completo a Unicode e UTF-8</h3>
          <p>Esta ferramenta suporta plenamente caracteres Unicode, incluindo letras acentuadas do portugues, caracteres especiais e simbolos. O texto e codificado em <em>UTF-8</em> antes da conversao para Base64, garantindo compatibilidade com o padrao internacional e evitando problemas com caracteres multibyte.</p>

          <h2>Ferramentas complementares para desenvolvedores</h2>
          <p>Combine o conversor Base64 com outras ferramentas do Calculo Gratis para um fluxo de trabalho mais eficiente:</p>
          <ul>
            <li><a href="/utilidades/formatador-json">Formatador JSON</a> -- apos decodificar um payload JWT em Base64, formate o JSON resultante para analise detalhada</li>
            <li><a href="/utilidades/gerador-hash">Gerador de Hash</a> -- verifique a integridade de dados com hashes SHA-256 ou MD5</li>
            <li><a href="/utilidades/gerador-senha">Gerador de Senha</a> -- crie credenciais seguras antes de codifica-las para autenticacao HTTP Basic</li>
            <li><a href="/utilidades/gerador-uuid">Gerador de UUID</a> -- gere identificadores unicos para incluir em payloads codificados</li>
            <li><a href="/matematica/conversor-bases">Conversor de Bases Numericas</a> -- converta entre binario, octal, decimal e hexadecimal para complementar seu trabalho com codificacoes</li>
          </ul>
        </>
      }
    >
      <ConversorBase64Form />
    </CalculatorPage>
  )
}
