'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { gerarSenha, avaliarForcaSenha } from '@/lib/calculadoras/gerador-senha'

const I18N = {
  pt: {
    labelTamanho: 'Tamanho da senha',
    labelMaiusculas: 'Maiúsculas (A-Z)',
    labelMinusculas: 'Minúsculas (a-z)',
    labelNumeros: 'Números (0-9)',
    labelSimbolos: 'Símbolos (!@#...)',
    buttonCalcular: 'Gerar Senha',
    resultTitle: 'Senha gerada',
    labelForca: 'Força da senha',
    buttonCopiar: 'Copiar',
    buttonCopiado: 'Copiado!',
    forcaLabels: {
      'Muito Fraca': 'Muito Fraca',
      'Fraca': 'Fraca',
      'Media': 'Média',
      'Boa': 'Boa',
      'Forte': 'Forte',
      'Muito Forte': 'Muito Forte',
    }
  },
  es: {
    labelTamanho: 'Tamaño de la contraseña',
    labelMaiusculas: 'Mayúsculas (A-Z)',
    labelMinusculas: 'Minúsculas (a-z)',
    labelNumeros: 'Números (0-9)',
    labelSimbolos: 'Símbolos (!@#...)',
    buttonCalcular: 'Generar Contraseña',
    resultTitle: 'Contraseña generada',
    labelForca: 'Fuerza de la contraseña',
    buttonCopiar: 'Copiar',
    buttonCopiado: '¡Copiado!',
    forcaLabels: {
      'Muito Fraca': 'Muy Débil',
      'Fraca': 'Débil',
      'Media': 'Media',
      'Boa': 'Buena',
      'Forte': 'Fuerte',
      'Muito Forte': 'Muy Fuerte',
    }
  }
}

export function GeradorSenhaForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [tamanho, setTamanho] = useState(16)
  const [maiusculas, setMaiusculas] = useState(true)
  const [minusculas, setMinusculas] = useState(true)
  const [numeros, setNumeros] = useState(true)
  const [simbolos, setSimbolos] = useState(true)
  const [senha, setSenha] = useState('')
  const [copiado, setCopiado] = useState(false)

  function handleGerar() {
    const nova = gerarSenha({ tamanho, maiusculas, minusculas, numeros, simbolos })
    setSenha(nova)
    setCopiado(false)
  }

  function handleCopiar() {
    if (!senha) return
    navigator.clipboard.writeText(senha)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }

  const forca = senha ? avaliarForcaSenha(senha) : null
  const forcaWidth = forca ? Math.round((forca.forca / 6) * 100) : 0

  return (
    <>
      <FormCard>
        <div className="mb-4">
          <label htmlFor="tamanho" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelTamanho}: <span className="font-bold text-accent">{tamanho}</span>
          </label>
          <input
            id="tamanho"
            type="range"
            min={4}
            max={64}
            value={tamanho}
            onChange={(e) => setTamanho(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: t.labelMaiusculas, value: maiusculas, set: setMaiusculas },
            { label: t.labelMinusculas, value: minusculas, set: setMinusculas },
            { label: t.labelNumeros, value: numeros, set: setNumeros },
            { label: t.labelSimbolos, value: simbolos, set: setSimbolos },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => set(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
            </label>
          ))}
        </div>
        <Button onClick={handleGerar} fullWidth>
          {t.buttonCalcular}
        </Button>
      </FormCard>

      {senha && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-3">{t.resultTitle}</p>
          <div className="flex items-center gap-3 mb-4">
            <code className="flex-1 rounded-lg bg-navy-light px-4 py-3 font-mono text-lg tracking-widest break-all">
              {senha}
            </code>
            <button
              onClick={handleCopiar}
              className="shrink-0 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
            >
              {copiado ? t.buttonCopiado : t.buttonCopiar}
            </button>
          </div>
          {forca && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{t.labelForca}</span>
                <span className="font-semibold">
                  {t.forcaLabels[forca.label as keyof typeof t.forcaLabels] || forca.label}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/20">
                <div
                  className={`h-2 rounded-full transition-all ${forca.cor}`}
                  style={{ width: `${forcaWidth}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
