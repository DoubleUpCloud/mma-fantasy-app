"use client";

import { useEffect, useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { BetType } from '@/models';
import { betService } from '@/lib/betService';

interface BetTypeSelectorProps {
  onBetTypeSelect: (betType: BetType) => void;
  selectedBetTypeId?: number;
}

export default function BetTypeSelector({ onBetTypeSelect, selectedBetTypeId }: BetTypeSelectorProps) {
  const [betTypes, setBetTypes] = useState<BetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | ''>('');

  useEffect(() => {
    const fetchBetTypes = async () => {
      try {
        setLoading(true);
        const types = await betService.getAllBetTypes();
        setBetTypes(types);
        
        // If a selectedBetTypeId is provided, set it as selected
        if (selectedBetTypeId && types.some(type => type.id === selectedBetTypeId)) {
          setSelectedId(selectedBetTypeId);
          const selectedType = types.find(type => type.id === selectedBetTypeId);
          if (selectedType) {
            onBetTypeSelect(selectedType);
          }
        }
      } catch (err) {
        console.error('Error fetching bet types:', err);
        setError('Failed to load bet types. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBetTypes();
  }, [selectedBetTypeId, onBetTypeSelect]);

  const handleChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value as number;
    setSelectedId(value);
    
    const selectedType = betTypes.find(type => type.id === value);
    if (selectedType) {
      onBetTypeSelect(selectedType);
    }
  };

  if (loading) {
    return <CircularProgress size={24} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (betTypes.length === 0) {
    return <Typography color="text.secondary">No bet types available</Typography>;
  }

  return (
    <Box sx={{ minWidth: 200, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="bet-type-select-label">Bet Type</InputLabel>
        <Select
          labelId="bet-type-select-label"
          id="bet-type-select"
          value={selectedId}
          label="Bet Type"
          onChange={handleChange}
        >
          {betTypes.map((betType) => (
            <MenuItem key={betType.id} value={betType.id}>
              {betType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedId && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {betTypes.find(type => type.id === selectedId)?.description}
        </Typography>
      )}
    </Box>
  );
}