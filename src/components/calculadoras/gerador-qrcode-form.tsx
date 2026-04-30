'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'

const I18N = {
  pt: {
    labelTexto: 'Texto ou URL',
    placeholder: 'Digite um texto, URL ou qualquer conteúdo...',
    buttonCalcular: 'Gerar QR Code',
    buttonGerando: 'Gerando...',
    errorEmpty: 'Digite um texto ou URL para gerar o QR Code.',
    errorFail: 'Não foi possível gerar o QR Code. Tente novamente.',
    resultTitle: 'QR Code gerado',
    buttonBaixar: 'Baixar QR Code (PNG)',
    footer: 'QR Code gerado no seu navegador. Nenhum dado é enviado para servidores externos.',
  },
  es: {
    labelTexto: 'Texto o URL',
    placeholder: 'Escriba un texto, URL o cualquier contenido...',
    buttonCalcular: 'Generar QR Code',
    buttonGerando: 'Generando...',
    errorEmpty: 'Escriba un texto o URL para generar el QR Code.',
    errorFail: 'No fue posible generar el QR Code. Inténtelo de nuevo.',
    resultTitle: 'QR Code generado',
    buttonBaixar: 'Descargar QR Code (PNG)',
    footer: 'QR Code generado en su navegador. Ningún dato se envía a servidores externos.',
  }
}

export function GeradorQRCodeForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
      setErro(t.errorFail)
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
            {t.labelTexto}
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => { setTexto(e.target.value); setErro('') }}
            placeholder={t.placeholder}
            rows={4}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
          {erro && <p className="mt-1 text-sm text-red-500" role="alert">{erro}</p>}
        </div>
        <Button onClick={handleGerar} fullWidth disabled={carregando}>
          {carregando ? t.buttonGerando : t.buttonCalcular}
        </Button>
      </FormCard>

      {dataUrl && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white text-center" aria-live="polite">
          <p className="text-sm text-slate-300 mb-4">{t.resultTitle}</p>
          <div className="flex justify-center mb-4">
            <Image src={dataUrl} alt={t.resultTitle} width={192} height={192} className="rounded-xl" unoptimized />
          </div>
          <button
            onClick={handleDownload}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            {t.buttonBaixar}
          </button>
          <p className="mt-4 text-xs text-slate-400">{t.footer}</p>
        </div>
      )}
    </>
  )
}
