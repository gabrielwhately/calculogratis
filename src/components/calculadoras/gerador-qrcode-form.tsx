'use client'

import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'

const I18N = {
  pt: {
    labelText: 'Texto ou URL',
    placeholderText: 'Digite um texto, URL ou qualquer conteúdo...',
    errorEmpty: 'Digite um texto ou URL para gerar o QR Code.',
    errorFailed: 'Não foi possível gerar o QR Code. Tente novamente.',
    buttonGenerating: 'Gerando...',
    buttonGenerate: 'Gerar QR Code',
    resultTitle: 'QR Code gerado',
    buttonDownload: 'Baixar QR Code (PNG)',
    privacyNote: 'QR Code gerado no seu navegador. Nenhum dado é enviado para servidores externos.',
    altText: 'QR Code gerado',
  },
  es: {
    labelText: 'Texto o URL',
    placeholderText: 'Ingrese un texto, URL o cualquier contenido...',
    errorEmpty: 'Ingrese un texto o URL para generar el código QR.',
    errorFailed: 'No se pudo generar el código QR. Inténtelo de nuevo.',
    buttonGenerating: 'Generando...',
    buttonGenerate: 'Generar código QR',
    resultTitle: 'Código QR generado',
    buttonDownload: 'Descargar código QR (PNG)',
    privacyNote: 'Código QR generado en su navegador. No se envían datos a servidores externos.',
    altText: 'Código QR generado',
  }
}

export function GeradorQRCodeForm() {
  const pathname = usePathname()
  const locale = pathname?.startsWith('/es') ? 'es' : 'pt'
  const t = I18N[locale]

  const [texto, setTexto] = useState('')
  const [dataUrl, setDataUrl] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleGerar() {
    if (!texto.trim()) {
      setErro(t.errorEmpty)
      return
    }
    setErro('')
    setCarregando(true)
    try {
      const QRCode = (await import('qrcode')).default
      const url = await QRCode.toDataURL(texto, { width: 400, margin: 2, color: { dark: '#1e293b', light: '#ffffff' } })
      setDataUrl(url)
    } catch {
      setErro(t.errorFailed)
    } finally {
      setCarregando(false)
    }
  }

  function handleDownload() {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <>
      <FormCard>
        <div className="mb-4">
          <label htmlFor="texto" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {t.labelText}
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => { setTexto(e.target.value); setErro('') }}
            placeholder={t.placeholderText}
            rows={4}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
          {erro && <p className="mt-1 text-sm text-red-500" role="alert">{erro}</p>}
        </div>
        <Button onClick={handleGerar} fullWidth disabled={carregando}>
          {carregando ? t.buttonGenerating : t.buttonGenerate}
        </Button>
      </FormCard>

      <ResultCard
        visible={!!dataUrl}
        title={t.resultTitle}
        mainValue=""
        mainLabel=""
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-4 bg-white p-3 rounded-xl">
            <Image src={dataUrl} alt={t.altText} width={192} height={192} className="rounded-lg" unoptimized />
          </div>
          <button
            onClick={handleDownload}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            {t.buttonDownload}
          </button>
          <p className="mt-4 text-xs text-slate-400">{t.privacyNote}</p>
        </div>
      </ResultCard>
    </>
  )
  }

