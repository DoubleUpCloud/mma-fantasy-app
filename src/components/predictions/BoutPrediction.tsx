"use client";

import { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Typography,
  Paper,
  Grid,
  Chip
} from '@mui/material';
import { Bout } from '@/models';

interface BoutPredictionProps {
  bout: Bout;
  onPredictionChange: (boutId: number, prediction: string) => void;
  currentPrediction: string | null;
}

export default function BoutPrediction({ bout, onPredictionChange, currentPrediction }: BoutPredictionProps) {
  const [prediction, setPrediction] = useState<string>(currentPrediction || '');

  const handlePredictionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrediction(value);
    onPredictionChange(bout.id, value);
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5} sx={{ textAlign: 'right' }}>
          <Typography variant="h6">{bout.fighter1_name}</Typography>
          <Chip 
            label={bout.fighter1_record} 
            size="small" 
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">VS</Typography>
        </Grid>
        <Grid item xs={5} sx={{ textAlign: 'left' }}>
          <Typography variant="h6">{bout.fighter2_name}</Typography>
          <Chip 
            label={bout.fighter2_record} 
            size="small" 
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle1" gutterBottom>
            Your Prediction:
          </Typography>
          <RadioGroup
            row
            name={`prediction-${bout.id}`}
            value={prediction}
            onChange={handlePredictionChange}
          >
            <FormControlLabel 
              value={`${bout.fighter1_id}`} 
              control={<Radio />} 
              label={bout.fighter1_name} 
            />
            <FormControlLabel 
              value={`${bout.fighter2_id}`} 
              control={<Radio />} 
              label={bout.fighter2_name} 
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Paper>
  );
}
