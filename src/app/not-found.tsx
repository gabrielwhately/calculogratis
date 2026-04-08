import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-bold text-navy dark:text-white">404</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Pagina nao encontrada</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors">Voltar ao inicio</Link>
    </div>
  )
}
