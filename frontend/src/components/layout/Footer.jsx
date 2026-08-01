import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border-hairline)] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>DPTR — a booking-flow showcase. Fares and availability are simulated.</p>
        <p className="font-mono">BUILT WITH REACT · EXPRESS · TAILWIND</p>
      </div>
    </footer>
  )
}
