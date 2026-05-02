'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularPjVsClt } from '@/lib/calculadoras/pj-vs-clt'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salario bruto / Faturamento PJ (R$)',
    labelDependentes: 'Dependentes (para IRRF CLT)',
    labelCustoContador: 'Custo contador PJ (R$/mês)',
    placeholderSalario: 'Ex: 10.000,00',
    placeholderDependentes: '0',
    placeholderCustoContador: 'Ex: 200,00',
    buttonCalcular: 'Comparar',
    titleClt: 'Regime CLT',
    mainLabelClt: 'Benefício efetivo mensal (com FGTS, 13º, férias)',
    itemSalarioBruto: 'Salário bruto',
    itemINSS: 'INSS',
    itemIRRF: 'IRRF',
    itemLiquidoMensal: 'Líquido mensal',
    itemFGTS: 'FGTS (8%)',
    item13: '13º salário bruto',
    itemFerias: 'Férias + 1/3 bruto',
    titlePj: 'Regime PJ (Simples Nacional)',
    mainLabelPj: 'Líquido mensal PJ',
    itemFaturamento: 'Faturamento',
    itemImposto: 'Imposto Simples (~6%)',
    itemContador: 'Contador',
    itemLiquidoPj: 'Líquido PJ',
    itemDiferenca: 'Diferença (PJ - CLT efetivo)',
  },
  es: {
    labelSalario: 'Salario bruto / Facturación PJ',
    labelDependentes: 'Dependientes (para IRRF CLT)',
    labelCustoContador: 'Costo contador PJ ($/mes)',
    placeholderSalario: 'Ej: 10.000,00',
    placeholderDependentes: '0',
    placeholderCustoContador: 'Ej: 200,00',
    buttonCalcular: 'Comparar',
    titleClt: 'Régimen CLT',
    mainLabelClt: 'Beneficio efectivo mensual (con FGTS, 13º, vacaciones)',
    itemSalarioBruto: 'Salario bruto',
    itemINSS: 'INSS',
    itemIRRF: 'Impuesto de Renta',
    itemLiquidoMensal: 'Neto mensual',
    itemFGTS: 'FGTS (8%)',
    item13: '13º salario bruto',
    itemFerias: 'Vacaciones + 1/3 bruto',
    titlePj: 'Régimen PJ (Simples Nacional)',
    mainLabelPj: 'Neto mensual PJ',
    itemFaturamento: 'Facturación',
    itemImposto: 'Impuesto Simples (~6%)',
    itemContador: 'Contador',
    itemLiquidoPj: 'Neto PJ',
    itemDiferenca: 'Diferencia (PJ - CLT efectivo)',
  }
}

export function PjVsCltForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [custoContador, setCustoContador] = useState('200,00')
  const [result, setResult] = useState<ReturnType<typeof calcularPjVsClt> | null>(null)

  function handleCalcular() {
    setResult(calcularPjVsClt({
      salarioBruto: parseBRNumber(salario),
      dependentes: parseInt(dependentes) || 0,
      custoContadorPJ: parseBRNumber(custoContador),
    }))
  }

  const isValid = parseBRNumber(salario) > 0

  return (
    <>
      <FormCard>
        <Input 
          label={t.labelSalario} 
          id="salario" 
          value={salario} 
          onChange={(v) => setSalario(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderSalario} 
        />
        <Input 
          label={t.labelDependentes} 
          id="dependentes" 
          value={dependentes} 
          onChange={(v) => setDependentes(v.replace(/\D/g, ''))} 
          inputMode="numeric" 
          placeholder={t.placeholderDependentes} 
        />
        <Input 
          label={t.labelCustoContador} 
          id="custoContador" 
          value={custoContador} 
          onChange={(v) => setCustoContador(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderCustoContador} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      <ResultCard 
        visible={result !== null} 
        title={t.titleClt} 
        mainValue={result ? formatCurrency(result.clt.beneficioEfetivoMensal) : ''} 
        mainLabel={t.mainLabelClt}
        items={result ? [
          { label: t.itemSalarioBruto, value: formatCurrency(result.clt.salarioBruto) },
          { label: t.itemINSS, value: `- ${formatCurrency(result.clt.inss)}` },
          { label: t.itemIRRF, value: `- ${formatCurrency(result.clt.irrf)}` },
          { label: t.itemLiquidoMensal, value: formatCurrency(result.clt.liquidoMensal) },
          { label: t.itemFGTS, value: `+ ${formatCurrency(result.clt.fgts)}` },
          { label: t.item13, value: formatCurrency(result.clt.decimoTerceiro) },
          { label: t.itemFerias, value: formatCurrency(result.clt.feriasMaisUmTerco) },
        ] : []} 
      />
      <ResultCard 
        visible={result !== null} 
        title={t.titlePj} 
        mainValue={result ? formatCurrency(result.pj.liquidoMensal) : ''} 
        mainLabel={t.mainLabelPj}
        items={result ? [
          { label: t.itemFaturamento, value: formatCurrency(result.pj.faturamento) },
          { label: t.itemImposto, value: `- ${formatCurrency(result.pj.impostoSimples)}` },
          { label: t.itemContador, value: `- ${formatCurrency(result.pj.custoContador)}` },
          { label: t.itemLiquidoPj, value: formatCurrency(result.pj.liquidoMensal), highlight: true },
          { label: t.itemDiferenca, value: `${result.diferencaMensal >= 0 ? '+' : '-'} ${formatCurrency(Math.abs(result.diferencaMensal))}`, highlight: true },
        ] : []} 
      />
    </>
  )
}
