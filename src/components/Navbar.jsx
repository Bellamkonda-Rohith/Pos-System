import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navItems = [
    { text: 'POS', icon: <PointOfSaleIcon />, path: '/' },
    { text: 'Cart', icon: <ShoppingCartIcon />, path: '/cart' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/DashboardScreen' },
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: '#1a237e', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          POS System
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
              sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(90deg)' } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerClose}
              sx={{ width: '100%' }}
            >
              <Box
                sx={{ width: 250, bgcolor: '#1a237e', color: 'white' }}
                role="presentation"
                onClick={handleDrawerClose}
                onKeyDown={handleDrawerClose}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                    >
                      <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} primaryTypographyProps={{ sx: { color: 'white' } }} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="white">
                    © 2025 POS System
                  </Typography>
                </Box>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  transition: 'background-color 0.3s ease',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
