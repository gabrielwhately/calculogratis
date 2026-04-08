'use client'

interface InputProps {
  label: string; id: string; type?: string; value: string; onChange: (value: string) => void
  error?: string; placeholder?: string; inputMode?: 'text' | 'decimal' | 'numeric'; suffix?: string; disabled?: boolean; optional?: boolean
}

export function Input({ label, id, type = 'text', value, onChange, error, placeholder, inputMode, suffix, disabled, optional }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}{optional && <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">(opcional)</span>}</label>
      <div className="relative">
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} inputMode={inputMode} disabled={disabled}
          className={`w-full rounded-lg border px-3 py-2.5 text-base text-slate-800 dark:text-slate-200 outline-none transition-colors ${error ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900' : 'border-slate-300 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'} ${disabled ? 'bg-slate-100 dark:bg-slate-800 cursor-not-allowed' : 'bg-white dark:bg-slate-800'} ${suffix ? 'pr-12' : ''}`} />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-600 dark:text-slate-400">{suffix}</span>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  )
}
