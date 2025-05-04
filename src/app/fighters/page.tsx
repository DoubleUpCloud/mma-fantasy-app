"use client";

import { useState, useEffect } from 'react';
import { Snackbar, Alert, TextField, Box, Button, Container, Typography } from '@mui/material';
import { fetchFighters, searchFighters } from '@/lib/api';
import FightersList from '@/components/fighters/FightersList';

interface Fighter {
  id: number;
  created_at: string;
  name: string;
  wins: number;
  losses: number;
  draws: number;
  updated_at: string;
}

export default function FightersPage() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getFighters = async () => {
      try {
        const data = await fetchFighters();
        setFighters(data);
      } catch (err) {
        setError('Failed to load fighters. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFighters();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // If search term is empty, fetch all fighters
      setLoading(true);
      try {
        const data = await fetchFighters();
        setFighters(data);
      } catch (err) {
        setError('Failed to load fighters. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    setIsSearching(true);
    setLoading(true);
    try {
      const data = await searchFighters(searchTerm);
      setFighters(data);
    } catch (err) {
      setError('Failed to search fighters. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          MMA Fighters
        </Typography>

        <Box sx={{ display: 'flex', mb: 4, gap: 2 }}>
          <TextField
            label="Search fighters by name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ flexGrow: 1 }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </Box>
      </Container>

      <FightersList 
        fighters={fighters} 
        loading={loading} 
        error={error} 
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
