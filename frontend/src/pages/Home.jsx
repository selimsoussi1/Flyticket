import React from 'react'
import { motion } from 'framer-motion'
import SearchForm from '../components/booking/SearchForm.jsx'
import { PlaneIcon } from '../components/common/icons.jsx'

const HIGHLIGHTS = [
  { title: 'Live cabin map', body: 'Pick your exact seat on a real aircraft layout, not a placeholder grid.' },
  { title: 'No surprise fees', body: 'Seat price and taxes are shown before you touch checkout.' },
  { title: 'Boarding pass as you go', body: 'Your pass fills itself in at every step, right up to your PNR.' }
]

export default function Home() {
  return (
    <div className="sky-wash">
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-14 sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full surface-2 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wide text-beacon-dim dark:text-beacon">
            <PlaneIcon width={13} height={13} /> Now boarding
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Book the flight.<br />Choose the seat.<br />
            <span className="text-beacon-dim dark:text-beacon">Watch the board fill in.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
            Search real routes, tap a seat on the actual cabin layout, and get a boarding pass
            that builds itself as you go — the way flying should feel from the browser.
          </p>
        </motion.div>

        <SearchForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-xl2 surface card-shadow p-4">
              <p className="text-sm font-semibold">{h.title}</p>
              <p className="mt-1 text-sm text-muted">{h.body}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
