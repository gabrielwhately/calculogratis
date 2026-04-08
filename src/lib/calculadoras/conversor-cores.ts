interface CorResult { hex: string; r: number; g: number; b: number; h: number; s: number; l: number }

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) return null
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('')
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v } }
  const hue2rgb = (p: number, q: number, t: number) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1/6) return p + (q - p) * 6 * t; if (t < 1/2) return q; if (t < 2/3) return p + (q - p) * (2/3 - t) * 6; return p }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return { r: Math.round(hue2rgb(p, q, h + 1/3) * 255), g: Math.round(hue2rgb(p, q, h) * 255), b: Math.round(hue2rgb(p, q, h - 1/3) * 255) }
}

export function converterCor(input: string, tipo: 'hex' | 'rgb' | 'hsl'): CorResult | null {
  let r = 0, g = 0, b = 0
  if (tipo === 'hex') {
    const rgb = hexToRgb(input)
    if (!rgb) return null
    r = rgb.r; g = rgb.g; b = rgb.b
  } else if (tipo === 'rgb') {
    const match = input.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (!match) return null
    r = parseInt(match[1]); g = parseInt(match[2]); b = parseInt(match[3])
  } else {
    const match = input.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
    if (!match) return null
    const rgb = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
    r = rgb.r; g = rgb.g; b = rgb.b
  }
  const hex = rgbToHex(r, g, b)
  const hsl = rgbToHsl(r, g, b)
  return { hex, r, g, b, h: hsl.h, s: hsl.s, l: hsl.l }
}
