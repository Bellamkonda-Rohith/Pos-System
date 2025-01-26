
import { useSelector } from 'react-redux';
import { Container, Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationScreen = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const calculateDiscount = (value) => {
    if (value <= 500) return 0.05;
    if (value <= 1000) return 0.10;
    return 0.15;
  };

  const discountPercentage = calculateDiscount(totalPrice);
  const discountAmount = totalPrice * discountPercentage;
  const finalAmount = totalPrice - discountAmount;

  const printReceipt = () => {
    window.print();
  };

  const newTransaction = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Order Confirmation
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              {cart.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.itemName} (x{item.quantity})</Typography>
                  <Typography>${(item.itemPrice * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Total Value:</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Total Discount:</Typography>
                <Typography>- ${discountAmount.toFixed(2)} ({(discountPercentage * 100).toFixed(0)}%)</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Final Amount:</Typography>
                <Typography>${finalAmount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={printReceipt} sx={{ mx: 1 }}>
                  Print Receipt
                </Button>
                <Button variant="contained" color="secondary" onClick={newTransaction} sx={{ mx: 1 }}>
                  New Transaction
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderConfirmationScreen;
