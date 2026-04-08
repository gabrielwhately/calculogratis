interface JSONResult { formatado: string; valido: boolean; erro?: string; linhas: number; tamanho: number }

export function formatarJSON(input: string, espacos: number = 2): JSONResult {
  try {
    const parsed = JSON.parse(input)
    const formatado = JSON.stringify(parsed, null, espacos)
    return { formatado, valido: true, linhas: formatado.split('\n').length, tamanho: new Blob([formatado]).size }
  } catch (e) {
    return { formatado: input, valido: false, erro: (e as Error).message, linhas: 0, tamanho: 0 }
  }
}

export function minificarJSON(input: string): JSONResult {
  try {
    const parsed = JSON.parse(input)
    const formatado = JSON.stringify(parsed)
    return { formatado, valido: true, linhas: 1, tamanho: new Blob([formatado]).size }
  } catch (e) {
    return { formatado: input, valido: false, erro: (e as Error).message, linhas: 0, tamanho: 0 }
  }
}
