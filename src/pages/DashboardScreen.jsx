import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Card, 
  
  Typography, 
  
  Box, 
  Grid, 
  IconButton,
 
  LinearProgress,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion';
import { ArrowBack, Home, ShoppingCart, LocalOffer, MonetizationOn, BarChart } from '@mui/icons-material';
import { resetCart } from '../Redux/CartSlice';

const MotionCard = motion(Card);


const DashboardScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const maxSales = Math.max(...topItemsSold.map(item => item.quantity), 1);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
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
          Business Dashboard
        </Typography>
        <IconButton 
          onClick={() => {
            dispatch(resetCart());
            navigate('/');
          }}
          sx={{
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            '&:hover': { background: theme.palette.action.hover }
          }}
        >
          <Home />
        </IconButton>
      </Box>

      <Grid container spacing={4}>
        {/* Key Metrics */}
        <Grid item xs={12} lg={9}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                  p: 3,
                  background: theme.palette.background.paper,
                  borderRadius: 4,
                  boxShadow: theme.shadows[3]
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ShoppingCart sx={{ 
                    fontSize: 40, 
                    color: 'secondary.main',
                    p: 1,
                    borderRadius: 2,
                    bgcolor: theme.palette.secondary.light + '15'
                  }}/>
                  <Box>
                    <Typography variant="h6" color="text.secondary">Total Orders</Typography>
                    <Typography variant="h3">{totalItems}</Typography>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                sx={{
                  p: 3,
                  background: theme.palette.background.paper,
                  borderRadius: 4,
                  boxShadow: theme.shadows[3]
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MonetizationOn sx={{ 
                    fontSize: 40, 
                    color: 'success.main',
                    p: 1,
                    borderRadius: 2,
                    bgcolor: theme.palette.success.light + '15'
                  }}/>
                  <Box>
                    <Typography variant="h6" color="text.secondary">Total Revenue</Typography>
                    <Typography variant="h3">${totalRevenue.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                sx={{
                  p: 3,
                  background: theme.palette.background.paper,
                  borderRadius: 4,
                  boxShadow: theme.shadows[3]
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalOffer sx={{ 
                    fontSize: 40, 
                    color: 'warning.main',
                    p: 1,
                    borderRadius: 2,
                    bgcolor: theme.palette.warning.light + '15'
                  }}/>
                  <Box>
                    <Typography variant="h6" color="text.secondary">Total Discount</Typography>
                    <Typography variant="h3" color="error.main">
                      -${totalDiscount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>

            {/* Top Products */}
            <Grid item xs={12}>
              <MotionCard
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                  p: 3,
                  background: theme.palette.background.paper,
                  borderRadius: 4,
                  boxShadow: theme.shadows[3]
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Top Selling Products
                </Typography>
                
                {topItemsSold.map((item) => (
                  <Box key={item.itemCode} sx={{ mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Typography>{item.itemName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.quantity} sold (${(item.quantity * item.itemPrice).toFixed(2)})
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.quantity / maxSales) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: theme.palette.action.hover,
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          bgcolor: theme.palette.secondary.main
                        }
                      }}
                    />
                  </Box>
                ))}
              </MotionCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12} lg={3}>
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            sx={{
              height: '85%',
              p: 3,
              background: theme.palette.background.paper,
              borderRadius: 4,
              boxShadow: theme.shadows[3],
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <BarChart sx={{ 
              fontSize: 80, 
              color: 'text.secondary',
              mb: 2 
            }}/>
            <Typography variant="h6" color="text.secondary">
              Sales Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Detailed sales analytics coming soon
            </Typography>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardScreen;