import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../Redux/CartSlice';
import { motion, AnimatePresence } from 'framer-motion';

const PosScreening = () => {
  const data = [
    { itemCode: 'A001', itemName: 'Premium Coffee Beans', itemPrice: 150 },
    { itemCode: 'A002', itemName: 'Organic Tea Set', itemPrice: 80 },
    { itemCode: 'B001', itemName: 'Wireless Earbuds', itemPrice: 220 },
    { itemCode: 'B002', itemName: 'Smart Watch', itemPrice: 450 },
    { itemCode: 'C001', itemName: 'Leather Wallet', itemPrice: 120 },
    { itemCode: 'C002', itemName: 'Designer Sunglasses', itemPrice: 180 },
  ];

  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const cart = useSelector((state) => state.cart.cart);
  const { totalItems, totalPrice } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    setLoading(true);
    const item = data.find((i) => i.itemCode === selectedItem);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
      setTimeout(() => {
        setLoading(false);
        setSnackbarOpen(true);
      }, 500); // Simulate loading delay
    }
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      {/* Item Selection Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Select Item and Quantity
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  fullWidth
                  displayEmpty
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="" disabled>
                    Select an Item
                  </MenuItem>
                  {data.map((item) => (
                    <MenuItem key={item.itemCode} value={item.itemCode}>
                      {`${item.itemCode} - ${item.itemName} ($${item.itemPrice})`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: '100%',
                  mt: 2,
                  borderRadius: 1,
                }}
                onClick={handleAddToCart}
                disabled={!selectedItem || loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Adding...' : 'Add to Cart'}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cart Summary Card */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ p: 3 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Cart Summary
                  </Typography>
                  {cart.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <Typography>{item.itemName} (x{item.quantity})</Typography>
                        <Typography>${(item.itemPrice * item.quantity).toFixed(2)}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography>Total Items: {totalItems}</Typography>
                    <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
                  </Box>
                </CardContent>
              </Card>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: '100%',
                    mt: 2,
                    borderRadius: 1,
                  }}
                  onClick={handleCart}
                  startIcon={<ShoppingCartIcon />}
                >
                  Go to Cart
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

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
              bottom: 20,
              right: 20,
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.contrastText,
              padding: '10px 20px',
              borderRadius: 4,
              boxShadow: theme.shadows[3],
            }}
          >
            Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PosScreening;