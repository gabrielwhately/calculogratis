'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function GeradorQRCodeForm() {
  const [texto, setTexto] = useState('')
  const [dataUrl, setDataUrl] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleGerar() {
    if (!texto.trim()) {
      setErro('Digite um texto ou URL para gerar o QR Code.')
      return
    }
    setErro('')
    setCarregando(true)
    try {
      const QRCode = (await import('qrcode')).default
      const url = await QRCode.toDataURL(texto, { width: 400, margin: 2, color: { dark: '#1e293b', light: '#ffffff' } })
      setDataUrl(url)
    } catch {
      setErro('Nao foi possivel gerar o QR Code. Tente novamente.')
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
      <div className="rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
        <div className="mb-4">
          <label htmlFor="texto" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Texto ou URL
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(e) => { setTexto(e.target.value); setErro('') }}
            placeholder="Digite um texto, URL ou qualquer conteudo..."
            rows={4}
            className="w-full rounded-lg border border-slate-300 dark:border-gray-600 px-3 py-2.5 text-slate-800 dark:text-slate-200 bg-white dark:bg-gray-800 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-y"
          />
          {erro && <p className="mt-1 text-sm text-red-500" role="alert">{erro}</p>}
        </div>
        <Button onClick={handleGerar} fullWidth disabled={carregando}>
          {carregando ? 'Gerando...' : 'Gerar QR Code'}
        </Button>
      </div>

      {dataUrl && (
        <div className="mt-6 rounded-xl bg-navy dark:bg-gray-800 dark:border dark:border-gray-700 p-6 text-white text-center" aria-live="polite">
          <p className="text-sm text-slate-300 mb-4">QR Code gerado</p>
          <div className="flex justify-center mb-4">
            <Image src={dataUrl} alt="QR Code gerado" width={192} height={192} className="rounded-xl" unoptimized />
          </div>
          <button
            onClick={handleDownload}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Baixar QR Code (PNG)
          </button>
          <p className="mt-4 text-xs text-slate-400">QR Code gerado no seu navegador. Nenhum dado e enviado para servidores externos.</p>
        </div>
      )}
    </>
  )
}
