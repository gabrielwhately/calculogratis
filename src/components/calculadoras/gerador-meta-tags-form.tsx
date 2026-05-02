'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { gerarMetaTags } from '@/lib/calculadoras/gerador-meta-tags'

const I18N = {
  pt: {
    labelTitulo: 'Título da página',
    labelDescricao: 'Descrição',
    labelUrl: 'URL do site',
    labelImageUrl: 'URL da imagem',
    labelSiteName: 'Nome do site',
    placeholderTitulo: 'Ex: Meu Site Incrível',
    placeholderDescricao: 'Ex: Uma descrição breve do seu site para SEO',
    placeholderUrl: 'https://www.meusite.com.br',
    placeholderImageUrl: 'https://www.meusite.com.br/imagem.jpg',
    placeholderSiteName: 'Ex: Meu Site',
    buttonCalcular: 'Gerar Meta Tags',
    resultTitle: 'Meta Tags geradas',
    buttonCopiar: 'Copiar HTML',
    buttonCopiado: 'Copiado!',
  },
  es: {
    labelTitulo: 'Título de la página',
    labelDescricao: 'Descripción',
    labelUrl: 'URL del sitio',
    labelImageUrl: 'URL de la imagen',
    labelSiteName: 'Nombre del sitio',
    placeholderTitulo: 'Ej: Mi Sitio Increíble',
    placeholderDescricao: 'Ej: Una descripción breve de su sitio para SEO',
    placeholderUrl: 'https://www.misitio.com',
    placeholderImageUrl: 'https://www.misitio.com/imagen.jpg',
    placeholderSiteName: 'Ej: Mi Sitio',
    buttonCalcular: 'Generar Meta Tags',
    resultTitle: 'Meta Tags generadas',
    buttonCopiar: 'Copiar HTML',
    buttonCopiado: '¡Copiado!',
  }
}

export function GeradorMetaTagsForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      <FormCard>
        <Input 
          label={t.labelTitulo} 
          id="title" 
          value={title} 
          onChange={setTitle} 
          placeholder={t.placeholderTitulo} 
        />
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelDescricao}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.placeholderDescricao}
            rows={3}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none"
          />
        </div>
        <Input 
          label={t.labelUrl} 
          id="url" 
          value={url} 
          onChange={setUrl} 
          placeholder={t.placeholderUrl} 
        />
        <Input 
          label={t.labelImageUrl} 
          id="image-url" 
          value={imageUrl} 
          onChange={setImageUrl} 
          placeholder={t.placeholderImageUrl} 
        />
        <Input 
          label={t.labelSiteName} 
          id="site-name" 
          value={siteName} 
          onChange={setSiteName} 
          placeholder={t.placeholderSiteName} 
        />
        <Button onClick={handleGerar} fullWidth disabled={!title && !description}>
          {t.buttonCalcular}
        </Button>
      </FormCard>

      <ResultCard
        visible={!!resultado}
        title={t.resultTitle}
        mainValue=""
        mainLabel=""
      >
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-end mb-3">
            <button
              onClick={handleCopiar}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition-colors border border-white/10"
            >
              {copiado ? t.buttonCopiado : t.buttonCopiar}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-black/30 p-4 text-xs sm:text-sm font-mono text-green-300 whitespace-pre-wrap break-all border border-white/5 shadow-inner">
            <code>{resultado}</code>
          </pre>
        </div>
      </ResultCard>
    </>
  )
}
