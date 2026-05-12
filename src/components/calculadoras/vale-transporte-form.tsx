'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularValeTransporte, ResultadoValeTransporte } from '@/lib/calculadoras/vale-transporte'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelSalario: 'Salário bruto (R$)',
    labelCusto: 'Custo mensal do transporte (R$)',
    placeholderSalario: 'Ex: 2.000,00',
    placeholderCusto: 'Ex: 300,00',
    infoSalario: 'O seu salário base mensal para o cálculo do desconto.',
    infoCusto: 'O valor total que você gasta com transporte por mês para trabalhar.',
    buttonCalcular: 'Calcular',
    resultTitle: 'Vale-Transporte',
    resultMainLabel: 'Desconto no salário',
    itemCustoTotal: 'Custo total do transporte',
    itemDescontoEmpregado: 'Desconto do empregado (máx. 6%)',
    itemCustoEmpregador: 'Custo pago pela empresa',
    itemPercentualEfetivo: 'Percentual efetivo do salário',
    obs: 'Conforme a lei brasileira, a empresa pode descontar até 6% do salário base do funcionário para custear o vale-transporte.',
  },
  es: {
    labelSalario: 'Salario bruto',
    labelCusto: 'Costo mensual de transporte',
    placeholderSalario: 'Ej: 2.000,00',
    placeholderCusto: 'Ej: 300,00',
    infoSalario: 'Su salario base mensual para el cálculo del descuento.',
    infoCusto: 'El valor total que gasta en transporte por mes para trabajar.',
    buttonCalcular: 'Calcular',
    resultTitle: 'Vale-Transporte',
    resultMainLabel: 'Descuento en el salario',
    itemCustoTotal: 'Costo total del transporte',
    itemDescontoEmpregado: 'Descuento del empleado (máx. 6%)',
    itemCustoEmpregador: 'Costo pagado por la empresa',
    itemPercentualEfetivo: 'Porcentaje efectivo del salario',
    obs: 'Según la ley brasileña, la empresa puede descontar hasta el 6% del salario base del empleado para costear el vale-transporte.',
  },
}

export function ValeTransporteForm() {
  const pathname = usePathname()
  const isEs = pathname?.startsWith('/es')
  const t = isEs ? I18N.es : I18N.pt

  const [salario, setSalario] = useState('')
  const [custo, setCusto] = useState('')
  const [resultado, setResultado] = useState<ResultadoValeTransporte | null>(null)

  function handleCalcular() {
    const salarioBase = parseBRNumber(salario)
    const custoMensal = parseBRNumber(custo)

    if (salarioBase > 0 && custoMensal > 0) {
      const res = calcularValeTransporte(salarioBase, custoMensal)
      setResultado(res)
      // trackCalculadoraEvent will be called automatically by ResultCard's useEffect
    }
  }

  return (
    <>
      <FormCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <Input
            label={t.labelSalario}
            placeholder={t.placeholderSalario}
            value={salario}
            onChange={(v) => setSalario(maskCurrency(v))}
            info={t.infoSalario}
            inputMode="decimal"
          />
          <Input
            label={t.labelCusto}
            placeholder={t.placeholderCusto}
            value={custo}
            onChange={(v) => setCusto(maskCurrency(v))}
            info={t.infoCusto}
            inputMode="decimal"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0 || parseBRNumber(custo) <= 0}>
            {t.buttonCalcular}
          </Button>
        </div>
      </FormCard>

      <ResultCard
        visible={resultado !== null}
        title={t.resultTitle}
        mainValue={resultado ? formatCurrency(resultado.descontoEmpregado) : ''}
        mainLabel={t.resultMainLabel}
        items={resultado ? [
          { label: t.itemCustoTotal, value: formatCurrency(resultado.custoTotal) },
          { label: t.itemDescontoEmpregado, value: formatCurrency(resultado.descontoEmpregado), highlight: true },
          { label: t.itemCustoEmpregador, value: formatCurrency(resultado.custoEmpregador) },
          { label: t.itemPercentualEfetivo, value: `${resultado.percentualDesconto}%` },
        ] : []}
      >
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-slate-300 leading-relaxed italic">
            {t.obs}
          </p>
        </div>
      </ResultCard>
    </>
  )
}
