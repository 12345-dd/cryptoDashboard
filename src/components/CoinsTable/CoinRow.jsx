import React from 'react';
import { TableRow, TableCell, Avatar, Box, Typography } from '@mui/material';
import { formatCurrency, formatPercent } from '../../utils/format';

export default function CoinRow({ coin, onClick }) {
  const change = coin.price_change_percentage_24h;
  const changeColor = change >= 0 ? 'success.main' : 'error.main';

  return (
    <TableRow hover onClick={() => onClick && onClick(coin)} sx={{ cursor: onClick ? 'pointer' : 'default' }}>
      <TableCell>{coin.market_cap_rank}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={coin.image} alt={coin.name} sx={{ width: 28, height: 28, mr: 1 }} />
          <Box>
            <Typography variant="body2">{coin.name}</Typography>
            <Typography variant="caption" color="text.secondary">{coin.symbol.toUpperCase()}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{formatCurrency(coin.current_price)}</TableCell>
      <TableCell sx={{ color: changeColor }}>{formatPercent(change)}</TableCell>
      <TableCell>{formatCurrency(coin.market_cap)}</TableCell>
      <TableCell>{formatCurrency(coin.total_volume)}</TableCell>
    </TableRow>
  );
}
