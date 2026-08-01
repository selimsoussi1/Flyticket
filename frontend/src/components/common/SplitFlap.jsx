import React, { useEffect, useRef, useState } from 'react'

// The page's signature element: a departure-board "split-flap" character
// that flips whenever its value changes. Reused for airport codes, times,
// live prices, and the PNR reveal, so the whole booking flow feels like
// it's being typed onto the same board.
export default function SplitFlap({ value, className = '', charClassName = '' }) {
  const chars = String(value).split('')
  const prevRef = useRef(chars)
  const [flipping, setFlipping] = useState(() => chars.map(() => false))

  useEffect(() => {
    const prev = prevRef.current
    const next = String(value).split('')
    const flips = next.map((c, i) => c !== prev[i])
    setFlipping(flips)
    prevRef.current = next
    const t = setTimeout(() => setFlipping(next.map(() => false)), 450)
    return () => clearTimeout(t)
  }, [value])

  return (
    <span className={`inline-flex ${className}`}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={`flap-char ${flipping[i] ? 'flap-flip' : ''} ${charClassName}`}
        >
          <span className="flap-inner">{ch === ' ' ? '\u00A0' : ch}</span>
        </span>
      ))}
    </span>
  )
}
