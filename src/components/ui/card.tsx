import Link from 'next/link'

interface CardProps { title: string; description: string; href: string; icon?: React.ReactNode }

export function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link href={href} className="group block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      {icon && <div className="mb-3 text-accent">{icon}</div>}
      <h3 className="font-semibold text-navy dark:text-white group-hover:text-accent transition-colors">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{description}</p>
    </Link>
  )
}
