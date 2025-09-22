import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="body1" gutterBottom>{message}</Typography>
      <Button variant="contained" onClick={onRetry}>Retry</Button>
    </Box>
  );
}
