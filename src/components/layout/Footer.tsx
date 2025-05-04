import { Box, Container, Typography, Link as MuiLink, Grid, Divider } from '@mui/material';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Fantasy MMA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Predict MMA fights, compete with friends, and climb the leaderboard.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <MuiLink component={Link} href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Home
              </MuiLink>
              <MuiLink component={Link} href="/events" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Events
              </MuiLink>
              <MuiLink component={Link} href="/fighters" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Fighters
              </MuiLink>
              <MuiLink component={Link} href="/leaderboard" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Leaderboard
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Account
            </Typography>
            <Box>
              <MuiLink component={Link} href="/auth/login" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Login
              </MuiLink>
              <MuiLink component={Link} href="/auth/register" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Register
              </MuiLink>
              <MuiLink component={Link} href="/profile" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Profile
              </MuiLink>
              <MuiLink component={Link} href="/dashboard" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Dashboard
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {currentYear}
          {' Fantasy MMA. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
}