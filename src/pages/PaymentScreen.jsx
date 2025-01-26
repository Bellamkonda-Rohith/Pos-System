import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
const navigate=useNavigate()
  const confirmPayment = () => {
    navigate("/OrderConfirmationScreen")
    
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Payment Screen
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
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
                <Button variant="contained" color="primary" onClick={confirmPayment} sx={{ mx: 1 }}>
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
