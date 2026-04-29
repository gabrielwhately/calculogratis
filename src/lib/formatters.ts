const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const percentFormatter = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value).replace(/\u00a0/g, ' ')
}

export function formatPercent(value: number): string {
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
  return dateFormatter.format(date)
}

export function maskCurrency(input: string): string {
  return input.replace(/[^\d.,]/g, '')
}

export function maskPercent(input: string): string {
  return input.replace(/[^\d.,]/g, '')
}

export function maskNumber(input: string): string {
  return input.replace(/[^\d.,]/g, '')
}

export function maskDate(input: string): string {
  const v = input.replace(/\D/g, '').slice(0, 8)
  if (v.length <= 2) return v
  if (v.length <= 4) return `${v.slice(0, 2)}/${v.slice(2)}`
  return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`
}
