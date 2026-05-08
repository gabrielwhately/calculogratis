'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { trackEvent } from '@/components/layout/analytics'
import { FormCard } from '@/components/ui/form-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const I18N = {
  pt: {
    title: 'Sugerir Nova Calculadora',
    description: 'Sentiu falta de alguma ferramenta? Conte para nós o que você gostaria de calcular e nossa equipe irá analisar a sugestão.',
    labelName: 'Qual calculadora você gostaria de ver aqui?',
    placeholder: 'Ex: Calculadora de Dividendos, Simulador de Férias...',
    labelEmail: 'Seu e-mail (opcional)',
    button: 'Enviar Sugestão',
    success: 'Sugestão enviada com sucesso! Obrigado por nos ajudar a crescer.',
    back: 'Voltar para o Início'
  },
  es: {
    title: 'Sugerir Nueva Calculadora',
    description: '¿Echaste de menos alguna herramienta? Cuéntanos qué te gustaría calcular y nuestro equipo analizará la sugerencia.',
    labelName: '¿Qué calculadora te gustaría ver aquí?',
    placeholder: 'Ej: Calculadora de Dividendos, Simulador de Vacaciones...',
    labelEmail: 'Tu e-mail (opcional)',
    button: 'Enviar Sugerencia',
    success: '¡Sugerencia enviada con éxito! Gracias por ayudarnos a crecer.',
    back: 'Volver al Inicio'
  }
}

export default function SugerirPage() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    trackEvent('suggest_calculator', {
      calculator_name: name,
      user_email: email,
      language: isSpanish ? 'es' : 'pt'
    })

    // Simulating API call
    setTimeout(() => {
      setStatus('success')
      setName('')
      setEmail('')
    }, 1000)
  }

  return (
    <div className="container-app py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-navy dark:text-white mb-4">{t.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">{t.description}</p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm mx-auto mb-4">
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-800 dark:text-green-200 font-medium mb-6">{t.success}</p>
          <Link href={isSpanish ? '/es' : '/'} className="inline-flex items-center text-accent font-bold hover:underline">
            {t.back}
          </Link>
        </div>
      ) : (
        <FormCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t.labelName}
              id="calc-name"
              required
              value={name}
              onChange={setName}
              placeholder={t.placeholder}
            />
            <Input
              label={t.labelEmail}
              id="user-email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="seu@email.com"
            />
            <Button type="submit" className="w-full py-4 text-lg" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : t.button}
            </Button>
          </form>
        </FormCard>
      )}
    </div>
  )
}
