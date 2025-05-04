"use client";

import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid,
  Skeleton,
  Alert,
  Chip,
  Paper
} from '@mui/material';

interface Fighter {
  id: number;
  created_at: string;
  name: string;
  wins: number;
  losses: number;
  draws: number;
  updated_at: string;
}

interface FightersListProps {
  fighters: Fighter[];
  loading: boolean;
  error: string | null;
}

export default function FightersList({ fighters, loading, error }: FightersListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : fighters.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No fighters found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {fighters.map((fighter) => (
            <Grid item xs={12} sm={6} md={4} key={fighter.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Typography variant="h6" component="div" gutterBottom>
                  {fighter.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={`Wins: ${fighter.wins}`} color="success" size="small" />
                  <Chip label={`Losses: ${fighter.losses}`} color="error" size="small" />
                  <Chip label={`Draws: ${fighter.draws}`} color="default" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Last updated: {formatDate(fighter.updated_at)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
