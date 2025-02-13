import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  IconButton,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBack, Print, Dashboard, ShoppingCart, CheckCircle } from '@mui/icons-material';
import { resetCart } from '../Redux/CartSlice';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const OrderConfirmationScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalPrice } = useSelector((state) => state.cart);

  const calculateDiscount = (value) => {
    if (value <= 500) return 0.05;
    if (value <= 1000) return 0.10;
    return 0.15;
  };

  const discountPercentage = calculateDiscount(totalPrice);
  const discountAmount = totalPrice * discountPercentage;
  const finalAmount = totalPrice - discountAmount;

  // Generate random order number
  const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={() => navigate("/PaymentScreen")} 
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
          Order Confirmed! 🎉
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Order Details */}
        <Grid item xs={12} md={7}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              background: theme.palette.background.paper,
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              p: 4
            }}
          >
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <CheckCircle sx={{ 
                  fontSize: 80, 
                  color: 'success.main', 
                  mb: 2 
                }}/>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Thank you for your order!
                </Typography>
                <Typography color="text.secondary">
                  Order Number: {orderNumber}
                </Typography>
              </Box>

              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Order Summary
              </Typography>

              {cart.map((item) => (
                <Box 
                  key={item.itemCode} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: theme.palette.action.hover
                  }}
                >
                  <Typography>{item.itemName} × {item.quantity}</Typography>
                  <Typography fontWeight={600}>
                    ${(item.itemPrice * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.success.light + '15',
                mb: 2
              }}>
                <Typography>Subtotal:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.warning.light + '15',
                mb: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>Discount:</Typography>
                  <Chip 
                    label={`${(discountPercentage * 100).toFixed(0)}% OFF`} 
                    size="small" 
                    color="success"
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
                <Typography color="success.main">
                  - ${discountAmount.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                p: 2,
                borderRadius: 2,
                bgcolor: theme.palette.secondary.light + '15'
              }}>
                <Typography variant="h6">Total Paid:</Typography>
                <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 800 }}>
                  ${finalAmount.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Action Panel */}
        <Grid item xs={12} md={5}>
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            sx={{
              position: 'sticky',
              top: 20,
              background: theme.palette.background.paper,
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              p: 4
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Next Steps
              </Typography>

              <MotionButton
                fullWidth
                size="large"
                onClick={() => window.print()}
                startIcon={<Print />}
                sx={{
                  mb: 2,
                  py: 2,
                  borderRadius: 2,
                  background: theme.custom?.gradients?.primary,
                  color: 'common.white'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Print Receipt
              </MotionButton>

              <MotionButton
                fullWidth
                size="large"
                onClick={() => {
                  dispatch(resetCart());
                  navigate('/');
                }}
                startIcon={<ShoppingCart />}
                sx={{
                  mb: 2,
                  py: 2,
                  borderRadius: 2,
                  background: theme.palette.success.main,
                  color: 'common.white'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start New Transaction
              </MotionButton>

              <MotionButton
                fullWidth
                size="large"
                onClick={() => navigate('/DashboardScreen')}
                startIcon={<Dashboard />}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  background: theme.palette.secondary.main,
                  color: 'common.white'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Dashboard
              </MotionButton>

              <Box sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: 2, 
                bgcolor: theme.palette.info.light + '15',
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">
                  Need help? Contact our support team at
                </Typography>
                <Typography color="primary.main">
                  support@pospro.com
                </Typography>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderConfirmationScreen;