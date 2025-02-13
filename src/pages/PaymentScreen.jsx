import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
 
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBack, Lock, LocalOffer } from '@mui/icons-material';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const PaymentScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { totalPrice } = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(totalPrice);

  useEffect(() => {
    const calculateDiscount = (value) => {
      if (value <= 500) return 0.05;
      if (value <= 1000) return 0.10;
      return 0.15;
    };

    const discountPercentage = calculateDiscount(totalPrice);
    const discountAmount = totalPrice * discountPercentage;
    setDiscount(discountAmount);
    setFinalAmount(totalPrice - discountAmount);
  }, [totalPrice]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={() => navigate("/cart")} 
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
          Secure Payment
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
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
              {/* Order Summary */}
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  background: theme.palette.action.hover
                }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  background: theme.palette.action.hover
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalOffer fontSize="small" />
                    <Typography variant="body1">Discount:</Typography>
                  </Box>
                  <Typography variant="h6" color="success.main">
                    - ${discount.toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: 'divider' }} />

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  background: theme.palette.secondary.light + '15'
                }}>
                  <Typography variant="h6">Total Amount:</Typography>
                  <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 800 }}>
                    ${finalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* Payment Methods */}
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Payment Method
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {['Credit Card', 'PayPal', 'Google Pay'].map((method, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <MotionCard
                      whileHover={{ y: -5 }}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: '2px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: theme.palette.secondary.main,
                          boxShadow: theme.shadows[4]
                        }
                      }}
                    >
                      <Typography align="center">{method}</Typography>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>

              {/* Security Assurance */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                p: 2,
                borderRadius: 2,
                background: theme.palette.success.light + '15',
                mb: 4
              }}>
                <Lock color="success" />
                <Typography variant="body2" color="text.secondary">
                  256-bit SSL secured payment processing
                </Typography>
              </Box>

              {/* Payment Button */}
              <MotionButton
                fullWidth
                size="large"
                onClick={() => navigate("/OrderConfirmationScreen")}
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
                Confirm Secure Payment
              </MotionButton>

              {/* Trust Badges */}
              
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentScreen;