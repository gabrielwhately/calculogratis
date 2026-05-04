'use client'

import React from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-navy dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-lg shadow-xl z-[60] border border-white/10 pointer-events-none">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-navy dark:border-t-slate-800" />
      </div>
    </div>
  )
}
