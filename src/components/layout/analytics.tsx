'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export function trackCalculadoraEvent(action: string, calculadora: string, value?: number) {
  trackEvent(action, {
    event_category: 'calculadora',
    event_label: calculadora,
    value,
  })
}

export function trackEvent(action: string, params: Record<string, string | number | boolean | undefined>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    ;(window as unknown as { gtag: (type: string, action: string, params: Record<string, string | number | boolean | undefined>) => void }).gtag('event', action, params)
  }
}
