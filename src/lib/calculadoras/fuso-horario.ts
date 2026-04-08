export const FUSOS: { value: string; label: string }[] = [
  { value: 'America/Sao_Paulo', label: 'Brasilia (BRT, GMT-3)' },
  { value: 'America/New_York', label: 'Nova York (EST, GMT-5)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST, GMT-8)' },
  { value: 'America/Chicago', label: 'Chicago (CST, GMT-6)' },
  { value: 'Europe/London', label: 'Londres (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET, GMT+1)' },
  { value: 'Europe/Berlin', label: 'Berlim (CET, GMT+1)' },
  { value: 'Europe/Lisbon', label: 'Lisboa (WET, GMT)' },
  { value: 'Asia/Tokyo', label: 'Toquio (JST, GMT+9)' },
  { value: 'Asia/Shanghai', label: 'Pequim (CST, GMT+8)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST, GMT+4)' },
  { value: 'Asia/Kolkata', label: 'Mumbai (IST, GMT+5:30)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST, GMT+10)' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST, GMT+12)' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires (ART, GMT-3)' },
  { value: 'America/Mexico_City', label: 'Cidade do Mexico (CST, GMT-6)' },
  { value: 'America/Manaus', label: 'Manaus (AMT, GMT-4)' },
  { value: 'America/Noronha', label: 'Fernando de Noronha (FNT, GMT-2)' },
  { value: 'America/Rio_Branco', label: 'Rio Branco (ACT, GMT-5)' },
]

export function converterFuso(hora: string, fusoOrigem: string, fusoDestino: string): { horaOrigem: string; horaDestino: string; diferenca: string } {
  const [h, m] = hora.split(':').map(Number)
  const now = new Date()
  now.setHours(h, m, 0, 0)

  const formatOpts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false }
  const horaOrigem = new Intl.DateTimeFormat('pt-BR', { ...formatOpts, timeZone: fusoOrigem }).format(now)
  const horaDestino = new Intl.DateTimeFormat('pt-BR', { ...formatOpts, timeZone: fusoDestino }).format(now)

  const getOffset = (tz: string) => { const d = new Date(); const s = d.toLocaleString('en-US', { timeZone: tz }); return (d.getTime() - new Date(s).getTime()) / 3600000 }
  const diff = getOffset(fusoDestino) - getOffset(fusoOrigem)
  const sign = diff >= 0 ? '+' : ''
  return { horaOrigem, horaDestino, diferenca: `${sign}${diff.toFixed(1)}h` }
}
