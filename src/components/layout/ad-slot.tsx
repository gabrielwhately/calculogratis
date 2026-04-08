interface AdSlotProps { position: 'after-result' | 'mid-content' | 'footer' | 'sidebar'; className?: string }

export function AdSlot({ position, className = '' }: AdSlotProps) {
  return (
    <div className={`my-6 flex items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-4 text-sm text-slate-400 dark:text-slate-500 ${className}`}
      data-ad-position={position} aria-hidden="true">Espaco publicitario</div>
  )
}
