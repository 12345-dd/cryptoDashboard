# Crypto Dashboard

React + Material UI crypto dashboard that consumes CoinGecko.

## Features
- All coins table (rank, name/symbol, icon, price, 24h change, market cap, 24h volume)
- Pagination, search (debounced), clickable rows -> detail modal
- Highlights: Top gainers, top losers, trending
- Loading & error states, basic client-side caching

## Run
1. Copy `.env.example` to `.env`
2. `npm install`
3. `npm start`

## Notes
- API: CoinGecko (no key required for typical endpoints)
- Design decisions: small reusable components, API adapter, simple hooks
- Future: add tests, server-side pagination, websocket real-time updates

