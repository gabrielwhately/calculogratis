'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularRescisao, TipoDemissao } from '@/lib/calculadoras/rescisao'
import { formatCurrency, parseBRNumber, maskCurrency, maskDate } from '@/lib/formatters'

const TIPO_DEMISSAO_OPTIONS = [
  { value: 'sem_justa_causa', label: 'Demissão sem justa causa' },
  { value: 'justa_causa', label: 'Demissão por justa causa' },
  { value: 'pedido_demissao', label: 'Pedido de demissão' },
  { value: 'acordo', label: 'Acordo mútuo' },
]

function parseDate(str: string): Date | null {
  const parts = str.split('/')
  if (parts.length !== 3) return null
  const [d, m, y] = parts.map(Number)
  if (!d || !m || d > 31 || m > 12 || y < 1900) return null
  const date = new Date(y, m - 1, d)
  if (date.getDate() !== d || date.getMonth() !== m - 1 || date.getFullYear() !== y) return null
  return date
}

export function RescisaoForm() {
  const [salario, setSalario] = useState('')
  const [dataAdm, setDataAdm] = useState('')
  const [dataDem, setDataDem] = useState('')
  const [tipo, setTipo] = useState('sem_justa_causa')
  const [fgts, setFgts] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [result, setResult] = useState<ReturnType<typeof calcularRescisao> | null>(null)

  const dateAdmObj = parseDate(dataAdm)
  const dateDemObj = parseDate(dataDem)
  const isDateAdmValid = dataAdm === '' || dateAdmObj !== null
  const isDateDemValid = dataDem === '' || dateDemObj !== null
  const isRangeValid = !dateAdmObj || !dateDemObj || dateDemObj > dateAdmObj

  function handleCalcular() {
    if (!dateAdmObj || !dateDemObj || !isRangeValid) return
    setResult(calcularRescisao({
      salario: parseBRNumber(salario),
      dataAdmissao: dateAdmObj,
      dataDemissao: dateDemObj,
      tipoDemissao: tipo as TipoDemissao,
      saldoFGTS: parseBRNumber(fgts),
      dependentes: Math.max(0, parseInt(dependentes) || 0)
    }))
  }

  const canCalculate = parseBRNumber(salario) > 0 && dateAdmObj && dateDemObj && isRangeValid

  return (
    <>
      <FormCard>
        <Input label="Salário bruto (R$)" id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Select label="Tipo de demissão" id="tipo" value={tipo} onChange={setTipo} options={TIPO_DEMISSAO_OPTIONS} />
        <Input
          label="Data de admissão (DD/MM/AAAA)"
          id="data-adm"
          value={dataAdm}
          onChange={(v) => setDataAdm(maskDate(v))}
          placeholder="Ex: 01/01/2020"
          error={!isDateAdmValid ? 'Data inválida' : ''}
        />
        <Input
          label="Data de demissão (DD/MM/AAAA)"
          id="data-dem"
          value={dataDem}
          onChange={(v) => setDataDem(maskDate(v))}
          placeholder="Ex: 24/03/2026"
          error={!isDateDemValid ? 'Data inválida' : !isRangeValid ? 'A demissão deve ser após a admissão' : ''}
        />
        <Input label="Saldo FGTS (R$)" id="fgts" value={fgts} onChange={(v) => setFgts(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 15.000,00" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" />
        <Button onClick={handleCalcular} fullWidth disabled={!canCalculate}>Calcular Rescisão</Button>
      </FormCard>
      <ResultCard visible={result !== null} title="Rescisão Trabalhista" mainValue={result ? formatCurrency(result.total) : ''} mainLabel="Valor total da rescisão"
        items={result ? [{ label: 'Saldo de salário', value: formatCurrency(result.saldoSalario) }, { label: 'Aviso prévio', value: formatCurrency(result.avisoPrevio) },
          { label: 'Férias vencidas', value: formatCurrency(result.feriasVencidas) }, { label: 'Férias proporcionais', value: formatCurrency(result.feriasProporcionais) },
          { label: '1/3 de férias', value: formatCurrency(result.tercoFerias) }, { label: '13º proporcional', value: formatCurrency(result.decimoTerceiro) },
          { label: 'Multa FGTS', value: formatCurrency(result.multaFGTS), highlight: true }, { label: 'INSS', value: `- ${formatCurrency(result.inss)}` }, { label: 'IRRF', value: `- ${formatCurrency(result.irrf)}` }] : []} />
    </>
  )
}
