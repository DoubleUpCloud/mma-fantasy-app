"use client";

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  Divider,
  Paper,
  Chip,
  Grid,
  Tabs,
  Tab
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import EventPredictions from '@/components/predictions/EventPredictions';
import EventBetting from '@/components/betting/EventBetting';
import { useUser } from '@/context/UserContext';
import { Event, Bout } from '@/models';

interface EventDetailProps {
  event: Event | null;
  error: string | null;
  isEnded: boolean | null;
}

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
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function EventDetail({ event, error, isEnded }: EventDetailProps) {
  const [tabValue, setTabValue] = useState(0);
  const { isLogged, isLoading: userLoading } = useUser();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  console.log(isLogged)
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Link href="/events" passHref>
        <Button
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Events
        </Button>
      </Link>

      {error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : !event ? (
        <Alert severity="warning">
          Event not found.
        </Alert>
      ) : (
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Date: {formatDate(event.date)}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Location: {event.location}
          </Typography>

          {isEnded ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="event tabs">
                <Tab label="Fight Card" id="event-tab-0" aria-controls="event-tabpanel-0" />
                <Tab label="Betting" id="event-tab-2" aria-controls="event-tabpanel-2" />
              </Tabs>
            </Box>
          )
            :
            (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="event tabs">
                  <Tab label="Fight Card" id="event-tab-0" aria-controls="event-tabpanel-0" />
                </Tabs>
              </Box>
            )}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom>
              Fight Card
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {event.bouts && event.bouts.length > 0 ? (
              event.bouts.map((bout) => (
                <Paper
                  key={bout.id}
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

                      {isEnded ? (
                        <Typography variant="h6" color="text.secondary">VS</Typography>
                      ) : (
                        <Typography variant="h6" color="green">{bout.result!.winner_name} {bout.result!.details}</Typography>
                      )
                      }

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
                </Paper>
              ))
            ) : (
              <Alert severity="info">
                No fights scheduled for this event yet.
              </Alert>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {isLogged ? (
              <EventBetting event={event} />
            ) : userLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <Typography>Loading user information...</Typography>
              </Box>
            ) : (
              <Alert severity="info">
                Please log in to place bets.
              </Alert>
            )}
          </TabPanel>

        </Box>
      )}
    </Container>
  );
}
