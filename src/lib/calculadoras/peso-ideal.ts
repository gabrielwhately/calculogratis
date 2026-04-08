interface PesoIdealInput { altura: number; sexo: 'masculino' | 'feminino' }
interface PesoIdealResult { altura: number; imcMinimo: number; imcMaximo: number; pesoMinimo: number; pesoMaximo: number; pesoIdealDevine: number; pesoIdealRobinson: number; pesoIdealMiller: number }

export function calcularPesoIdeal(input: PesoIdealInput): PesoIdealResult {
  const alturaM = input.altura / 100
  const alturaInches = input.altura / 2.54
  const over60 = Math.max(0, alturaInches - 60)

  // IMC saudavel (18.5 - 24.9)
  const pesoMinimo = 18.5 * alturaM * alturaM
  const pesoMaximo = 24.9 * alturaM * alturaM

  // Formulas classicas
  let devine: number, robinson: number, miller: number
  if (input.sexo === 'masculino') {
    devine = 50 + 2.3 * over60
    robinson = 52 + 1.9 * over60
    miller = 56.2 + 1.41 * over60
  } else {
    devine = 45.5 + 2.3 * over60
    robinson = 49 + 1.7 * over60
    miller = 53.1 + 1.36 * over60
  }

  return { altura: input.altura, imcMinimo: 18.5, imcMaximo: 24.9, pesoMinimo, pesoMaximo, pesoIdealDevine: devine, pesoIdealRobinson: robinson, pesoIdealMiller: miller }
}
