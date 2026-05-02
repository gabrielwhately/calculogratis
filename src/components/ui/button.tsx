interface ButtonProps {
  children: React.ReactNode; 
  onClick?: () => void; 
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  disabled?: boolean; 
  fullWidth?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled, 
  fullWidth,
  className = ''
}: ButtonProps) {
  const base = 'rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none'
  const variants = {
    primary: 'bg-accent text-white hover:bg-blue-600 focus-visible:ring-blue-300 active:scale-[0.98]',
    secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 focus-visible:ring-slate-300',
    outline: 'bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  }
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
