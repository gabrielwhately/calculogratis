function calcDigit(digits: number[], weights: number[]): number {
  const rest = digits.reduce((acc, d, i) => acc + d * weights[i], 0) % 11
  return rest < 2 ? 0 : 11 - rest
}

export function gerarCPF(): string {
  const d: number[] = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  d.push(calcDigit(d, [10, 9, 8, 7, 6, 5, 4, 3, 2]))
  d.push(calcDigit(d, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]))
  const s = d.join('')
  return `${s.slice(0,3)}.${s.slice(3,6)}.${s.slice(6,9)}-${s.slice(9,11)}`
}

export function validarCPF(cpf: string): boolean {
  const c = cpf.replace(/\D/g, '')
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false
  const d = c.split('').map(Number)
  if (calcDigit(d.slice(0, 9), [10,9,8,7,6,5,4,3,2]) !== d[9]) return false
  if (calcDigit(d.slice(0, 10), [11,10,9,8,7,6,5,4,3,2]) !== d[10]) return false
  return true
}
