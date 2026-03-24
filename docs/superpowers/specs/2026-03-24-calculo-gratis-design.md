# Calculo Gratis — Design Spec

## Overview

Site de calculadoras e simuladores brasileiros focado em SEO e monetizacao por display ads. Dominio: calculogratis.com. Visual app-like com cores navy blue e branco. Concorrentes (calculoexato.com.br e similares) tem milhoes de acessos com interfaces ultrapassadas — oportunidade de capturar trafego com UX moderna e melhor performance.

## Decisoes Tecnicas

| Decisao | Escolha | Motivo |
|---------|---------|--------|
| Framework | Next.js 14 (App Router) | SSG nativo, excelente SEO, ecossistema React para interatividade |
| CSS | Tailwind CSS | CSS minimo em producao, design system rapido, responsivo |
| Renderizacao | SSG Puro | Calculos rodam client-side, zero servidor, CDN puro |
| URLs | Por categoria (`/trabalhista/rescisao`) | Landing pages por categoria para SEO, organizacao futura |
| Deploy | Vercel | Nativo para Next.js, CDN global, free tier generoso |
| Calculos | Client-side (TypeScript puro) | Resultado instantaneo, sem latencia de rede |
| Linguagem | TypeScript | Tipagem forte, funcoes puras sem dependencias React |

## Arquitetura

```
src/
  app/
    layout.tsx              → Shell app-like (navbar, bottom nav, tema navy)
    page.tsx                → Home com grid de categorias
    sitemap.ts              → Sitemap gerado em build time
    robots.ts               → robots.txt
    manifest.ts             → PWA manifest
    trabalhista/
      page.tsx              → Landing "Calculadoras Trabalhistas"
      rescisao/page.tsx
      salario-liquido/page.tsx
      seguro-desemprego/page.tsx
    financeiro/
      page.tsx              → Landing "Calculadoras Financeiras"
      juros-simples/page.tsx
      juros-compostos/page.tsx
      financiamento/page.tsx  → Price e SAC (toggle)
    previdencia/
      page.tsx              → Landing "Calculadoras de Previdencia"
      aposentadoria/page.tsx
    utilidades/
      page.tsx              → Landing "Utilidades"
      gerador-cpf/page.tsx
      gerador-cnpj/page.tsx
  components/
    layout/                 → Navbar, BottomNav, Footer, AdSlot
    ui/                     → Input, Button, Card, ResultCard
    calculadoras/           → Componentes especificos de cada calculadora
  lib/
    calculadoras/           → Logica pura (funcoes sem React, testaveis)
    seo/                    → Helpers de metadata, JSON-LD schemas
    constants/              → Tabelas INSS, IRRF, FGTS, seguro desemprego
```

### Principios

- Logica de calculo separada dos componentes React (testavel, reutilizavel)
- Tabelas de impostos centralizadas em `lib/constants/` para facil atualizacao anual
- Cada calculadora e uma pagina SSG com metadata SEO e JSON-LD
- Componentes de UI reutilizaveis entre calculadoras

## Design System

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| Navy primario | `#1a2332` | Fundo navbar, header, card resultado |
| Navy secundario | `#2a3a4f` | Cards hover, elementos secundarios |
| Azul accent | `#3b82f6` | Botoes, links, elementos interativos |
| Branco | `#ffffff` | Fundo principal |
| Off-white | `#f8fafc` | Fundo alternativo, secoes |
| Texto primario | `#1e293b` | Corpo de texto |
| Texto secundario | `#64748b` | Labels, texto auxiliar |

### App-Like Features

- **Bottom navigation** (mobile): Inicio, Categorias, Favoritos, Busca
- **Top navbar** (desktop): Logo, categorias dropdown, busca
- **PWA**: manifest.json, service worker, icone instalavel
- **Transicoes suaves** entre paginas
- **Cards** com sombra sutil e bordas arredondadas
- **Resultado em destaque**: card navy com valor grande em branco

### Layout Padrao de Calculadora

```
Breadcrumb: Home > Categoria > Calculadora
H1: Calculadora de [Nome]
Descricao SEO (2-3 linhas)

[Formulario com inputs]
[Botao Calcular]

[Card resultado - fundo navy, texto branco, valor grande]
[Detalhamento em tabela]

[Ad slot]
[Conteudo explicativo SEO - 300-500 palavras]
[Ad slot]
[Calculadoras relacionadas]
```

## Calculadoras

### Trabalhista

| Calculadora | Inputs | Dados Externos |
|-------------|--------|----------------|
| Rescisao | Salario, datas admissao/demissao, tipo demissao, saldo FGTS | Tabela INSS/IRRF |
| Salario Liquido | Salario bruto, dependentes, outros descontos | Tabela INSS/IRRF |
| Seguro Desemprego | Ultimos 3 salarios, numero de solicitacoes | Tabela seguro desemprego |

### Financeiro

