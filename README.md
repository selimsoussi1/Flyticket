# DPTR — Flight Booking, Seat by Seat

A full-stack flight booking showcase: search real-feeling routes, pick your exact
seat on a live aircraft cabin map, and watch a boarding pass build itself in as
you move through the flow — right up to a confirmation code.

Inspired by real airline and OTA booking flows (Kayak, Delta, United), reimagined
around a "departure board" visual language: split-flap characters for flight
codes and prices, a night-sky cabin backdrop, and a genuinely interactive seat
map instead of a static image.

## Stack

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express (modular routes → controllers → in-memory data layer)
- **Data**: deterministic mock flight/seat generator (swap-ready for a real database or GDS API)

## Project structure

```
dptr/
├── backend/
│   ├── src/
│   │   ├── data/            # airports, aircraft seat templates, flight generator, bookings store
│   │   ├── controllers/     # request handlers
│   │   ├── routes/          # Express routers
│   │   ├── middleware/      # centralized error handling
│   │   ├── utils/           # ApiError, asyncHandler, PNR generator
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/      # Navbar (profile + notifications dropdowns), Footer, AppLayout
    │   │   ├── common/      # SplitFlap (signature element), icons, ProgressStepper
    │   │   └── booking/     # SearchForm, AirportField, FlightCard, SeatMap, BoardingPassPreview
    │   ├── context/         # ThemeContext (dark/light), BookingContext (in-progress booking state)
    │   ├── pages/           # Home, Results, SeatSelection, Checkout, Confirmation, MyTrips, Profile
    │   ├── services/api.js  # fetch wrapper for the Express API
    │   └── App.jsx / main.jsx
    └── package.json
```

## Running it locally

**Backend** (defaults to port 4000):
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend** (defaults to port 5173, proxies `/api` to the backend):
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. Search any two different airports from the list
below (autocomplete works off a live `/api/airports` call), pick a flight, tap
seats on the cabin map, fill in passenger details, and you'll land on a
confirmation page with a real generated confirmation code (PNR).

Sample airports to try: JFK, LHR, CDG, DXB, NRT, SIN, TUN, IST, BCN, FCO, GRU, SYD, YYZ, CAI, AMS, DOH.

## API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Service health check |
| GET | `/api/airports?q=` | Search airports by code, city, or name |
| GET | `/api/flights?from=&to=&date=&cabin=` | Search flights for a route/date |
| GET | `/api/flights/:id` | Get a single flight's detail |
| GET | `/api/flights/:id/seatmap` | Get the aircraft's seat map, with any already-booked seats marked occupied |
| POST | `/api/bookings` | Create a booking `{ flightId, cabin, seats[], passengers[], contact }` → returns a booking with a generated PNR |
| GET | `/api/bookings/:pnr` | Retrieve a booking by confirmation code |
| GET | `/api/bookings` | List all bookings made this server session ("My trips") |

Validation is enforced server-side: missing fields → `400`, unknown flight/booking
→ `404`, a seat someone else just took → `409`. All errors return the shape:
```json
{ "error": { "message": "..." } }
```

## Design system notes

- **Palette**: `ink` (near-midnight navy, dark mode), `paper` (light mode),
  `beacon` (amber — primary accent, echoes an airport beacon/departure board),
  `contrail` (sky blue — secondary accent), `signal-green` / `signal-red` (status).
- **Type**: Archivo for display headlines, Inter for body copy, IBM Plex Mono
  for anything data-like — flight codes, times, prices, seat IDs, PNRs.
- **Signature element**: `SplitFlap`, a reusable component that "flips" its
  characters on change like an airport split-flap board. It's used for airport
  codes, live prices, and the confirmation code reveal, so the whole flow reads
  as one continuous departure board rather than disconnected screens.
- **Seat map**: seats are real, addressable elements (not an image) — colored
  by cabin/status, with extra-legroom and exit-row callouts, animated select/
  deselect, and a running total that updates live.

## Talking points for a client demo

1. **Architecture** — clean separation of concerns: React components only
   render and dispatch; all business logic (fares, seat availability, PNR
   generation, validation) lives server-side behind a REST API, so either
   side can be swapped independently (e.g. a real GDS integration, or a
   native mobile client hitting the same API).
2. **Data layer is swap-ready** — `bookingsStore.js` and the flight/seat
   generators are the only files that would change to plug in Postgres or a
   real fares API; controllers and routes wouldn't need to move.
3. **State that mirrors a real booking flow** — `BookingContext` holds the
   in-progress search, flight, seats, and passengers exactly the way a real
   checkout would, and resets on a fresh search rather than leaking state
   between bookings.
4. **Every interaction is real, not decorative** — the seat map enforces
   actual occupied/available state from the server, the boarding pass reflects
   live selections, and validation errors (mismatched passenger count, a seat
   taken mid-flow) are handled the way a production booking flow has to.
5. **Deploying it** — the frontend is a static Vite build (drop straight onto
   Netlify/Vercel); the backend is a standalone Express server (Render,
   Railway, Fly.io, or a Netlify Function adapter). Point `VITE_API_URL` at
   wherever the backend ends up.

## Deploying to Netlify (frontend)

1. Push `frontend/` to a repo (or drag-and-drop the `dist/` folder after `npm run build`).
2. Build command: `npm run build` · Publish directory: `dist`.
3. Set an environment variable `VITE_API_URL` pointing at your deployed backend.
4. Deploy the `backend/` folder separately (Render/Railway/Fly.io are the
   simplest for a plain Express server) — Netlify itself doesn't host
   long-running Node servers, only static sites and serverless functions.
