"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#d50000',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
});

interface ClientThemeProviderProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

export default function ClientThemeProvider({ children, isLoggedIn }: ClientThemeProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar isLoggedIn={isLoggedIn} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}