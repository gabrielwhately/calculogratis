'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIMC } from '@/lib/calculadoras/imc'

const I18N = {
  pt: {
    labelPeso: 'Peso (kg)',
    labelAltura: 'Altura (cm)',
    placeholderPeso: 'Ex: 75',
    placeholderAltura: 'Ex: 175',
    buttonCalcular: 'Calcular IMC',
    resultTitle: 'Índice de Massa Corporal',
    resultMainLabel: 'Seu IMC',
    itemPeso: 'Peso',
    itemAltura: 'Altura',
    tabelaTitle: 'Tabela de classificação do IMC (OMS)',
    classificacoes: {
      'Abaixo do peso': 'Abaixo do peso',
      'Peso normal': 'Peso normal',
      'Sobrepeso': 'Sobrepeso',
      'Obesidade grau I': 'Obesidade grau I',
      'Obesidade grau II': 'Obesidade grau II',
      'Obesidade grau III': 'Obesidade grau III',
    }
  },
  es: {
    labelPeso: 'Peso (kg)',
    labelAltura: 'Altura (cm)',
    placeholderPeso: 'Ej: 75',
    placeholderAltura: 'Ej: 175',
    buttonCalcular: 'Calcular IMC',
    resultTitle: 'Índice de Masa Corporal',
    resultMainLabel: 'Su IMC',
    itemPeso: 'Peso',
    itemAltura: 'Altura',
    tabelaTitle: 'Tabla de clasificación del IMC (OMS)',
    classificacoes: {
      'Abaixo do peso': 'Bajo peso',
      'Peso normal': 'Peso normal',
      'Sobrepeso': 'Sobrepeso',
      'Obesidade grau I': 'Obesidad grado I',
      'Obesidade grau II': 'Obesidad grado II',
      'Obesidade grau III': 'Obesidad grado III',
    }
  }
}

function getClassificacaoCor(classificacao: string): string {
  switch (classificacao) {
    case 'Abaixo do peso': return 'bg-blue-500'
    case 'Peso normal': return 'bg-green-500'
    case 'Sobrepeso': return 'bg-yellow-500'
    case 'Obesidade grau I': return 'bg-orange-500'
    case 'Obesidade grau II': return 'bg-red-500'
    case 'Obesidade grau III': return 'bg-red-700'
    default: return 'bg-slate-500'
  }
}

export function IMCForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIMC> | null>(null)

  function handleCalcular() {
    const pesoNum = parseFloat(peso.replace(',', '.'))
    const alturaCm = parseFloat(altura.replace(',', '.'))
    if (!pesoNum || !alturaCm || pesoNum <= 0 || alturaCm <= 0) return
    setResult(calcularIMC({ peso: pesoNum, altura: alturaCm / 100 }))
  }

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelPeso} 
          id="peso" 
          value={peso} 
          onChange={setPeso} 
          inputMode="decimal" 
          placeholder={t.placeholderPeso} 
        />
        <Input 
          label={t.labelAltura} 
          id="altura" 
          value={altura} 
          onChange={setAltura} 
          inputMode="decimal" 
          placeholder={t.placeholderAltura} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!peso || !altura}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard
          visible={true}
          title={t.resultTitle}
          mainValue={result.imc.toFixed(2)}
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemPeso, value: `${result.peso} kg` },
            { label: t.itemAltura, value: `${(result.altura * 100).toFixed(0)} cm` }
          ]}
        >
          <div className="mt-2">
            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${getClassificacaoCor(result.classificacao)}`}>
              {t.classificacoes[result.classificacao as keyof typeof t.classificacoes] || result.classificacao}
            </span>
          </div>
          
          <div className="mt-4 border-t border-white/20 pt-4">
            <p className="text-xs text-slate-400">{t.tabelaTitle}</p>
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-300">{t.classificacoes['Abaixo do peso']}</span>
                <span className="text-slate-400">&lt; 18,5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">{t.classificacoes['Peso normal']}</span>
                <span className="text-slate-400">18,5 - 24,9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">{t.classificacoes['Sobrepeso']}</span>
                <span className="text-slate-400">25,0 - 29,9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">{t.classificacoes['Obesidade grau I']}</span>
                <span className="text-slate-400">30,0 - 34,9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">{t.classificacoes['Obesidade grau II']}</span>
                <span className="text-slate-400">35,0 - 39,9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">{t.classificacoes['Obesidade grau III']}</span>
                <span className="text-slate-400">&gt;= 40,0</span>
              </div>
            </div>
          </div>
        </ResultCard>
      )}
    </>
  )
}
