'use client'

import { useId, InputHTMLAttributes } from 'react'
import { Tooltip } from './tooltip'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  suffix?: string;
  optional?: boolean;
  info?: string;
  onChange: (value: string) => void; 
}

export function Input({ 
  label, 
  id, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  inputMode, 
  suffix, 
  disabled, 
  optional,
  info,
  className,
  ...props 
}: InputProps) {
  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 mb-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {optional && <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">(opcional)</span>}
        </label>
        {info && (
          <Tooltip content={info}>
            <svg className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-help transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Tooltip>
        )}
      </div>
      <div className="relative">
        <input 
          id={inputId} 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder} 
          inputMode={inputMode} 
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-lg border px-3 py-2.5 text-base text-slate-800 dark:text-slate-200 outline-none transition-colors ${error ? 'border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900' : 'border-slate-300 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'} ${disabled ? 'bg-slate-100 dark:bg-slate-800 cursor-not-allowed' : 'bg-white dark:bg-slate-800'} ${suffix ? 'pr-12' : ''} ${className || ''}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-600 dark:text-slate-400">
            {suffix}
          </span>
        )}
      </div>
      {error && <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  )
}
