'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularIRRF } from '@/lib/calculadoras/irrf'
import { formatCurrency, formatPercent, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelDependentes: 'Dependentes',
    labelPensao: 'Pensão alimentícia (R$)',
    labelDeducoes: 'Outras deduções (R$)',
    placeholderSalario: 'Ex: 5.000,00',
    placeholderZero: '0',
    buttonCalcular: 'Calcular',
    resultTitle: 'Imposto de Renda',
    resultMainLabel: 'IRRF mensal',
    itemBruto: 'Salário bruto',
    itemINSS: 'INSS',
    itemBase: 'Base de cálculo',
    itemFaixa: 'Faixa',
    itemAliquota: 'Alíquota efetiva',
    itemIRRF: 'IRRF',
    chartTitle: 'Impacto dos Descontos no Salário',
    itemNet: 'Salário Líquido',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelDependentes: 'Dependientes',
    labelPensao: 'Pensión alimenticia',
    labelDeducoes: 'Otras deducciones',
    placeholderSalario: 'Ej: 5.000,00',
    placeholderZero: '0',
    buttonCalcular: 'Calcular',
    resultTitle: 'Impuesto de Renta',
    resultMainLabel: 'IRRF mensual',
    itemBruto: 'Salario bruto',
    itemINSS: 'INSS',
    itemBase: 'Base de cálculo',
    itemFaixa: 'Tramo',
    itemAliquota: 'Alíquota efectiva',
    itemIRRF: 'IRRF',
    chartTitle: 'Impacto de Descuentos en el Salario',
    itemNet: 'Salario Neto',
  }
}

export function IRRFForm() {
  const pathname = usePathname()
  const isSpanish = pathname?.startsWith('/es')
  const t = isSpanish ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [pensao, setPensao] = useState('')
  const [deducoes, setDeducoes] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularIRRF> | null>(null)

  function handleCalcular() {
    setResult(calcularIRRF({ 
      salarioBruto: parseBRNumber(salario), 
      dependentes: parseInt(dependentes) || 0, 
      pensaoAlimenticia: parseBRNumber(pensao), 
      outrasDeducoes: parseBRNumber(deducoes) 
    }))
  }

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
          placeholder={t.placeholderZero} 
        />
        <Input 
          label={t.labelPensao} 
          id="pensao" 
          value={pensao} 
          onChange={(v) => setPensao(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderZero} 
        />
        <Input 
          label={t.labelDeducoes} 
          id="deducoes" 
          value={deducoes} 
          onChange={(v) => setDeducoes(maskCurrency(v))} 
          inputMode="decimal" 
          placeholder={t.placeholderZero} 
        />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>
          {t.buttonCalcular}
        </Button>
      </FormCard>
      
      {result && (
        <ResultCard 
          visible={true} 
          title={t.resultTitle} 
          mainValue={formatCurrency(result.irrf)} 
          mainLabel={t.resultMainLabel}
          items={[
            { label: t.itemBruto, value: formatCurrency(result.salarioBruto) }, 
            { label: t.itemINSS, value: `- ${formatCurrency(result.inss)}` }, 
            { label: t.itemBase, value: formatCurrency(result.baseCalculo) }, 
            { label: t.itemFaixa, value: result.faixa }, 
            { label: t.itemAliquota, value: formatPercent(result.aliquotaEfetiva) }, 
            { label: t.itemIRRF, value: formatCurrency(result.irrf), highlight: true }
          ]} 
        >
          <div className="mt-6 border-t border-white/10 pt-6">
            <h4 className="mb-4 text-sm font-medium text-slate-300">{t.chartTitle}</h4>
            <div className="h-6 w-full flex rounded-full overflow-hidden bg-white/5 border border-white/10">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${((result.salarioBruto - result.inss - result.irrf) / result.salarioBruto) * 100}%` }}
                title={`${t.itemNet}: ${formatCurrency(result.salarioBruto - result.inss - result.irrf)}`}
              />
              <div 
                className="h-full bg-red-400 transition-all duration-1000 border-l border-white/10" 
                style={{ width: `${(result.inss / result.salarioBruto) * 100}%` }}
                title={`${t.itemINSS}: ${formatCurrency(result.inss)}`}
              />
              <div 
                className="h-full bg-red-500 transition-all duration-1000 border-l border-white/10" 
                style={{ width: `${(result.irrf / result.salarioBruto) * 100}%` }}
                title={`${t.itemIRRF}: ${formatCurrency(result.irrf)}`}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-slate-400">{t.itemNet}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span className="text-slate-400">{t.itemINSS}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-slate-400">{t.itemIRRF}</span>
              </div>
            </div>
          </div>
        </ResultCard>
      )}
    </>
  )
}
