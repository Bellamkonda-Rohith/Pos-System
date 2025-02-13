import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon,
  ListItemText,
  Box, 
  useMediaQuery,
  Divider,
  Badge
} from '@mui/material';
import { Menu, Close, ShoppingCart, Dashboard, PointOfSale } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navItems = [
    { text: 'POS', icon: <PointOfSale />, path: '/' },
    { text: 'Cart', icon: <ShoppingCart />, path: '/cart'},
    { text: 'Dashboard', icon: <Dashboard />, path: '/DashboardScreen' }
  ];

  const MobileDrawer = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 300,
          backgroundColor: theme.palette.primary.main,
          backdropFilter: 'blur(12px)',
          borderLeft: `1px solid ${theme.palette.secondary.main}30`
        }
      }}
    >
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <IconButton 
          onClick={() => setDrawerOpen(false)}
          sx={{ color: theme.palette.common.white }}
        >
          <Close />
        </IconButton>
      </Box>
      
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={() => setDrawerOpen(false)}
            sx={{
              py: 2,
              mx: 2,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.secondary.light + '15'
              },
              ...(location.pathname === item.path && {
                background: theme.palette.secondary.main,
                boxShadow: `0 4px 30px ${theme.palette.secondary.main}30`
              })
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.badge ? (
                <Badge 
                  badgeContent={item.badge} 
                  color="error"
                  sx={{ '& .MuiBadge-badge': { top: 8, right: -8 } }}
                >
                  {item.icon}
                </Badge>
              ) : item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: 600,
                letterSpacing: 0.5 
              }} 
            />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ borderColor: theme.palette.secondary.main + '30', my: 2 }} />
      
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          v2.1.0 | © 2024 POS Pro
        </Typography>
      </Box>
    </Drawer>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.secondary.main}30`
      }}
    >
      <Toolbar sx={{ minHeight: '80px!important', px: { xs: 2, md: 6 } }}>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            textDecoration: 'none',
            background: theme.palette.secondary.main,
            backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.accent.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: -0.5
          }}
        >
          POS Pro
        </Typography>

        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                startIcon={item.badge ? (
                  <Badge 
                    badgeContent={item.badge} 
                    color="error"
                    sx={{ '& .MuiBadge-badge': { top: 8, right: -8 } }}
                  >
                    {item.icon}
                  </Badge>
                ) : item.icon}
                sx={{
                  px: 3,
                  color: theme.palette.common.white,
                  fontWeight: 500,
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.light + '15'
                  },
                  ...(location.pathname === item.path && {
                    background: theme.palette.secondary.main,
                    boxShadow: `0 4px 30px ${theme.palette.secondary.main}30`
                  })
                }}
              >
                <motion.span
                  initial={{ opacity: 0.9 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.text}
                </motion.span>
              </Button>
            ))}
          </Box>
        ) : (
          <IconButton
            edge="end"
            onClick={() => setDrawerOpen(true)}
            sx={{ color: theme.palette.common.white }}
          >
            <Menu />
          </IconButton>
        )}
      </Toolbar>

      <MobileDrawer />
    </AppBar>
  );
};

export default NavBar;