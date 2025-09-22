import React, { useState } from 'react';
import {
  Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, TablePagination, Box
} from '@mui/material';
import useCoins from '../../hooks/useCoins';
import CoinRow from './CoinRow';
import Loader from '../Shared/Loader';
import ErrorState from '../Shared/ErrorState';
import SearchBar from '../Shared/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import CoinDetailsModal from '../CoinDetails/CoinDetailsModal';

export default function CoinsTable() {
  const [page, setPage] = useState(0);
  const [perPage] = useState(Number(import.meta.env.VITE_PER_PAGE || 50));
  const [q, setQ] = useState('');
  const search = useDebounce(q, 400);
  const { data, loading, error, refetch } = useCoins({ page: page + 1, perPage, search });
  const [selected, setSelected] = useState(null);

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} onRetry={() => { refetch(); }} />;

  return (
    <Paper sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
      <SearchBar value={q} onChange={setQ} />
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h %</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Volume (24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length ? (
              data.map((c) => <CoinRow key={c.id} coin={c} onClick={(coin) => setSelected(coin)} />)
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <TablePagination
          component="div"
          count={1000}                   
          page={page}
          onPageChange={(e, p) => setPage(p)}
          rowsPerPage={perPage}
          rowsPerPageOptions={[perPage]}
        />
      </Box>

      <CoinDetailsModal open={!!selected} onClose={() => setSelected(null)} coin={selected} />
    </Paper>
  );
}
