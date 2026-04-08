import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { ValidadorCPFForm } from '@/components/calculadoras/validador-cpf-form'

export const metadata: Metadata = createCalculadoraMetadata('validador-cpf')

export default function ValidadorCPFPage() {
  return (
    <CalculatorPage
      slug="validador-cpf"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Validador de CPF"
      descricao="Cole qualquer número de CPF e confirme se os dígitos verificadores batem com o algoritmo da Receita Federal. Aceita formato com ou sem pontuação."
      faqs={[
        { question: 'Como funciona a validação do CPF?', answer: 'Os dois últimos dígitos do CPF são verificadores calculados a partir dos 9 primeiros pelo algoritmo módulo 11. A validação recalcula esses dois dígitos e compara com o que está no número informado. Se baterem, o CPF é matematicamente válido.' },
        { question: 'Um CPF válido significa que ele existe?', answer: 'Não necessariamente. A validação confirma apenas que os dígitos verificadores estão corretos. Um CPF gerado aleatoriamente pode ser matematicamente válido sem estar cadastrado na Receita. Para verificar se o CPF existe e está ativo, é preciso consultar o site da Receita Federal.' },
        { question: 'Para que serve o validador de CPF?', answer: 'Para confirmar se um CPF digitado por um usuário é válido antes de enviar ao banco, API ou sistema — prevenindo erros de digitação e tentativas de entrada com números inválidos. Também ajuda a depurar formulários e integrações durante o desenvolvimento.' },
      ]}
      conteudo={
        <>
          <h2>Como funciona a validacao de CPF</h2>
          <p>O <strong>Validador de CPF</strong> aplica o algoritmo oficial de verificacao utilizado pela Receita Federal para confirmar se um numero de CPF e matematicamente valido. O processo e simples e rapido:</p>
          <ol>
            <li>O numero informado e limpo, removendo pontos e tracos (aceita formato <em>000.000.000-00</em> ou apenas os 11 digitos)</li>
            <li>Os dois digitos verificadores sao recalculados a partir dos 9 primeiros digitos usando o <strong>algoritmo modulo 11</strong></li>
            <li>Os verificadores calculados sao comparados com os digitos informados. Se ambos coincidirem, o CPF e valido</li>
          </ol>

          <h3>CPFs que sao automaticamente rejeitados</h3>
          <p>Alem da verificacao dos digitos, a ferramenta rejeita sequencias com <em>todos os digitos iguais</em>, como 000.000.000-00, 111.111.111-11 ou 999.999.999-99. Embora algumas dessas sequencias passem no calculo matematico dos verificadores, a Receita Federal as considera invalidas por serem obviamente ficticias.</p>

          <h2>Validacao matematica vs existencia real</h2>
          <p>E fundamental entender a diferenca entre um CPF <strong>matematicamente valido</strong> e um CPF <strong>existente</strong>. Esta ferramenta verifica apenas se os digitos verificadores estao corretos conforme o algoritmo. Um CPF pode ser valido matematicamente sem estar cadastrado na Receita Federal -- e o caso dos numeros criados por um <a href="/utilidades/gerador-cpf">Gerador de CPF</a>.</p>
          <p>Para confirmar se um CPF esta ativo e vinculado a uma pessoa real, e necessario consultar diretamente o portal da Receita Federal, o que esta fora do escopo desta ferramenta.</p>

          <h2>Quando usar o validador de CPF no seu sistema</h2>
          <p>A validacao de CPF e uma camada essencial de <strong>validacao de entrada</strong> que deveria estar presente em qualquer sistema que coleta esse dado. Os principais beneficios incluem:</p>
          <ul>
            <li><strong>Prevencao de erros de digitacao:</strong> captura CPFs com digitos trocados antes de persistir no banco de dados</li>
            <li><strong>Protecao contra dados ficticios:</strong> rejeita numeros gerados aleatoriamente sem a logica dos verificadores</li>
            <li><strong>Reducao de retrabalho:</strong> evita que dados invalidos cheguem a integracoes com a Receita, Serasa ou processadores de pagamento</li>
            <li><strong>Melhoria da experiencia do usuario:</strong> feedback imediato no formulario evita frustracao posterior</li>
          </ul>

          <h2>Dicas praticas de implementacao</h2>
          <p>Ao implementar validacao de CPF no seu projeto, considere aplicar a verificacao tanto no <em>frontend</em> (para feedback imediato ao usuario) quanto no <em>backend</em> (como camada de seguranca). Nunca confie apenas na validacao do lado do cliente, pois ela pode ser contornada.</p>
          <p>Precisa gerar CPFs de teste para o seu ambiente de homologacao? Use o <a href="/utilidades/gerador-cpf">Gerador de CPF</a>. Para validacao de documentos de pessoa juridica, confira o <a href="/utilidades/validador-cnpj">Validador de CNPJ</a>. E se estiver trabalhando com dados de <a href="/trabalhista/rescisao">rescisao trabalhista</a> ou folha de pagamento, a validacao de CPF e um passo obrigatorio no processamento.</p>
        </>
      }
    >
      <ValidadorCPFForm />
    </CalculatorPage>
  )
}
