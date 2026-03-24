import { SEGURO_DESEMPREGO_FAIXAS, SALARIO_MINIMO } from '@/lib/constants/tabelas-2026'

interface SeguroInput { salarios: [number, number, number]; solicitacoes: number }
interface SeguroResult { mediaSalarial: number; valorParcela: number; numeroParcelas: number; valorTotal: number }

export function calcularSeguroDesemprego(input: SeguroInput): SeguroResult {
  const media = input.salarios.reduce((a, b) => a + b, 0) / 3
  let valor: number
  if (media <= SEGURO_DESEMPREGO_FAIXAS[0].ate) {
    valor = media * SEGURO_DESEMPREGO_FAIXAS[0].multiplicador
  } else if (media <= SEGURO_DESEMPREGO_FAIXAS[1].ate) {
    valor = SEGURO_DESEMPREGO_FAIXAS[1].base! + (media - SEGURO_DESEMPREGO_FAIXAS[0].ate) * SEGURO_DESEMPREGO_FAIXAS[1].multiplicador
  } else {
    valor = SEGURO_DESEMPREGO_FAIXAS[2].valor_fixo!
  }
  valor = Math.max(valor, SALARIO_MINIMO)
  const parcelas = input.solicitacoes === 1 ? 4 : 5
  return { mediaSalarial: media, valorParcela: valor, numeroParcelas: parcelas, valorTotal: valor * parcelas }
}
