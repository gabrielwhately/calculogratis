'use client'

import { useState } from 'react'

interface ResultItem { label: string; value: string; highlight?: boolean }
interface ResultCardProps { 
  title: string; 
  mainValue: string; 
  mainLabel: string; 
  items?: ResultItem[]; 
  visible: boolean;
  children?: React.ReactNode
}

export function ResultCard({ title, mainValue, mainLabel, items, visible, children }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  if (!visible) return null

  const handleCopy = () => {
    const text = `${title}\n${mainLabel}: ${mainValue}\n\n${items?.map(i => `${i.label}: ${i.value}`).join('\n')}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-6 rounded-xl bg-gradient-to-br from-navy to-navy-light dark:from-navy-dark dark:to-navy p-6 text-white motion-reduce:transition-none shadow-lg border border-white/5 relative" aria-live="polite">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-300">{title}</p>
          <p className="mt-1 text-4xl font-bold">{mainValue}</p>
          <p className="text-sm text-slate-300">{mainLabel}</p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all active:scale-95"
          aria-label="Copiar resultado"
          title="Copiar resultado"
        >
          {copied ? (
            <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0c0 .414-.336.75-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </button>
      </div>
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
      {children}
    </div>
  )
}
