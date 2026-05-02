'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularCustoCLT } from '@/lib/calculadoras/custo-clt'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelVT: 'Vale-transporte mensal (R$)',
    labelVR: 'Vale-refeição mensal (R$)',
    labelPlano: 'Plano de saúde mensal (R$)',
    placeholderSalario: 'Ex: 5.000,00',
    placeholderVT: 'Ex: 220,00',
    placeholderVR: 'Ex: 600,00',
    placeholderPlano: 'Ex: 350,00',
    btnCalcular: 'Calcular Custo',
    resultTitle: 'Custo Total do Funcionário CLT',
    resultMainLabel: 'Custo mensal total para a empresa',
    itemSalario: 'Salário bruto',
    itemINSSPatronal: 'INSS patronal (20%)',
    itemFGTS: 'FGTS (8%)',
    itemProvisao13: 'Provisão 13º',
    itemProvisaoFerias: 'Provisão férias + 1/3',
    itemINSSProvisoes: 'INSS s/ provisões',
    itemFGTSProvisoes: 'FGTS s/ provisões',
    itemVT: 'Vale-transporte',
    itemVR: 'Vale-refeição',
    itemPlano: 'Plano de saúde',
    itemCustoSobre: 'Custo sobre salário',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelVT: 'Vale-transporte mensual',
    labelVR: 'Vale-comida mensual',
    labelPlano: 'Seguro médico mensual',
    placeholderSalario: 'Ej: 5.000,00',
    placeholderVT: 'Ej: 220,00',
    placeholderVR: 'Ej: 600,00',
    placeholderPlano: 'Ej: 350,00',
    btnCalcular: 'Calcular Costo',
    resultTitle: 'Costo Total del Empleado CLT',
    resultMainLabel: 'Costo mensual total para la empresa',
    itemSalario: 'Salario bruto',
    itemINSSPatronal: 'INSS patronal (20%)',
    itemFGTS: 'FGTS (8%)',
    itemProvisao13: 'Provisión Aguinaldo',
    itemProvisaoFerias: 'Provisión Vacaciones + 1/3',
    itemINSSProvisoes: 'INSS s/ provisiones',
    itemFGTSProvisoes: 'FGTS s/ provisiones',
    itemVT: 'Vale-transporte',
    itemVR: 'Vale-comida',
    itemPlano: 'Seguro médico',
    itemCustoSobre: 'Costo sobre salario',
  }
}

export function CustoCLTForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salarioBruto, setSalarioBruto] = useState('')
  const [valeTransporte, setValeTransporte] = useState('')
  const [valeRefeicao, setValeRefeicao] = useState('')
  const [planoSaude, setPlanoSaude] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularCustoCLT> | null>(null)

  function handleCalcular() {
    setResult(calcularCustoCLT({
      salarioBruto: parseBRNumber(salarioBruto),
      valeTransporte: parseBRNumber(valeTransporte),
      valeRefeicao: parseBRNumber(valeRefeicao),
      planoSaude: parseBRNumber(planoSaude),
    }))
  }

  const isValid = parseBRNumber(salarioBruto) > 0

  return (
    <>
      <FormCard>
        <Input
          label={t.labelSalario}
          id="salarioBruto"
          value={salarioBruto}
          onChange={(v) => setSalarioBruto(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderSalario}
        />
        <Input
          label={t.labelVT}
          id="valeTransporte"
          value={valeTransporte}
          onChange={(v) => setValeTransporte(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderVT}
        />
        <Input
          label={t.labelVR}
          id="valeRefeicao"
          value={valeRefeicao}
          onChange={(v) => setValeRefeicao(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderVR}
        />
        <Input
          label={t.labelPlano}
          id="planoSaude"
          value={planoSaude}
          onChange={(v) => setPlanoSaude(maskCurrency(v))}
          inputMode="decimal"
          placeholder={t.placeholderPlano}
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>{t.btnCalcular}</Button>
      </FormCard>
      <ResultCard
        visible={result !== null}
        title={t.resultTitle}
        mainValue={result ? formatCurrency(result.custoTotal) : ''}
        mainLabel={t.resultMainLabel}
        items={result ? [
          { label: t.itemSalario, value: formatCurrency(result.salarioBruto) },
          { label: t.itemINSSPatronal, value: formatCurrency(result.inssPatronal), highlight: true },
          { label: t.itemFGTS, value: formatCurrency(result.fgts) },
          { label: t.itemProvisao13, value: formatCurrency(result.provisao13) },
          { label: t.itemProvisaoFerias, value: formatCurrency(result.provisaoFerias) },
          { label: t.itemINSSProvisoes, value: formatCurrency(result.inssProvisoes) },
          { label: t.itemFGTSProvisoes, value: formatCurrency(result.fgtsProvisoes) },
          { label: t.itemVT, value: formatCurrency(result.valeTransporte) },
          { label: t.itemVR, value: formatCurrency(result.valeRefeicao) },
          { label: t.itemPlano, value: formatCurrency(result.planoSaude) },
          { label: t.itemCustoSobre, value: `+${result.custoPercentual.toFixed(1).replace('.', ',')}%`, highlight: true },
        ] : []}
      />
    </>
  )
}
