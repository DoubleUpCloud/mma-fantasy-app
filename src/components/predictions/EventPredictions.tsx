"use client";

import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import BoutPrediction from './BoutPrediction';
import { Event, Bout } from '@/models';

interface Prediction {
  boutId: number;
  fighterId: string;
}

interface EventPredictionsProps {
  event: Event;
}

export default function EventPredictions({ event }: EventPredictionsProps) {
  const [predictions, setPredictions] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    severity: 'success' as 'error' | 'success' | 'info' | 'warning'
  });

  const handlePredictionChange = (boutId: number, prediction: string) => {
    setPredictions(prev => ({
      ...prev,
      [boutId]: prediction
    }));
  };

  const handleSubmit = async () => {
    // Validate that all bouts have predictions
    const missingPredictions = event.bouts?.some(bout => !predictions[bout.id]) || false;

    if (missingPredictions) {
      setAlertState({
        open: true,
        message: 'Please make predictions for all bouts before submitting.',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);

    try {
      // Format predictions for API
      const formattedPredictions = Object.entries(predictions).map(([boutId, fighterId]) => ({
        boutId: parseInt(boutId),
        fighterId
      }));

      // In a real implementation, this would be an API call
      // Since there's no endpoint yet, we'll just simulate a successful submission
      console.log('Submitting predictions:', {
        eventId: event.id,
        predictions: formattedPredictions
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAlertState({
        open: true,
        message: 'Your predictions have been saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error submitting predictions:', error);
      setAlertState({
        open: true,
        message: 'Failed to save predictions. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertState(prev => ({ ...prev, open: false }));
  };

  const predictionCount = Object.keys(predictions).length;
  const totalBouts = event.bouts?.length || 0;

  return (
    <Box sx={{ mt: 4 }}>
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Make Your Predictions
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Select the fighter you think will win each bout. You've made {predictionCount} of {totalBouts} predictions.
        </Typography>
      </Paper>

      {event.bouts && event.bouts.length > 0 ? (
        event.bouts.map((bout) => (
          <BoutPrediction
            key={bout.id}
            bout={bout}
            onPredictionChange={handlePredictionChange}
            currentPrediction={predictions[bout.id] || null}
          />
        ))
      ) : (
        <Alert severity="info">
          No fights scheduled for this event yet.
        </Alert>
      )}

      <Box sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={loading || predictionCount < totalBouts}
          sx={{ minWidth: 200 }}
        >
          {loading ? 'Saving...' : 'Submit Predictions'}
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
    </Box>
  );
}
