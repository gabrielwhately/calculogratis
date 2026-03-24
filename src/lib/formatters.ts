const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value).replace(/\u00a0/g, ' ')
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
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

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}
