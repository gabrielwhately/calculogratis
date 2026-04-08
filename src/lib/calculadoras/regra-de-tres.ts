interface RegraDeTresResult {
  a: number
  b: number
  c: number
  x: number
  tipo: 'direta' | 'inversa'
}

export function calcularRegraDeTres(a: number, b: number, c: number, tipo: 'direta' | 'inversa'): RegraDeTresResult {
  let x: number
  if (tipo === 'direta') {
    x = (b * c) / a
  } else {
    x = (a * b) / c
  }
  return { a, b, c, x, tipo }
}
