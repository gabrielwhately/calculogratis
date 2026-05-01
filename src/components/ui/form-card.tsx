'use client'

interface FormCardProps {
  children: React.ReactNode
  className?: string
}

export function FormCard({ children, className = '' }: FormCardProps) {
  return (
    <div className={`print:hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}>
      {children}
    </div>
  )
}
