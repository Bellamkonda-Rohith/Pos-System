import { useSelector } from 'react-redux';
import { Container, Card, CardContent, Typography, Button, Box, Grid, Paper } from '@mui/material';

const DashboardScreen = () => {
  const { cart, totalItems, totalPrice } = useSelector((state) => state.cart);

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

  const refreshData = () => {
    // Handle refresh data logic here
  };

  const viewDetailedReports = () => {
    // Handle view detailed reports logic here
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
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
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4">{totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders Cost
              </Typography>
              <Typography variant="h4">${totalPrice.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Discount
              </Typography>
              <Typography variant="h4">-${totalDiscount.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
            <Button variant="contained" color="primary" onClick={refreshData}>
              Refresh Data
            </Button>
            <Button variant="contained" color="secondary" onClick={viewDetailedReports}>
              View Detailed Reports
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardScreen;
