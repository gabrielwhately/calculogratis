import type { Metadata } from 'next'
import { createCalculadoraMetadata } from '@/lib/seo/metadata'
import { CalculatorPage } from '@/components/calculadoras/calculator-page'
import { GeradorQRCodeForm } from '@/components/calculadoras/gerador-qrcode-form'

export const metadata: Metadata = createCalculadoraMetadata('gerador-qrcode')

export default function GeradorQRCodePage() {
  return (
    <CalculatorPage
      slug="gerador-qrcode"
      categoriaSlug="utilidades"
      categoriaNome="Utilidades"
      nome="Gerador de QR Code"
      descricao="Cole uma URL, número de telefone, texto ou qualquer dado e gere o QR Code na hora — o processamento é local no navegador e o arquivo pode ser baixado em PNG para impressão."
      faqs={[
        { question: 'O que é um QR Code?', answer: 'QR Code (Quick Response) é um código de barras bidimensional criado em 1994 pela japonesa Denso Wave. Por ser 2D, armazena muito mais dado que um código de barras comum. Qualquer câmera de smartphone moderna lê sem precisar de app especial.' },
        { question: 'Quais dados posso codificar em um QR Code?', answer: 'Qualquer texto: URLs, e-mails, números de telefone, mensagens, dados de contato no formato vCard, credenciais de Wi-Fi, coordenadas geográficas. O limite prático é de cerca de 4.000 caracteres — quanto mais dado, mais densa fica a imagem e mais difícil de ler em tamanho pequeno.' },
        { question: 'O QR Code gerado expira?', answer: 'Não. Os dados estão codificados na própria imagem — não dependem de nenhum servidor. Ao contrário de QR Codes dinâmicos de serviços pagos (que podem expirar ou ser desativados), este é estático: funciona enquanto a imagem existir.' },
        { question: 'Posso usar o QR Code para fins comerciais?', answer: 'Sim, sem restrições. Imprima em embalagens, cartões de visita, cardápios, banners e material de evento. O QR Code gerado aqui é seu — não há vínculo com nenhuma plataforma nem dependência de terceiros.' },
      ]}
      conteudo={
        <>
          <h2>Como usar o gerador de QR Code online</h2>
          <p>Criar um QR Code com esta ferramenta e simples e rapido. Basta colar ou digitar o conteudo desejado no campo de entrada -- pode ser uma <strong>URL, texto, numero de telefone, endereco de e-mail</strong> ou qualquer outro dado -- e clicar em gerar. A imagem e criada instantaneamente no seu proprio navegador, sem que nenhum dado seja enviado para servidores externos.</p>
          <p>Apos a geracao, voce pode baixar o QR Code em formato <strong>PNG</strong> em alta resolucao, pronto para impressao em materiais fisicos ou uso em midias digitais.</p>

          <h2>Aplicacoes praticas do QR Code</h2>
          <p>O QR Code (Quick Response Code) e uma ferramenta versatil com aplicacoes em diversas areas:</p>
          <ul>
            <li><strong>Comercio e marketing:</strong> cardapios digitais em restaurantes, links para promocoes em embalagens, direcionamento para sites em banners e outdoors</li>
            <li><strong>Cartoes de visita:</strong> inclua um QR Code com seus dados de contato no formato vCard para facilitar o cadastro</li>
            <li><strong>Eventos:</strong> ingressos digitais, credenciamento e check-in de participantes</li>
            <li><strong>Wi-Fi:</strong> codifique as credenciais da rede para que visitantes se conectem escaneando o codigo</li>
            <li><strong>Pagamentos:</strong> o Pix utiliza QR Codes como um dos metodos de pagamento mais populares no Brasil</li>
          </ul>

          <h3>QR Code estatico vs dinamico</h3>
          <p>Esta ferramenta gera QR Codes <strong>estaticos</strong>, ou seja, o conteudo e gravado diretamente na imagem e nao pode ser alterado depois. Isso e ideal para links permanentes, dados de contato e informacoes que nao mudam. Se voce precisar alterar o destino sem reimprimir o material, seria necessario um servico de QR Code dinamico, que funciona com redirecionamento via URL encurtada.</p>

          <h2>Dicas para garantir a leitura do QR Code</h2>
          <p>Para que o QR Code funcione corretamente em todos os cenarios, siga estas recomendacoes:</p>
          <ol>
            <li><strong>Tamanho minimo:</strong> imprima com pelo menos 2,5 x 2,5 cm para leitura confortavel por smartphones</li>
            <li><strong>Contraste:</strong> mantenha o codigo escuro sobre fundo claro -- preto sobre branco e o ideal</li>
            <li><strong>Evite distorcao:</strong> nao redimensione desproporcionalmente a imagem</li>
            <li><strong>Margem branca:</strong> mantenha uma borda (quiet zone) ao redor do codigo para facilitar a deteccao</li>
            <li><strong>Teste antes de imprimir:</strong> escaneie o QR Code com seu celular para confirmar que funciona</li>
          </ol>
          <p>Lembre-se: quanto mais texto voce codificar, mais densa fica a matriz de pontos e maior precisa ser o QR Code impresso.</p>

          <h2>Ferramentas relacionadas</h2>
          <p>Combine o gerador de QR Code com outras ferramentas do Calculo Gratis para otimizar seu trabalho:</p>
          <ul>
            <li><a href="/utilidades/gerador-meta-tags">Gerador de Meta Tags</a> -- crie as meta tags da pagina de destino do seu QR Code para melhorar o SEO</li>
            <li><a href="/utilidades/contador-caracteres">Contador de Caracteres</a> -- verifique o tamanho do texto antes de codificar (QR Codes suportam ate ~4.000 caracteres)</li>
            <li><a href="/utilidades/conversor-base64">Conversor Base64</a> -- codifique dados para incluir em URLs complexas</li>
            <li><a href="/utilidades/gerador-senha">Gerador de Senha</a> -- crie senhas seguras para redes Wi-Fi que serao compartilhadas via QR Code</li>
          </ul>
        </>
      }
    >
      <GeradorQRCodeForm />
    </CalculatorPage>
  )
}
