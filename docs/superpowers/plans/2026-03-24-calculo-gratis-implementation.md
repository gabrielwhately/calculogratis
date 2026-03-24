# Calculo Gratis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build calculogratis.com — a high-performance SSG site with 10 Brazilian calculators, app-like UX, and SEO-optimized pages for ad monetization.

**Architecture:** Next.js 14 App Router with full SSG. All calculator logic runs client-side as pure TypeScript functions. Tailwind CSS for styling with navy/white design system. Pages organized by category URLs (`/trabalhista/rescisao`, `/financeiro/juros-simples`, etc.).

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Vitest, Vercel deployment

**Spec:** `docs/superpowers/specs/2026-03-24-calculo-gratis-design.md`

---

## File Structure

```
src/
  app/
    layout.tsx                          -> Root layout (fonts, navbar, bottom nav, footer)
    page.tsx                            -> Home page (category grid)
    globals.css                         -> Tailwind imports + custom styles
    sitemap.ts                          -> Build-time sitemap
    robots.ts                           -> robots.txt
    manifest.ts                         -> PWA manifest
    trabalhista/
      page.tsx                          -> Category landing
      rescisao/page.tsx                 -> Rescisao calculator page
      salario-liquido/page.tsx          -> Salario liquido page
      seguro-desemprego/page.tsx        -> Seguro desemprego page
    financeiro/
      page.tsx                          -> Category landing
      juros-simples/page.tsx            -> Juros simples page
      juros-compostos/page.tsx          -> Juros compostos page
      financiamento/page.tsx            -> Financiamento Price/SAC page
    previdencia/
      page.tsx                          -> Category landing
      aposentadoria/page.tsx            -> Aposentadoria page
    utilidades/
      page.tsx                          -> Category landing
      gerador-cpf/page.tsx              -> CPF generator page
      gerador-cnpj/page.tsx             -> CNPJ generator page
  components/
    layout/
      navbar.tsx                        -> Desktop top navbar
      bottom-nav.tsx                    -> Mobile bottom navigation
      footer.tsx                        -> Site footer
      breadcrumb.tsx                    -> Breadcrumb with schema
      ad-slot.tsx                       -> Ad placeholder component
      category-landing.tsx              -> Reusable category page
      search.tsx                        -> Search component
    ui/
      input.tsx                         -> Styled input with label, error, mask
      button.tsx                        -> Primary/secondary button
      card.tsx                          -> Calculator card (for listings)
      result-card.tsx                   -> Navy result display card
      select.tsx                        -> Styled select dropdown
    calculadoras/
      calculator-page.tsx               -> Reusable calculator page wrapper
      juros-simples-form.tsx            -> Juros simples form + result
      juros-compostos-form.tsx          -> Juros compostos form + result
      financiamento-form.tsx            -> Financiamento form (Price/SAC toggle)
      salario-liquido-form.tsx          -> Salario liquido form + result
      rescisao-form.tsx                 -> Rescisao form + result
      seguro-desemprego-form.tsx        -> Seguro desemprego form + result
      aposentadoria-form.tsx            -> Aposentadoria form + result
      gerador-cpf-form.tsx              -> CPF generator form + result
      gerador-cnpj-form.tsx             -> CNPJ generator form + result
  lib/
    calculadoras/
      juros-simples.ts                  -> Pure calc: J = C * i * t
      juros-compostos.ts                -> Pure calc: M = C(1+i)^t + aportes
      financiamento.ts                  -> Pure calc: Price and SAC tables
      salario-liquido.ts                -> Pure calc: bruto -> liquido
      rescisao.ts                       -> Pure calc: all rescisao values
      seguro-desemprego.ts              -> Pure calc: parcelas seguro
      aposentadoria.ts                  -> Pure calc: estimativa aposentadoria
      gerador-cpf.ts                    -> Generate valid CPF
      gerador-cnpj.ts                   -> Generate valid CNPJ
    seo/
      metadata.ts                       -> generateMetadata helper factory
      jsonld.ts                         -> JSON-LD schema generators
    constants/
      tabelas-2026.ts                   -> INSS, IRRF, FGTS, seguro desemp.
      calculadoras.ts                   -> Calculator registry (name, slug, category, description)
    formatters.ts                       -> Currency, date, number formatting + parsing
    favorites.ts                        -> localStorage favorites helpers
  tests/
    lib/
      calculadoras/
        juros-simples.test.ts
        juros-compostos.test.ts
        financiamento.test.ts
        salario-liquido.test.ts
        rescisao.test.ts
        seguro-desemprego.test.ts
        aposentadoria.test.ts
        gerador-cpf.test.ts
        gerador-cnpj.test.ts
      formatters.test.ts
tailwind.config.ts                      -> Custom navy theme
vitest.config.ts                        -> Test config
next.config.ts                          -> Next.js config (output: export)
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `vitest.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /home/claude/projects/calculogratis
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Accept defaults. This creates the base Next.js 14 project with App Router, TypeScript, Tailwind CSS, and ESLint.

- [ ] **Step 2: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Create vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Configure Next.js for static export**

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 6: Configure Tailwind with navy theme**

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2332',
          light: '#2a3a4f',
          dark: '#111827',
        },
        accent: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 7: Set up global styles**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    @apply bg-white text-slate-800 antialiased;
    overscroll-behavior: none;
  }
}

@layer components {
  .container-app {
    @apply mx-auto max-w-3xl px-4;
  }
}
```

- [ ] **Step 8: Create minimal root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Calculo Gratis - Calculadoras Online Gratis',
    template: '%s | Calculo Gratis',
  },
  description: 'Calculadoras e simuladores online gratis. Rescisao, salario liquido, financiamento, juros, aposentadoria e mais.',
  metadataBase: new URL('https://calculogratis.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Create placeholder home page**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <div className="container-app py-8">
      <h1 className="text-3xl font-bold text-navy">Calculo Gratis</h1>
      <p className="mt-2 text-slate-600">Calculadoras e simuladores online gratis</p>
    </div>
  )
}
```

- [ ] **Step 10: Verify build and dev server**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 11: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 14 project with Tailwind, Vitest, navy theme"
```

---

### Task 2: Formatting Utilities & Constants

**Files:**
- Create: `src/lib/formatters.ts`, `src/tests/lib/formatters.test.ts`, `src/lib/constants/tabelas-2026.ts`, `src/lib/constants/calculadoras.ts`

- [ ] **Step 1: Write formatting tests**

Create `src/tests/lib/formatters.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, parseBRNumber, formatDate } from '@/lib/formatters'

describe('formatCurrency', () => {
  it('formats positive values as BRL', () => {
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00')
  })

  it('formats negative values', () => {
    expect(formatCurrency(-500)).toBe('-R$ 500,00')
  })
})

describe('formatPercent', () => {
  it('formats decimal as percent', () => {
    expect(formatPercent(0.125)).toBe('12,50%')
  })
})

describe('parseBRNumber', () => {
  it('parses BR format: 1.234,56', () => {
    expect(parseBRNumber('1.234,56')).toBe(1234.56)
  })

  it('parses plain number: 1234.56', () => {
    expect(parseBRNumber('1234.56')).toBe(1234.56)
  })

  it('parses comma decimal: 1234,56', () => {
    expect(parseBRNumber('1234,56')).toBe(1234.56)
  })

  it('returns 0 for empty string', () => {
    expect(parseBRNumber('')).toBe(0)
  })

  it('returns 0 for invalid input', () => {
    expect(parseBRNumber('abc')).toBe(0)
  })
})

