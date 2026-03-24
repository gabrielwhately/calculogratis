const KEY = 'calcgratis-favoritos'

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function toggleFavorite(slug: string): string[] {
  const cur = getFavorites()
  const i = cur.indexOf(slug)
  if (i >= 0) cur.splice(i, 1); else cur.push(slug)
  localStorage.setItem(KEY, JSON.stringify(cur))
  return [...cur]
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug)
}
