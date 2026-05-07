import Link from 'next/link'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { BRAND_URL } from '@/lib/constants/branding'

export const metadata = {
  title: 'Calculadoras para seu Site | Widgets Gratuitos',
  description: 'Adicione nossas calculadoras e simuladores ao seu site ou blog gratuitamente. Aumente o engajamento dos seus leitores.',
}

export default function WidgetsPage() {
  return (
    <div className="container-app py-12 space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-navy dark:text-white md:text-5xl leading-tight">
          Ofereça Nossas <span className="text-accent">Calculadoras</span> no seu Site
        </h1>
        <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">
          Widgets gratuitos, leves e fáceis de instalar. Perfeitos para blogs de finanças, RH, saúde e tecnologia.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#como-funciona" className="px-8 py-4 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-lg">
            Como Funciona
          </a>
          <a href="mailto:parcerias@calculo.gratis" className="px-8 py-4 bg-white dark:bg-slate-800 text-navy dark:text-white border border-slate-200 dark:border-slate-700 font-bold rounded-2xl transition-all hover:bg-slate-50 shadow-sm">
            Falar com a Equipe
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-6">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Engajamento</h3>
          <p className="text-slate-600 dark:text-slate-400">Aumente o tempo de permanência no seu site oferecendo utilidades reais para seus leitores.</p>
        </div>
        <div className="p-8 rounded-3xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-6">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Sempre Atualizado</h3>
          <p className="text-slate-600 dark:text-slate-400">Nossas ferramentas são atualizadas automaticamente com as leis e índices de 2026.</p>
        </div>
        <div className="p-8 rounded-3xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-6">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-navy dark:text-white mb-3">Seguro e Grátis</h3>
          <p className="text-slate-600 dark:text-slate-400">Código otimizado que não afeta a velocidade do seu site. Sem custo e sem publicidade intrusiva.</p>
        </div>
      </section>

      <section id="como-funciona" className="space-y-8">
        <h2 className="text-3xl font-bold text-navy dark:text-white text-center">Como Integrar</h2>
        <div className="bg-slate-900 rounded-3xl p-8 overflow-hidden shadow-2xl text-slate-300">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs font-mono text-slate-500">embed-codigo.html</span>
          </div>
          <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
            {`<iframe 
  src="${BRAND_URL}/embed/trabalhista/rescisao" 
  width="100%" 
  height="600" 
  frameborder="0" 
  scrolling="no"
></iframe>`}
          </pre>
          <div className="mt-8 pt-6 border-t border-slate-800 text-sm italic">
            * Altere o final do link (ex: /financeiro/juros-compostos) para usar outras ferramentas.
          </div>
        </div>
      </section>

      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold text-navy dark:text-white text-center">Ferramentas Disponíveis</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULADORAS.map((calc) => (
            <div key={calc.slug} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
              <span className="font-medium text-navy dark:text-white">{calc.nome}</span>
              <Link 
                href={`/widgets/config?slug=${calc.slug}`} 
                className="text-xs font-bold text-accent hover:underline"
              >
                Pegar Código
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
