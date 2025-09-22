import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import HighlightCard from './HighlightCard';
import { markets, trending } from '../../api/coingecko';

export default function Highlights() {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [tr, setTr] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await markets({ page: 1, per_page: 100 });
        if (!mounted) return;
        const data = res.data || [];
        const sortedByChange = [...data].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
        setGainers(sortedByChange.slice(0, 5));
        setLosers(sortedByChange.slice(-5).reverse());

        const t = await trending();
        const coins = (t.data?.coins || []).map((c) => ({
          id: c.item.id,
          name: c.item.name,
          symbol: c.item.symbol,
          image: c.item.small,
          current_price: null,
          price_change_percentage_24h: null
        }));
        setTr(coins);
      } catch (e) {
        console.debug('Highlights load failed', e);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HighlightCard title="Top Gainers (24h)" items={gainers} />
      </Grid>
      <Grid item xs={12}>
        <HighlightCard title="Top Losers (24h)" items={losers} />
      </Grid>
      <Grid item xs={12}>
        <HighlightCard title="Trending" items={tr} />
      </Grid>
    </Grid>
  );
}
