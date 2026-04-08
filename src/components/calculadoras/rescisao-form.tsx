'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularRescisao, TipoDemissao } from '@/lib/calculadoras/rescisao'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

function parseDate(str: string): Date | null {
  const parts = str.split('/')
  if (parts.length !== 3) return null
  const [d, m, y] = parts.map(Number)
  if (!d || !m || !y) return null
  return new Date(y, m - 1, d)
}

export function RescisaoForm() {
  const [salario, setSalario] = useState('')
  const [dataAdm, setDataAdm] = useState('')
  const [dataDem, setDataDem] = useState('')
  const [tipo, setTipo] = useState('sem_justa_causa')
  const [fgts, setFgts] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [result, setResult] = useState<ReturnType<typeof calcularRescisao> | null>(null)

  function handleCalcular() {
    const adm = parseDate(dataAdm), dem = parseDate(dataDem)
    if (!adm || !dem || dem <= adm) return
    setResult(calcularRescisao({ salario: parseBRNumber(salario), dataAdmissao: adm, dataDemissao: dem, tipoDemissao: tipo as TipoDemissao, saldoFGTS: parseBRNumber(fgts), dependentes: Math.max(0, parseInt(dependentes) || 0) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Salario (R$)" id="salario" value={salario} onChange={setSalario} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Select label="Tipo de demissao" id="tipo" value={tipo} onChange={setTipo} options={[
          { value: 'sem_justa_causa', label: 'Demissao sem justa causa' }, { value: 'justa_causa', label: 'Demissao por justa causa' },
          { value: 'pedido_demissao', label: 'Pedido de demissao' }, { value: 'acordo', label: 'Acordo mutuo' }]} />
        <Input label="Data de admissao (DD/MM/AAAA)" id="data-adm" value={dataAdm} onChange={setDataAdm} placeholder="Ex: 01/01/2020" />
        <Input label="Data de demissao (DD/MM/AAAA)" id="data-dem" value={dataDem} onChange={setDataDem} placeholder="Ex: 24/03/2026" />
        <Input label="Saldo FGTS (R$)" id="fgts" value={fgts} onChange={setFgts} inputMode="decimal" placeholder="Ex: 15.000,00" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={setDependentes} inputMode="numeric" placeholder="0" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0 || !parseDate(dataAdm) || !parseDate(dataDem) || (parseDate(dataAdm) !== null && parseDate(dataDem) !== null && parseDate(dataDem)! <= parseDate(dataAdm)!)}>Calcular Rescisao</Button>
      </div>
      <ResultCard visible={result !== null} title="Rescisao Trabalhista" mainValue={result ? formatCurrency(result.total) : ''} mainLabel="Valor total da rescisao"
        items={result ? [{ label: 'Saldo de salario', value: formatCurrency(result.saldoSalario) }, { label: 'Aviso previo', value: formatCurrency(result.avisoPrevio) },
          { label: 'Ferias vencidas', value: formatCurrency(result.feriasVencidas) }, { label: 'Ferias proporcionais', value: formatCurrency(result.feriasProporcionais) },
          { label: '1/3 de ferias', value: formatCurrency(result.tercoFerias) }, { label: '13o proporcional', value: formatCurrency(result.decimoTerceiro) },
          { label: 'Multa FGTS', value: formatCurrency(result.multaFGTS), highlight: true }, { label: 'INSS', value: `- ${formatCurrency(result.inss)}` }, { label: 'IRRF', value: `- ${formatCurrency(result.irrf)}` }] : []} />
    </>
  )
}
