/**
 * useCoins - simple data hook with tiny client-side cache.
 * - page is 1-indexed for API
 * - perPage: number of records per page
 * - search: simple name/symbol filter (client-side)
 *
 * NOTE: For very large apps, implement server-side search/paging.
 */

import { useEffect, useState, useRef } from 'react';
import { markets } from '../api/coingecko';

export default function useCoins({ page = 1, perPage = 50, search = '' } = {}) {
  const cache = useRef({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const key = `p${page}-s${search}`;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        if (cache.current[key]) {
          setData(cache.current[key]);
        } else {
          const res = await markets({ page, per_page: perPage });
          let items = res.data || [];
          if (search && search.trim()) {
            const q = search.trim().toLowerCase();
            items = items.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
          }
          cache.current[key] = items;
          if (mounted) setData(items);
        }
      } catch (e) {
        if (mounted) setError(e.message || 'Error fetching coins');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, [page, perPage, search]);

  return {
    data,
    loading,
    error,
    // simple refetch: clear cache and re-run (consumer can call)
    refetch: () => { cache.current = {}; }
  };
}
