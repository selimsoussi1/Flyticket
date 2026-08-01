import React from 'react'
import { Link } from 'react-router-dom'
import { PlaneIcon } from '../components/common/icons.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 py-24 text-center">
      <PlaneIcon width={32} height={32} className="mb-4 text-muted" />
      <h1 className="font-display text-2xl font-bold">This gate doesn't exist</h1>
      <p className="mt-1 text-sm text-muted">The page you're looking for has already departed.</p>
      <Link to="/" className="mt-6 rounded-lg bg-beacon px-4 py-2.5 text-sm font-semibold text-ink-950">Back to search</Link>
    </div>
  )
}
