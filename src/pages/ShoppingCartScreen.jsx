import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton, Box, Button, Container, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../Redux/CartSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ShoppingCartScreen = () => {
  const dispatch = useDispatch();
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);

  const handleIncrement = (itemCode) => {
    dispatch(incrementQuantity(itemCode));
  };

  const handleDecrement = (itemCode) => {
    dispatch(decrementQuantity(itemCode));
  };

  const handleRemove = (itemCode) => {
    dispatch(removeFromCart(itemCode));
  };

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/PaymentScreen");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleBack} color="primary" component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" color="primary" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} sx={{ flex: 1 }}>
          Shopping Cart
        </Typography>
      </Box>
      {cart.length === 0 ? (
        <Paper sx={{ p: 2, textAlign: 'center' }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Typography variant="h6">Your cart is empty</Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, mb: 3 }} component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <Grid container spacing={3} alignItems="center">
            {cart.map((item) => (
              <Grid item xs={12} key={item.itemCode} component={motion.div} initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #ddd' }}>
                  <Box sx={{ flex: 2 }}>
                    <Typography variant="h6">{item.itemName}</Typography>
                    <Typography variant="body2" color="textSecondary">Item Code: {item.itemCode}</Typography>
                    <Typography variant="body2" color="textSecondary">Item Price: ${item.itemPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <IconButton onClick={() => handleDecrement(item.itemCode)} color="secondary">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton onClick={() => handleIncrement(item.itemCode)} color="primary">
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body1" sx={{ flex: 1, textAlign: 'right' }}>
                    ${(item.itemPrice * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton onClick={() => handleRemove(item.itemCode)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }} component={motion.div} initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h6">Total Items: {totalItems}</Typography>
                <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth onClick={handleNavigation} component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default ShoppingCartScreen;
