import { useId } from 'react'

interface SelectOption { value: string; label: string }
interface SelectProps { 
  label: string; 
  id?: string; 
  value: string; 
  onChange: (value: string) => void; 
  options: SelectOption[]; 
  error?: string 
}

export function Select({ label, id, value, onChange, options, error }: SelectProps) {
  const generatedId = useId()
  const selectId = id || generatedId

  return (
    <div className="mb-4">
      <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <select id={selectId} value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2.5 text-base text-slate-800 dark:text-slate-200 outline-none transition-colors bg-white dark:bg-slate-800 ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'}`}>
        {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  )
}
