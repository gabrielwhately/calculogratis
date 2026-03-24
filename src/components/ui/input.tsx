'use client'

interface InputProps {
  label: string; id: string; type?: string; value: string; onChange: (value: string) => void
  error?: string; placeholder?: string; inputMode?: 'text' | 'decimal' | 'numeric'; suffix?: string; disabled?: boolean
}

export function Input({ label, id, type = 'text', value, onChange, error, placeholder, inputMode, suffix, disabled }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} inputMode={inputMode} disabled={disabled}
          className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors ${error ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-accent focus:ring-2 focus:ring-blue-100'} ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'} ${suffix ? 'pr-12' : ''}`} />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">{suffix}</span>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  )
}
