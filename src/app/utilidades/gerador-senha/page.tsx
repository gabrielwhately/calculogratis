import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorSenhaForm } from '@/components/calculadoras/gerador-senha-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-senha')

export default function GeradorSenhaPage() {
  return (
    <CalculatorPage
      slug="gerador-senha"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de Senha"
      descricao="Cria senhas com aleatoriedade criptográfica real — não pseudo-aleatória. Escolha o tamanho e os conjuntos de caracteres; o gerador usa a API WebCrypto do navegador."
      faqs={[
        { question: 'O que é uma senha forte?', answer: 'No mínimo 12 caracteres, combinando maiúsculas, minúsculas, números e símbolos, sem padrões detectáveis. Uma senha de 6 dígitos numéricos pode ser quebrada em milissegundos por ataque de força bruta. Uma de 16 caracteres mistos levaria anos com o hardware atual.' },
        { question: 'Com que frequência devo trocar minhas senhas?', answer: 'O NIST (Instituto Nacional de Padrões dos EUA) revisou a recomendação: trocar senha periodicamente sem motivo pode ser contraproducente, pois as pessoas tendem a criar senhas fracas. O mais importante é usar uma senha única por serviço e trocá-la imediatamente se suspeitar de vazamento.' },
        { question: 'Esta ferramenta armazena minha senha?', answer: 'Não. Tudo acontece no seu navegador, usando a API WebCrypto nativa. Nenhum dado trafega para servidor nenhum. Você pode verificar isso abrindo o DevTools e monitorando a aba Network — zero requisições externas ao gerar.' },
        { question: 'Qual é o tamanho ideal de uma senha?', answer: '12 caracteres é o mínimo razoável para uso geral. Para e-mail, banco e outras contas críticas, use 16 ou mais. Com gerenciador de senhas, não há razão para usar menos de 20 — você não precisa memorizar.' },
      ]}
      conteudo={
        <>
          <h2>Por que voce precisa de um gerador de senhas seguras</h2>
          <p>A maioria das violacoes de seguranca digital comeca com senhas fracas ou reutilizadas. Dados de vazamentos mostram que senhas como &ldquo;123456&rdquo;, &ldquo;senha123&rdquo; e datas de nascimento ainda estao entre as mais usadas no Brasil. Com o poder computacional atual, um ataque de forca bruta pode quebrar:</p>
          <ul>
            <li>Senha de <strong>6 digitos numericos</strong>: em milissegundos</li>
            <li>Senha de <strong>8 caracteres so com letras minusculas</strong>: em poucas horas</li>
            <li>Senha de <strong>12 caracteres mistos</strong> (maiusculas, minusculas, numeros e simbolos): centenas de anos</li>
            <li>Senha de <strong>16+ caracteres mistos</strong>: impraticavel com a tecnologia atual</li>
          </ul>
          <p>Uma senha verdadeiramente segura combina <strong>comprimento adequado</strong>, <strong>variedade de caracteres</strong> e <strong>aleatoriedade genuina</strong> -- exatamente o que este gerador oferece.</p>

          <h2>Como funciona o gerador de senhas</h2>
          <p>Diferente de geradores que usam funcoes pseudo-aleatorias (como <code>Math.random()</code>), esta ferramenta utiliza a <strong>API Web Crypto</strong> nativa do navegador, especificamente a funcao <code>crypto.getRandomValues()</code>. Essa API fornece numeros com <em>qualidade criptografica</em>, ou seja, imprevisibilidade garantida pelo sistema operacional.</p>
          <p>Voce pode personalizar a senha gerada escolhendo:</p>
          <ul>
            <li><strong>Tamanho:</strong> de 4 a 64 caracteres (recomendamos 16 ou mais para contas importantes)</li>
            <li><strong>Conjuntos de caracteres:</strong> letras maiusculas, minusculas, numeros e simbolos especiais</li>
          </ul>
          <p>Toda a geracao acontece localmente no seu navegador. <strong>Nenhum dado e enviado para qualquer servidor</strong> -- voce pode verificar isso monitorando a aba Network do DevTools.</p>

          <h3>Indicador de forca da senha</h3>
          <p>Apos a geracao, o indicador visual avalia a senha com base em criterios como comprimento, diversidade de caracteres e presenca de padroes. A barra colorida vai de vermelho (fraca) a verde (forte), oferecendo um feedback imediato sobre o nivel de seguranca.</p>

          <h2>Boas praticas de seguranca com senhas</h2>
          <p>Gerar uma senha forte e apenas o primeiro passo. Para manter sua seguranca digital, siga estas recomendacoes:</p>
          <ol>
            <li><strong>Use uma senha unica por servico:</strong> se um site sofrer vazamento, apenas aquela conta e comprometida</li>
            <li><strong>Utilize um gerenciador de senhas:</strong> ferramentas como Bitwarden, 1Password ou KeePass armazenam senhas complexas sem que voce precise memoriza-las</li>
            <li><strong>Ative a autenticacao de dois fatores (2FA):</strong> sempre que disponivel, adicione uma camada extra de protecao</li>
            <li><strong>Nunca compartilhe senhas por e-mail ou mensagens:</strong> esses canais nao sao seguros para dados sensiveis</li>
            <li><strong>Troque senhas comprometidas imediatamente:</strong> se um servico reportar vazamento, altere a senha sem demora</li>
          </ol>

          <h2>Ferramentas complementares de seguranca</h2>
          <p>Alem do gerador de senhas, o Calculo Gratis oferece outras ferramentas uteis para seguranca e desenvolvimento:</p>
          <ul>
            <li><a href="/utilidades/gerador-hash">Gerador de Hash</a> -- crie hashes SHA-256, MD5 e outros para verificacao de integridade de arquivos e dados</li>
            <li><a href="/utilidades/conversor-base64">Conversor Base64</a> -- inspecione tokens JWT e headers de autenticacao HTTP Basic</li>
            <li><a href="/utilidades/gerador-uuid">Gerador de UUID</a> -- crie identificadores unicos e imprevisiveis para seus sistemas</li>
            <li><a href="/utilidades/gerador-qrcode">Gerador de QR Code</a> -- compartilhe links e dados de forma pratica e segura</li>
          </ul>
        </>
      }
    >
      <GeradorSenhaForm />
    </CalculatorPage>
  )
}
