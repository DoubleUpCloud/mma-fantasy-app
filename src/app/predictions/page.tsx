"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Alert,
  Snackbar,
  Button,
  ButtonGroup,
} from "@mui/material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import { useRouter } from "next/navigation"
import { getAllUserBouts } from "@/lib/api"

// Define the Bout type based on the provided document structure
interface Bout {
  user_id: number
  bout_id: number
  bet_type_id: number
  predicted_winner: string
  created_at: string
  points: number
  bouts: {
    events: {date: string}
    event_id: number
  }
  bet_types: {
    name: string
  }
  bout: {
    events: {date: string}
    event_id: number
  }
}

export default function BoutsPage() {
  const [bouts, setBouts] = useState<Bout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getBouts = async () => {
      try {
        const data = await getAllUserBouts()
        setBouts(data)
      } catch (err) {
        setError("Failed to load bouts. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getBouts()
  }, [])

  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`)
  }

  console.log(bouts)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your predictions
      </Typography>
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
      ) : bouts.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No bouts found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {bouts.map((bout) => (
            <Grid item xs={12} sm={6} md={4} key={bout.bout_id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <EmojiEventsIcon sx={{ color: "gold", fontSize: 20 }} />
                    <Typography variant="h6" component="div" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                      {bout.predicted_winner} by {bout.bet_types.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Points:{" "}
                    <Box component="span" sx={{ fontWeight: "bold", color: "text.primary" }}>
                      {bout.points}
                    </Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Event Day: {bout.bout.events.date}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => handleEventClick(bout.bout.event_id)}
                  >
                    Go to Event
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  )
}
