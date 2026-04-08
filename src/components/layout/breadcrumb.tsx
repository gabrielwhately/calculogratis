import Link from 'next/link'

interface BreadcrumbItem { label: string; href?: string }

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.label,
      ...(item.href ? { item: `https://calculogratis.com${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? <Link href={item.href} className="hover:text-accent transition-colors">{item.label}</Link> : <span className="text-slate-700 dark:text-slate-200">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
