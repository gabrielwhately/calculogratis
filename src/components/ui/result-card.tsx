interface ResultItem { label: string; value: string; highlight?: boolean }
interface ResultCardProps { title: string; mainValue: string; mainLabel: string; items?: ResultItem[]; visible: boolean }

export function ResultCard({ title, mainValue, mainLabel, items, visible }: ResultCardProps) {
  if (!visible) return null
  return (
    <div className="mt-6 rounded-xl bg-gradient-to-br from-navy to-navy-light p-6 text-white motion-reduce:transition-none" aria-live="polite">
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-1 text-4xl font-bold">{mainValue}</p>
      <p className="text-sm text-slate-300">{mainLabel}</p>
      {items && items.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-white/20 pt-4">
          {items.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-slate-300">{item.label}</span>
              <span className={item.highlight ? 'font-semibold text-white' : 'text-slate-200'}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
