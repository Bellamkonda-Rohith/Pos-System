import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Link, 
  TextField, 
  Button, 
  Divider,
  useMediaQuery,
  Container
} from '@mui/material';
import { 
  Email, 
  Phone, 
  LocationOn, 
  Twitter, 
  Instagram, 
  LinkedIn,
  GitHub
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const gradients = theme.custom?.gradients || {
    accent: 'linear-gradient(45deg, #0EA5E9 0%, #8B5CF6 100%)'
  };

  const footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Documentation', 'Status'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Partners'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR'] },
  ];

  const socialLinks = [
    { icon: <Twitter />, name: 'Twitter' },
    { icon: <Instagram />, name: 'Instagram' },
    { icon: <LinkedIn />, name: 'LinkedIn' },
    { icon: <GitHub />, name: 'GitHub' },
  ];

  return (
    <Box sx={{
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      pt: 8,
      pb: 4,
      borderTop: `1px solid ${theme.palette.secondary.main}30`
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Newsletter Column */}
          <Grid item xs={12} md={3} lg={3}>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <Typography variant="h6" sx={{ 
                mb: 3,
                fontWeight: 700,
                background: gradients.accent,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Stay Updated
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: theme.palette.common.white,
                    '& fieldset': { borderColor: theme.palette.secondary.main },
                    '&:hover fieldset': { borderColor: theme.palette.accent.main }
                  }
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  background: gradients.accent,
                  fontWeight: 600,
                  '&:hover': { boxShadow: `0 0 20px ${theme.palette.accent.main}50` }
                }}
              >
                Subscribe
              </Button>
            </motion.div>
          </Grid>

          {/* Links Columns */}
          {footerLinks.map((section, index) => (
            <Grid item xs={6} md={2} lg={2} key={section.title}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <Typography variant="subtitle1" sx={{ 
                  mb: 2, 
                  fontWeight: 600,
                  color: theme.palette.secondary.main
                }}>
                  {section.title}
                </Typography>
                {section.links.map((link) => (
                  <Link
                    href="#"
                    key={link}
                    underline="none"
                    sx={{
                      display: 'block',
                      color: theme.palette.common.white,
                      mb: 1.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: theme.palette.accent.main,
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </motion.div>
            </Grid>
          ))}

          {/* Contact Column */}
          <Grid item xs={12} md={3} lg={3}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography variant="subtitle1" sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: theme.palette.secondary.main
              }}>
                Contact Us
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <Email sx={{ mr: 1.5, color: theme.palette.accent.main }} />
                <Typography>support@pospro.com</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                <Phone sx={{ mr: 1.5, color: theme.palette.accent.main }} />
                <Typography>+1 (555) 123-4567</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1.5, color: theme.palette.accent.main }} />
                <Typography>San Francisco, CA</Typography>
              </Box>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: '12px',
                        borderColor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                          borderColor: theme.palette.accent.main,
                          background: `${theme.palette.accent.main}15`
                        }
                      }}
                    >
                      {social.icon}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ 
          my: 6, 
          borderColor: `${theme.palette.secondary.main}30` 
        }} />

        {/* Copyright */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              © {new Date().getFullYear()} POS Pro
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Designed with ❤️ in California
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;