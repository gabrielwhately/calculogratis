import { CALCULADORAS, CalculadoraInfo } from './constants/calculadoras'

/**
 * Deterministically picks a "Calculator of the Day" based on the current date.
 * This ensures all users see the same featured tool on a given day.
 */
export function getCalculatorOfTheDay(): CalculadoraInfo {
  const today = new Date()
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  
  // Simple hash function to convert date string to a number
  let hash = 0
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  
  const index = Math.abs(hash) % CALCULADORAS.length
  return CALCULADORAS[index]
}
