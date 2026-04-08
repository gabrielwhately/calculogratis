interface MetaTagsInput {
  title: string
  description: string
  url: string
  imageUrl: string
  siteName: string
}

export function gerarMetaTags(input: MetaTagsInput): string {
  const { title, description, url, imageUrl, siteName } = input

  const lines: string[] = []

  if (title) {
    lines.push(`<title>${escapeHtml(title)}</title>`)
    lines.push(`<meta name="title" content="${escapeHtml(title)}" />`)
  }

  if (description) {
    lines.push(`<meta name="description" content="${escapeHtml(description)}" />`)
  }

  // Open Graph
  lines.push('')
  lines.push('<!-- Open Graph / Facebook -->')
  lines.push('<meta property="og:type" content="website" />')
  if (title) lines.push(`<meta property="og:title" content="${escapeHtml(title)}" />`)
  if (description) lines.push(`<meta property="og:description" content="${escapeHtml(description)}" />`)
  if (url) lines.push(`<meta property="og:url" content="${escapeHtml(url)}" />`)
  if (imageUrl) lines.push(`<meta property="og:image" content="${escapeHtml(imageUrl)}" />`)
  if (siteName) lines.push(`<meta property="og:site_name" content="${escapeHtml(siteName)}" />`)

  // Twitter
  lines.push('')
  lines.push('<!-- Twitter -->')
  lines.push('<meta property="twitter:card" content="summary_large_image" />')
  if (title) lines.push(`<meta property="twitter:title" content="${escapeHtml(title)}" />`)
  if (description) lines.push(`<meta property="twitter:description" content="${escapeHtml(description)}" />`)
  if (url) lines.push(`<meta property="twitter:url" content="${escapeHtml(url)}" />`)
  if (imageUrl) lines.push(`<meta property="twitter:image" content="${escapeHtml(imageUrl)}" />`)

  return lines.join('\n')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
