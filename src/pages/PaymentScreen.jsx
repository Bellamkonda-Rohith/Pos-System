import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, CardContent, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PaymentScreen = () => {
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

  const navigate = useNavigate();
  const confirmPayment = () => {
    navigate("/OrderConfirmationScreen");
  };

  const handleBack = () => {
    navigate("/ShoppingCartScreen");
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
        <IconButton onClick={handleBack} color="primary" component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" sx={{ flex: 1 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Payment Screen
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }} component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Cart Value:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Discount Applied:</Typography>
                <Typography>- ${discount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Final Amount:</Typography>
                <Typography>${finalAmount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={confirmPayment} sx={{ mx: 1 }} component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Confirm Payment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentScreen;
