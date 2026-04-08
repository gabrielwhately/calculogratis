export const ALIQUOTAS_IPVA: Record<string, number> = {
  AC: 2, AL: 3, AP: 3, AM: 3, BA: 2.5, CE: 3, DF: 3.5, ES: 2, GO: 3.75, MA: 2.5,
  MT: 3, MS: 3.5, MG: 4, PA: 2.5, PB: 2.5, PR: 3.5, PE: 3, PI: 2.5, RJ: 4, RN: 3,
  RS: 3, RO: 3, RR: 3, SC: 2, SP: 4, SE: 2.5, TO: 2,
}

interface IPVAInput { valorVenal: number; estado: string }
interface IPVAResult { valorVenal: number; estado: string; aliquota: number; valorIPVA: number; parcelaMensal: number }

export function calcularIPVA(input: IPVAInput): IPVAResult {
  const aliquota = ALIQUOTAS_IPVA[input.estado] || 3
  const valorIPVA = input.valorVenal * (aliquota / 100)
  return { valorVenal: input.valorVenal, estado: input.estado, aliquota, valorIPVA, parcelaMensal: valorIPVA / 3 }
}
