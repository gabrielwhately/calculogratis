import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorUUIDForm } from '@/components/calculadoras/gerador-uuid-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-uuid')

export default function GeradorUUIDPage() {
  return (
    <CalculatorPage
      slug="gerador-uuid"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de UUID"
      descricao="Gere um ou vários UUIDs v4 no navegador usando crypto.randomUUID(). Clique no UUID para copiar — pronto para usar como chave primária, identificador de sessão ou qualquer ID único."
      faqs={[
        { question: 'O que é um UUID?', answer: 'UUID (Universally Unique Identifier) é um identificador de 128 bits representado como 32 dígitos hexadecimais em grupos separados por hifens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. O padrão é definido pela RFC 4122 e existem cinco versões — cada uma com uma estratégia de geração diferente.' },
        { question: 'Qual a chance de colisão de UUIDs v4?', answer: 'Seria necessário gerar cerca de 2,71 × 10¹⁸ UUIDs para ter 50% de chance de uma única colisão. Em termos práticos: se você gerasse 1 bilhão de UUIDs por segundo, levaria quase 86 anos para chegar nesse ponto. Para qualquer aplicação real, considere-os únicos.' },
        { question: 'Para que usar UUIDs?', answer: 'Chaves primárias em bancos de dados distribuídos (onde IDs sequenciais criariam conflito entre instâncias), identificadores de sessão, tokens de uso único, IDs de transação, rastreamento de eventos em sistemas de analytics e qualquer cenário onde você precisa de unicidade sem um gerador centralizado de sequência.' },
      ]}
      conteudo={
        <>
          <h2>O que e UUID e como funciona a versao 4</h2>
          <p>O <strong>UUID</strong> (Universally Unique Identifier) e um identificador de 128 bits representado como 32 digitos hexadecimais separados por hifens no formato <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>. Na versao 4, que e a mais utilizada, <strong>122 bits sao gerados de forma totalmente aleatoria</strong>. Os outros 6 bits sao fixos e indicam a versao (o digito <em>4</em> na terceira secao) e a variante RFC 4122 (o digito <em>y</em>, que deve ser 8, 9, a ou b).</p>
          <p>O padrao UUID e definido pela <strong>RFC 4122</strong> e possui cinco versoes, cada uma com uma estrategia de geracao diferente. A versao 4, baseada em aleatoriedade criptografica, e a mais popular por nao depender de informacoes externas como MAC address ou timestamps.</p>

          <h2>UUID vs. ID sequencial: quando usar cada um</h2>
          <p>A escolha entre UUIDs e IDs sequenciais depende do contexto da aplicacao. Veja as diferencas fundamentais:</p>
          <ul>
            <li><strong>Previsibilidade:</strong> IDs sequenciais (1, 2, 3...) sao previsiveis -- qualquer pessoa pode tentar acessar <code>/resource/42</code> e <code>/resource/43</code>. UUIDs sao <em>opacos</em> e nao revelam informacao sobre a sequencia</li>
            <li><strong>Sistemas distribuidos:</strong> multiplas instancias criando registros ao mesmo tempo geram conflitos com IDs sequenciais. UUIDs garantem unicidade sem coordenacao central</li>
            <li><strong>Tamanho:</strong> a desvantagem do UUID e ocupar 36 caracteres contra poucos bytes de um inteiro, impactando indices de bancos de dados em tabelas muito grandes</li>
            <li><strong>Ordenacao:</strong> IDs sequenciais tem ordem natural por criacao. UUIDs v4 nao tem -- se precisa de ordenacao temporal, considere UUIDs v7 (baseados em timestamp)</li>
          </ul>

          <h3>Qual a chance de colisao?</h3>
          <p>Na pratica, <strong>considere UUIDs v4 como unicos</strong>. Seria necessario gerar aproximadamente 2,71 x 10^18 UUIDs para ter 50% de chance de uma unica colisao. Se voce gerasse 1 bilhao por segundo, levaria quase 86 anos para atingir esse ponto.</p>

          <h2>Aplicacoes praticas do UUID</h2>
          <p>UUIDs sao amplamente utilizados em desenvolvimento de software para diversos fins:</p>
          <ol>
            <li><strong>Chaves primarias</strong> em bancos de dados distribuidos, onde IDs sequenciais criariam conflito entre instancias</li>
            <li><strong>Identificadores de sessao</strong> para autenticacao de usuarios em aplicacoes web</li>
            <li><strong>Tokens de uso unico</strong> para confirmacao de e-mail, redefinicao de senha e links temporarios</li>
            <li><strong>IDs de transacao</strong> em sistemas de pagamento e processamento financeiro</li>
            <li><strong>Rastreamento de eventos</strong> em plataformas de analytics e monitoramento</li>
          </ol>

          <h2>Seguranca da geracao e ferramentas relacionadas</h2>
          <p>Os UUIDs gerados por esta ferramenta utilizam a API <code>crypto.randomUUID()</code>, nativa em todos os navegadores modernos. Ela emprega o <strong>CSPRNG</strong> (gerador de numeros pseudo-aleatorios criptograficamente seguro) do sistema operacional -- a mesma fonte de entropia usada para gerar chaves criptograficas. Nenhum dado e enviado para servidores.</p>
          <p>Para outras necessidades de desenvolvimento, explore tambem o <a href="/utilidades/gerador-hash">Gerador de Hash</a> para criar hashes SHA-256 e MD5, o <a href="/utilidades/gerador-senha">Gerador de Senha</a> para criar senhas seguras, ou o <a href="/utilidades/conversor-base64">Conversor Base64</a> para codificacao de dados. Se precisa validar documentos brasileiros, temos tambem o <a href="/utilidades/validador-cpf">Validador de CPF</a> e o <a href="/utilidades/validador-cnpj">Validador de CNPJ</a>.</p>
        </>
      }
    >
      <GeradorUUIDForm />
    </CalculatorPage>
  )
}
