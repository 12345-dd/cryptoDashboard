import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Container } from '@mui/material';

export default function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Container>
  );
}

