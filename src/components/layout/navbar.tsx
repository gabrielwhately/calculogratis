'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIAS } from '@/lib/constants/calculadoras'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-navy-light bg-navy text-white">
      <div className="container-app flex h-14 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">Calculo<span className="text-accent">Gratis</span></Link>
        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="text-sm text-slate-300 hover:text-white transition-colors">{cat.nome}</Link>
          ))}
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-300 hover:text-white" aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-navy-light bg-navy px-4 pb-4">
          {CATEGORIAS.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-slate-300 hover:text-white">{cat.nome}</Link>
          ))}
        </nav>
      )}
    </header>
  )
}
