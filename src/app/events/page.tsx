"use client";

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActionArea,
  Grid,
  Skeleton,
  Alert,
  Snackbar
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchEvents } from '@/lib/api';
import { Event } from '@/models';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [displayEvents, setDisplayEvents] = useState<Event[]>([])

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setDisplayEvents(data.filter((e: Event) => new Date(e.date) > new Date()));
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const setEventsDisplay = (mode: boolean) => {
    if (mode) {
      const displayEvents = events.filter(e => new Date(e.date) > new Date());
      setDisplayEvents(displayEvents)
    } else {
      const displayEvents = events.filter(e => new Date(e.date) < new Date());
      setDisplayEvents(displayEvents)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MMA Events
      </Typography>
      
        <Box display="flex" gap={2} pt={2} pb={2}>
          <Typography 
          variant="h6"
          sx={{
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'gray',
            },
          }}
          onClick={() => setEventsDisplay(true)}>
          Upcomming Events
          </Typography>
          <Typography 
          variant="h6"
          sx={{
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: 'gray',
            },
          }}
          onClick={() => setEventsDisplay(false)}>
          Ended Events
          </Typography>
        </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
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
      ) : events.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No events found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {displayEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardActionArea onClick={() => handleEventClick(event.id)}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {formatDate(event.date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {event.location}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

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
    </Container>
  );
}
