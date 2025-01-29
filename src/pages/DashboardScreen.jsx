import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, CardContent, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { resetCart } from '../Redux/CartSlice'; // Importing the resetCart action

const DashboardScreen = () => {
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Using useDispatch to dispatch actions
  const navigate = useNavigate();

  const topItemsSold = cart
    .map((item) => ({
      ...item,
      totalRevenue: item.itemPrice * item.quantity,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const calculateDiscount = (value) => {
    if (value <= 500) return 0.05;
    if (value <= 1000) return 0.10;
    return 0.15;
  };

  const discountPercentage = calculateDiscount(totalPrice);
  const totalDiscount = totalPrice * discountPercentage;
  const totalRevenue = totalPrice - totalDiscount;

  const handleBack = () => {
    navigate("/OrderConfirmationScreen");
  };

  const handleHome = () => {
    dispatch(resetCart()); // Dispatching resetCart action to empty the cart
    navigate("/");
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
        <IconButton onClick={handleBack} color="primary" component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" sx={{ flex: 1 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Dashboard
        </Typography>
        <IconButton onClick={handleHome} color="primary" component={motion.div} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <HomeIcon />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top 5 Items Sold
              </Typography>
              {topItemsSold.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.itemName}</Typography>
                  <Typography>{item.quantity} sold</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4">{totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders Cost
              </Typography>
              <Typography variant="h4">${totalPrice.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Discount
              </Typography>
              <Typography variant="h4">-${totalDiscount.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardScreen;
