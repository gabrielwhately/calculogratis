const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const percentFormatter = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatCurrency(value: number): string {
  if (isNaN(value)) return 'R$ 0,00'
  return currencyFormatter.format(value).replace(/\u00a0/g, ' ')
}

export function formatPercent(value: number): string {
  if (isNaN(value)) return '0,00%'
  return percentFormatter.format(value)
}

export function parseBRNumber(input: string): number {
  if (!input || !input.trim()) return 0
  const cleaned = input.replace(/\s/g, '')
  let normalized: string
  if (cleaned.includes(',') && cleaned.includes('.')) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (cleaned.includes(',')) {
    normalized = cleaned.replace(',', '.')
  } else {
    normalized = cleaned
  }
  const result = parseFloat(normalized)
  return isNaN(result) ? 0 : result
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export function formatDate(date: Date): string {
  try {
    return dateFormatter.format(date)
  } catch {
    return ''
  }
}

export function maskCurrency(input: string): string {
  // Only digits, one comma, and optional leading minus
  // This is a simple filter to prevent invalid characters without forced formatting jitter
  return input.replace(/[^\d,-]/g, '').replace(/(,.*),/g, '$1')
}

export function maskPercent(input: string): string {
  return input.replace(/[^\d,-]/g, '').replace(/(,.*),/g, '$1')
}

export function maskNumber(input: string): string {
  return input.replace(/[^\d]/g, '')
}

export function maskDate(input: string): string {
  const v = input.replace(/\D/g, '').slice(0, 8)
  if (v.length <= 2) return v
  if (v.length <= 4) return `${v.slice(0, 2)}/${v.slice(2)}`
  return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`
}

export function maskPhone(input: string): string {
  const v = input.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 2) return v
  if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`
  if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
}

export function maskCEP(input: string): string {
  const v = input.replace(/\D/g, '').slice(0, 8)
  if (v.length <= 5) return v
  return `${v.slice(0, 5)}-${v.slice(5)}`
}
