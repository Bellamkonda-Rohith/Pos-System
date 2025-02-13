import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  Card,
 
  Grid,
  CircularProgress,
  useTheme,
  Divider,
  IconButton,
  Container,
  Chip
} from '@mui/material';
import { ShoppingCart, CheckCircle, Close, LocalOffer } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../Redux/CartSlice';
import { motion, AnimatePresence } from 'framer-motion';

const MotionButton = motion(Button);

const PosScreening = () => {
  const data = [
    { itemCode: 'A001', itemName: 'Premium Coffee Beans', itemPrice: 150, category: 'Beverages' },
    { itemCode: 'A002', itemName: 'Organic Tea Set', itemPrice: 80, category: 'Beverages' },
    { itemCode: 'B001', itemName: 'Wireless Earbuds', itemPrice: 220, category: 'Electronics' },
    { itemCode: 'B002', itemName: 'Smart Watch', itemPrice: 450, category: 'Electronics' },
    { itemCode: 'C001', itemName: 'Leather Wallet', itemPrice: 120, category: 'Accessories' },
    { itemCode: 'C002', itemName: 'Designer Sunglasses', itemPrice: 180, category: 'Accessories' },
  ];

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    setLoading(true);
    const item = data.find(i => i.itemCode === selectedItem);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
      setTimeout(() => {
        setLoading(false);
        setSnackbarOpen(true);
        setTimeout(() => setSnackbarOpen(false), 3000);
      }, 500);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ p: 3, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{
          fontWeight: 800,
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(45deg, #0EA5E9 0%, #8B5CF6 100%)'
            : 'linear-gradient(45deg, #00F3FF 0%, #FF00FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1
        }}>
          Quick Checkout
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Select items and manage your cart efficiently
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Product Selection */}
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card sx={{
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper,
              p: 3
            }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Available Products
              </Typography>
              
              <Select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                fullWidth
                displayEmpty
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiSelect-select': {
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <Typography color="text.secondary">Select a product</Typography>
                </MenuItem>
                {data.map((item) => (
                  <MenuItem key={item.itemCode} value={item.itemCode}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Box>
                        <Typography>{item.itemName}</Typography>
                        <Chip 
                          label={item.category} 
                          size="small" 
                          color="secondary" 
                          sx={{ mt: 0.5, borderRadius: 1 }}
                        />
                      </Box>
                      <Typography color="secondary.main">
                        ${item.itemPrice}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>

              <MotionButton
                fullWidth
                size="large"
                onClick={handleAddToCart}
                disabled={!selectedItem || loading}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  background: theme.palette.mode === 'light' 
                    ? 'linear-gradient(45deg, #0EA5E9 0%, #8B5CF6 100%)'
                    : 'linear-gradient(45deg, #00F3FF 0%, #FF00FF 100%)',
                  color: 'common.white',
                  '&:hover': { boxShadow: theme.shadows[6] }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Add to Cart'
                )}
              </MotionButton>
            </Card>
          </motion.div>
        </Grid>

        {/* Cart Summary */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ position: 'sticky', top: 20 }}
          >
            <Card sx={{
              borderRadius: 4,
              boxShadow: 3,
              background: theme.palette.background.paper,
              p: 3
            }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Order Summary
              </Typography>

              <Divider sx={{ mb: 3, borderColor: 'divider' }} />

              <AnimatePresence>
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                    >
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: theme.palette.action.hover
                      }}>
                        <Box>
                          <Typography fontWeight={500}>{item.itemName}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.quantity} × ${item.itemPrice}
                          </Typography>
                        </Box>
                        <Typography fontWeight={600}>
                          ${(item.quantity * item.itemPrice).toFixed(2)}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))
                ) : (
                  <Box sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 2,
                    bgcolor: theme.palette.action.hover
                  }}>
                    <LocalOffer sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography color="text.secondary">
                      Your cart is empty
                    </Typography>
                  </Box>
                )}
              </AnimatePresence>

              {cart.length > 0 && (
                <>
                  <Divider sx={{ my: 3, borderColor: 'divider' }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography fontWeight={600}>Total Items:</Typography>
                    <Typography fontWeight={600}>{totalItems}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Total:</Typography>
                    <Typography variant="h6" fontWeight={700} color="secondary.main">
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  <MotionButton
                    fullWidth
                    size="large"
                    onClick={() => navigate('/cart')}
                    startIcon={<ShoppingCart />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background: theme.palette.mode === 'light' 
                        ? 'linear-gradient(45deg, #0EA5E9 0%, #8B5CF6 100%)'
                        : 'linear-gradient(45deg, #00F3FF 0%, #FF00FF 100%)',
                      color: 'common.white',
                      '&:hover': { boxShadow: theme.shadows[6] }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Complete Purchase
                  </MotionButton>
                </>
              )}
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Snackbar Notification */}
      <AnimatePresence>
        {snackbarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 8,
              background: theme.palette.success.main,
              color: theme.palette.success.contrastText,
              boxShadow: theme.shadows[4],
            }}
          >
            <CheckCircle fontSize="small" />
            <Typography variant="body2">Item added to cart!</Typography>
            <IconButton
              size="small"
              onClick={() => setSnackbarOpen(false)}
              sx={{ color: 'inherit', ml: 1 }}
            >
              <Close fontSize="small" />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default PosScreening;