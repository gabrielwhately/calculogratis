# Marketing Launch Plan - calculo.gratis

## 1. Executive Summary
The launch of `calculo.gratis` aims to establish the platform as the premier destination for free, high-quality calculators and simulators in Brazil and the LATAM market. With 160+ tools already functional in Portuguese and Spanish, the focus is on rapid user acquisition through SEO, viral loops via WhatsApp, and targeted performance marketing.

**Core Value Proposition:** 100% Free · No Registration · Instant Professional Results.

---

## 2. SEO & Content Strategy
Our organic growth strategy leverages the high search volume for calculator-related keywords.

### 2.1 Keyword Targeting (Tiered Approach)
- **Tier 1 (High Volume/High Competition):** 
    - *Calculadora de Rescisão*, *Salário Líquido*, *Calculadora de IMC*, *Juros Compostos*.
    - Strategy: Dedicated landing pages with deep topical authority (FAQ, formulas, legal context).
- **Tier 2 (Niche/High Conversion):**
    - *Simulador de Financiamento SAC vs Price*, *Custo de Funcionário CLT*, *Cálculo de Reajuste de Aluguel IGP-M*.
    - Strategy: Precise tools with comparison features to attract professional users.
- **Tier 3 (Long-tail Queries):**
    - *Quanto recebo se pedir demissão com 2 anos*, *Como calcular juros de empréstimo pessoal*.
    - Strategy: "Mini-guides" within the calculator pages answering these specific questions.

### 2.2 Technical SEO Maintenance
- Monthly audit of `sitemap.ts` to ensure all 160+ routes are indexed.
- Continuous monitoring of Core Web Vitals (the site is currently lightweight and fast).
- Hreflang verification for PT/ES parity to ensure Google serves the correct version to LATAM users.

---

## 3. Social Media & Viral Growth (WhatsApp Focus)
Since calculators are often used during decision-making (financial, health, labor), private sharing via WhatsApp is our primary viral driver.

### 3.1 WhatsApp Sharing Optimization
- **Actionable Sharing:** Current implementation in `ResultCard` is excellent. We will enhance it by:
    - Adding "Emoji cues" to the shared text to make it more readable on mobile.
    - Implementing a "Share result image" feature (V2) to increase visual appeal.
- **Viral Loop:** On the result page, after a user calculates, we will display: *"Help a friend understand their [Salary/IMC/Loan] too. Share this tool!"*

### 3.2 Social Media Prescence
- **Short-form Video (TikTok/Reels):** 
    - "Financial Hacks" series showing how to use the *Juros Compostos* calculator to plan retirement.
    - "Know Your Rights" series using the *Rescisão* tool.
- **Branded Assets:** Every shared link uses the dynamic `opengraph-image.tsx`, ensuring a professional look that builds trust.

---

## 4. Performance Marketing (Ads)
Targeted ad spend will provide the initial "spark" for the SEO engine.

### 4.1 Google Search Ads
- **Campaign 1 (Labor):** Keywords: "Calculadora rescisão", "Cálculo FGTS".
- **Campaign 2 (Financial):** Keywords: "Simulador financiamento", "Juros simples vs compostos".
- **Strategy:** Use "Exact Match" for high-intent keywords to keep CPA (Cost per Acquisition) low.

### 4.2 Meta Ads (Facebook/Instagram)
- **Interest Targeting:** Users interested in "Financial Planning", "Health & Wellness", "Career Advice".
- **Retargeting:** Show "Calculadora de Salário Líquido" to users who recently visited job boards (via custom segments).

---

## 5. Post-Launch Roadmap (Growth Sprints)

### Phase 1: The "Trust" Sprint (Weeks 1-2)
- Submit sitemaps to Google Search Console and Bing Webmaster Tools.
- Launch initial Google Ads campaign for the Top 5 tools.
- Setup Google Analytics 4 (GA4) event tracking for all "Calculate" and "Share" actions.

### Phase 2: The "Widget" Sprint (Weeks 3-4)
- **Embed Feature:** Release lightweight iframe versions of the top calculators for bloggers and news portals to embed.
- **Backlink Outreach:** Contact financial and HR blogs offering the free embeddable tools in exchange for a backlink.

### Phase 3: The "Retention" Sprint (Month 2)
- **Newsletter:** Implement a "Weekly Financial Tip" lead magnet.
- **Personalization:** Allow users to save their results locally (Local Storage) for future comparison.

---

## 6. Success Metrics (KPIs)
- **Traffic:** 50k unique visitors in Month 1.
- **Virality:** >5% Share-to-Calculation ratio (WhatsApp focus).
- **Engagement:** >2 tools used per session.
- **SEO:** Top 10 ranking for at least 3 "Tier 1" keywords by Month 3.
