import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import { coinDetails } from '../../api/coingecko';
import Loader from '../Shared/Loader';

// Basic modal showing small description and some market numbers.
// Keep it lightweight (assignment asks for lightweight detail)
export default function CoinDetailsModal({ open, onClose, coin }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (open && coin) {
      setLoading(true);
      coinDetails(coin.id)
        .then((r) => { if (mounted) setDetails(r.data); })
        .catch(() => { if (mounted) setDetails(null); })
        .finally(() => { if (mounted) setLoading(false); });
    }
    return () => { mounted = false; };
  }, [open, coin]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{coin ? coin.name : 'Details'}</DialogTitle>
      <DialogContent dividers>
        {loading ? <Loader /> : (
          details ? (
            <Box>
              <Typography variant="body2" gutterBottom
                dangerouslySetInnerHTML={{ __html: details.description?.en?.split('. ')[0] || '' }}
              />
              <Typography variant="subtitle2">Market Data</Typography>
              <Typography variant="body2">Current Price: ${details.market_data?.current_price?.usd ?? 'N/A'}</Typography>
              <Typography variant="body2">Market Cap: ${details.market_data?.market_cap?.usd ?? 'N/A'}</Typography>
              <Typography variant="body2">24h High: ${details.market_data?.high_24h?.usd ?? 'N/A'}</Typography>
              <Typography variant="body2">24h Low: ${details.market_data?.low_24h?.usd ?? 'N/A'}</Typography>
            </Box>
          ) : (
            <Typography variant="body2">No details available</Typography>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
