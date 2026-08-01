import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import Home from './pages/Home.jsx'
import Results from './pages/Results.jsx'
import SeatSelection from './pages/SeatSelection.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirmation from './pages/Confirmation.jsx'
import MyTrips from './pages/MyTrips.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/flights/:id/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation/:pnr" element={<Confirmation />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  )
}
