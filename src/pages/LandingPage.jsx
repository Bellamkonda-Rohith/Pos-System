
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container, 
  useMediaQuery,

} from '@mui/material';
import { 
  PointOfSale, 
  Analytics, 
  Inventory, 
  Receipt, 
  Security, 
  Devices 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    { 
      icon: <PointOfSale sx={{ fontSize: 48 }} />,
      title: 'Instant Checkout',
      text: 'Process transactions in milliseconds with our quantum-powered POS system'
    },
    { 
      icon: <Analytics sx={{ fontSize: 48 }} />,
      title: 'Real-time Insights',
      text: 'AI-driven analytics dashboard with predictive business intelligence'
    },
    { 
      icon: <Inventory sx={{ fontSize: 48 }} />,
      title: 'Smart Inventory',
      text: 'Automated stock management with IoT integration'
    },
    { 
      icon: <Receipt sx={{ fontSize: 48 }} />,
      title: 'Digital Records',
      text: 'Blockchain-secured transaction history with NFT receipts'
    },
    { 
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Military-grade Security',
      text: 'End-to-end encryption with quantum-resistant algorithms'
    },
    { 
      icon: <Devices sx={{ fontSize: 48 }} />,
      title: 'Omnichannel Sync',
      text: 'Seamless integration across all devices and platforms'
    },
  ];

  const stats = [
    { value: '10K+', label: 'Businesses Empowered' },
    { value: '99.99%', label: 'Uptime Guarantee' },
    { value: '1M+', label: 'Daily Transactions' },
    { value: '24/7', label: 'Global Support' }
  ];

  return (
    <Box sx={{ background: theme.palette.background.default }}>
      {/* Hero Section */}
      <Box sx={{
        background: theme.custom.gradients.primary,
        py: 15,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl">
          <Box sx={{ 
            textAlign: 'center', 
            color: theme.palette.common.white,
            position: 'relative',
            zIndex: 1
          }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h1" sx={{
                fontWeight: 800,
                letterSpacing: '-0.05em',
                mb: 3,
                background: theme.custom.gradients.accent,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: isMobile ? '2.5rem' : '4rem'
              }}>
                Revolutionize Retail
              </Typography>
              
              <Typography variant="h5" sx={{ 
                mb: 5,
                opacity: 0.9,
                fontWeight: 400,
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6
              }}>
                Harness the power of quantum computing and AI to transform your business operations
              </Typography>

              <Button
               
                 component={Link}
  to="/PosScreening"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  borderRadius: '15px',
                  background: theme.custom.gradients.accent,
                  color: theme.palette.common.white,
                  '&:hover': {
                    boxShadow: `0 0 30px ${theme.palette.secondary.main}50`
                  }
                }}
              >
                Start Free Trial
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 15 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box sx={{
                    p: 4,
                    background: theme.palette.background.paper,
                    borderRadius: 4,
                    boxShadow: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6
                    }
                  }}>
                    <Box sx={{ 
                      color: theme.palette.secondary.main,
                      mb: 3
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: theme.palette.text.primary
                    }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7
                    }}>
                      {feature.text}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ 
        py: 15,
        background: theme.custom.gradients.primary,
        color: theme.palette.common.white
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ 
                      fontWeight: 800,
                      mb: 1,
                      background: theme.custom.gradients.accent,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: isMobile ? '2.5rem' : '3.5rem'
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 500,
                      opacity: 0.9
                    }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 15, background: theme.palette.background.paper }}>
        <Container maxWidth="md">
          <Box sx={{ 
            textAlign: 'center',
            p: 6,
            borderRadius: 4,
            background: theme.custom.gradients.primary,
            boxShadow: 3
          }}>
            <Typography variant="h3" sx={{
              fontWeight: 800,
              mb: 3,
              color: theme.palette.common.white,
              fontSize: isMobile ? '2rem' : '3rem'
            }}>
              Ready to Transform Your Business?
            </Typography>
            <Button
               component={Link}
  to="/PosScreening"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '15px',
                background: theme.custom.gradients.accent,
                color: theme.palette.common.white,
                '&:hover': {
                  boxShadow: `0 0 30px ${theme.palette.secondary.main}50`
                }
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
 