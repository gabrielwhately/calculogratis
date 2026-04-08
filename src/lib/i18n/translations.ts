import type { Locale } from './locales'

interface UITranslations {
  site: {
    name: string
    description: string
    tagline: string
    hero: string
    heroSub: string
  }
  nav: {
    home: string
    categories: string
    favorites: string
    search: string
    searchPlaceholder: string
    darkMode: string
    lightMode: string
  }
  calc: {
    calculate: string
    result: string
    clear: string
    copy: string
    copied: string
    related: string
    faq: string
    popularTitle: string
    categoriesTitle: string
    allTitle: string
  }
  categories: {
    trabalhista: string
    financeiro: string
    previdencia: string
    saude: string
    matematica: string
    juridica: string
    conversores: string
    utilidades: string
  }
  common: {
    free: string
    noSignup: string
    instant: string
    noFavorites: string
    noResults: string
  }
}

const pt: UITranslations = {
  site: {
    name: 'Cálculo Grátis',
    description: 'Calculadoras e simuladores online grátis: rescisão trabalhista, salário líquido, juros compostos, financiamento, IMC, aposentadoria e mais de 50 ferramentas.',
    tagline: '100% grátis · Sem cadastro · Resultados instantâneos',
    hero: 'Calculadoras e Simuladores Online',
    heroSub: 'Mais de 50 calculadoras: rescisão trabalhista, salário líquido, juros compostos, financiamento, IMC e muito mais — calcule em segundos.',
  },
  nav: {
    home: 'Início',
    categories: 'Categorias',
    favorites: 'Favoritos',
    search: 'Busca',
    searchPlaceholder: 'Digite para buscar...',
    darkMode: 'Modo escuro',
    lightMode: 'Modo claro',
  },
  calc: {
    calculate: 'Calcular',
    result: 'Resultado',
    clear: 'Limpar',
    copy: 'Copiar',
    copied: 'Copiado!',
    related: 'Calculadoras Relacionadas',
    faq: 'Perguntas frequentes',
    popularTitle: 'Mais Usadas',
    categoriesTitle: 'Categorias',
    allTitle: 'Todas as Calculadoras',
  },
  categories: {
    trabalhista: 'Trabalhista',
    financeiro: 'Financeiro',
    previdencia: 'Previdência',
    saude: 'Saúde',
    matematica: 'Matemática',
    juridica: 'Jurídica',
    conversores: 'Conversores',
    utilidades: 'Utilidades',
  },
  common: {
    free: 'Grátis',
    noSignup: 'Sem cadastro',
    instant: 'Resultados instantâneos',
    noFavorites: 'Nenhuma calculadora favoritada ainda. Use a estrela nas calculadoras para salvar aqui.',
    noResults: 'Nenhuma calculadora encontrada.',
  },
}

const es: UITranslations = {
  site: {
    name: 'Cálculo Gratis',
    description: 'Calculadoras y simuladores online gratis: liquidación laboral, salario neto, interés compuesto, financiamiento, IMC, jubilación y más de 50 herramientas.',
    tagline: '100% gratis · Sin registro · Resultados instantáneos',
    hero: 'Calculadoras y Simuladores Online',
    heroSub: 'Más de 50 calculadoras: liquidación laboral, salario neto, interés compuesto, financiamiento, IMC y mucho más — calcula en segundos.',
  },
  nav: {
    home: 'Inicio',
    categories: 'Categorías',
    favorites: 'Favoritos',
    search: 'Buscar',
    searchPlaceholder: 'Escribe para buscar...',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
  },
  calc: {
    calculate: 'Calcular',
    result: 'Resultado',
    clear: 'Limpiar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    related: 'Calculadoras Relacionadas',
    faq: 'Preguntas frecuentes',
    popularTitle: 'Más Usadas',
    categoriesTitle: 'Categorías',
    allTitle: 'Todas las Calculadoras',
  },
  categories: {
    trabalhista: 'Laboral',
    financeiro: 'Financiero',
    previdencia: 'Previsión',
    saude: 'Salud',
    matematica: 'Matemática',
    juridica: 'Jurídica',
    conversores: 'Conversores',
    utilidades: 'Utilidades',
  },
  common: {
    free: 'Gratis',
    noSignup: 'Sin registro',
    instant: 'Resultados instantáneos',
    noFavorites: 'Ninguna calculadora marcada como favorita. Usa la estrella en las calculadoras para guardarlas aquí.',
    noResults: 'Ninguna calculadora encontrada.',
  },
}

const translations: Record<Locale, UITranslations> = { pt, es }

export function getTranslations(locale: Locale): UITranslations {
  return translations[locale] ?? translations.pt
}

export type { UITranslations }
