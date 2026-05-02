'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { contarCaracteres } from '@/lib/calculadoras/contador-caracteres'

const I18N = {
  pt: {
    labelTexto: 'Digite ou cole seu texto',
    placeholder: 'Cole ou digite seu texto aqui...',
    labelCaracteres: 'Caracteres',
    labelSemEspacos: 'Sem espaços',
    labelPalavras: 'Palavras',
    labelFrases: 'Frases',
    labelParagrafos: 'Parágrafos',
    labelLinhas: 'Linhas',
    resTitle: 'Estatísticas do Texto',
  },
  es: {
    labelTexto: 'Escribe o pega tu texto',
    placeholder: 'Pega o escribe tu texto aquí...',
    labelCaracteres: 'Caracteres',
    labelSemEspacos: 'Sin espacios',
    labelPalavras: 'Palabras',
    labelFrases: 'Frases',
    labelParagrafos: 'Párrafos',
    labelLinhas: 'Líneas',
    resTitle: 'Estadísticas del Texto',
  }
}

export function ContadorCaracteresForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [texto, setTexto] = useState('')

  const result = contarCaracteres({ texto })

  return (
    <>
      <FormCard>
        <div className="mb-4">
          <label htmlFor="texto" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelTexto}
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={t.placeholder}
            rows={8}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
        </div>
      </FormCard>

      <ResultCard
        visible={texto.length > 0}
        title={t.resTitle}
        mainValue={String(result.caracteres)}
        mainLabel={t.labelCaracteres}
        items={[
          { label: t.labelSemEspacos, value: String(result.caracteresSemEspacos) },
          { label: t.labelPalavras, value: String(result.palavras) },
          { label: t.labelFrases, value: String(result.frases) },
          { label: t.labelParagrafos, value: String(result.paragrafos) },
          { label: t.labelLinhas, value: String(result.linhas) },
        ]}
      />
    </>
  )
}