| Calculadora | Inputs | Dados Externos |
|-------------|--------|----------------|
| Juros Simples | Capital, taxa, periodo | Nenhum |
| Juros Compostos | Capital, taxa, periodo, aporte mensal | Nenhum |
| Financiamento (Price/SAC) | Valor imovel, entrada, taxa anual, prazo meses | Nenhum |

### Previdencia

| Calculadora | Inputs | Dados Externos |
|-------------|--------|----------------|
| Aposentadoria | Idade, sexo, tempo contribuicao, salarios contribuicao | Regras EC 103/2019: idade minima (65H/62M), tempo minimo contribuicao (20H/15M), calculo media 80% maiores salarios com fator previdenciario |

### Utilidades

| Calculadora | Inputs | Dados Externos |
|-------------|--------|----------------|
| Gerador CPF | Estado (opcional, para digito regional) | Algoritmo digitos verificadores |
| Gerador CNPJ | Nenhum | Algoritmo digitos verificadores |

Geradores incluem disclaimer: "Numeros gerados aleatoriamente, validos apenas para testes e desenvolvimento."

## SEO

### On-Page

- `<title>`: "Calculadora de [Nome] Online Gratis 2026 | Calculo Gratis"
- `<meta description>`: Descricao unica com keywords naturais por pagina
- **JSON-LD**: Schema `WebApplication` + `FAQPage` para rich snippets
- **H1** unico por pagina, **H2s** para secoes explicativas
- **Breadcrumbs** com schema markup
- **Conteudo explicativo** (300-500 palavras) abaixo do resultado
- **Internal linking**: cada calculadora linka para relacionadas

### Tecnico

- `sitemap.xml` gerado automaticamente
- `robots.txt` configurado
- `canonical` URLs em todas as paginas
- Open Graph e Twitter Cards
- Core Web Vitals: LCP < 1.5s, CLS = 0, INP < 100ms

### Landing Pages de Categoria

Cada categoria (`/trabalhista/`, `/financeiro/`, etc.) tem landing page propria que lista calculadoras da categoria com descricoes. Compete por keywords de categoria com volume alto.

## Monetizacao

- Componente `<AdSlot>` reutilizavel com props `size` e `position`
- Posicoes: apos resultado, meio do conteudo, final, sidebar (desktop)
- Nunca antes do formulario (nao atrapalha UX)
- Lazy load para nao impactar Core Web Vitals
- Inicialmente placeholders — injetar AdSense quando conta aprovada

## Testes

- Testes unitarios para cada arquivo em `lib/calculadoras/` com cenarios reais
- Cenarios: diferentes faixas INSS, com/sem justa causa, diferentes periodos
- Formatacao monetaria verificada
- Geradores de CPF/CNPJ validados com algoritmo de verificacao

## Validacao e Erros

- Validacao inline nos inputs: mensagem de erro abaixo do campo em vermelho (`#ef4444`)
- Regras por tipo: valores monetarios >= 0, datas no formato DD/MM/AAAA, datas de admissao antes de demissao, taxas entre 0-100%
- Botao "Calcular" desabilitado enquanto houver erros de validacao
- Inputs usam `inputmode="decimal"` para teclado numerico em mobile
- Formato brasileiro: virgula como separador decimal, ponto para milhares (R$ 1.234,56)
- Datas no formato DD/MM/AAAA com mascara automatica

## Locale e Formatacao

- Moeda: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
- Datas: `Intl.DateTimeFormat('pt-BR')`, inputs com mascara DD/MM/AAAA
- Numeros: virgula decimal, ponto milhares
- Parsing de input: aceitar tanto `1234.56` quanto `1234,56` e `1.234,56`
- Idioma fixo: portugues brasileiro (sem i18n)

## Busca

- Client-side: filtro por nome/descricao das calculadoras a partir de um indice JSON estatico gerado em build time
- UI: campo de busca no header (desktop) e na aba Busca (mobile)
- Resultado: lista filtrada de cards de calculadoras com link direto

## Favoritos

- Armazenados em `localStorage` (array de slugs)
- Aba "Favoritos" no bottom nav mostra calculadoras salvas
- Icone de estrela em cada calculadora para adicionar/remover
- Sem sincronizacao entre dispositivos (feature simples, sem backend)

## Acessibilidade

- Contraste minimo WCAG AA (4.5:1 para texto, 3:1 para elementos grandes)
- Todos os inputs com `<label>` associado
- Navegacao por teclado funcional (tab order logico, focus visible)
- Resultados anunciados via `aria-live="polite"` apos calculo
- Semantica HTML correta: `<main>`, `<nav>`, `<section>`, `<h1>`-`<h3>`

## PWA e Cache

- Estrategia cache-first para assets estaticos (CSS, JS, fontes)
- Network-first para paginas HTML (garante conteudo atualizado)
- Calculadoras funcionam offline apos primeiro acesso
- Manifest com `display: standalone`, tema navy, icones 192x512px
