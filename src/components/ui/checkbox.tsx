'use client'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
  description?: string
}

export function Checkbox({ label, checked, onChange, id, description }: CheckboxProps) {
  return (
    <div className="mb-4">
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="flex h-5 items-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 cursor-pointer rounded border-slate-300 bg-white text-accent transition-colors focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-blue-900"
          />
        </div>
        <div className="text-sm">
          <span className="font-medium text-slate-700 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
            {label}
          </span>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      </label>
    </div>
  )
}
