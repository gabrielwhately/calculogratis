interface ButtonProps {
  children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'; disabled?: boolean; fullWidth?: boolean
}

export function Button({ children, onClick, type = 'button', variant = 'primary', disabled, fullWidth }: ButtonProps) {
  const base = 'rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none'
  const variants = {
    primary: 'bg-accent text-white hover:bg-blue-600 focus-visible:ring-blue-300 active:scale-[0.98]',
    secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 focus-visible:ring-slate-300',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  )
}
