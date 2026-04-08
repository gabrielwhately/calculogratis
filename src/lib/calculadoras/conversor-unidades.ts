type Categoria = 'comprimento' | 'peso' | 'temperatura' | 'volume'

const FATORES_COMPRIMENTO: Record<string, number> = { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 }
const FATORES_PESO: Record<string, number> = { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.453592, oz: 0.0283495 }
const FATORES_VOLUME: Record<string, number> = { l: 1, ml: 0.001, m3: 1000, gal: 3.78541, qt: 0.946353, cup: 0.236588 }

const NOMES: Record<string, string> = {
  m: 'Metros', km: 'Quilometros', cm: 'Centimetros', mm: 'Milimetros', mi: 'Milhas', yd: 'Jardas', ft: 'Pes', in: 'Polegadas',
  kg: 'Quilogramas', g: 'Gramas', mg: 'Miligramas', t: 'Toneladas', lb: 'Libras', oz: 'Oncas',
  l: 'Litros', ml: 'Mililitros', m3: 'Metros cubicos', gal: 'Galoes', qt: 'Quartos', cup: 'Xicaras',
  C: 'Celsius', F: 'Fahrenheit', K: 'Kelvin',
}

export function getUnidades(cat: Categoria): { value: string; label: string }[] {
  if (cat === 'comprimento') return Object.keys(FATORES_COMPRIMENTO).map(k => ({ value: k, label: NOMES[k] || k }))
  if (cat === 'peso') return Object.keys(FATORES_PESO).map(k => ({ value: k, label: NOMES[k] || k }))
  if (cat === 'volume') return Object.keys(FATORES_VOLUME).map(k => ({ value: k, label: NOMES[k] || k }))
  return [{ value: 'C', label: 'Celsius' }, { value: 'F', label: 'Fahrenheit' }, { value: 'K', label: 'Kelvin' }]
}

export function converterUnidade(valor: number, de: string, para: string, cat: Categoria): number {
  if (cat === 'temperatura') {
    if (de === para) return valor
    if (de === 'C' && para === 'F') return valor * 9 / 5 + 32
    if (de === 'C' && para === 'K') return valor + 273.15
    if (de === 'F' && para === 'C') return (valor - 32) * 5 / 9
    if (de === 'F' && para === 'K') return (valor - 32) * 5 / 9 + 273.15
    if (de === 'K' && para === 'C') return valor - 273.15
    if (de === 'K' && para === 'F') return (valor - 273.15) * 9 / 5 + 32
    return valor
  }
  const fatores = cat === 'comprimento' ? FATORES_COMPRIMENTO : cat === 'peso' ? FATORES_PESO : FATORES_VOLUME
  const base = valor * (fatores[de] || 1)
  return base / (fatores[para] || 1)
}

export function getNomeUnidade(key: string): string { return NOMES[key] || key }
