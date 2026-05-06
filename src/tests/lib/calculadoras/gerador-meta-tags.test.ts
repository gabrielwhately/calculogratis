import { describe, it, expect } from 'vitest'
import { gerarMetaTags } from '@/lib/calculadoras/gerador-meta-tags'

const BASE_INPUT = {
  title: 'Minha Página',
  description: 'Uma descrição útil',
  url: 'https://exemplo.com',
  imageUrl: 'https://exemplo.com/img.png',
  siteName: 'ExemploSite',
}

describe('gerarMetaTags', () => {
  it('includes <title> tag with provided title', () => {
    const out = gerarMetaTags(BASE_INPUT)
    expect(out).toContain('<title>Minha Página</title>')
  })

  it('includes description meta tag', () => {
    const out = gerarMetaTags(BASE_INPUT)
    expect(out).toContain('<meta name="description" content="Uma descrição útil" />')
  })

  it('includes Open Graph tags', () => {
    const out = gerarMetaTags(BASE_INPUT)
    expect(out).toContain('og:title')
    expect(out).toContain('og:description')
    expect(out).toContain('og:url')
    expect(out).toContain('og:image')
    expect(out).toContain('og:site_name')
  })

  it('includes Twitter card tags', () => {
    const out = gerarMetaTags(BASE_INPUT)
    expect(out).toContain('twitter:card')
    expect(out).toContain('twitter:title')
    expect(out).toContain('twitter:image')
  })

  it('escapes HTML special chars in title', () => {
    const out = gerarMetaTags({ ...BASE_INPUT, title: '<Script> & "test"' })
    expect(out).not.toContain('<Script>')
    expect(out).toContain('&lt;Script&gt;')
    expect(out).toContain('&amp;')
    expect(out).toContain('&quot;')
  })

  it('omits og:image when imageUrl is empty', () => {
    const out = gerarMetaTags({ ...BASE_INPUT, imageUrl: '' })
    expect(out).not.toContain('og:image')
    expect(out).not.toContain('twitter:image')
  })

  it('omits title tags when title is empty', () => {
    const out = gerarMetaTags({ ...BASE_INPUT, title: '' })
    expect(out).not.toContain('<title>')
    expect(out).not.toContain('og:title')
  })

  it('omits og:site_name when siteName is empty', () => {
    const out = gerarMetaTags({ ...BASE_INPUT, siteName: '' })
    expect(out).not.toContain('og:site_name')
  })
})
