import Link from 'next/link'
import { CATEGORIAS } from '@/lib/constants/calculadoras'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-8 hidden md:block">
      <div className="container-app">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="font-semibold text-navy dark:text-white">Calculo Gratis</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Calculadoras e simuladores online gratis para o dia a dia.</p>
          </div>
          {CATEGORIAS.map((cat) => (
            <div key={cat.slug}>
              <h4 className="font-semibold text-navy dark:text-white">{cat.nome}</h4>
              <ul className="mt-2 space-y-1"><li><Link href={`/${cat.slug}`} className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent">Ver todas</Link></li></ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 text-center text-sm text-slate-600 dark:text-slate-400">&copy; {new Date().getFullYear()} calculogratis.com</div>
      </div>
    </footer>
  )
}
