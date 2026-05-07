import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorHashForm } from '@/components/calculadoras/gerador-hash-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-hash')

export default function GeradorHashPage() {
  return (
    <CalculatorPage
      slug="gerador-hash"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de Hash"
      descricao="Digite qualquer texto e obtenha o hash em MD5, SHA-1, SHA-256, SHA-384 ou SHA-512. Útil para verificar integridade de arquivos, testar funções de hash e inspecionar tokens."
      faqs={[
        { question: 'O que é um hash criptográfico?', answer: 'Uma função matemática unidirecional: qualquer entrada gera sempre o mesmo hash, mas a partir do hash é computacionalmente inviável reconstruir a entrada original. Mude um único caractere e o hash muda completamente — essa propriedade chama-se efeito avalanche.' },
        { question: 'Qual algoritmo devo usar?', answer: 'Para segurança: SHA-256 ou superior — é o padrão atual para assinaturas digitais, tokens e verificação de integridade. MD5 e SHA-1 têm vulnerabilidades conhecidas de colisão e não devem ser usados para fins de segurança. MD5 ainda aparece em checksums de arquivos antigos e sistemas legados, mas só para conveniência, não para proteção.' },
        { question: 'O texto que digito é enviado para algum servidor?', answer: 'Não. SHA-256, SHA-384 e SHA-512 são calculados pela Web Crypto API nativa do navegador. MD5 usa um algoritmo em JavaScript puro. Nenhum dado sai do seu dispositivo — pode confirmar na aba Network do DevTools: zero requisições externas.' },
      ]}
      conteudo={
        <>
          <h2>O que e um hash criptografico e como ele funciona</h2>
          <p>Um <strong>hash criptografico</strong> funciona como uma impressao digital de dados: qualquer texto, independentemente do tamanho, produz uma sequencia hexadecimal de <em>tamanho fixo</em>. O SHA-256, por exemplo, sempre gera exatamente 64 caracteres hexadecimais -- seja para uma unica letra ou para um livro inteiro. A propriedade mais importante e o <strong>efeito avalanche</strong>: se um unico caractere da entrada mudar, o hash resultante muda completamente, tornando possivel detectar qualquer alteracao por simples comparacao.</p>
          <p>Outra caracteristica fundamental e que hashes sao funcoes <em>unidirecionais</em>. A partir do hash, e computacionalmente inviavel reconstruir o texto original. Isso os torna essenciais para verificacao de integridade e armazenamento seguro de informacoes sensiveis.</p>

          <h2>Comparacao entre algoritmos de hash</h2>
          <p>Cada algoritmo tem caracteristicas especificas que determinam quando utiliza-lo:</p>
          <ul>
            <li><strong>MD5</strong> (128 bits, 32 caracteres hex): criado em 1992, hoje considerado <em>vulneravel a colisoes</em>. Ainda aparece em checksums de sistemas legados, mas nao deve ser usado para fins de seguranca</li>
            <li><strong>SHA-1</strong> (160 bits, 40 caracteres hex): depreciado oficialmente desde 2017, apos pesquisadores demonstrarem colisao pratica. O Git ainda o utiliza internamente, mas com planos de migracao</li>
            <li><strong>SHA-256</strong> (256 bits, 64 caracteres hex): padrao atual da familia SHA-2, sem vulnerabilidades conhecidas. Recomendado para assinaturas digitais, tokens e verificacao de integridade</li>
            <li><strong>SHA-384 e SHA-512</strong>: variantes com saidas maiores para cenarios que exigem margem de seguranca extra, como certificados digitais e aplicacoes governamentais</li>
          </ul>

          <h3>Qual algoritmo escolher</h3>
          <p>Para a maioria das aplicacoes modernas, o <strong>SHA-256</strong> e a escolha recomendada. Ele oferece o melhor equilibrio entre seguranca e desempenho. Use MD5 apenas quando compatibilidade com sistemas antigos for obrigatoria e a seguranca nao for o objetivo principal.</p>

          <h2>Aplicacoes praticas de hashes no dia a dia</h2>
          <p>Hashes criptograficos estao presentes em mais situacoes do que a maioria das pessoas imagina:</p>
          <ol>
            <li><strong>Verificacao de downloads:</strong> compare o SHA-256 do arquivo baixado com o checksum oficial do fabricante para garantir que o arquivo nao foi corrompido ou adulterado</li>
            <li><strong>Armazenamento de senhas:</strong> senhas nunca devem ser guardadas em texto puro -- sistemas seguros usam hash com salt (bcrypt, Argon2)</li>
            <li><strong>Cache HTTP:</strong> ETags baseadas em hash do conteudo permitem que navegadores identifiquem quando uma pagina mudou</li>
            <li><strong>Identificadores por conteudo:</strong> sistemas como IPFS e Docker usam hashes para criar enderecos baseados no conteudo real</li>
            <li><strong>Assinatura de commits:</strong> o Git usa hashes para identificar cada commit de forma unica</li>
          </ol>

          <h2>Seguranca e privacidade desta ferramenta</h2>
          <p>Todos os hashes sao calculados <strong>localmente no seu navegador</strong>. SHA-256, SHA-384 e SHA-512 utilizam a Web Crypto API nativa, enquanto MD5 roda em JavaScript puro. Nenhum dado e enviado para servidores externos -- voce pode confirmar isso na aba Network do DevTools do navegador.</p>
          <p>Se voce trabalha com seguranca e precisa de senhas fortes para proteger seus sistemas, experimente o <a href="/utilidades/gerador-senha">Gerador de Senha</a>. Para codificacao de dados, o <a href="/utilidades/conversor-base64">Conversor Base64</a> e outra ferramenta util. Desenvolvedores que precisam de identificadores unicos podem usar o <a href="/utilidades/gerador-uuid">Gerador de UUID</a> para criar chaves seguras e sem risco de colisao.</p>
        </>
      }
    >
      <GeradorHashForm />
    </CalculatorPage>
  )
}
