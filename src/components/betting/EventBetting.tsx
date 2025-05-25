"use client";

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { Bout, Event, UserBet } from '@/models';
import BoutBetForm from './BoutBetForm';
import UserBets from './UserBets';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`betting-tabpanel-${index}`}
      aria-labelledby={`betting-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface EventBettingProps {
  event: Event;
}

export default function EventBetting({ event }: EventBettingProps) {
  const [tabValue, setTabValue] = useState(0);
  const [userBets, setUserBets] = useState<UserBet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBetPlaced = (bet: UserBet) => {
    // Add the new bet to the userBets array
    setUserBets(prev => [...prev, bet]);

    // Switch to the "Your Bets" tab
    setTabValue(1);
  };

  if (!event.bouts || event.bouts.length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Alert severity="info">
          No bouts available for this event yet.
        </Alert>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Paper sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="betting tabs"
            variant="fullWidth"
          >
            <Tab label="Place Bets" id="betting-tab-0" aria-controls="betting-tabpanel-0" />
            <Tab label="Your Bets" id="betting-tab-1" aria-controls="betting-tabpanel-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom>
            Place Your Bets
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Select a bout and place your bet on the outcome.
          </Typography>

          <Divider sx={{ my: 3 }} />

          {event.bouts.map((bout) => (
            <BoutBetForm
              key={bout.id}
              bout={bout}
              onBetPlaced={handleBetPlaced}
            />
          ))}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom>
            Your Bets for {event.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            View all your bets for this event.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <UserBets eventId={event.id}/>
        </TabPanel>
      </Paper>
    </Box>
  );
}