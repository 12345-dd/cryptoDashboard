import React from 'react';
import { Card, CardHeader, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { formatCurrency, formatPercent } from '../../utils/format';

export default function HighlightCard({ title, items = [] }) {
  return (
    <Card>
      <CardHeader title={title} />
      <List dense>
        {items && items.length ? items.map((it) => (
          <ListItem key={it.id}>
            <ListItemAvatar>
              <Avatar src={it.image} />
            </ListItemAvatar>
            <ListItemText
              primary={`${it.name} (${it.symbol?.toUpperCase()})`}
              secondary={<Typography variant="caption">{formatCurrency(it.current_price)} • {formatPercent(it.price_change_percentage_24h)}</Typography>}
            />
          </ListItem>
        )) : (
          <ListItem>
            <ListItemText primary="No data" />
          </ListItem>
        )}
      </List>
    </Card>
  );
}
