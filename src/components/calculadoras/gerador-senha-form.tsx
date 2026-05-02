'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { Checkbox } from '@/components/ui/checkbox'
import { gerarSenha, avaliarForcaSenha } from '@/lib/calculadoras/gerador-senha'

const I18N = {
  pt: {
    labelTamanho: 'Tamanho da senha:',
    labelMaiusculas: 'Maiúsculas (A-Z)',
    labelMinusculas: 'Minúsculas (a-z)',
    labelNumeros: 'Números (0-9)',
    labelSimbolos: 'Símbolos (!@#...)',
    buttonGerar: 'Gerar Senha',
    resultTitle: 'Senha gerada',
    buttonCopiar: 'Copiar',
    buttonCopiado: 'Copiado!',
    labelForca: 'Força da senha',
    forcaLabels: {
      'Muito Fraca': 'Muito Fraca',
      'Fraca': 'Fraca',
      'Media': 'Média',
      'Forte': 'Forte',
      'Muito Forte': 'Muito Forte',
      'Excelente': 'Excelente',
    }
  },
  es: {
    labelTamanho: 'Longitud de la contraseña:',
    labelMaiusculas: 'Mayúsculas (A-Z)',
    labelMinusculas: 'Minúsculas (a-z)',
    labelNumeros: 'Números (0-9)',
    labelSimbolos: 'Símbolos (!@#...)',
    buttonGerar: 'Generar contraseña',
    resultTitle: 'Contraseña generada',
    buttonCopiar: 'Copiar',
    buttonCopiado: '¡Copiado!',
    labelForca: 'Fortaleza de la contraseña',
    forcaLabels: {
      'Muito Fraca': 'Muy débil',
      'Fraca': 'Débil',
      'Media': 'Media',
      'Forte': 'Fuerte',
      'Muito Forte': 'Muy fuerte',
      'Excelente': 'Excelente',
    }
  }
}

export function GeradorSenhaForm() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/es') ? 'es' : 'pt'
  const t = I18N[locale]

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
  const translatedForcaLabel = forca ? (t.forcaLabels[forca.label as keyof typeof t.forcaLabels] || forca.label) : ''

  return (
    <>
      <FormCard>
        <div className="mb-4">
          <label htmlFor="tamanho" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelTamanho} <span className="font-bold text-accent">{tamanho}</span>
          </label>
          <input
            id="tamanho"
            type="range"
            min={4}
            max={64}
            value={tamanho}
            onChange={(e) => setTamanho(Number(e.target.value))}
            className="w-full accent-accent h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-2">
          <Checkbox label={t.labelMaiusculas} checked={maiusculas} onChange={setMaiusculas} />
          <Checkbox label={t.labelMinusculas} checked={minusculas} onChange={setMinusculas} />
          <Checkbox label={t.labelNumeros} checked={numeros} onChange={setNumeros} />
          <Checkbox label={t.labelSimbolos} checked={simbolos} onChange={setSimbolos} />
        </div>
        <Button onClick={handleGerar} fullWidth>{t.buttonGerar}</Button>
      </FormCard>

      <ResultCard
        visible={!!senha}
        title={t.resultTitle}
        mainValue={senha}
        mainLabel=""
      >
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleCopiar}
              className="w-full rounded-lg bg-white/10 hover:bg-white/20 px-4 py-3 text-sm font-semibold text-white transition-all active:scale-95 border border-white/10"
            >
              {copiado ? t.buttonCopiado : t.buttonCopiar}
            </button>
          </div>
          {forca && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{t.labelForca}</span>
                <span className="font-semibold">{translatedForcaLabel}</span>
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
      </ResultCard>
    </>
  )
}
