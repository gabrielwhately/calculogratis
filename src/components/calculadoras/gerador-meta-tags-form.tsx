'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { gerarMetaTags } from '@/lib/calculadoras/gerador-meta-tags'

export function GeradorMetaTagsForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [siteName, setSiteName] = useState('')
  const [resultado, setResultado] = useState('')
  const [copiado, setCopiado] = useState(false)

  function handleGerar() {
    setResultado(gerarMetaTags({ title, description, url, imageUrl, siteName }))
    setCopiado(false)
  }

  function handleCopiar() {
    navigator.clipboard.writeText(resultado)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 1500)
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <Input label="Titulo da pagina" id="title" value={title} onChange={setTitle} placeholder="Ex: Meu Site Incrivel" />
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descricao</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Uma descricao breve do seu site para SEO"
            rows={3}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none"
          />
        </div>
        <Input label="URL do site" id="url" value={url} onChange={setUrl} placeholder="https://www.meusite.com.br" />
        <Input label="URL da imagem" id="image-url" value={imageUrl} onChange={setImageUrl} placeholder="https://www.meusite.com.br/imagem.jpg" />
        <Input label="Nome do site" id="site-name" value={siteName} onChange={setSiteName} placeholder="Ex: Meu Site" />
        <Button onClick={handleGerar} fullWidth disabled={!title && !description}>Gerar Meta Tags</Button>
      </div>
      {resultado && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white" aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-300">Meta Tags geradas</p>
            <button
              onClick={handleCopiar}
              className="rounded-lg bg-navy-light px-4 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              {copiado ? 'Copiado!' : 'Copiar HTML'}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-black/30 p-4 text-sm font-mono text-green-300 whitespace-pre-wrap break-all">
            <code>{resultado}</code>
          </pre>
        </div>
      )}
    </>
  )
}
