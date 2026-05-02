'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface ResultItem { label: string; value: string; highlight?: boolean }
interface ResultCardProps { 
  title: string; 
  mainValue: string; 
  mainLabel: string; 
  items?: ResultItem[]; 
  visible: boolean;
  children?: React.ReactNode
}

const I18N = {
  pt: {
    print: 'Imprimir',
    shareWhatsApp: 'Compartilhar no WhatsApp',
    copy: 'Copiar resultado',
    calculatedAt: 'Calculado em:',
  },
  es: {
    print: 'Imprimir',
    shareWhatsApp: 'Compartir por WhatsApp',
    copy: 'Copiar resultado',
    calculatedAt: 'Calculado en:',
  }
}

export function ResultCard({ title, mainValue, mainLabel, items, visible, children }: ResultCardProps) {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [copied, setCopied] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (visible) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 600)
      return () => clearTimeout(timer)
    }
  }, [visible, mainValue])

  if (!visible) return null

  const getResultText = () => {
    return `${title}\n${mainLabel}: ${mainValue}\n\n${items?.map(i => `${i.label}: ${i.value}`).join('\n')}\n\n${t.calculatedAt} https://calculo.gratis`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(getResultText())
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div 
      className={`mt-6 rounded-xl bg-gradient-to-br from-navy to-navy-light dark:from-navy-dark dark:to-navy p-6 text-white shadow-lg border border-white/5 relative transition-all duration-500 print:bg-none print:text-navy print:border-navy print:shadow-none ${animate ? 'scale-[1.02] ring-2 ring-accent/50 shadow-accent/20' : 'scale-100'}`} 
      aria-live="polite"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <p className="text-4xl font-bold break-all">{mainValue}</p>
          <p className="text-sm text-slate-300 font-medium">{mainLabel}</p>
        </div>
        <div className="flex gap-1.5 shrink-0 print:hidden">
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all active:scale-95 text-slate-300 hover:text-white"
            aria-label={t.print}
            title={t.print}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.844l.445-4.461m9.12 4.461l-.445-4.461M8.946 20.125l.43-.448a1.2 1.2 0 011.613-.09l.867.66a1.2 1.2 0 001.412 0l.867-.66a1.2 1.2 0 011.613.09l.43.448m-8.23-2.106c.472.111.96.18 1.459.208a22.45 22.45 0 002.73 0c.498-.028.987-.097 1.459-.208m-4.958-3.123v-.045a1.608 1.201 0 011.608-1.201h4.425c.888 0 1.608.538 1.608 1.201v.045m-6.15-6.113V6.9c0-1.05.847-1.9 1.892-1.9h2.516c1.045 0 1.892.85 1.892 1.9v2.113" />
            </svg>
          </button>
          <button
            onClick={handleWhatsApp}
            className="p-2 rounded-lg bg-white/10 hover:bg-green-500/20 text-slate-300 hover:text-green-400 transition-all active:scale-95"
            aria-label={t.shareWhatsApp}
            title={t.shareWhatsApp}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.308 1.654zm6.241-3.528l.45.267c1.472.873 3.176 1.335 4.912 1.336 5.539 0 10.048-4.51 10.051-10.05 0-2.684-2.146-5.204-4.045-7.252-1.898-2.049-4.417-3.177-7.102-3.178-5.541 0-10.051 4.509-10.054 10.051-.001 1.88.52 3.715 1.503 5.311l.33.535-1.004 3.673 3.759-.986zm11.337-7.391c-.328-.164-1.94-.957-2.241-1.066-.301-.11-.52-.164-.739.164-.219.328-.847 1.066-1.039 1.285-.192.219-.384.246-.712.082-.328-.164-1.385-.51-2.637-1.627-.975-.87-1.633-1.946-1.824-2.274-.192-.328-.021-.505.143-.668.148-.147.328-.383.493-.574.164-.192.219-.328.328-.547.11-.219.055-.411-.027-.574-.082-.164-.739-1.777-1.012-2.434-.266-.639-.536-.552-.739-.563-.191-.01-.41-.011-.629-.011-.219 0-.575.082-.876.411-.301.328-1.15 1.122-1.15 2.735 0 1.612 1.177 3.169 1.341 3.388.164.219 2.316 3.535 5.609 4.957.783.338 1.394.54 1.869.691.787.249 1.503.214 2.069.139.631-.084 1.94-.793 2.214-1.558.274-.765.274-1.421.192-1.558-.083-.137-.302-.219-.63-.383z\"/>
            </svg>
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all active:scale-95 text-slate-300 hover:text-white"
            aria-label={t.copy}
            title={t.copy}
          >
            {copied ? (
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0c0 .414-.336.75-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {items && items.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-white/20 pt-4">
          {items.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <span className={item.highlight ? 'font-bold text-white' : 'text-slate-200'}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  )
}