describe('formatDate', () => {
  it('formats Date to DD/MM/AAAA', () => {
    expect(formatDate(new Date(2026, 2, 24))).toBe('24/03/2026')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- src/tests/lib/formatters.test.ts
```

Expected: FAIL (module not found)

- [ ] **Step 3: Implement formatters**

Create `src/lib/formatters.ts`:

```typescript
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function parseBRNumber(input: string): number {
  if (!input || !input.trim()) return 0
  const cleaned = input.replace(/\s/g, '')
  let normalized: string
  if (cleaned.includes(',') && cleaned.includes('.')) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.')
  } else if (cleaned.includes(',')) {
    normalized = cleaned.replace(',', '.')
  } else {
    normalized = cleaned
  }
  const result = parseFloat(normalized)
  return isNaN(result) ? 0 : result
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- src/tests/lib/formatters.test.ts
```

Expected: all PASS

- [ ] **Step 5: Create tax tables**

Create `src/lib/constants/tabelas-2026.ts`:

```typescript
export const INSS_FAIXAS = [
  { ate: 1412.00, aliquota: 0.075 },
  { ate: 2666.68, aliquota: 0.09 },
  { ate: 4000.03, aliquota: 0.12 },
  { ate: 7786.02, aliquota: 0.14 },
] as const

export const IRRF_FAIXAS = [
  { ate: 2259.20, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.00 },
] as const

export const IRRF_DEDUCAO_DEPENDENTE = 189.59
export const FGTS_ALIQUOTA = 0.08
export const FGTS_MULTA_SEM_JUSTA_CAUSA = 0.40

export const SEGURO_DESEMPREGO_FAIXAS = [
  { ate: 2041.39, multiplicador: 0.8 },
  { ate: 3402.65, multiplicador: 0.5, base: 1633.11 },
  { ate: Infinity, valor_fixo: 2313.74 },
] as const

export const SALARIO_MINIMO = 1412.00

export const PREVIDENCIA = {
  idade_minima_homem: 65,
  idade_minima_mulher: 62,
  tempo_contribuicao_minimo_homem: 20,
  tempo_contribuicao_minimo_mulher: 15,
  aliquota_base: 0.6,
  acrescimo_por_ano_extra: 0.02,
} as const
```

- [ ] **Step 6: Create calculator registry**

Create `src/lib/constants/calculadoras.ts`:

```typescript
export interface CalculadoraInfo {
  nome: string
  slug: string
  categoria: string
  categoriaSlug: string
  descricao: string
  keywords: string
}

export const CATEGORIAS = [
  {
    nome: 'Trabalhista',
    slug: 'trabalhista',
    descricao: 'Calculadoras para direitos trabalhistas: rescisao, salario liquido, seguro desemprego e mais.',
    icone: 'briefcase',
  },
  {
    nome: 'Financeiro',
    slug: 'financeiro',
    descricao: 'Calculadoras financeiras: juros simples, juros compostos, financiamento imobiliario e mais.',
    icone: 'banknotes',
  },
  {
    nome: 'Previdencia',
    slug: 'previdencia',
    descricao: 'Simuladores de aposentadoria e previdencia social.',
    icone: 'shield-check',
  },
  {
    nome: 'Utilidades',
    slug: 'utilidades',
    descricao: 'Geradores e ferramentas uteis: CPF, CNPJ e mais.',
    icone: 'wrench',
  },
] as const

export const CALCULADORAS: CalculadoraInfo[] = [
  { nome: 'Rescisao Trabalhista', slug: 'rescisao', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor da sua rescisao trabalhista. Simule demissao sem justa causa, pedido de demissao e acordo.', keywords: 'rescisao trabalhista, calculo rescisao, demissao, verbas rescisorias' },
  { nome: 'Salario Liquido', slug: 'salario-liquido', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Descubra seu salario liquido. Calculo automatico de INSS, IRRF e outros descontos.', keywords: 'salario liquido, calculo salario, desconto inss, desconto irrf' },
  { nome: 'Seguro Desemprego', slug: 'seguro-desemprego', categoria: 'Trabalhista', categoriaSlug: 'trabalhista', descricao: 'Calcule o valor e numero de parcelas do seguro desemprego.', keywords: 'seguro desemprego, parcelas seguro desemprego, valor seguro desemprego' },
  { nome: 'Juros Simples', slug: 'juros-simples', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule juros simples sobre qualquer valor. Informe capital, taxa e periodo.', keywords: 'juros simples, calculo juros simples, matematica financeira' },
  { nome: 'Juros Compostos', slug: 'juros-compostos', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Calcule juros compostos com aportes mensais. Simule investimentos e emprestimos.', keywords: 'juros compostos, calculo juros compostos, investimento, rendimento' },
  { nome: 'Financiamento Imobiliario', slug: 'financiamento', categoria: 'Financeiro', categoriaSlug: 'financeiro', descricao: 'Simule financiamento imobiliario nas tabelas Price e SAC. Compare parcelas e juros totais.', keywords: 'financiamento imobiliario, tabela price, tabela sac, simulador financiamento' },
  { nome: 'Aposentadoria', slug: 'aposentadoria', categoria: 'Previdencia', categoriaSlug: 'previdencia', descricao: 'Simule sua aposentadoria pelo INSS. Calcule tempo restante e valor estimado do beneficio.', keywords: 'aposentadoria, calculo aposentadoria, inss, previdencia social' },
  { nome: 'Gerador de CPF', slug: 'gerador-cpf', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere numeros de CPF validos para testes e desenvolvimento de software.', keywords: 'gerador cpf, cpf valido, gerar cpf, cpf teste' },
  { nome: 'Gerador de CNPJ', slug: 'gerador-cnpj', categoria: 'Utilidades', categoriaSlug: 'utilidades', descricao: 'Gere numeros de CNPJ validos para testes e desenvolvimento de software.', keywords: 'gerador cnpj, cnpj valido, gerar cnpj, cnpj teste' },
]

export function getCalculadorasByCategoria(categoriaSlug: string): CalculadoraInfo[] {
  return CALCULADORAS.filter(c => c.categoriaSlug === categoriaSlug)
}

export function getCalculadora(slug: string): CalculadoraInfo | undefined {
  return CALCULADORAS.find(c => c.slug === slug)
}
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add formatting utilities, tax tables, and calculator registry"
```

---

### Task 3: UI Components

**Files:**
- Create: `src/components/ui/input.tsx`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/ui/result-card.tsx`, `src/components/ui/select.tsx`

- [ ] **Step 1: Create Input component**

Create `src/components/ui/input.tsx`:

```tsx
'use client'

interface InputProps {
  label: string
  id: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  inputMode?: 'text' | 'decimal' | 'numeric'
  suffix?: string
  disabled?: boolean
}

export function Input({ label, id, type = 'text', value, onChange, error, placeholder, inputMode, suffix, disabled }: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          disabled={disabled}
          className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors
            ${error ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-300 focus:border-accent focus:ring-2 focus:ring-blue-100'}
            ${disabled ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}
            ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">{suffix}</span>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Create Button component**

Create `src/components/ui/button.tsx`:

```tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  fullWidth?: boolean
}

export function Button({ children, onClick, type = 'button', variant = 'primary', disabled, fullWidth }: ButtonProps) {
  const base = 'rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-accent text-white hover:bg-blue-600 focus:ring-blue-300 active:scale-[0.98]',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300',
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Create Card component**

Create `src/components/ui/card.tsx`:

```tsx
import Link from 'next/link'

interface CardProps { title: string; description: string; href: string; icon?: React.ReactNode }

export function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link href={href} className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-accent hover:shadow-md">
      {icon && <div className="mb-3 text-accent">{icon}</div>}
      <h3 className="font-semibold text-navy group-hover:text-accent transition-colors">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 line-clamp-2">{description}</p>
    </Link>
  )
}
```

- [ ] **Step 4: Create ResultCard component**

Create `src/components/ui/result-card.tsx`:

```tsx
interface ResultItem { label: string; value: string; highlight?: boolean }

interface ResultCardProps { title: string; mainValue: string; mainLabel: string; items?: ResultItem[]; visible: boolean }

export function ResultCard({ title, mainValue, mainLabel, items, visible }: ResultCardProps) {
  if (!visible) return null
  return (
    <div className="mt-6 rounded-xl bg-navy p-6 text-white" aria-live="polite">
      <p className="text-sm text-slate-300">{title}</p>
      <p className="mt-1 text-4xl font-bold">{mainValue}</p>
      <p className="text-sm text-slate-300">{mainLabel}</p>
      {items && items.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-white/20 pt-4">
          {items.map((item) => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-slate-300">{item.label}</span>
              <span className={item.highlight ? 'font-semibold text-white' : 'text-slate-200'}>{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Create Select component**

Create `src/components/ui/select.tsx`:

```tsx
interface SelectOption { value: string; label: string }
interface SelectProps { label: string; id: string; value: string; onChange: (value: string) => void; options: SelectOption[]; error?: string }

export function Select({ label, id, value, onChange, options, error }: SelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2.5 text-slate-800 outline-none transition-colors bg-white ${error ? 'border-red-500' : 'border-slate-300 focus:border-accent focus:ring-2 focus:ring-blue-100'}`}>
        {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500" role="alert">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 6: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add UI components (Input, Button, Card, ResultCard, Select)"
```

---

### Task 4: Layout Components

**Files:**
- Create: `src/components/layout/navbar.tsx`, `src/components/layout/bottom-nav.tsx`, `src/components/layout/footer.tsx`, `src/components/layout/breadcrumb.tsx`, `src/components/layout/ad-slot.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create Navbar**

Create `src/components/layout/navbar.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIAS } from '@/lib/constants/calculadoras'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-navy-light bg-navy text-white">
      <div className="container-app flex h-14 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Calculo<span className="text-accent">Gratis</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="text-sm text-slate-300 hover:text-white transition-colors">{cat.nome}</Link>
          ))}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-300 hover:text-white" aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-navy-light bg-navy px-4 pb-4">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-slate-300 hover:text-white">{cat.nome}</Link>
          ))}
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Create BottomNav**

Create `src/components/layout/bottom-nav.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/', label: 'Inicio', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4' },
  { href: '/', label: 'Categorias', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { href: '/favoritos', label: 'Favoritos', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  { href: '/busca', label: 'Busca', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <div className="flex justify-around">
        {items.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link key={item.label} href={item.href}
              className={`flex flex-col items-center py-2 px-3 text-xs transition-colors ${isActive ? 'text-accent' : 'text-slate-500 hover:text-slate-700'}`}>
              <svg className="h-5 w-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isActive ? 2.5 : 2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Create Footer**

Create `src/components/layout/footer.tsx`:

```tsx
import Link from 'next/link'
import { CATEGORIAS } from '@/lib/constants/calculadoras'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-8 hidden md:block">
      <div className="container-app">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="font-semibold text-navy">Calculo Gratis</h4>
            <p className="mt-2 text-sm text-slate-600">Calculadoras e simuladores online gratis para o dia a dia.</p>
          </div>
          {CATEGORIAS.map((cat) => (
            <div key={cat.slug}>
              <h4 className="font-semibold text-navy">{cat.nome}</h4>
              <ul className="mt-2 space-y-1">
                <li><Link href={`/${cat.slug}`} className="text-sm text-slate-600 hover:text-accent">Ver todas</Link></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-slate-200 pt-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} calculogratis.com
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Create Breadcrumb with JSON-LD**

Create `src/components/layout/breadcrumb.tsx`:

```tsx
import Link from 'next/link'

interface BreadcrumbItem { label: string; href?: string }

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://calculogratis.com${item.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? <Link href={item.href} className="hover:text-accent transition-colors">{item.label}</Link> : <span className="text-slate-700">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
```

Note: Using `<script>` with `{JSON.stringify(jsonLd)}` as children (React's safe serialization) instead of `dangerouslySetInnerHTML`. The JSON-LD content is static and trusted (generated from our own constants), so this is safe. Next.js handles the server rendering correctly.

- [ ] **Step 5: Create AdSlot**

Create `src/components/layout/ad-slot.tsx`:

```tsx
interface AdSlotProps { position: 'after-result' | 'mid-content' | 'footer' | 'sidebar'; className?: string }

export function AdSlot({ position, className = '' }: AdSlotProps) {
  return (
    <div className={`my-6 flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-400 ${className}`}
      data-ad-position={position} aria-hidden="true">
      Espaco publicitario
    </div>
  )
}
```

- [ ] **Step 6: Update root layout with Navbar, BottomNav, Footer**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Calculo Gratis - Calculadoras Online Gratis',
    template: '%s | Calculo Gratis',
  },
  description: 'Calculadoras e simuladores online gratis. Rescisao, salario liquido, financiamento, juros, aposentadoria e mais.',
  metadataBase: new URL('https://calculogratis.com'),
  openGraph: { siteName: 'Calculo Gratis', locale: 'pt_BR', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add layout components (Navbar, BottomNav, Footer, Breadcrumb, AdSlot)"
```

---

### Task 5: SEO Helpers

**Files:**
- Create: `src/lib/seo/metadata.ts`, `src/lib/seo/jsonld.ts`

- [ ] **Step 1: Create metadata helper**

Create `src/lib/seo/metadata.ts`:

```typescript
import type { Metadata } from 'next'
import { getCalculadora } from '@/lib/constants/calculadoras'

export function createCalculadoraMetadata(slug: string): Metadata {
  const calc = getCalculadora(slug)
  if (!calc) return {}
  return {
    title: `Calculadora de ${calc.nome} Online Gratis 2026`,
    description: calc.descricao,
    keywords: calc.keywords,
    openGraph: {
      title: `Calculadora de ${calc.nome} Online Gratis 2026 | Calculo Gratis`,
      description: calc.descricao,
      url: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadora de ${calc.nome} | Calculo Gratis`, description: calc.descricao },
    alternates: { canonical: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}` },
  }
}

export function createCategoriaMetadata(categoriaSlug: string, categoriaNome: string, descricao: string): Metadata {
  return {
    title: `Calculadoras ${categoriaNome} Online Gratis 2026`,
    description: descricao,
    openGraph: {
      title: `Calculadoras ${categoriaNome} Online Gratis 2026 | Calculo Gratis`,
      description: descricao,
      url: `https://calculogratis.com/${categoriaSlug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `Calculadoras ${categoriaNome} | Calculo Gratis`, description: descricao },
    alternates: { canonical: `https://calculogratis.com/${categoriaSlug}` },
  }
}
```

- [ ] **Step 2: Create JSON-LD generators**

Create `src/lib/seo/jsonld.ts`:

```typescript
import { getCalculadora } from '@/lib/constants/calculadoras'

export function calculadoraJsonLd(slug: string) {
  const calc = getCalculadora(slug)
  if (!calc) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Calculadora de ${calc.nome}`,
    description: calc.descricao,
    url: `https://calculogratis.com/${calc.categoriaSlug}/${calc.slug}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    provider: { '@type': 'Organization', name: 'Calculo Gratis', url: 'https://calculogratis.com' },
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add SEO helpers (metadata factory, JSON-LD generators)"
```

---

### Task 6: Calculator Logic - Financial

**Files:**
- Create: `src/lib/calculadoras/juros-simples.ts`, `src/lib/calculadoras/juros-compostos.ts`, `src/lib/calculadoras/financiamento.ts`
- Test: `src/tests/lib/calculadoras/juros-simples.test.ts`, `src/tests/lib/calculadoras/juros-compostos.test.ts`, `src/tests/lib/calculadoras/financiamento.test.ts`

- [ ] **Step 1: Write juros simples tests**

Create `src/tests/lib/calculadoras/juros-simples.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularJurosSimples } from '@/lib/calculadoras/juros-simples'

describe('calcularJurosSimples', () => {
  it('calculates simple interest correctly', () => {
    const r = calcularJurosSimples({ capital: 1000, taxaMensal: 1, meses: 12 })
    expect(r.juros).toBeCloseTo(120)
    expect(r.montante).toBeCloseTo(1120)
  })
  it('returns zero for zero capital', () => {
    const r = calcularJurosSimples({ capital: 0, taxaMensal: 5, meses: 10 })
    expect(r.juros).toBe(0)
  })
  it('handles large values', () => {
    const r = calcularJurosSimples({ capital: 100000, taxaMensal: 2, meses: 24 })
    expect(r.juros).toBeCloseTo(48000)
  })
})
```

- [ ] **Step 2: Implement juros simples**

Create `src/lib/calculadoras/juros-simples.ts`:

```typescript
interface JurosSimplesInput { capital: number; taxaMensal: number; meses: number }
interface JurosSimplesResult { capital: number; juros: number; montante: number; taxaMensal: number; meses: number }

export function calcularJurosSimples(input: JurosSimplesInput): JurosSimplesResult {
  const taxa = input.taxaMensal / 100
  const juros = input.capital * taxa * input.meses
  return { capital: input.capital, juros, montante: input.capital + juros, taxaMensal: input.taxaMensal, meses: input.meses }
}
```

- [ ] **Step 3: Run juros simples tests**

```bash
npm test -- src/tests/lib/calculadoras/juros-simples.test.ts
```

- [ ] **Step 4: Write juros compostos tests**

Create `src/tests/lib/calculadoras/juros-compostos.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularJurosCompostos } from '@/lib/calculadoras/juros-compostos'

describe('calcularJurosCompostos', () => {
  it('calculates without contributions', () => {
    const r = calcularJurosCompostos({ capital: 1000, taxaMensal: 1, meses: 12, aporteMensal: 0 })
    expect(r.montante).toBeCloseTo(1126.83, 0)
    expect(r.totalInvestido).toBe(1000)
  })
  it('calculates with monthly contributions', () => {
    const r = calcularJurosCompostos({ capital: 1000, taxaMensal: 1, meses: 12, aporteMensal: 100 })
    expect(r.totalInvestido).toBeCloseTo(2200)
    expect(r.montante).toBeGreaterThan(2200)
  })
  it('returns capital only for zero rate', () => {
    const r = calcularJurosCompostos({ capital: 5000, taxaMensal: 0, meses: 12, aporteMensal: 0 })
    expect(r.montante).toBe(5000)
  })
})
```

- [ ] **Step 5: Implement juros compostos**

Create `src/lib/calculadoras/juros-compostos.ts`:

```typescript
interface JurosCompostosInput { capital: number; taxaMensal: number; meses: number; aporteMensal: number }

interface MesEvolucao { mes: number; saldo: number; aporte: number; juros: number }

interface JurosCompostosResult {
  capital: number; montante: number; juros: number; totalInvestido: number
  taxaMensal: number; meses: number; evolucao: MesEvolucao[]
}

export function calcularJurosCompostos(input: JurosCompostosInput): JurosCompostosResult {
  const taxa = input.taxaMensal / 100
  const evolucao: MesEvolucao[] = []
  let saldo = input.capital

  for (let mes = 1; mes <= input.meses; mes++) {
    const jurosMes = saldo * taxa
    saldo = saldo + jurosMes + input.aporteMensal
    evolucao.push({ mes, saldo, aporte: input.aporteMensal, juros: jurosMes })
  }

  const totalInvestido = input.capital + input.aporteMensal * input.meses
  return { capital: input.capital, montante: saldo, juros: saldo - totalInvestido, totalInvestido, taxaMensal: input.taxaMensal, meses: input.meses, evolucao }
}
```

- [ ] **Step 6: Run juros compostos tests**

```bash
npm test -- src/tests/lib/calculadoras/juros-compostos.test.ts
```

- [ ] **Step 7: Write financiamento tests**

Create `src/tests/lib/calculadoras/financiamento.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularFinanciamentoPrice, calcularFinanciamentoSAC } from '@/lib/calculadoras/financiamento'

describe('calcularFinanciamentoPrice', () => {
  it('calculates Price table', () => {
    const r = calcularFinanciamentoPrice({ valorImovel: 300000, entrada: 60000, taxaAnual: 12, prazoMeses: 360 })
    expect(r.valorFinanciado).toBe(240000)
    expect(r.parcela).toBeGreaterThan(2000)
    expect(r.parcelas).toHaveLength(360)
    expect(r.parcelas[0].parcela).toBeCloseTo(r.parcelas[359].parcela, 0)
  })
  it('handles zero interest', () => {
    const r = calcularFinanciamentoPrice({ valorImovel: 100000, entrada: 0, taxaAnual: 0, prazoMeses: 100 })
    expect(r.parcela).toBeCloseTo(1000)
  })
})

describe('calcularFinanciamentoSAC', () => {
  it('calculates SAC table', () => {
    const r = calcularFinanciamentoSAC({ valorImovel: 300000, entrada: 60000, taxaAnual: 12, prazoMeses: 360 })
    expect(r.valorFinanciado).toBe(240000)
    expect(r.parcelas[0].parcela).toBeGreaterThan(r.parcelas[359].parcela)
    expect(r.parcelas[0].amortizacao).toBeCloseTo(r.parcelas[359].amortizacao, 2)
  })
})
```

- [ ] **Step 8: Implement financiamento**

Create `src/lib/calculadoras/financiamento.ts`:

```typescript
interface FinanciamentoInput { valorImovel: number; entrada: number; taxaAnual: number; prazoMeses: number }
interface ParcelaInfo { numero: number; parcela: number; amortizacao: number; juros: number; saldoDevedor: number }
interface FinanciamentoResult { valorFinanciado: number; parcela: number; totalPago: number; totalJuros: number; parcelas: ParcelaInfo[] }

export function calcularFinanciamentoPrice(input: FinanciamentoInput): FinanciamentoResult {
  const vf = input.valorImovel - input.entrada
  const tm = input.taxaAnual / 100 / 12
  const parcela = tm === 0 ? vf / input.prazoMeses : vf * (tm * Math.pow(1 + tm, input.prazoMeses)) / (Math.pow(1 + tm, input.prazoMeses) - 1)

  const parcelas: ParcelaInfo[] = []
  let saldo = vf
  for (let i = 1; i <= input.prazoMeses; i++) {
    const juros = saldo * tm
    const amort = parcela - juros
    saldo -= amort
    parcelas.push({ numero: i, parcela, amortizacao: amort, juros, saldoDevedor: Math.max(0, saldo) })
  }
  return { valorFinanciado: vf, parcela, totalPago: parcela * input.prazoMeses, totalJuros: parcela * input.prazoMeses - vf, parcelas }
}

export function calcularFinanciamentoSAC(input: FinanciamentoInput): FinanciamentoResult {
  const vf = input.valorImovel - input.entrada
  const tm = input.taxaAnual / 100 / 12
  const amort = vf / input.prazoMeses

  const parcelas: ParcelaInfo[] = []
  let saldo = vf
  let totalPago = 0
  for (let i = 1; i <= input.prazoMeses; i++) {
    const juros = saldo * tm
    const parcela = amort + juros
    saldo -= amort
    totalPago += parcela
    parcelas.push({ numero: i, parcela, amortizacao: amort, juros, saldoDevedor: Math.max(0, saldo) })
  }
  return { valorFinanciado: vf, parcela: parcelas[0].parcela, totalPago, totalJuros: totalPago - vf, parcelas }
}
```

- [ ] **Step 9: Run all financial tests**

```bash
npm test -- src/tests/lib/calculadoras/financiamento.test.ts
```

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: add financial calculator logic (juros simples, compostos, financiamento)"
```

---

### Task 7: Calculator Logic - Trabalhista

**Files:**
- Create: `src/lib/calculadoras/salario-liquido.ts`, `src/lib/calculadoras/rescisao.ts`, `src/lib/calculadoras/seguro-desemprego.ts`
- Test: `src/tests/lib/calculadoras/salario-liquido.test.ts`, `src/tests/lib/calculadoras/rescisao.test.ts`, `src/tests/lib/calculadoras/seguro-desemprego.test.ts`

- [ ] **Step 1: Write salario liquido tests**

Create `src/tests/lib/calculadoras/salario-liquido.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'

describe('calcularSalarioLiquido', () => {
  it('calculates for minimum wage', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 1412, dependentes: 0, outrosDescontos: 0 })
    expect(r.inss).toBeGreaterThan(0)
    expect(r.irrf).toBe(0)
    expect(r.salarioLiquido).toBeLessThan(1412)
  })
  it('calculates IRRF for higher salary', () => {
    const r = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 0, outrosDescontos: 0 })
    expect(r.irrf).toBeGreaterThan(0)
  })
  it('deducts dependents from IRRF base', () => {
    const withDep = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 2, outrosDescontos: 0 })
    const noDep = calcularSalarioLiquido({ salarioBruto: 5000, dependentes: 0, outrosDescontos: 0 })
    expect(withDep.irrf).toBeLessThan(noDep.irrf)
  })
})
```

- [ ] **Step 2: Implement salario liquido**

Create `src/lib/calculadoras/salario-liquido.ts`:

```typescript
import { INSS_FAIXAS, IRRF_FAIXAS, IRRF_DEDUCAO_DEPENDENTE } from '@/lib/constants/tabelas-2026'

interface SalarioLiquidoInput { salarioBruto: number; dependentes: number; outrosDescontos: number }

interface SalarioLiquidoResult {
  salarioBruto: number; inss: number; baseIRRF: number; irrf: number
  outrosDescontos: number; salarioLiquido: number; aliquotaEfetivaINSS: number; aliquotaEfetivaIRRF: number
}

export function calcularINSS(salarioBruto: number): number {
  let inss = 0
  let anterior = 0
  for (const faixa of INSS_FAIXAS) {
    if (salarioBruto <= anterior) break
    inss += (Math.min(salarioBruto, faixa.ate) - anterior) * faixa.aliquota
    anterior = faixa.ate
  }
  return inss
}

export function calcularIRRF(baseCalculo: number): number {
  for (const faixa of IRRF_FAIXAS) {
    if (baseCalculo <= faixa.ate) return Math.max(0, baseCalculo * faixa.aliquota - faixa.deducao)
  }
  return 0
}

export function calcularSalarioLiquido(input: SalarioLiquidoInput): SalarioLiquidoResult {
  const inss = calcularINSS(input.salarioBruto)
  const baseIRRF = input.salarioBruto - inss - (input.dependentes * IRRF_DEDUCAO_DEPENDENTE)
  const irrf = calcularIRRF(baseIRRF)
  const salarioLiquido = input.salarioBruto - inss - irrf - input.outrosDescontos
  return {
    salarioBruto: input.salarioBruto, inss, baseIRRF, irrf, outrosDescontos: input.outrosDescontos, salarioLiquido,
    aliquotaEfetivaINSS: input.salarioBruto > 0 ? inss / input.salarioBruto : 0,
    aliquotaEfetivaIRRF: baseIRRF > 0 ? irrf / baseIRRF : 0,
  }
}
```

- [ ] **Step 3: Run salario liquido tests**

```bash
npm test -- src/tests/lib/calculadoras/salario-liquido.test.ts
```

- [ ] **Step 4: Write rescisao tests**

Create `src/tests/lib/calculadoras/rescisao.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularRescisao, TipoDemissao } from '@/lib/calculadoras/rescisao'

describe('calcularRescisao', () => {
  const base = { salario: 3000, dataAdmissao: new Date(2020, 0, 1), dataDemissao: new Date(2026, 2, 24), tipoDemissao: 'sem_justa_causa' as TipoDemissao, saldoFGTS: 15000, dependentes: 0 }

  it('calculates sem justa causa', () => {
    const r = calcularRescisao(base)
    expect(r.saldoSalario).toBeGreaterThan(0)
    expect(r.multaFGTS).toBeGreaterThan(0)
    expect(r.total).toBeGreaterThan(0)
  })
  it('no FGTS penalty for justa causa', () => {
    const r = calcularRescisao({ ...base, tipoDemissao: 'justa_causa' })
    expect(r.multaFGTS).toBe(0)
    expect(r.avisoPrevio).toBe(0)
  })
  it('acordo gives 20% FGTS', () => {
    const r = calcularRescisao({ ...base, tipoDemissao: 'acordo' })
    expect(r.multaFGTS).toBeCloseTo(15000 * 0.20, 0)
  })
})
```

- [ ] **Step 5: Implement rescisao**

Create `src/lib/calculadoras/rescisao.ts`:

```typescript
import { FGTS_MULTA_SEM_JUSTA_CAUSA } from '@/lib/constants/tabelas-2026'
import { calcularINSS, calcularIRRF } from './salario-liquido'

export type TipoDemissao = 'sem_justa_causa' | 'justa_causa' | 'pedido_demissao' | 'acordo'

interface RescisaoInput { salario: number; dataAdmissao: Date; dataDemissao: Date; tipoDemissao: TipoDemissao; saldoFGTS: number; dependentes: number }

interface RescisaoResult {
  saldoSalario: number; avisoPrevio: number; feriasVencidas: number; feriasProporcionais: number
  tercoFerias: number; decimoTerceiro: number; multaFGTS: number; inss: number; irrf: number; total: number
  diasTrabalhados: number; mesesTrabalhados: number
}

function diffMeses(a: Date, b: Date): number {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

export function calcularRescisao(input: RescisaoInput): RescisaoResult {
  const meses = diffMeses(input.dataAdmissao, input.dataDemissao)
  const diasNoMes = input.dataDemissao.getDate()
  const salarioDia = input.salario / 30

  const saldoSalario = salarioDia * diasNoMes

  const anos = Math.floor(meses / 12)
  const diasAviso = input.tipoDemissao === 'sem_justa_causa' ? Math.min(30 + anos * 3, 120)
    : input.tipoDemissao === 'acordo' ? Math.min(30 + anos * 3, 120) / 2 : 0
  const avisoPrevio = salarioDia * diasAviso

  const mesesFerias = meses % 12
  const feriasVencidas = input.tipoDemissao !== 'justa_causa' && meses >= 12 ? input.salario : 0
  const feriasProporcionais = input.tipoDemissao !== 'justa_causa' ? (input.salario / 12) * mesesFerias : 0
  const tercoFerias = (feriasVencidas + feriasProporcionais) / 3

  const meses13 = input.dataDemissao.getMonth() + 1
  const decimoTerceiro = input.tipoDemissao !== 'justa_causa' ? (input.salario / 12) * meses13 : 0

  let multaFGTS = 0
  if (input.tipoDemissao === 'sem_justa_causa') multaFGTS = input.saldoFGTS * FGTS_MULTA_SEM_JUSTA_CAUSA
  else if (input.tipoDemissao === 'acordo') multaFGTS = input.saldoFGTS * 0.20

  const inss = calcularINSS(saldoSalario)
  const irrf = calcularIRRF(saldoSalario - inss)

  const total = saldoSalario + avisoPrevio + feriasVencidas + feriasProporcionais + tercoFerias + decimoTerceiro + multaFGTS - inss - irrf
  const diasTrabalhados = Math.floor((input.dataDemissao.getTime() - input.dataAdmissao.getTime()) / 86400000)

  return { saldoSalario, avisoPrevio, feriasVencidas, feriasProporcionais, tercoFerias, decimoTerceiro, multaFGTS, inss, irrf, total, diasTrabalhados, mesesTrabalhados: meses }
}
```

- [ ] **Step 6: Run rescisao tests**

```bash
npm test -- src/tests/lib/calculadoras/rescisao.test.ts
```

- [ ] **Step 7: Write and implement seguro desemprego (test + code)**

Create `src/tests/lib/calculadoras/seguro-desemprego.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularSeguroDesemprego } from '@/lib/calculadoras/seguro-desemprego'

describe('calcularSeguroDesemprego', () => {
  it('calculates for low salary', () => {
    const r = calcularSeguroDesemprego({ salarios: [1500, 1500, 1500], solicitacoes: 1 })
    expect(r.valorParcela).toBeGreaterThan(0)
    expect(r.numeroParcelas).toBeGreaterThanOrEqual(4)
  })
  it('caps at max for high salary', () => {
    const r = calcularSeguroDesemprego({ salarios: [10000, 10000, 10000], solicitacoes: 1 })
    expect(r.valorParcela).toBeCloseTo(2313.74, 0)
  })
})
```

Create `src/lib/calculadoras/seguro-desemprego.ts`:

```typescript
import { SEGURO_DESEMPREGO_FAIXAS, SALARIO_MINIMO } from '@/lib/constants/tabelas-2026'

interface SeguroInput { salarios: [number, number, number]; solicitacoes: number }
interface SeguroResult { mediaSalarial: number; valorParcela: number; numeroParcelas: number; valorTotal: number }

export function calcularSeguroDesemprego(input: SeguroInput): SeguroResult {
  const media = input.salarios.reduce((a, b) => a + b, 0) / 3

  let valor: number
  if (media <= SEGURO_DESEMPREGO_FAIXAS[0].ate) {
    valor = media * SEGURO_DESEMPREGO_FAIXAS[0].multiplicador
  } else if (media <= SEGURO_DESEMPREGO_FAIXAS[1].ate) {
    valor = SEGURO_DESEMPREGO_FAIXAS[1].base! + (media - SEGURO_DESEMPREGO_FAIXAS[0].ate) * SEGURO_DESEMPREGO_FAIXAS[1].multiplicador
  } else {
    valor = SEGURO_DESEMPREGO_FAIXAS[2].valor_fixo!
  }
  valor = Math.max(valor, SALARIO_MINIMO)

  const parcelas = input.solicitacoes === 1 ? 4 : 5
  return { mediaSalarial: media, valorParcela: valor, numeroParcelas: parcelas, valorTotal: valor * parcelas }
}
```

- [ ] **Step 8: Run all trabalhista tests**

```bash
npm test -- src/tests/lib/calculadoras/seguro-desemprego.test.ts
```

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: add trabalhista calculator logic (salario liquido, rescisao, seguro desemprego)"
```

---

### Task 8: Calculator Logic - Previdencia & Utilidades

**Files:**
- Create: `src/lib/calculadoras/aposentadoria.ts`, `src/lib/calculadoras/gerador-cpf.ts`, `src/lib/calculadoras/gerador-cnpj.ts`
- Test: `src/tests/lib/calculadoras/aposentadoria.test.ts`, `src/tests/lib/calculadoras/gerador-cpf.test.ts`, `src/tests/lib/calculadoras/gerador-cnpj.test.ts`

- [ ] **Step 1: Write aposentadoria tests**

Create `src/tests/lib/calculadoras/aposentadoria.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'

describe('calcularAposentadoria', () => {
  it('qualifies man at 66 with 25 years', () => {
    const r = calcularAposentadoria({ idade: 66, sexo: 'masculino', anosContribuicao: 25, mediaSalarios: 4000 })
    expect(r.podeAposentar).toBe(true)
    expect(r.anosRestantes).toBe(0)
  })
  it('calculates remaining years', () => {
    const r = calcularAposentadoria({ idade: 40, sexo: 'masculino', anosContribuicao: 10, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(false)
    expect(r.anosRestantes).toBe(25)
  })
  it('uses women rules', () => {
    const r = calcularAposentadoria({ idade: 62, sexo: 'feminino', anosContribuicao: 15, mediaSalarios: 3000 })
    expect(r.podeAposentar).toBe(true)
  })
  it('calculates benefit percentage', () => {
    const r = calcularAposentadoria({ idade: 65, sexo: 'masculino', anosContribuicao: 30, mediaSalarios: 5000 })
    expect(r.percentualBeneficio).toBeCloseTo(0.80)
  })
})
```

- [ ] **Step 2: Implement aposentadoria**

Create `src/lib/calculadoras/aposentadoria.ts`:

```typescript
import { PREVIDENCIA } from '@/lib/constants/tabelas-2026'

interface AposInput { idade: number; sexo: 'masculino' | 'feminino'; anosContribuicao: number; mediaSalarios: number }

interface AposResult {
  podeAposentar: boolean; idadeMinima: number; tempoMinimoContribuicao: number
  anosRestantes: number; percentualBeneficio: number; valorEstimado: number; motivoNegativa: string[]
}

export function calcularAposentadoria(input: AposInput): AposResult {
  const idadeMin = input.sexo === 'masculino' ? PREVIDENCIA.idade_minima_homem : PREVIDENCIA.idade_minima_mulher
  const tempoMin = input.sexo === 'masculino' ? PREVIDENCIA.tempo_contribuicao_minimo_homem : PREVIDENCIA.tempo_contribuicao_minimo_mulher

  const motivos: string[] = []
  if (input.idade < idadeMin) motivos.push(`Idade minima: ${idadeMin} anos (faltam ${idadeMin - input.idade})`)
  if (input.anosContribuicao < tempoMin) motivos.push(`Tempo minimo: ${tempoMin} anos (faltam ${tempoMin - input.anosContribuicao})`)

  const anosRestantes = Math.max(Math.max(0, idadeMin - input.idade), Math.max(0, tempoMin - input.anosContribuicao))
  const anosExtra = Math.max(0, input.anosContribuicao - tempoMin)
  const pct = Math.min(PREVIDENCIA.aliquota_base + anosExtra * PREVIDENCIA.acrescimo_por_ano_extra, 1)

  return {
    podeAposentar: motivos.length === 0, idadeMinima: idadeMin, tempoMinimoContribuicao: tempoMin,
    anosRestantes, percentualBeneficio: pct, valorEstimado: input.mediaSalarios * pct, motivoNegativa: motivos,
  }
}
```

- [ ] **Step 3: Run aposentadoria tests**

```bash
npm test -- src/tests/lib/calculadoras/aposentadoria.test.ts
```

- [ ] **Step 4: Write CPF tests and implement**

Create `src/tests/lib/calculadoras/gerador-cpf.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { gerarCPF, validarCPF } from '@/lib/calculadoras/gerador-cpf'

describe('gerarCPF', () => {
  it('generates formatted 14-char CPF', () => {
    expect(gerarCPF()).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  })
  it('generates valid CPFs', () => {
    for (let i = 0; i < 20; i++) expect(validarCPF(gerarCPF())).toBe(true)
  })
})

describe('validarCPF', () => {
  it('rejects all-same-digit', () => { expect(validarCPF('111.111.111-11')).toBe(false) })
  it('rejects invalid', () => { expect(validarCPF('123.456.789-00')).toBe(false) })
})
```

Create `src/lib/calculadoras/gerador-cpf.ts`:

```typescript
function calcDigit(digits: number[], weights: number[]): number {
  const rest = digits.reduce((acc, d, i) => acc + d * weights[i], 0) % 11
  return rest < 2 ? 0 : 11 - rest
}

export function gerarCPF(): string {
  const d: number[] = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  d.push(calcDigit(d, [10, 9, 8, 7, 6, 5, 4, 3, 2]))
  d.push(calcDigit(d, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]))
  const s = d.join('')
  return `${s.slice(0,3)}.${s.slice(3,6)}.${s.slice(6,9)}-${s.slice(9,11)}`
}

export function validarCPF(cpf: string): boolean {
  const c = cpf.replace(/\D/g, '')
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false
  const d = c.split('').map(Number)
  if (calcDigit(d.slice(0, 9), [10,9,8,7,6,5,4,3,2]) !== d[9]) return false
  if (calcDigit(d.slice(0, 10), [11,10,9,8,7,6,5,4,3,2]) !== d[10]) return false
  return true
}
```

- [ ] **Step 5: Write CNPJ tests and implement**

Create `src/tests/lib/calculadoras/gerador-cnpj.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { gerarCNPJ, validarCNPJ } from '@/lib/calculadoras/gerador-cnpj'

describe('gerarCNPJ', () => {
  it('generates formatted 18-char CNPJ', () => {
    expect(gerarCNPJ()).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
  })
  it('generates valid CNPJs', () => {
    for (let i = 0; i < 20; i++) expect(validarCNPJ(gerarCNPJ())).toBe(true)
  })
})
```

Create `src/lib/calculadoras/gerador-cnpj.ts`:

```typescript
function calcDigit(digits: number[], weights: number[]): number {
  const rest = digits.reduce((acc, d, i) => acc + d * weights[i], 0) % 11
  return rest < 2 ? 0 : 11 - rest
}

export function gerarCNPJ(): string {
  const d: number[] = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
  d.push(0, 0, 0, 1)
  d.push(calcDigit(d, [5,4,3,2,9,8,7,6,5,4,3,2]))
  d.push(calcDigit(d, [6,5,4,3,2,9,8,7,6,5,4,3,2]))
  const s = d.join('')
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12,14)}`
}

export function validarCNPJ(cnpj: string): boolean {
  const c = cnpj.replace(/\D/g, '')
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false
  const d = c.split('').map(Number)
  if (calcDigit(d.slice(0,12), [5,4,3,2,9,8,7,6,5,4,3,2]) !== d[12]) return false
  if (calcDigit(d.slice(0,13), [6,5,4,3,2,9,8,7,6,5,4,3,2]) !== d[13]) return false
  return true
}
```

- [ ] **Step 6: Run all tests**

```bash
npm test
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add aposentadoria calculator and CPF/CNPJ generators with tests"
```

---

### Task 9: Calculator Form Components - Financial

**Files:**
- Create: `src/components/calculadoras/juros-simples-form.tsx`, `src/components/calculadoras/juros-compostos-form.tsx`, `src/components/calculadoras/financiamento-form.tsx`

- [ ] **Step 1: Create juros simples form**

Create `src/components/calculadoras/juros-simples-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularJurosSimples } from '@/lib/calculadoras/juros-simples'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

export function JurosSimplesForm() {
  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [meses, setMeses] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularJurosSimples> | null>(null)

  function handleCalcular() {
    setResult(calcularJurosSimples({ capital: parseBRNumber(capital), taxaMensal: parseBRNumber(taxa), meses: parseInt(meses) || 0 }))
  }

  const isValid = parseBRNumber(capital) > 0 && parseBRNumber(taxa) >= 0 && parseInt(meses) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Capital inicial (R$)" id="capital" value={capital} onChange={setCapital} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Taxa mensal (%)" id="taxa" value={taxa} onChange={setTaxa} inputMode="decimal" placeholder="Ex: 1,5" suffix="%" />
        <Input label="Periodo (meses)" id="meses" value={meses} onChange={setMeses} inputMode="numeric" placeholder="Ex: 12" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado" mainValue={result ? formatCurrency(result.montante) : ''} mainLabel="Montante final"
        items={result ? [{ label: 'Capital', value: formatCurrency(result.capital) }, { label: 'Juros', value: formatCurrency(result.juros), highlight: true }, { label: 'Taxa mensal', value: `${result.taxaMensal}%` }, { label: 'Periodo', value: `${result.meses} meses` }] : []} />
    </>
  )
}
```

- [ ] **Step 2: Create juros compostos form**

Create `src/components/calculadoras/juros-compostos-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularJurosCompostos } from '@/lib/calculadoras/juros-compostos'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

export function JurosCompostosForm() {
  const [capital, setCapital] = useState('')
  const [taxa, setTaxa] = useState('')
  const [meses, setMeses] = useState('')
  const [aporte, setAporte] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularJurosCompostos> | null>(null)

  function handleCalcular() {
    setResult(calcularJurosCompostos({ capital: parseBRNumber(capital), taxaMensal: parseBRNumber(taxa), meses: parseInt(meses) || 0, aporteMensal: parseBRNumber(aporte) }))
  }

  const isValid = (parseBRNumber(capital) > 0 || parseBRNumber(aporte) > 0) && parseInt(meses) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Capital inicial (R$)" id="capital" value={capital} onChange={setCapital} inputMode="decimal" placeholder="Ex: 10.000,00" />
        <Input label="Aporte mensal (R$)" id="aporte" value={aporte} onChange={setAporte} inputMode="decimal" placeholder="Ex: 500,00" />
        <Input label="Taxa mensal (%)" id="taxa" value={taxa} onChange={setTaxa} inputMode="decimal" placeholder="Ex: 1,0" suffix="%" />
        <Input label="Periodo (meses)" id="meses" value={meses} onChange={setMeses} inputMode="numeric" placeholder="Ex: 24" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Resultado" mainValue={result ? formatCurrency(result.montante) : ''} mainLabel="Montante final"
        items={result ? [{ label: 'Total investido', value: formatCurrency(result.totalInvestido) }, { label: 'Juros ganhos', value: formatCurrency(result.juros), highlight: true }, { label: 'Taxa mensal', value: `${result.taxaMensal}%` }, { label: 'Periodo', value: `${result.meses} meses` }] : []} />
    </>
  )
}
```

- [ ] **Step 3: Create financiamento form**

Create `src/components/calculadoras/financiamento-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularFinanciamentoPrice, calcularFinanciamentoSAC } from '@/lib/calculadoras/financiamento'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

type Sistema = 'price' | 'sac'

export function FinanciamentoForm() {
  const [valor, setValor] = useState('')
  const [entrada, setEntrada] = useState('')
  const [taxa, setTaxa] = useState('')
  const [prazo, setPrazo] = useState('')
  const [sistema, setSistema] = useState<Sistema>('price')
  const [result, setResult] = useState<ReturnType<typeof calcularFinanciamentoPrice> | null>(null)

  function handleCalcular() {
    const input = { valorImovel: parseBRNumber(valor), entrada: parseBRNumber(entrada), taxaAnual: parseBRNumber(taxa), prazoMeses: parseInt(prazo) || 0 }
    setResult(sistema === 'price' ? calcularFinanciamentoPrice(input) : calcularFinanciamentoSAC(input))
  }

  const isValid = parseBRNumber(valor) > 0 && parseInt(prazo) > 0

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex rounded-lg bg-slate-100 p-1">
          <button onClick={() => { setSistema('price'); setResult(null) }} className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${sistema === 'price' ? 'bg-white text-navy shadow-sm' : 'text-slate-600'}`}>Tabela Price</button>
          <button onClick={() => { setSistema('sac'); setResult(null) }} className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${sistema === 'sac' ? 'bg-white text-navy shadow-sm' : 'text-slate-600'}`}>Tabela SAC</button>
        </div>
        <Input label="Valor do imovel (R$)" id="valor" value={valor} onChange={setValor} inputMode="decimal" placeholder="Ex: 300.000,00" />
        <Input label="Entrada (R$)" id="entrada" value={entrada} onChange={setEntrada} inputMode="decimal" placeholder="Ex: 60.000,00" />
        <Input label="Taxa anual (%)" id="taxa" value={taxa} onChange={setTaxa} inputMode="decimal" placeholder="Ex: 10,5" suffix="% a.a." />
        <Input label="Prazo (meses)" id="prazo" value={prazo} onChange={setPrazo} inputMode="numeric" placeholder="Ex: 360" />
        <Button onClick={handleCalcular} fullWidth disabled={!isValid}>Simular</Button>
      </div>
      <ResultCard visible={result !== null} title={`Financiamento ${sistema === 'price' ? 'Price' : 'SAC'}`} mainValue={result ? formatCurrency(result.parcela) : ''} mainLabel={sistema === 'price' ? 'Parcela fixa' : 'Primeira parcela'}
        items={result ? [{ label: 'Valor financiado', value: formatCurrency(result.valorFinanciado) }, { label: 'Total de juros', value: formatCurrency(result.totalJuros), highlight: true }, { label: 'Total pago', value: formatCurrency(result.totalPago) },
          ...(sistema === 'sac' && result.parcelas.length > 0 ? [{ label: 'Ultima parcela', value: formatCurrency(result.parcelas[result.parcelas.length - 1].parcela) }] : [])] : []} />
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add financial calculator form components"
```

---

### Task 10: Calculator Form Components - Trabalhista, Previdencia, Utilidades

**Files:**
- Create: `src/components/calculadoras/salario-liquido-form.tsx`, `src/components/calculadoras/rescisao-form.tsx`, `src/components/calculadoras/seguro-desemprego-form.tsx`, `src/components/calculadoras/aposentadoria-form.tsx`, `src/components/calculadoras/gerador-cpf-form.tsx`, `src/components/calculadoras/gerador-cnpj-form.tsx`

- [ ] **Step 1: Create salario liquido form**

Create `src/components/calculadoras/salario-liquido-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSalarioLiquido } from '@/lib/calculadoras/salario-liquido'
import { formatCurrency, formatPercent, parseBRNumber } from '@/lib/formatters'

export function SalarioLiquidoForm() {
  const [salario, setSalario] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [descontos, setDescontos] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularSalarioLiquido> | null>(null)

  function handleCalcular() {
    setResult(calcularSalarioLiquido({ salarioBruto: parseBRNumber(salario), dependentes: parseInt(dependentes) || 0, outrosDescontos: parseBRNumber(descontos) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Salario bruto (R$)" id="salario" value={salario} onChange={setSalario} inputMode="decimal" placeholder="Ex: 5.000,00" />
        <Input label="Numero de dependentes" id="dependentes" value={dependentes} onChange={setDependentes} inputMode="numeric" placeholder="0" />
        <Input label="Outros descontos (R$)" id="descontos" value={descontos} onChange={setDescontos} inputMode="decimal" placeholder="Ex: 200,00" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Salario Liquido" mainValue={result ? formatCurrency(result.salarioLiquido) : ''} mainLabel="Valor liquido mensal"
        items={result ? [{ label: 'Salario bruto', value: formatCurrency(result.salarioBruto) }, { label: `INSS (${formatPercent(result.aliquotaEfetivaINSS)})`, value: `- ${formatCurrency(result.inss)}` }, { label: `IRRF (${formatPercent(result.aliquotaEfetivaIRRF)})`, value: `- ${formatCurrency(result.irrf)}` },
          ...(result.outrosDescontos > 0 ? [{ label: 'Outros descontos', value: `- ${formatCurrency(result.outrosDescontos)}` }] : []), { label: 'Salario liquido', value: formatCurrency(result.salarioLiquido), highlight: true }] : []} />
    </>
  )
}
```

- [ ] **Step 2: Create rescisao form**

Create `src/components/calculadoras/rescisao-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularRescisao, TipoDemissao } from '@/lib/calculadoras/rescisao'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

function parseDate(str: string): Date | null {
  const parts = str.split('/')
  if (parts.length !== 3) return null
  const [d, m, y] = parts.map(Number)
  if (!d || !m || !y) return null
  return new Date(y, m - 1, d)
}

export function RescisaoForm() {
  const [salario, setSalario] = useState('')
  const [dataAdm, setDataAdm] = useState('')
  const [dataDem, setDataDem] = useState('')
  const [tipo, setTipo] = useState('sem_justa_causa')
  const [fgts, setFgts] = useState('')
  const [dependentes, setDependentes] = useState('0')
  const [result, setResult] = useState<ReturnType<typeof calcularRescisao> | null>(null)

  function handleCalcular() {
    const adm = parseDate(dataAdm), dem = parseDate(dataDem)
    if (!adm || !dem) return
    setResult(calcularRescisao({ salario: parseBRNumber(salario), dataAdmissao: adm, dataDemissao: dem, tipoDemissao: tipo as TipoDemissao, saldoFGTS: parseBRNumber(fgts), dependentes: parseInt(dependentes) || 0 }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Salario (R$)" id="salario" value={salario} onChange={setSalario} inputMode="decimal" placeholder="Ex: 3.000,00" />
        <Select label="Tipo de demissao" id="tipo" value={tipo} onChange={setTipo} options={[
          { value: 'sem_justa_causa', label: 'Demissao sem justa causa' }, { value: 'justa_causa', label: 'Demissao por justa causa' },
          { value: 'pedido_demissao', label: 'Pedido de demissao' }, { value: 'acordo', label: 'Acordo mutuo' }]} />
        <Input label="Data de admissao (DD/MM/AAAA)" id="data-adm" value={dataAdm} onChange={setDataAdm} placeholder="Ex: 01/01/2020" />
        <Input label="Data de demissao (DD/MM/AAAA)" id="data-dem" value={dataDem} onChange={setDataDem} placeholder="Ex: 24/03/2026" />
        <Input label="Saldo FGTS (R$)" id="fgts" value={fgts} onChange={setFgts} inputMode="decimal" placeholder="Ex: 15.000,00" />
        <Input label="Dependentes" id="dependentes" value={dependentes} onChange={setDependentes} inputMode="numeric" placeholder="0" />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(salario) <= 0 || !parseDate(dataAdm) || !parseDate(dataDem)}>Calcular Rescisao</Button>
      </div>
      <ResultCard visible={result !== null} title="Rescisao Trabalhista" mainValue={result ? formatCurrency(result.total) : ''} mainLabel="Valor total da rescisao"
        items={result ? [{ label: 'Saldo de salario', value: formatCurrency(result.saldoSalario) }, { label: 'Aviso previo', value: formatCurrency(result.avisoPrevio) },
          { label: 'Ferias vencidas', value: formatCurrency(result.feriasVencidas) }, { label: 'Ferias proporcionais', value: formatCurrency(result.feriasProporcionais) },
          { label: '1/3 de ferias', value: formatCurrency(result.tercoFerias) }, { label: '13o proporcional', value: formatCurrency(result.decimoTerceiro) },
          { label: 'Multa FGTS', value: formatCurrency(result.multaFGTS), highlight: true }, { label: 'INSS', value: `- ${formatCurrency(result.inss)}` }, { label: 'IRRF', value: `- ${formatCurrency(result.irrf)}` }] : []} />
    </>
  )
}
```

- [ ] **Step 3: Create seguro desemprego form**

Create `src/components/calculadoras/seguro-desemprego-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularSeguroDesemprego } from '@/lib/calculadoras/seguro-desemprego'
import { formatCurrency, parseBRNumber } from '@/lib/formatters'

export function SeguroDesempregoForm() {
  const [sal1, setSal1] = useState('')
  const [sal2, setSal2] = useState('')
  const [sal3, setSal3] = useState('')
  const [solicitacoes, setSolicitacoes] = useState('1')
  const [result, setResult] = useState<ReturnType<typeof calcularSeguroDesemprego> | null>(null)

  function handleCalcular() {
    setResult(calcularSeguroDesemprego({ salarios: [parseBRNumber(sal1), parseBRNumber(sal2), parseBRNumber(sal3)], solicitacoes: parseInt(solicitacoes) || 1 }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Ultimo salario (R$)" id="sal1" value={sal1} onChange={setSal1} inputMode="decimal" placeholder="Ex: 2.500,00" />
        <Input label="Penultimo salario (R$)" id="sal2" value={sal2} onChange={setSal2} inputMode="decimal" placeholder="Ex: 2.400,00" />
        <Input label="Antepenultimo salario (R$)" id="sal3" value={sal3} onChange={setSal3} inputMode="decimal" placeholder="Ex: 2.300,00" />
        <Select label="Numero de solicitacoes" id="solicitacoes" value={solicitacoes} onChange={setSolicitacoes} options={[
          { value: '1', label: '1a solicitacao' }, { value: '2', label: '2a solicitacao' }, { value: '3', label: '3a solicitacao ou mais' }]} />
        <Button onClick={handleCalcular} fullWidth disabled={parseBRNumber(sal1) <= 0 || parseBRNumber(sal2) <= 0 || parseBRNumber(sal3) <= 0}>Calcular</Button>
      </div>
      <ResultCard visible={result !== null} title="Seguro Desemprego" mainValue={result ? formatCurrency(result.valorParcela) : ''} mainLabel="Valor de cada parcela"
        items={result ? [{ label: 'Media salarial', value: formatCurrency(result.mediaSalarial) }, { label: 'Numero de parcelas', value: `${result.numeroParcelas} parcelas` }, { label: 'Valor total', value: formatCurrency(result.valorTotal), highlight: true }] : []} />
    </>
  )
}
```

- [ ] **Step 4: Create aposentadoria form**

Create `src/components/calculadoras/aposentadoria-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ResultCard } from '@/components/ui/result-card'
import { calcularAposentadoria } from '@/lib/calculadoras/aposentadoria'
import { formatCurrency, formatPercent, parseBRNumber } from '@/lib/formatters'

export function AposentadoriaForm() {
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState('masculino')
  const [anos, setAnos] = useState('')
  const [media, setMedia] = useState('')
  const [result, setResult] = useState<ReturnType<typeof calcularAposentadoria> | null>(null)

  function handleCalcular() {
    setResult(calcularAposentadoria({ idade: parseInt(idade) || 0, sexo: sexo as 'masculino' | 'feminino', anosContribuicao: parseInt(anos) || 0, mediaSalarios: parseBRNumber(media) }))
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Sua idade" id="idade" value={idade} onChange={setIdade} inputMode="numeric" placeholder="Ex: 55" />
        <Select label="Sexo" id="sexo" value={sexo} onChange={setSexo} options={[{ value: 'masculino', label: 'Masculino' }, { value: 'feminino', label: 'Feminino' }]} />
        <Input label="Anos de contribuicao" id="anos" value={anos} onChange={setAnos} inputMode="numeric" placeholder="Ex: 20" />
        <Input label="Media salarial (R$)" id="media" value={media} onChange={setMedia} inputMode="decimal" placeholder="Ex: 4.000,00" />
        <Button onClick={handleCalcular} fullWidth disabled={parseInt(idade) <= 0 || parseBRNumber(media) <= 0}>Simular Aposentadoria</Button>
      </div>
      <ResultCard visible={result !== null} title={result?.podeAposentar ? 'Voce pode se aposentar!' : 'Ainda nao pode se aposentar'} mainValue={result ? formatCurrency(result.valorEstimado) : ''} mainLabel="Valor estimado do beneficio"
        items={result ? [{ label: 'Situacao', value: result.podeAposentar ? 'Apto' : `Faltam ${result.anosRestantes} anos`, highlight: true }, { label: 'Idade minima', value: `${result.idadeMinima} anos` },
          { label: 'Tempo minimo', value: `${result.tempoMinimoContribuicao} anos` }, { label: 'Percentual', value: formatPercent(result.percentualBeneficio) },
          ...result.motivoNegativa.map(m => ({ label: 'Pendencia', value: m }))] : []} />
    </>
  )
}
```

- [ ] **Step 5: Create CPF and CNPJ generator forms**

Create `src/components/calculadoras/gerador-cpf-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { gerarCPF } from '@/lib/calculadoras/gerador-cpf'

export function GeradorCPFForm() {
  const [cpfs, setCpfs] = useState<string[]>([])

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Button onClick={() => setCpfs(Array.from({ length: 5 }, () => gerarCPF()))} fullWidth>Gerar CPFs</Button>
      </div>
      {cpfs.length > 0 && (
        <div className="mt-6 rounded-xl bg-navy p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-3">CPFs gerados (clique para copiar sem formatacao)</p>
          <div className="space-y-2">
            {cpfs.map((cpf, i) => (
              <button key={i} onClick={() => navigator.clipboard.writeText(cpf.replace(/\D/g, ''))}
                className="block w-full rounded-lg bg-navy-light px-4 py-3 text-left font-mono text-lg hover:bg-white/10 transition-colors">{cpf}</button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Numeros gerados aleatoriamente, validos apenas para testes e desenvolvimento.</p>
        </div>
      )}
    </>
  )
}
```

Create `src/components/calculadoras/gerador-cnpj-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { gerarCNPJ } from '@/lib/calculadoras/gerador-cnpj'

export function GeradorCNPJForm() {
  const [cnpjs, setCnpjs] = useState<string[]>([])

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Button onClick={() => setCnpjs(Array.from({ length: 5 }, () => gerarCNPJ()))} fullWidth>Gerar CNPJs</Button>
      </div>
      {cnpjs.length > 0 && (
        <div className="mt-6 rounded-xl bg-navy p-6 text-white" aria-live="polite">
          <p className="text-sm text-slate-300 mb-3">CNPJs gerados (clique para copiar sem formatacao)</p>
          <div className="space-y-2">
            {cnpjs.map((cnpj, i) => (
              <button key={i} onClick={() => navigator.clipboard.writeText(cnpj.replace(/\D/g, ''))}
                className="block w-full rounded-lg bg-navy-light px-4 py-3 text-left font-mono text-lg hover:bg-white/10 transition-colors">{cnpj}</button>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Numeros gerados aleatoriamente, validos apenas para testes e desenvolvimento.</p>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add trabalhista, previdencia, and utilidades form components"
```

---

### Task 11: Calculator Pages

**Files:**
- Create: `src/components/calculadoras/calculator-page.tsx`, all `page.tsx` under category directories

- [ ] **Step 1: Create reusable calculator page wrapper**

`calculator-page.tsx` receives: slug, category info, nome, descricao, children (form), conteudo (SEO text). It renders: JSON-LD script, Breadcrumb, H1, description, form slot, AdSlots, SEO content, related calculators grid.

Note: For JSON-LD rendering, use Next.js `<script>` with `{JSON.stringify(jsonLd)}` as children (safe serialization by React) rather than `dangerouslySetInnerHTML`.

- [ ] **Step 2: Create all 9 calculator pages**

Each page exports `metadata` using `createCalculadoraMetadata(slug)` and renders `CalculatorPage` with the corresponding form component and 300-500 words of SEO content explaining the calculator's purpose, formulas, and relevant legislation.

Pages: `financeiro/juros-simples`, `financeiro/juros-compostos`, `financeiro/financiamento`, `trabalhista/rescisao`, `trabalhista/salario-liquido`, `trabalhista/seguro-desemprego`, `previdencia/aposentadoria`, `utilidades/gerador-cpf`, `utilidades/gerador-cnpj`

- [ ] **Step 3: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add all calculator pages with SEO metadata and content"
```

---

### Task 12: Category Landing Pages & Home Page

**Files:**
- Create: `src/components/layout/category-landing.tsx`, `src/app/trabalhista/page.tsx`, `src/app/financeiro/page.tsx`, `src/app/previdencia/page.tsx`, `src/app/utilidades/page.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create category landing component**

Reusable component that receives categoriaNome, categoriaSlug, descricao. Renders Breadcrumb, H1, description, grid of calculator cards.

- [ ] **Step 2: Create 4 category pages**

Each exports metadata via `createCategoriaMetadata()` and renders `CategoryLanding`.

- [ ] **Step 3: Create home page**

Renders: H1, tagline, categories grid, all calculators grid.

- [ ] **Step 4: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add category landing pages and home page"
```

---

### Task 13: Sitemap, Robots, Manifest

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`

- [ ] **Step 1: Create sitemap.ts**

Uses `MetadataRoute.Sitemap` type. Generates entries for home (priority 1), categories (0.8), calculators (0.9).

- [ ] **Step 2: Create robots.ts**

Allow all, reference sitemap URL.

- [ ] **Step 3: Create manifest.ts**

PWA manifest: name, short_name, display: standalone, theme_color: #1a2332, icons.

- [ ] **Step 4: Verify build**

```bash
npm run build && echo "BUILD OK"
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add sitemap, robots.txt, and PWA manifest"
```

---

### Task 14: Search & Favorites

**Files:**
- Create: `src/lib/favorites.ts`, `src/components/layout/search.tsx`, `src/app/busca/page.tsx`, `src/app/favoritos/page.tsx`
- Modify: `src/components/layout/navbar.tsx`

- [ ] **Step 1: Create favorites helper**

Create `src/lib/favorites.ts`:

```typescript
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
```

- [ ] **Step 2: Create search component**

Create `src/components/layout/search.tsx` — client-side filter over CALCULADORAS. Dropdown results below input. Match on nome, descricao, keywords.

- [ ] **Step 3: Create mobile search page**

Create `src/app/busca/page.tsx`:

```tsx
'use client'

import { useState, useMemo } from 'react'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { Card } from '@/components/ui/card'

export default function BuscaPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    if (!query.trim()) return CALCULADORAS
    const q = query.toLowerCase()
    return CALCULADORAS.filter(c => c.nome.toLowerCase().includes(q) || c.descricao.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-navy mb-4">Buscar Calculadora</h1>
      <input type="search" placeholder="Digite para buscar..." value={query} onChange={e => setQuery(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-accent focus:ring-2 focus:ring-blue-100 mb-6" autoFocus />
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map(c => <Card key={c.slug} title={c.nome} description={c.descricao} href={`/${c.categoriaSlug}/${c.slug}`} />)}
      </div>
      {results.length === 0 && <p className="text-slate-500 text-center py-8">Nenhuma calculadora encontrada.</p>}
    </div>
  )
}
```

- [ ] **Step 4: Create favorites page**

Create `src/app/favoritos/page.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { getFavorites } from '@/lib/favorites'
import { CALCULADORAS } from '@/lib/constants/calculadoras'
import { Card } from '@/components/ui/card'

export default function FavoritosPage() {
  const [favSlugs, setFavSlugs] = useState<string[]>([])

  useEffect(() => { setFavSlugs(getFavorites()) }, [])

  const favoritos = CALCULADORAS.filter(c => favSlugs.includes(c.slug))

  return (
    <div className="container-app py-6">
      <h1 className="text-2xl font-bold text-navy mb-4">Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-slate-500 text-center py-8">Nenhuma calculadora favoritada ainda. Use a estrela nas calculadoras para salvar aqui.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {favoritos.map(c => <Card key={c.slug} title={c.nome} description={c.descricao} href={`/${c.categoriaSlug}/${c.slug}`} />)}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Add search to desktop navbar**

Import and render `<Search />` in desktop nav area of `navbar.tsx`.

- [ ] **Step 6: Verify build and run all tests**

```bash
npm test && npm run build && echo "ALL OK"
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add search, favorites pages, and mobile navigation"
```

> **Note on PWA/Service Worker:** `next export` (static output) does not natively support service workers. A service worker can be added post-MVP using `next-pwa` or a custom `public/sw.js`. This is left as a follow-up task since the core functionality (calculators, SEO, ads) does not require offline support.

---

### Task 15: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

- [ ] **Step 3: Verify all static pages generated**

```bash
ls out/ out/trabalhista/ out/financeiro/ out/previdencia/ out/utilidades/
```

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "chore: verify full build and test suite pass"
```
