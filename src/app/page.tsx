import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Fantasy MMA
        </Typography>
        
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Predict fights. Win points. Climb the leaderboard.
        </Typography>
        
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '300px',
            maxWidth: '600px',
            my: 4,
          }}
        >
          {/* Replace with your own MMA-related image */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: 'grey.200',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              MMA Image Placeholder
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            component={Link}
            href="/auth/login"
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            component={Link}
            href="/auth/register"
          >
            Register
          </Button>
        </Box>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="body1" gutterBottom>
            Make predictions on upcoming MMA events
          </Typography>
          <Typography variant="body1" gutterBottom>
            Compete with friends and other fans
          </Typography>
          <Typography variant="body1" gutterBottom>
            Earn points based on your prediction accuracy
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}