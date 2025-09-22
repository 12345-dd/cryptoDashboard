import React from 'react';
import { Grid, Typography } from '@mui/material';
import CoinsTable from '../components/CoinsTable/CoinsTable';
import Highlights from '../components/Highlights/Highlights';

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom fontWeight="bold">Crypto Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CoinsTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Highlights />
        </Grid>
      </Grid>
    </div>
  );
}
