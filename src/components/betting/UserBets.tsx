"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { UserBet, BetType, UserEventBets } from '@/models';
import { betService } from '@/lib/betService';

interface UserBetsProps {
  eventId?: number;
}

export default function UserBets({ eventId }: UserBetsProps) {
  const [bets, setBets] = useState<UserEventBets[]>([]);
  const [betTypes, setBetTypes] = useState<Record<number, BetType>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch bet types first
        const types = await betService.getAllBetTypes();
        const typesMap: Record<number, BetType> = {};
        types.forEach(type => {
          typesMap[type.id] = type;
        });
        setBetTypes(typesMap);

        // Fetch user bets
        let userBets: UserEventBets[];
        if (eventId) {
          // If boutId is provided, fetch bets for that bout
          userBets = await betService.getUserBetsForEvent(eventId);
          // Filter for the current user
          setBets(userBets)

        }

      } catch (err) {
        console.error('Error fetching user bets:', err);
        setError('Failed to load bets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (bets.length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" color="text.secondary" align="center">
          No bets found
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Your Bets
      </Typography>

      <List>
        {bets.map((bet, index) => (
          <Box key={`${bet}-${bet.bout_id}-${bet.bet_type_id}`}>
            {index > 0 && <Divider component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {betTypes[bet.bet_type_id]?.name || `Bet Type #${bet.bet_type_id}`}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Prediction: {bet.predicted_winner}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {/* {bet.result !== undefined && (
                        <Chip
                          label={bet.result ? "Won" : "Lost"}
                          color={bet.result ? "success" : "error"}
                          size="small"
                        />
                      )}
                      {bet.result === undefined && (
                        <Chip
                          label="Pending"
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      )} */}
                      <Chip
                          label="Pending"
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                    </Box>
                  </>
                }
              />
            </ListItem>
          </Box>
        ))}
      </List>
    </Paper>
  );
}