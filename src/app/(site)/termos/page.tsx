import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso | Cálculo Grátis",
  description: "Leia os termos e condições de uso da nossa plataforma de calculadoras online.",
}

export default function TermosPage() {
  return (
    <div className="container-app py-12 prose prose-slate dark:prose-invert max-w-3xl">
      <h1 className="text-navy dark:text-white">Termos de Uso</h1>
      <p className="lead">Bem-vindo ao Cálculo Grátis. Ao acessar e utilizar este site, você concorda com os termos e condições descritos abaixo.</p>
      
      <h2>1. Uso do Site</h2>
      <p>O Cálculo Grátis fornece calculadoras e ferramentas de simulação apenas para fins informativos. Embora nos esforcemos para garantir a precisão dos cálculos com base na legislação de 2026, os resultados não constituem aconselhamento profissional, jurídico ou financeiro.</p>
      
      <h2>2. Precisão das Informações</h2>
      <p>As ferramentas são baseadas em fórmulas matemáticas e tabelas oficiais (INSS, IRRF, etc.). No entanto, variações em casos específicos podem ocorrer. Recomendamos sempre a consulta com um profissional qualificado (contador, advogado ou consultor financeiro) antes de tomar decisões baseadas nos nossos simuladores.</p>
      
      <h2>3. Propriedade Intelectual</h2>
      <p>O design, código e conteúdo do Cálculo Grátis são de propriedade exclusiva da plataforma. A reprodução total ou parcial para fins comerciais sem autorização prévia é proibida.</p>
      
      <h2>4. Limitação de Responsabilidade</h2>
      <p>O Cálculo Grátis não se responsabiliza por quaisquer perdas, danos ou prejuízos decorrentes do uso das informações obtidas em nosso site.</p>
      
      <h2>5. Alterações</h2>
      <p>Reservamos o direito de modificar estes termos a qualquer momento, visando a melhoria contínua e a atualização conforme novas leis e regulamentações.</p>
      
      <p className="mt-12 text-sm text-slate-500">Última atualização: 06 de Maio de 2026.</p>
    </div>
  )
}
