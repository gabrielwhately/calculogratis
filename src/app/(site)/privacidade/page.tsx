import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade | Cálculo Grátis",
  description: "Entenda como tratamos seus dados e garantimos sua privacidade ao usar nossas ferramentas.",
}

export default function PrivacidadePage() {
  return (
    <div className="container-app py-12 prose prose-slate dark:prose-invert max-w-3xl">
      <h1 className="text-navy dark:text-white">Política de Privacidade</h1>
      <p className="lead">A sua privacidade é uma prioridade para nós. Esta política descreve como o Cálculo Grátis lida com suas informações.</p>
      
      <h2>1. Coleta de Dados</h2>
      <p>O Cálculo Grátis <strong>não solicita dados pessoais</strong> (como nome, CPF ou endereço) para a realização de cálculos. As informações inseridas nas calculadoras são processadas apenas para gerar o resultado solicitado e não são armazenadas em nossos servidores permanentes.</p>
      
      <h2>2. Cookies e Publicidade</h2>
      <p>Utilizamos cookies para melhorar sua experiência, lembrar suas preferências e analisar o tráfego do site através do Google Analytics. Também exibimos anúncios via Google AdSense, que pode utilizar cookies para veicular anúncios baseados em suas visitas anteriores.</p>
      
      <h2>3. Salvamento de Resultados</h2>
      <p>Se você optar por &quot;Salvar Resultado&quot;, esta informação é armazenada <strong>localmente no seu navegador</strong> (Local Storage). Nós não temos acesso a esses dados salvos no seu dispositivo.</p>
      
      <h2>4. Links Externos</h2>
      <p>Nosso site pode conter links para sites externos que não são operados por nós. Não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
      
      <h2>5. Segurança</h2>
      <p>Empregamos medidas de segurança padrão para proteger nosso site e seus visitantes contra acesso não autorizado ou alteração de dados.</p>
      
      <p className="mt-12 text-sm text-slate-500">Última atualização: 06 de Maio de 2026.</p>
    </div>
  )
}
