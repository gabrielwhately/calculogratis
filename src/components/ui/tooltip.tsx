'use client'

import React, { useId } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactElement
}

export function Tooltip({ content, children }: TooltipProps) {
  const id = useId()
  const tooltipId = `tooltip-${id}`

  return (
    <div className="group relative inline-block">
      {React.cloneElement(children, {
        'aria-describedby': tooltipId,
        tabIndex: children.props.tabIndex ?? 0,
        className: `${children.props.className || ''} outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full`.trim()
      })}
      <div 
        id={tooltipId}
        role="tooltip"
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block group-focus-within:block w-48 p-2 bg-navy dark:bg-slate-800 text-white text-[11px] font-normal leading-relaxed rounded-lg shadow-xl z-[60] border border-white/10 pointer-events-none animate-in fade-in zoom-in-95 duration-200"
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-navy dark:border-t-slate-800" />
      </div>
    </div>
  )
}
