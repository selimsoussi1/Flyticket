// Small inline icon set (no external icon dependency), used across the
// navbar, forms, and seat legend.
import React from 'react'

const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const PlaneIcon = (p) => (
  <svg {...base} {...p}><path d="M22 12L3 4l3.5 8L3 20z" /><path d="M6.5 12H22" /></svg>
)
export const SearchIcon = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
)
export const SwapIcon = (p) => (
  <svg {...base} {...p}><path d="M7 16V4M7 4L3 8M7 4l4 4" /><path d="M17 8v12m0 0l4-4m-4 4l-4-4" /></svg>
)
export const CalendarIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
)
export const UsersIcon = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" /><circle cx="17" cy="9" r="2.4" /><path d="M22 20c0-2.6-2-4.8-4.7-5.6" /></svg>
)
export const BellIcon = (p) => (
  <svg {...base} {...p}><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 004 0" /></svg>
)
export const SettingsIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1h.2a2 2 0 110 4h-.2a1.7 1.7 0 00-1.5 1z" /></svg>
)
export const ChevronDownIcon = (p) => (
  <svg {...base} {...p}><path d="M6 9l6 6 6-6" /></svg>
)
export const CheckIcon = (p) => (
  <svg {...base} {...p}><path d="M20 6L9 17l-5-5" /></svg>
)
export const SuitcaseIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>
)
export const MapPinIcon = (p) => (
  <svg {...base} {...p}><path d="M12 22s7-6.4 7-12a7 7 0 10-14 0c0 5.6 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
export const SunIcon = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>
)
export const MoonIcon = (p) => (
  <svg {...base} {...p}><path d="M20 14.5A8.5 8.5 0 1110.4 4a7 7 0 009.6 10.5z" /></svg>
)
export const TicketIcon = (p) => (
  <svg {...base} {...p}><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z" /><path d="M10 6v12" strokeDasharray="2 3" /></svg>
)
export const LogoutIcon = (p) => (
  <svg {...base} {...p}><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><path d="M10 17l5-5-5-5M15 12H3" /></svg>
)
