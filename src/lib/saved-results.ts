export interface SavedResult {
  id: string
  slug: string
  title: string
  mainValue: string
  mainLabel: string
  items: { label: string; value: string; highlight?: boolean }[]
  date: string
}

const KEY = 'calcgratis-saved-results'

export function getSavedResults(): SavedResult[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function saveResult(result: Omit<SavedResult, 'id' | 'date'>): SavedResult[] {
  const cur = getSavedResults()
  const newResult: SavedResult = {
    ...result,
    id: Math.random().toString(36).substring(2, 9),
    date: new Date().toISOString()
  }
  const updated = [newResult, ...cur].slice(0, 50) // Keep last 50
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function deleteSavedResult(id: string): SavedResult[] {
  const cur = getSavedResults()
  const updated = cur.filter(r => r.id !== id)
  localStorage.setItem(KEY, JSON.stringify(updated))
  return updated
}

export function clearSavedResults(): void {
  localStorage.removeItem(KEY)
}
