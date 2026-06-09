/**
 * Tests for Next.js metadata route handlers (manifest, robots, sitemap).
 * These functions have zero coverage — each test documents the contract
 * and guards against accidental regressions in SEO-critical output.
 */
import { describe, it, expect } from 'vitest'
import manifest from '@/app/manifest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { BRAND_URL } from '@/lib/constants/branding'

// ---------------------------------------------------------------------------
// manifest()
// ---------------------------------------------------------------------------
describe('manifest', () => {
  it('returns the correct display mode', () => {
    expect(manifest().display).toBe('standalone')
  })

  it('start_url is /', () => {
    expect(manifest().start_url).toBe('/')
  })

  it('theme_color matches navy brand color', () => {
    expect(manifest().theme_color).toBe('#1a2332')
  })

  it('background_color is white', () => {
    expect(manifest().background_color).toBe('#ffffff')
  })

  it('includes both 192x192 and 512x512 icons', () => {
    const icons = manifest().icons ?? []
    const sizes = icons.map((i) => i.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
  })

  it('all icons have image/png type', () => {
    const icons = manifest().icons ?? []
    icons.forEach((icon) => {
      expect(icon.type).toBe('image/png')
    })
  })

  it('name and short_name are non-empty strings', () => {
    const m = manifest()
    expect(typeof m.name).toBe('string')
    expect(m.name!.length).toBeGreaterThan(0)
    expect(typeof m.short_name).toBe('string')
    expect(m.short_name!.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// robots()
// ---------------------------------------------------------------------------
describe('robots', () => {
  it('allows all user agents', () => {
    const r = robots()
    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules
    expect(rules.userAgent).toBe('*')
    expect(rules.allow).toBe('/')
  })

  it('sitemap URL ends with /sitemap.xml', () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/)
  })

  it('sitemap URL starts with the brand URL', () => {
    expect(robots().sitemap).toMatch(new RegExp(`^${BRAND_URL.replace('.', '\\.')}`))
  })

  it('does not include a disallow rule for /', () => {
    const r = robots()
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
    rules.forEach((rule) => {
      const disallow = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow]
      expect(disallow).not.toContain('/')
    })
  })
})

// ---------------------------------------------------------------------------
// sitemap()
// ---------------------------------------------------------------------------
describe('sitemap', () => {
  it('returns a non-empty array', () => {
    const entries = sitemap()
    expect(entries.length).toBeGreaterThan(0)
  })

  it('every entry has a url string', () => {
    sitemap().forEach((entry) => {
      expect(typeof entry.url).toBe('string')
      expect(entry.url.length).toBeGreaterThan(0)
    })
  })

  it('every url starts with the brand base URL', () => {
    const base = BRAND_URL
    sitemap().forEach((entry) => {
      expect(entry.url).toMatch(new RegExp(`^${base.replace('.', '\\.')}`))
    })
  })

  it('homepage entry (/) has priority 1 and is present', () => {
    const homepage = sitemap().find((e) => e.url === BRAND_URL)
    expect(homepage).toBeDefined()
    expect(homepage!.priority).toBe(1)
  })

  it('ES homepage (/es) entry exists with priority >= 0.8', () => {
    const esHome = sitemap().find((e) => e.url === `${BRAND_URL}/es`)
    expect(esHome).toBeDefined()
    expect(esHome!.priority).toBeGreaterThanOrEqual(0.8)
  })

  it('all priorities are between 0 and 1 inclusive', () => {
    sitemap().forEach((entry) => {
      if (entry.priority != null) {
        expect(entry.priority).toBeGreaterThanOrEqual(0)
        expect(entry.priority).toBeLessThanOrEqual(1)
      }
    })
  })

  it('no duplicate URLs', () => {
    const urls = sitemap().map((e) => e.url)
    const unique = new Set(urls)
    expect(unique.size).toBe(urls.length)
  })

  it('every entry has a lastModified date', () => {
    sitemap().forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date)
    })
  })

  it('calculator pages have priority 0.9', () => {
    const calcPages = sitemap().filter(
      (e) => e.priority === 0.9 && !e.url.endsWith('/es') && e.url !== BRAND_URL,
    )
    expect(calcPages.length).toBeGreaterThan(0)
  })

  it('changeFrequency values are valid', () => {
    const valid = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
    sitemap().forEach((entry) => {
      if (entry.changeFrequency) {
        expect(valid.has(entry.changeFrequency)).toBe(true)
      }
    })
  })
})
