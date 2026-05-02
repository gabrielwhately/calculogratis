import { describe, it, expect } from 'vitest'
import { calcularDiasEntreDatas } from '@/lib/calculadoras/dias-entre-datas'

describe('Dias entre Datas', () => {
  it('deve calcular a diferença de dias entre duas datas', () => {
    const result = calcularDiasEntreDatas({
      dataInicio: '2026-05-01',
      dataFim: '2026-05-10'
    })
    expect(result?.diasCorridos).toBe(9)
    expect(result?.diasUteis).toBe(6) // 1 sex, 4 seg, 5 ter, 6 qua, 7 qui, 8 sex (sab/dom 2,3,9)
  })

  it('deve suportar formato brasileiro dd/mm/yyyy', () => {
    const result = calcularDiasEntreDatas({
      dataInicio: '01/05/2026',
      dataFim: '10/05/2026'
    })
    expect(result?.diasCorridos).toBe(9)
  })
})
