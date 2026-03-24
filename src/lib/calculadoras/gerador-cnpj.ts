function calcDigit(digits: number[], weights: number[]): number {
  const rest = digits.reduce((acc, d, i) => acc + d * weights[i], 0) % 11
  return rest < 2 ? 0 : 11 - rest
}

export function gerarCNPJ(): string {
  const d: number[] = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
  d.push(0, 0, 0, 1)
  d.push(calcDigit(d, [5,4,3,2,9,8,7,6,5,4,3,2]))
  d.push(calcDigit(d, [6,5,4,3,2,9,8,7,6,5,4,3,2]))
  const s = d.join('')
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12,14)}`
}

export function validarCNPJ(cnpj: string): boolean {
  const c = cnpj.replace(/\D/g, '')
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false
  const d = c.split('').map(Number)
  if (calcDigit(d.slice(0,12), [5,4,3,2,9,8,7,6,5,4,3,2]) !== d[12]) return false
  if (calcDigit(d.slice(0,13), [6,5,4,3,2,9,8,7,6,5,4,3,2]) !== d[13]) return false
  return true
}
