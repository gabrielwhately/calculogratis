export const LOCALES = ['pt', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt'

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale)
}
