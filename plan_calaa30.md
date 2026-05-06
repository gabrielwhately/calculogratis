# Plano de Revisão de Conteúdo, Copy e SEO - CALAA-30

Este plano detalha as melhorias identificadas na primeira fase de análise do site `calculogratis`.

## 1. Correção de Acentuação e Ortografia (Prioridade Alta)
Foi identificada uma falta consistente de acentuação nos textos manuais (prop `conteudo`) em diversas páginas. Isso afeta a credibilidade e o SEO.

- **Exemplos de correções:**
  - `Indice` -> `Índice`
  - `relacao` -> `relação`
  - `formula` -> `fórmula`
  - `calculo` -> `cálculo`
  - `Organizacao` -> `Organização`
  - `Saude` -> `Saúde`
  - `13o` -> `13º`
  - `3o` -> `3º`
  - `possuivel` -> `possível`

## 2. Otimização de Meta Titles e Descriptions
As meta tags definidas em `src/lib/constants/calculadoras.ts` estão boas, mas podem ser mais chamativas para aumentar o CTR (Click-Through Rate).

- **Proposta:** Adicionar gatilhos mentais como "Rápido", "Fácil", "Atualizado 2026" em mais descrições.
- **Exemplo:** Em vez de "Calcule seu IMC", usar "Calculadora de IMC Online Grátis: Descubra seu peso ideal em segundos (Atualizado 2026)".

## 3. Melhoria de Copy para Conversão
O texto atual é muito informativo (estilo enciclopédia). Para aumentar o engajamento:

- Adicionar CTAs (Call to Action) mais claros.
- Destacar os benefícios da ferramenta (Sem cadastro, 100% grátis).
- Simplificar parágrafos longos.

## 4. Estrutura de Links Internos
A estrutura atual já conta com bons links internos, mas podemos expandir para ferramentas utilitárias relacionadas em cada página de categoria.

## Cronograma de Execução
1. **Fase 1:** Correção em massa de acentuação nas páginas principais (Trabalhista e Saúde).
2. **Fase 2:** Revisão de copy das calculadoras mais populares (Rescisão, Salário Líquido, IMC, Juros Compostos).
3. **Fase 3:** Ajuste fino de meta tags para SEO.
