// Avaliador seguro de expressoes matematicas (sem eval)
const FUNCS: Record<string, (x: number) => number> = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs,
  log: Math.log10, ln: Math.log, exp: Math.exp,
  ceil: Math.ceil, floor: Math.floor, round: Math.round,
}

function tokenize(expr: string): string[] {
  const tokens: string[] = []
  let i = 0
  while (i < expr.length) {
    if (/\s/.test(expr[i])) { i++; continue }
    if (/\d/.test(expr[i]) || (expr[i] === '.' && i + 1 < expr.length && /\d/.test(expr[i + 1]))) {
      let num = ''
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) { num += expr[i]; i++ }
      tokens.push(num)
    } else if (/[a-z]/i.test(expr[i])) {
      let name = ''
      while (i < expr.length && /[a-z]/i.test(expr[i])) { name += expr[i]; i++ }
      if (name === 'pi') tokens.push(String(Math.PI))
      else if (name === 'e') tokens.push(String(Math.E))
      else tokens.push(name)
    } else {
      tokens.push(expr[i]); i++
    }
  }
  return tokens
}

function parse(tokens: string[], pos: { i: number }): number {
  let result = parseTerm(tokens, pos)
  while (pos.i < tokens.length && (tokens[pos.i] === '+' || tokens[pos.i] === '-')) {
    const op = tokens[pos.i++]
    const right = parseTerm(tokens, pos)
    result = op === '+' ? result + right : result - right
  }
  return result
}

function parseTerm(tokens: string[], pos: { i: number }): number {
  let result = parsePower(tokens, pos)
  while (pos.i < tokens.length && (tokens[pos.i] === '*' || tokens[pos.i] === '/' || tokens[pos.i] === '%')) {
    const op = tokens[pos.i++]
    const right = parsePower(tokens, pos)
    if (op === '*') result *= right
    else if (op === '/') result /= right
    else result %= right
  }
  return result
}

function parsePower(tokens: string[], pos: { i: number }): number {
  let result = parseUnary(tokens, pos)
  if (pos.i < tokens.length && tokens[pos.i] === '^') { pos.i++; result = Math.pow(result, parsePower(tokens, pos)) }
  return result
}

function parseUnary(tokens: string[], pos: { i: number }): number {
  if (tokens[pos.i] === '-') { pos.i++; return -parseAtom(tokens, pos) }
  if (tokens[pos.i] === '+') { pos.i++ }
  return parseAtom(tokens, pos)
}

function parseAtom(tokens: string[], pos: { i: number }): number {
  const token = tokens[pos.i]
  if (token === '(') { pos.i++; const r = parse(tokens, pos); pos.i++; return r }
  if (token in FUNCS) { pos.i++; pos.i++; const arg = parse(tokens, pos); pos.i++; return FUNCS[token](arg) }
  pos.i++
  return parseFloat(token)
}

export function avaliarExpressao(expr: string): { resultado: number; erro?: string } {
  try {
    const tokens = tokenize(expr.toLowerCase())
    if (tokens.length === 0) return { resultado: 0, erro: 'Expressao vazia' }
    const pos = { i: 0 }
    const resultado = parse(tokens, pos)
    if (isNaN(resultado) || !isFinite(resultado)) return { resultado: 0, erro: 'Resultado invalido' }
    return { resultado }
  } catch {
    return { resultado: 0, erro: 'Expressao invalida' }
  }
}
