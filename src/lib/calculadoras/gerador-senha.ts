interface SenhaConfig { tamanho: number; maiusculas: boolean; minusculas: boolean; numeros: boolean; simbolos: boolean }

export function gerarSenha(config: SenhaConfig): string {
  let chars = ''
  if (config.maiusculas) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (config.minusculas) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (config.numeros) chars += '0123456789'
  if (config.simbolos) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz0123456789'

  const array = new Uint32Array(config.tamanho)
  crypto.getRandomValues(array)
  return Array.from(array, v => chars[v % chars.length]).join('')
}

export function avaliarForcaSenha(senha: string): { forca: number; label: string; cor: string } {
  let score = 0
  if (senha.length >= 8) score++
  if (senha.length >= 12) score++
  if (senha.length >= 16) score++
  if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) score++
  if (/\d/.test(senha)) score++
  if (/[^a-zA-Z0-9]/.test(senha)) score++

  if (score <= 2) return { forca: score, label: 'Fraca', cor: 'bg-red-500' }
  if (score <= 4) return { forca: score, label: 'Media', cor: 'bg-yellow-500' }
  return { forca: score, label: 'Forte', cor: 'bg-green-500' }
}
