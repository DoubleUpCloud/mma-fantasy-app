"use client"

import { useState, useEffect } from "react"
import { Container, Typography, Box, Card, CardContent, Grid, Skeleton, Alert, Snackbar, Avatar } from "@mui/material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import { Leaders } from "@/models"
import { fetchLeaders } from "@/lib/api"

export default function UsersPage() {
  const [users, setUsers] = useState<Leaders[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        // Simulate API call delay
        const usersData = await fetchLeaders()
        setUsers(usersData)
      } catch (err) {
        setError("Failed to load users. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (points: number) => {
    if (points >= 300) return "#4caf50" // Green for high points
    if (points >= 150) return "#ff9800" // Orange for medium points
    if (points >= 50) return "#2196f3" // Blue for low points
    return "#9e9e9e" // Gray for very low/no points
  }

  console.log(users)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users Leaderboard
      </Typography>
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="60%" height={30} />
                  </Box>
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
      ) : users.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No users found.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {users
            .sort((a, b) => b.points - a.points) // Sort by points descending
            .map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: getAvatarColor(user.points),
                          width: 40,
                          height: 40,
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {user.name}
                        </Typography>
                        {index < 3 && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <EmojiEventsIcon
                              sx={{
                                color: index === 0 ? "#ffd700" : index === 1 ? "#c0c0c0" : "#cd7f32",
                                fontSize: 16,
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              #{index + 1}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Points:{" "}
                      <Box component="span" sx={{ fontWeight: "bold", color: "text.primary" }}>
                        {user.points}
                      </Box>
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Total bets:{" "}
                      <Box component="span" sx={{ fontWeight: "bold", color: "text.primary" }}>
                        {user.total_bets}
                      </Box>
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Joined: {new Date(user.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
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
