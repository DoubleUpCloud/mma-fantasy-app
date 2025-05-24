"use client";

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { BetType, Bout, UserBet } from '@/models';
import { betService } from '@/lib/betService';
import BetTypeSelector from './BetTypeSelector';

interface BoutBetFormProps {
  bout: Bout;
  onBetPlaced?: (bet: UserBet) => void;
}

export default function BoutBetForm({ bout, onBetPlaced }: BoutBetFormProps) {
  const [selectedBetType, setSelectedBetType] = useState<BetType | null>(null);
  const [predictedValue, setPredictedValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: 'success' as 'error' | 'success' | 'info' | 'warning'
  });

  const handleBetTypeSelect = (betType: BetType) => {
    setSelectedBetType(betType);
  };

  const handlePredictedValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPredictedValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedBetType) {
      setAlertState({
        open: true,
        message: 'Please select a bet type',
        severity: 'warning'
      });
      return;
    }

    if (!predictedValue.trim()) {
      setAlertState({
        open: true,
        message: 'Please enter a prediction',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);

    try {
      const userBet = {
        bout_id: bout.id,
        bet_type_id: selectedBetType.id,
        predicted_value: predictedValue
      };

      //const result = await betService.createUserBet(userBet);

      // if (result) {
      //   setAlertState({
      //     open: true,
      //     message: 'Your bet has been placed successfully!',
      //     severity: 'success'
      //   });

      //   // Reset form
      //   setPredictedValue('');

      //   // Call callback if provided
      //   if (onBetPlaced) {
      //     onBetPlaced(result);
      //   }
      // } else {
      //   throw new Error('Failed to place bet');
      // }
    } catch (error) {
      console.error('Error placing bet:', error);
      setAlertState({
        open: true,
        message: 'Failed to place bet. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertState(prev => ({ ...prev, open: false }));
  };

  // Extract fighter information from the bout
  const fighter1 = {
    id: bout.fighter1_id,
    name: bout.fighter1_name || 'Fighter 1',
    record: bout.fighter1_record || 'N/A'
  };

  const fighter2 = {
    id: bout.fighter2_id,
    name: bout.fighter2_name || 'Fighter 2',
    record: bout.fighter2_record || 'N/A'
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        Place a Bet
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={5} sx={{ textAlign: 'right' }}>
          <Typography variant="subtitle1">{fighter1.name}</Typography>
          <Chip
            label={fighter1.record}
            size="small"
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color="text.secondary">VS</Typography>
        </Grid>
        <Grid item xs={5} sx={{ textAlign: 'left' }}>
          <Typography variant="subtitle1">{fighter2.name}</Typography>
          <Chip
            label={fighter2.record}
            size="small"
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <BetTypeSelector
          onBetTypeSelect={handleBetTypeSelect}
        />

        <TextField
          fullWidth
          label="Your Prediction"
          value={predictedValue}
          onChange={handlePredictedValueChange}
          margin="normal"
          helperText={selectedBetType ? `Enter your prediction for ${selectedBetType.name}` : 'Select a bet type first'}
          disabled={!selectedBetType}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading || !selectedBetType || !predictedValue.trim()}
        >
          {loading ? <CircularProgress size={24} /> : 'Place Bet'}
        </Button>
      </Box>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertState.severity}
          sx={{ width: '100%' }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}