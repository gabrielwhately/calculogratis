interface ContadorCaracteresInput {
  texto: string
}

interface ContadorCaracteresResult {
  caracteres: number
  caracteresSemEspacos: number
  palavras: number
  frases: number
  paragrafos: number
  linhas: number
}

export function contarCaracteres(input: ContadorCaracteresInput): ContadorCaracteresResult {
  const { texto } = input

  if (!texto || texto.trim().length === 0) {
    return { caracteres: 0, caracteresSemEspacos: 0, palavras: 0, frases: 0, paragrafos: 0, linhas: 0 }
  }

  const caracteres = texto.length
  const caracteresSemEspacos = texto.replace(/\s/g, '').length
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length
  const frases = texto.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
  const paragrafos = texto.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
  const linhas = texto.split('\n').length

  return {
    caracteres,
    caracteresSemEspacos,
    palavras,
    frases,
    paragrafos,
    linhas,
  }
}
