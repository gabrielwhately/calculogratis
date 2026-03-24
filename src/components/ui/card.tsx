import Link from 'next/link'

interface CardProps { title: string; description: string; href: string; icon?: React.ReactNode }

export function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link href={href} className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-accent hover:shadow-md">
      {icon && <div className="mb-3 text-accent">{icon}</div>}
      <h3 className="font-semibold text-navy group-hover:text-accent transition-colors">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 line-clamp-2">{description}</p>
    </Link>
  )
}
