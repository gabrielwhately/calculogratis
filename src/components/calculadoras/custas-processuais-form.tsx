'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormCard } from '@/components/ui/form-card'
import { ResultCard } from '@/components/ui/result-card'
import { calcularCustasProcessuais, ResultadoCustasProcessuais } from '@/lib/calculadoras/custas-processuais'
import { formatCurrency, parseBRNumber, maskCurrency } from '@/lib/formatters'

const I18N = {
  pt: {
    labelValorCausa: 'Valor da causa (R$)',
    placeholderValorCausa: 'Ex: 10.000,00',
    infoValorCausa: 'O valor econômico da ação judicial sobre o qual serão calculadas as custas.',
    buttonCalcular: 'Calcular',
    resultTitle: 'Custas Processuais Iniciais',
    resultMainLabel: 'Valor estimado das custas',
    itemValorCausa: 'Valor da causa',
    itemPercentual: 'Alíquota (referência)',
    itemCustas: 'Custas iniciais',
    obs: 'Este cálculo é uma estimativa baseada na alíquota padrão de 1%. Os valores reais variam conforme o Tribunal (TJSP, TJRJ, etc.), leis estaduais e possíveis isenções. Não inclui taxas de citação, oficial de justiça ou honorários.',
  },
  es: {
    labelValorCausa: 'Valor de la causa',
    placeholderValorCausa: 'Ej: 10.000,00',
    infoValorCausa: 'El valor económico de la acción judicial sobre el cual se calcularán las costas.',
    buttonCalcular: 'Calcular',
    resultTitle: 'Costas Procesales Iniciales',
    resultMainLabel: 'Valor estimado de las costas',
    itemValorCausa: 'Valor de la causa',
    itemPercentual: 'Alíquota (referencia)',
    itemCustas: 'Costas iniciales',
    obs: 'Este cálculo es una estimación basada en la alíquota estándar del 1%. Los valores reales varían según el Tribunal, leyes estatales y posibles exenciones. No incluye tasas de citación ni honorarios.',
  },
}

export function CustasProcessuaisForm() {
  const pathname = usePathname()
  const isEs = pathname?.startsWith('/es')
  const t = isEs ? I18N.es : I18N.pt

  const [valorCausa, setValorCausa] = useState('')
  const [resultado, setResultado] = useState<ResultadoCustasProcessuais | null>(null)

  function handleCalcular() {
    const valor = parseBRNumber(valorCausa)
    if (valor > 0) {
      setResultado(calcularCustasProcessuais(valor))
    }
  }

  return (
    <>
      <FormCard>
        <div className="max-w-md mx-auto">
          <Input
            label={t.labelValorCausa}
            placeholder={t.placeholderValorCausa}
            value={valorCausa}
            onChange={(v) => setValorCausa(maskCurrency(v))}
            info={t.infoValorCausa}
            inputMode="decimal"
          />
          <div className="flex justify-center pt-4">
            <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(valorCausa) <= 0}>
              {t.buttonCalcular}
            </Button>
          </div>
        </div>
      </FormCard>

      <ResultCard
        visible={resultado !== null}
        title={t.resultTitle}
        mainValue={resultado ? formatCurrency(resultado.custasIniciais) : ''}
        mainLabel={t.resultMainLabel}
        items={resultado ? [
          { label: t.itemValorCausa, value: formatCurrency(resultado.valorCausa) },
          { label: t.itemPercentual, value: `${resultado.percentual}%` },
          { label: t.itemCustas, value: formatCurrency(resultado.custasIniciais), highlight: true },
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
