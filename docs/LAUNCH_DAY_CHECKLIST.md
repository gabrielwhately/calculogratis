# 🚀 Launch Day Marketing Checklist - calculo.gratis

This checklist is for the human owner (Gabriel) to execute once the technical deployment blocker is resolved.

## 1. Technical Verification (Production)
- [ ] Verify `https://calculo.gratis` is live.
- [ ] Verify SSL certificate is valid.
- [ ] Verify `/sitemap.xml` is accessible and contains all routes.
- [ ] Verify `/robots.txt` is correct.
- [ ] Verify `/es` subfolder works for Spanish users.

## 2. SEO & Indexing
- [ ] Submit sitemap to **Google Search Console**.
- [ ] Submit sitemap to **Bing Webmaster Tools**.
- [ ] Run a manual "Inspect URL" for the top 4 tools (Rescisão, Salário Líquido, IMC, Juros Compostos).

## 3. Analytics & Conversion
- [ ] Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is correctly set in Vercel environment variables.
- [ ] Use GA4 Real-Time view to verify:
    - [ ] `calculate` event fires when a user runs a tool.
    - [ ] `share_whatsapp` event fires.
    - [ ] `newsletter_signup` event fires.
    - [ ] `save_result` event fires.

## 4. Paid Media (Search Ads)
- [ ] Import `docs/GOOGLE_ADS_CONFIG.json` settings into Google Ads.
- [ ] Activate **Campaign 1 (Labor)**: Target CPA set to R$ 2.00.
- [ ] Activate **Campaign 2 (Financial)**: Target CPA set to R$ 1.50.

## 5. Partner Outreach (Backlinks)
- [ ] Send initial outreach emails using `docs/OUTREACH_TEMPLATES.md`.
- [ ] Focus on the "Featured" list in the templates (Exame, Infomoney, etc).
- [ ] Showcase the **Widget Configurator** (`/widgets/config`) in the emails.

## 6. Social Media Launch
- [ ] Post the "Helpful Friend" template from `docs/SOCIAL_MEDIA_TEMPLATES.md` to relevant WhatsApp groups.
- [ ] Record and upload the "Know Your Rights" series to TikTok/Reels using the scripts provided.

---
**Marketing Status**: 100% Prepared. All systems (Embeds, Newsletter, Viral Loop, Tracking) are implemented and pushed to GitHub.
**Blocker**: Awaiting Board Approval `b7bdb484` to reset CEO agent and deploy.
