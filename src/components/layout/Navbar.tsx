"use client";

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, SportsMma } from '@mui/icons-material';
import Link from 'next/link';
//import { logout } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

 // const logoutUser = logout(router);
  const logout = async () => {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      isLoggedIn = false
    };


  interface MenuItem {
    label: string;
    href?: string;
    onClick?: () => void;
  }

  const menuItems: MenuItem[] = isLoggedIn
  ? [
      { label: 'Predictions', href: '/predictions' },
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Logout', href: '/auth/login', onClick: logout }
    ]
  : [
      { label: 'Login', href: '/auth/login' },
      { label: 'Register', href: '/auth/register' }
    ];

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo and Title */}
          <SportsMma sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            Fantasy MMA
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Button color="inherit" component={Link} href="/">
                Home
              </Button>
              <Button color="inherit" component={Link} href="/events">
                Events
              </Button>
              <Button color="inherit" component={Link} href="/fighters">
                Fighters
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          

          {/* Desktop Auth Buttons */}
          {!isMobile && (
            <Box sx={{ flexGrow: 0 }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.label} 
                  color="inherit" 
                  component={Link} 
                  href={item.href}
                  sx={{ ml: 1 }}
                  onClick={item.onClick}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
