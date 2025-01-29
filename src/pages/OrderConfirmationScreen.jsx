import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, CardContent, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetCart } from '../Redux/CartSlice';

const OrderConfirmationScreen = () => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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
    dispatch(resetCart());
    navigate('/');
  };

  const goToDashboard = () => {
    navigate('/DashboardScreen');
  };

  const handleBack = () => {
    navigate("/PaymentScreen");
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
        <IconButton onClick={handleBack} color="primary" component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" sx={{ flex: 1 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Order Confirmation
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }} component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
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
                <Button variant="contained" color="primary" onClick={printReceipt} sx={{ mx: 1 }} component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Print Receipt
                </Button>
                <Button variant="contained" color="secondary" onClick={newTransaction} sx={{ mx: 1 }} component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  New Transaction
                </Button>
                <Button variant="contained" color="success" onClick={goToDashboard} sx={{ mx: 1 }} component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Go to Dashboard
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
