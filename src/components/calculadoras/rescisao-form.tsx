'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularRescisao, TipoDemissao } from '@/lib/calculadoras/rescisao'
import { formatCurrency, parseBRNumber, maskCurrency, maskDate } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelTipo: 'Tipo de demissão',
    labelDataAdm: 'Data de admissão (DD/MM/AAAA)',
    labelDataDem: 'Data de demissão (DD/MM/AAAA)',
    labelFGTS: 'Saldo FGTS (R$)',
    labelDependentes: 'Dependentes',
    placeholderData: 'Ex: 01/01/2020',
    errorDataInvalida: 'Data inválida',
    errorRangeInvalido: 'A demissão deve ser após a admissão',
    buttonCalcular: 'Calcular Rescisão',
    resultTitle: 'Rescisão Trabalhista',
    resultMainLabel: 'Valor total da rescisão',
    itemSaldo: 'Saldo de salário',
    itemAviso: 'Aviso prévio',
    itemFeriasVencidas: 'Férias vencidas',
    itemFeriasProp: 'Férias proporcionais',
    itemTerco: '1/3 de férias',
    itemDecimo: '13º proporcional',
    itemMulta: 'Multa FGTS',
    itemINSS: 'INSS',
    itemIRRF: 'IRRF',
    options: [
      { value: 'sem_justa_causa', label: 'Demissão sem justa causa' },
      { value: 'justa_causa', label: 'Demissão por justa causa' },
      { value: 'pedido_demissao', label: 'Pedido de demissão' },
      { value: 'acordo', label: 'Acordo mútuo' },
    ]
  },
  es: {
    labelSalario: 'Salario bruto',
    labelTipo: 'Tipo de despido',
    labelDataAdm: 'Fecha de ingreso (DD/MM/AAAA)',
    labelDataDem: 'Fecha de egreso (DD/MM/AAAA)',
    labelFGTS: 'Saldo FGTS',
    labelDependentes: 'Dependientes',
    placeholderData: 'Ej: 01/01/2020',
    errorDataInvalida: 'Fecha inválida',
    errorRangeInvalido: 'El egreso debe ser después del ingreso',
    buttonCalcular: 'Calcular Liquidación',
    resultTitle: 'Liquidación Laboral',
    resultMainLabel: 'Valor total de la liquidación',
    itemSaldo: 'Saldo de salario',
    itemAviso: 'Aviso previo',
    itemFeriasVencidas: 'Vacaciones vencidas',
    itemFeriasProp: 'Vacaciones proporcionales',
    itemTerco: '1/3 de vacaciones',
    itemDecimo: 'Aguinaldo proporcional',
    itemMulta: 'Multa FGTS',
    itemINSS: 'INSS',
    itemIRRF: 'Impuesto de Renta',
    options: [
      { value: 'sem_justa_causa', label: 'Despido sin justa causa' },
      { value: 'justa_causa', label: 'Despido por justa causa' },
      { value: 'pedido_demissao', label: 'Renuncia' },
      { value: 'acordo', label: 'Acuerdo mutuo' },
    ]
  }
}

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
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

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
        <Input label={t.labelSalario} id="salario" value={salario} onChange={(v) => setSalario(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Select label={t.labelTipo} id="tipo" value={tipo} onChange={setTipo} options={t.options} />
        <Input
          label={t.labelDataAdm}
          id="data-adm"
          value={dataAdm}
          onChange={(v) => setDataAdm(maskDate(v))}
          placeholder={t.placeholderData}
          error={!isDateAdmValid ? t.errorDataInvalida : ''}
        />
        <Input
          label={t.labelDataDem}
          id="data-dem"
          value={dataDem}
          onChange={(v) => setDataDem(maskDate(v))}
          placeholder={t.placeholderData}
          error={!isDateDemValid ? t.errorDataInvalida : !isRangeValid ? t.errorRangeInvalido : ''}
        />
        <Input label={t.labelFGTS} id="fgts" value={fgts} onChange={(v) => setFgts(maskCurrency(v))} inputMode="decimal" placeholder="Ex: 15.000,00" />
        <Input label={t.labelDependentes} id="dependentes" value={dependentes} onChange={(v) => setDependentes(v.replace(/\D/g, ''))} inputMode="numeric" placeholder="0" />
        <Button onClick={handleCalcular} fullWidth disabled={!canCalculate}>{t.buttonCalcular}</Button>
      </FormCard>
      <ResultCard visible={result !== null} title={t.resultTitle} mainValue={result ? formatCurrency(result.total) : ''} mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemSaldo, value: formatCurrency(result.saldoSalario) },
          { label: t.itemAviso, value: formatCurrency(result.avisoPrevio) },
          { label: t.itemFeriasVencidas, value: formatCurrency(result.feriasVencidas) },
          { label: t.itemFeriasProp, value: formatCurrency(result.feriasProporcionais) },
          { label: t.itemTerco, value: formatCurrency(result.tercoFerias) },
          { label: t.itemDecimo, value: formatCurrency(result.decimoTerceiro) },
          { label: t.itemMulta, value: formatCurrency(result.multaFGTS), highlight: true },
          { label: t.itemINSS, value: `- ${formatCurrency(result.inss)}` },
          { label: t.itemIRRF, value: `- ${formatCurrency(result.irrf)}` }
        ] : []} />
    </>
  )
}
