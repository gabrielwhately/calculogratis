# UX/UI Audit Report - Calculo Gratis

**Date:** April 30, 2026
**Auditor:** UX Designer Agent

## Executive Summary
The platform is in excellent technical shape with a consistent design system (navy/white), good mobile responsiveness, and strong SEO foundations. However, there is a **critical UX regression** in the Spanish (ES) localization: while page metadata and navigation are translated, the actual calculator forms (labels, placeholders, results) remain in Portuguese.

## Findings

### 1. Visual Consistency & Theme
- **Status:** PASS
- **Details:** The navy (#1a2332) and white theme is consistently applied across all reviewed pages. The use of Tailwind CSS classes is idiomatic and clean.
- **Components:** Shared components like `Card`, `FormCard`, and `ResultCard` ensure a unified look.

### 2. Mobile Responsiveness & Accessibility
- **Status:** PASS
- **Details:** 
  - Proper use of `inputMode` (decimal, numeric) ensures the correct keyboard appears on mobile.
  - Form fields use masks (currency, dates), significantly improving data entry UX.
  - Buttons are full-width on mobile, adhering to touch-target best practices.

### 3. Localization (i18n)
- **Status:** FAIL (Critical)
- **Problem:** The Spanish version of the site (`/es/...`) renders the calculator forms in Portuguese.
- **Root Cause:** `FORM_MAP` in `src/components/calculadoras/form-map.tsx` maps slugs to static components that have hardcoded Portuguese strings. These components do not currently adapt to the active locale.
- **Impact:** Spanish-speaking users will see translated titles and descriptions but will be confused by Portuguese labels like "Salário bruto", "Aporte mensal", etc.

### 4. SEO & Content
- **Status:** PASS
- **Details:** 
  - JSON-LD structured data is present on all pages.
  - Breadcrumbs are correctly implemented and localized.
  - Content for PT and ES versions is high-quality and informative.

## Recommendations

### Short-term (Immediate Fix)
1. **Refactor Form Components:** Update form components to detect the current locale (using `usePathname` or a `lang` prop) and display translated labels.
2. **Expand Translations:** Create a per-calculator translation structure to avoid bloating the global `translations.ts` file.

### Medium-term
1. **Accessibility Audit:** Perform a full WCAG 2.1 AA check using automated tools (Lighthouse) and manual screen reader testing.
2. **Interactive Results:** Add charts/graphs to calculators like "Juros Compostos" and "Investimentos" to improve visual feedback.


### 5. Component-level Accessibility
- **Status:** PASS
- **Details:** 
  - `Input` and `Select` components use proper label-input associations (`htmlFor` and `id`).
  - Error messages use `role="alert"` for screen readers.
  - Interactive elements have clear transition states and high contrast in both light and dark modes.

## Implementation Details for Localization Fix
The fix demonstrated in `JurosCompostosForm` and `RescisaoForm` uses `usePathname` to detect the `/es` prefix and selects a local `I18N` object. This avoids cross-contamination of translation files and keeps logic encapsulated.

### Example Pattern:
```typescript
const t = pathname?.startsWith('/es') ? I18N.es : I18N.pt;
// Use t.label, t.placeholder, etc.
```
