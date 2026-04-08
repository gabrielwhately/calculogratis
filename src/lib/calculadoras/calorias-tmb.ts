interface TMBInput { peso: number; altura: number; idade: number; sexo: 'masculino' | 'feminino'; atividade: number }
interface TMBResult { tmb: number; necessidadeDiaria: number; sexo: string; atividade: string }

const ATIVIDADES: Record<string, string> = { '1.2': 'Sedentario', '1.375': 'Leve (1-3x/sem)', '1.55': 'Moderado (3-5x/sem)', '1.725': 'Intenso (6-7x/sem)', '1.9': 'Muito intenso (2x/dia)' }

// Harris-Benedict revisada
export function calcularTMB(input: TMBInput): TMBResult {
  let tmb: number
  if (input.sexo === 'masculino') {
    tmb = 88.362 + (13.397 * input.peso) + (4.799 * input.altura) - (5.677 * input.idade)
  } else {
    tmb = 447.593 + (9.247 * input.peso) + (3.098 * input.altura) - (4.330 * input.idade)
  }
  return { tmb, necessidadeDiaria: tmb * input.atividade, sexo: input.sexo === 'masculino' ? 'Masculino' : 'Feminino', atividade: ATIVIDADES[String(input.atividade)] || `Fator ${input.atividade}` }
}
