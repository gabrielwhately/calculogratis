const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function randomWord(): string { return WORDS[Math.floor(Math.random() * WORDS.length)] }

function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1) }

function gerarFrase(): string {
  const len = 8 + Math.floor(Math.random() * 12)
  const words = Array.from({ length: len }, randomWord)
  words[0] = capitalize(words[0])
  return words.join(' ') + '.'
}

function gerarParagrafo(): string {
  const frases = 3 + Math.floor(Math.random() * 4)
  return Array.from({ length: frases }, gerarFrase).join(' ')
}

export function gerarLorem(tipo: 'paragrafos' | 'palavras' | 'frases', quantidade: number): { texto: string; palavras: number; caracteres: number } {
  let texto: string
  if (tipo === 'paragrafos') {
    texto = Array.from({ length: quantidade }, gerarParagrafo).join('\n\n')
  } else if (tipo === 'frases') {
    texto = Array.from({ length: quantidade }, gerarFrase).join(' ')
  } else {
    texto = Array.from({ length: quantidade }, randomWord).join(' ')
    texto = capitalize(texto) + '.'
  }
  return { texto, palavras: texto.split(/\s+/).length, caracteres: texto.length }
}
