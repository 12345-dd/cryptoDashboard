import axios from 'axios';

const BASE = import.meta.env.VITE_COINGECKO_API || 'https://api.coingecko.com/api/v3';
const PER_PAGE = Number(import.meta.env.VITE_PER_PAGE || 50);
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || null;

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// attach API key if present
api.interceptors.request.use((config) => {
  if (API_KEY) {
    config.headers['x-cg-pro-api-key'] = API_KEY;
  }
  return config;
});

export const markets = ({
  page = 1,
  per_page = PER_PAGE,
  vs_currency = 'usd',
  order = 'market_cap_desc',
} = {}) =>
  api.get('/coins/markets', {
    params: {
      vs_currency,
      order,
      per_page,
      page,
      price_change_percentage: '24h',
      sparkline: false,
    },
  });

export const trending = () => api.get('/search/trending');

export const coinDetails = (id) => api.get(`/coins/${id}`);

export default api;
