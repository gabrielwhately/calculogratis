interface Base64Result { output: string; valido: boolean; erro?: string; tamanhoOriginal: number; tamanhoConvertido: number }

export function encodeBase64(input: string): Base64Result {
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)))
    return { output: encoded, valido: true, tamanhoOriginal: new Blob([input]).size, tamanhoConvertido: encoded.length }
  } catch (e) {
    return { output: '', valido: false, erro: (e as Error).message, tamanhoOriginal: 0, tamanhoConvertido: 0 }
  }
}

export function decodeBase64(input: string): Base64Result {
  try {
    const decoded = decodeURIComponent(escape(atob(input.trim())))
    return { output: decoded, valido: true, tamanhoOriginal: input.length, tamanhoConvertido: new Blob([decoded]).size }
  } catch (e) {
    return { output: '', valido: false, erro: (e as Error).message, tamanhoOriginal: 0, tamanhoConvertido: 0 }
  }
}
