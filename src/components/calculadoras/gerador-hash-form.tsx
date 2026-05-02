'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { gerarHash, gerarMD5 } from '@/lib/calculadoras/gerador-hash'

type Algoritmo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

const I18N = {
  pt: {
    labelTexto: 'Texto para gerar hash',
    placeholder: 'Digite ou cole o texto aqui...',
    labelAlgoritmo: 'Algoritmo',
    btnGerar: 'Gerar Hash',
    btnGerando: 'Gerando...',
    resTitle: 'Hash',
    btnCopiar: 'Copiar',
    btnCopiado: 'Copiado!',
    footerBits: 'bits',
    footerChar: 'caracteres hexadecimais',
  },
  es: {
    labelTexto: 'Texto para generar hash',
    placeholder: 'Escriba o pegue el texto aquí...',
    labelAlgoritmo: 'Algoritmo',
    btnGerar: 'Generar Hash',
    btnGerando: 'Generando...',
    resTitle: 'Hash',
    btnCopiar: 'Copiar',
    btnCopiado: '¡Copiado!',
    footerBits: 'bits',
    footerChar: 'caracteres hexadecimales',
  }
}

const algoritmoOptions = [
  { value: 'MD5', label: 'MD5 (128 bits)' },
  { value: 'SHA-1', label: 'SHA-1 (160 bits)' },
  { value: 'SHA-256', label: 'SHA-256 (256 bits)' },
  { value: 'SHA-384', label: 'SHA-384 (384 bits)' },
  { value: 'SHA-512', label: 'SHA-512 (512 bits)' },
]

export function GeradorHashForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [texto, setTexto] = useState('')
  const [algoritmo, setAlgoritmo] = useState<Algoritmo>('SHA-256')
  const [hash, setHash] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleGerar() {
    if (!texto) return
    setLoading(true)
    try {
      let resultado: string
      if (algoritmo === 'MD5') {
        resultado = gerarMD5(texto)
      } else {
        resultado = await gerarHash(texto, algoritmo as 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')
      }
      setHash(resultado)
      setCopiado(false)
    } finally {
      setLoading(false)
    }
  }

  function handleCopiar() {
    navigator.clipboard.writeText(hash)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }

  return (
    <>
      <FormCard>
        <div className="mb-4">
          <label htmlFor="texto-hash" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelTexto}
          </label>
          <textarea
            id="texto-hash"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={t.placeholder}
            rows={5}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
        <Select
          label={t.labelAlgoritmo}
          id="algoritmo"
          value={algoritmo}
          onChange={(v) => setAlgoritmo(v as Algoritmo)}
          options={algoritmoOptions}
        />
        <Button onClick={handleGerar} fullWidth disabled={!texto || loading}>
          {loading ? t.btnGerando : t.btnGerar}
        </Button>
      </FormCard>

      <ResultCard
        visible={!!hash}
        title={`${t.resTitle} ${algoritmo}`}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-end mb-3">
            <button
              onClick={handleCopiar}
              className="text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 border border-white/10"
            >
              {copiado ? t.btnCopiado : t.btnCopiar}
            </button>
          </div>
          <p className="font-mono text-xs sm:text-sm break-all leading-relaxed text-white bg-black/20 rounded-lg p-4 select-all shadow-inner border border-white/5">
            {hash}
          </p>
          <p className="mt-3 text-[10px] text-slate-400 text-center uppercase tracking-wider">
            {hash.length * 4} {t.footerBits} &bull; {hash.length} {t.footerChar}
          </p>
        </div>
      </ResultCard>
    </>
  )
}
