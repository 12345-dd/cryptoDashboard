import React from 'react';
import { TextField, Box } from '@mui/material';

export default function SearchBar({ value, onChange, placeholder = 'Search by name or symbol' }) {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Box>
  );
}
