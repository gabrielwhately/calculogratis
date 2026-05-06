'use client'

import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulating API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <section className="rounded-2xl bg-navy dark:bg-slate-900 p-8 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">Dicas Financeiras e Trabalhistas no seu E-mail</h2>
        <p className="text-slate-300 mb-6">
          Receba semanalmente as atualizações das tabelas de 2026, novas ferramentas e dicas para cuidar do seu bolso.
        </p>

        {status === 'success' ? (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-100 flex items-center gap-3">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Inscrição realizada com sucesso! Verifique sua caixa de entrada.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-navy font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Quero Receber'}
            </button>
          </form>
        )}
        <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
          100% Grátis · Sem Spam · Cancele a qualquer momento
        </p>
      </div>
    </section>
  )
}
