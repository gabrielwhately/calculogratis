import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ValidadorCNPJForm } from '@/components/calculadoras/validador-cnpj-form'

export const metadata: Metadata = createCalculadoraMetadata('validador-cnpj')

export default function ValidadorCNPJPage() {
  return (
    <CalculatorPage
      slug="validador-cnpj"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Validador de CNPJ"
      descricao="Cole um CNPJ e confirme se os dígitos verificadores estão corretos conforme o algoritmo da Receita Federal. Aceita formato com ou sem pontuação."
      faqs={[
        { question: 'Como funciona a validação do CNPJ?', answer: 'Os dois últimos dígitos do CNPJ são verificadores calculados a partir dos 12 primeiros por multiplicações ponderadas e módulo 11 — lógica similar ao CPF, mas com sequências de pesos diferentes. A validação recalcula esses dois dígitos e compara com o número informado.' },
        { question: 'Um CNPJ válido significa que a empresa existe?', answer: 'Não. Valida apenas os dígitos verificadores matematicamente. Para saber se o CNPJ está ativo, em débito com a Receita ou com a situação cadastral regular, é preciso consultar o portal da Receita Federal.' },
        { question: 'Qual a estrutura do CNPJ?', answer: 'Formato XX.XXX.XXX/XXXX-XX — 14 dígitos no total. Os 8 primeiros identificam a empresa, os 4 seguintes são o número da filial (0001 para a sede/matriz), e os 2 finais são os dígitos verificadores calculados a partir dos 12 anteriores.' },
      ]}
      conteudo={
        <>
          <h2>O que o validador de CNPJ verifica</h2>
          <p>O <strong>Validador de CNPJ</strong> recalcula os dois digitos verificadores a partir dos 12 primeiros digitos do numero informado, utilizando o <em>algoritmo modulo 11</em> com as sequencias de pesos especificas do CNPJ. Se os verificadores calculados coincidirem com os digitos informados, o CNPJ e considerado matematicamente valido.</p>
          <p>A ferramenta aceita tanto o formato com pontuacao (<em>XX.XXX.XXX/XXXX-XX</em>) quanto apenas os 14 digitos. A formatacao e removida automaticamente antes da validacao.</p>

          <h3>O que a validacao nao cobre</h3>
          <p>Esta ferramenta verifica <strong>apenas a validade matematica</strong> dos digitos verificadores. Ela <em>nao</em> confirma se:</p>
          <ul>
            <li>A empresa existe e esta registrada na Receita Federal</li>
            <li>O CNPJ esta ativo ou foi baixado/cancelado</li>
            <li>Ha pendencias fiscais ou debitos associados</li>
            <li>A razao social e o endereco vinculados ao numero</li>
          </ul>
          <p>Para essas informacoes, e necessario consultar o portal oficial da Receita Federal ou servicos de consulta cadastral.</p>

          <h2>Por que validar CNPJ e essencial no seu sistema</h2>
          <p>Integrar a validacao de CNPJ no fluxo de cadastro do seu sistema traz beneficios imediatos e evita problemas futuros:</p>
          <ol>
            <li><strong>Prevencao de erros:</strong> um unico digito trocado invalida o CNPJ e pode causar falhas em integracoes com a SEFAZ, processadores de pagamento e sistemas de emissao de NF-e</li>
            <li><strong>Qualidade dos dados:</strong> rejeitar CNPJs invalidos na entrada garante que seu banco de dados mantenha apenas registros consistentes</li>
            <li><strong>Economia de tempo:</strong> corrigir dados invalidos depois que ja foram processados custa muito mais do que validar no momento do cadastro</li>
            <li><strong>Seguranca:</strong> bloqueia tentativas de cadastro com numeros aleatorios ou fraudulentos</li>
          </ol>

          <h2>Estrutura do CNPJ explicada</h2>
          <p>O CNPJ possui <strong>14 digitos</strong> divididos em tres blocos funcionais. Os primeiros 8 digitos formam a inscricao base e identificam a empresa. Os digitos 9 a 12 indicam o numero da filial, sendo <em>0001</em> reservado para a matriz. Os 2 digitos finais sao os verificadores, calculados a partir dos 12 anteriores por multiplicacoes ponderadas e divisao modular.</p>

          <h2>Ferramentas complementares</h2>
          <p>O Calculo Gratis oferece um conjunto completo de ferramentas para trabalhar com documentos e dados brasileiros:</p>
          <ul>
            <li><a href="/utilidades/gerador-cnpj">Gerador de CNPJ</a> -- crie CNPJs ficticios para testes de software e homologacao</li>
            <li><a href="/utilidades/validador-cpf">Validador de CPF</a> -- valide numeros de CPF com o mesmo algoritmo modulo 11</li>
            <li><a href="/utilidades/gerador-cpf">Gerador de CPF</a> -- gere CPFs validos para testes de cadastro de pessoa fisica</li>
            <li><a href="/utilidades/formatador-json">Formatador JSON</a> -- formate e valide respostas de APIs de consulta cadastral</li>
            <li><a href="/utilidades/conversor-base64">Conversor Base64</a> -- decodifique tokens de autenticacao em integracoes com sistemas governamentais</li>
          </ul>
        </>
      }
    >
      <ValidadorCNPJForm />
    </CalculatorPage>
  )
}
