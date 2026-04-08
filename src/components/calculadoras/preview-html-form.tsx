'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const EXEMPLO_HTML = `<!DOCTYPE html>
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
    <h1>Ola, Mundo!</h1>
    <p>Digite seu proprio HTML e CSS no campo ao lado para visualizar o resultado aqui.</p>
  </div>
</body>
</html>`

export function PreviewHtmlForm() {
  const [html, setHtml] = useState(EXEMPLO_HTML)
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
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="html-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Codigo HTML / CSS
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {charCount.toLocaleString('pt-BR')} caracteres
            </span>
          </div>
          <textarea
            id="html-input"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Cole seu codigo HTML aqui..."
            rows={12}
            spellCheck={false}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y font-mono text-sm"
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={handleRenderizar} fullWidth disabled={!html.trim()}>
            Renderizar HTML
          </Button>
          <Button onClick={handleLimpar} variant="secondary">
            Limpar
          </Button>
        </div>
      </div>

      {mostrar && (
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden shadow-sm" aria-live="polite">
          <div className="bg-navy dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Visualizacao</p>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>
          <div className="bg-white" style={{ minHeight: '300px' }}>
            <iframe
              srcDoc={rendered}
              title="Preview HTML"
              className="w-full border-0"
              style={{ minHeight: '300px', height: '60vh', maxHeight: '600px' }}
              sandbox="allow-scripts"
            />
          </div>
        </div>
      )}
    </>
  )
}
