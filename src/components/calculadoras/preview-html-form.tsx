'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'

const I18N = {
  pt: {
    labelCodigo: 'Código HTML / CSS',
    labelCaracteres: 'caracteres',
    placeholder: 'Cole seu código HTML aqui...',
    buttonCalcular: 'Renderizar HTML',
    buttonLimpar: 'Limpar',
    resultTitle: 'Visualização',
    previewTitle: 'Preview HTML',
    exemplo: {
      h1: 'Olá, Mundo!',
      p: 'Digite seu próprio HTML e CSS no campo ao lado para visualizar o resultado aqui.',
    }
  },
  es: {
    labelCodigo: 'Código HTML / CSS',
    labelCaracteres: 'caracteres',
    placeholder: 'Pegue su código HTML aquí...',
    buttonCalcular: 'Renderizar HTML',
    buttonLimpar: 'Limpiar',
    resultTitle: 'Previsualización',
    previewTitle: 'Vista previa HTML',
    exemplo: {
      h1: '¡Hola, Mundo!',
      p: 'Escriba su propio HTML y CSS en el campo de al lado para visualizar el resultado aquí.',
    }
  }
}

function getExemplo(t: typeof I18N.pt) {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f0f4f8; }
    h1 { color: #1e3a5f; }
    p { color: #444; line-height: 1.6; }
    .box { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="box">
    <h1>${t.exemplo.h1}</h1>
    <p>${t.exemplo.p}</p>
  </div>
</body>
</html>`
}

export function PreviewHtmlForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [html, setHtml] = useState(getExemplo(t))
  const [rendered, setRendered] = useState('')
  const [mostrar, setMostrar] = useState(false)

  function handleRenderizar() {
    setRendered(html)
    setMostrar(true)
  }

  function handleLimpar() {
    setHtml('')
    setRendered('')
    setMostrar(false)
  }

  const charCount = html.length

  return (
    <>
      <FormCard>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="html-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.labelCodigo}
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {charCount.toLocaleString(isSpanish ? 'es-ES' : 'pt-BR')} {t.labelCaracteres}
            </span>
          </div>
          <textarea
            id="html-input"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder={t.placeholder}
            rows={12}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y font-mono text-sm"
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={handleRenderizar} fullWidth disabled={!html.trim()}>
            {t.buttonCalcular}
          </Button>
          <Button onClick={handleLimpar} variant="secondary">
            {t.buttonLimpar}
          </Button>
        </div>
      </FormCard>

      <ResultCard
        visible={mostrar}
        title={t.resultTitle}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
          <div className="bg-navy-dark px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 mx-4 bg-black/20 rounded px-3 py-0.5 text-[10px] text-slate-400 truncate text-center font-mono">
              localhost:3000/preview
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
          <div className="bg-white" style={{ minHeight: '300px' }}>
            <iframe
              srcDoc={rendered}
              title={t.previewTitle}
              className="w-full border-0"
              style={{ minHeight: '300px', height: '50vh', maxHeight: '500px' }}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </ResultCard>
    </>
  )
}
