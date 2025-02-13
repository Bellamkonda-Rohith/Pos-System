import { useDispatch, useSelector } from 'react-redux';
import { 
  Typography, 
  IconButton, 
  Box, 
  Button, 
  Container, 
  Grid, 
  Card,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { Add, Remove, Delete, ArrowBack, LocalOffer } from '@mui/icons-material';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../Redux/CartSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionButton = motion(Button);
const MotionCard = motion(Card);

const ShoppingCartScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);

  const handleIncrement = (itemCode) => dispatch(incrementQuantity(itemCode));
  const handleDecrement = (itemCode) => dispatch(decrementQuantity(itemCode));
  const handleRemove = (itemCode) => dispatch(removeFromCart(itemCode));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={() => navigate("/PosScreening")} 
          sx={{
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            '&:hover': { background: theme.palette.action.hover }
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" sx={{
          flex: 1,
          fontWeight: 800,
          background: theme.custom?.gradients?.accent || 'linear-gradient(45deg, #0EA5E9 0%, #8B5CF6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Shopping Cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <AnimatePresence>
            {cart.length === 0 ? (
              <MotionCard
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: theme.palette.background.paper,
                  boxShadow: theme.shadows[3],
                  borderRadius: 4
                }}
              >
                <LocalOffer sx={{ 
                  fontSize: 80, 
                  color: 'text.secondary', 
                  mb: 2,
                  opacity: 0.5 
                }}/>
                <Typography variant="h5" color="text.secondary">
                  Your cart is empty
                </Typography>
                <MotionButton
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{ mt: 3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </MotionButton>
              </MotionCard>
            ) : (
              <AnimatePresence>
                {cart.map((item) => (
                  <MotionCard
                    key={item.itemCode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    sx={{
                      mb: 2,
                      background: theme.palette.background.paper,
                      borderRadius: 3,
                      boxShadow: theme.shadows[2],
                      '&:hover': { boxShadow: theme.shadows[4] }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 3,
                      gap: 3
                    }}>
                      {/* Item Image (Add your image URL) */}
                     

                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {item.itemName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip 
                            label={`Item #${item.itemCode}`} 
                            size="small" 
                            color="secondary"
                            sx={{ borderRadius: 1 }}
                          />
                          <Chip 
                            label={item.category} 
                            size="small"
                            sx={{ borderRadius: 1 }}
                          />
                        </Box>
                      </Box>

                      {/* Quantity Controls */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        bgcolor: theme.palette.action.hover,
                        borderRadius: 2,
                        p: 1
                      }}>
                        <IconButton 
                          onClick={() => handleDecrement(item.itemCode)}
                          size="small"
                          disabled={item.quantity <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          onClick={() => handleIncrement(item.itemCode)}
                          size="small"
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography variant="h6" sx={{ minWidth: 100, textAlign: 'right' }}>
                        ${(item.itemPrice * item.quantity).toFixed(2)}
                      </Typography>

                      <IconButton 
                        onClick={() => handleRemove(item.itemCode)}
                        color="error"
                        sx={{ ml: 2 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </MotionCard>
                ))}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </Grid>

        {/* Order Summary */}
        {cart.length > 0 && (
          <Grid item xs={12} md={4}>
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              sx={{
                position: 'sticky',
                top: 20,
                p: 3,
                background: theme.palette.background.paper,
                borderRadius: 4,
                boxShadow: theme.shadows[4]
              }}
            >
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Order Summary
              </Typography>

              <Divider sx={{ my: 2, borderColor: 'divider' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Subtotal ({totalItems} items):</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography color="text.secondary">Shipping:</Typography>
                <Typography color="success.main">FREE</Typography>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'divider' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h6" fontWeight={700}>Total:</Typography>
                <Typography variant="h6" fontWeight={700} color="secondary.main">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <MotionButton
                fullWidth
                size="large"
                onClick={() => navigate("/PaymentScreen")}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  background: theme.custom?.gradients?.accent,
                  color: 'common.white',
                  '&:hover': { boxShadow: theme.shadows[6] }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Payment
              </MotionButton>
            </MotionCard>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ShoppingCartScreen;