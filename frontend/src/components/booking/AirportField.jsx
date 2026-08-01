import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { api } from '../../services/api.js'
import { MapPinIcon } from '../common/icons.jsx'

// Autocomplete input backed by GET /api/airports?q=. Debounced so it reads
// like a real production field rather than filtering a hardcoded array.
export default function AirportField({ label, value, onChange, placeholder }) {
  const [query, setQuery] = useState(value?.city ? `${value.city} (${value.code})` : '')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleQueryChange(e) {
    const q = e.target.value
    setQuery(q)
    setOpen(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await api.searchAirports(q)
        setResults(data.airports)
      } catch {
        setResults([])
      }
    }, 180)
  }

  function pick(airport) {
    onChange(airport)
    setQuery(`${airport.city} (${airport.code})`)
    setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</label>
      <div className="flex items-center gap-2 rounded-lg surface-2 px-3 py-2.5">
        <MapPinIcon width={16} height={16} className="shrink-0 text-muted" />
        <input
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14 }}
            className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-xl surface card-shadow p-1"
          >
            {results.map((a) => (
              <li key={a.code}>
                <button
                  type="button"
                  onClick={() => pick(a)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:surface-2"
                >
                  <span>
                    <span className="text-sm font-medium">{a.city}</span>
                    <span className="ml-1 text-xs text-muted">{a.name}</span>
                  </span>
                  <span className="font-mono text-xs font-semibold text-beacon-dim dark:text-beacon">{a.code}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
