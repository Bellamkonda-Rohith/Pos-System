// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0F172A',    // Dark Navy
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0EA5E9',    // Vibrant Teal
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#8B5CF6',    // Soft Purple
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8FAFC', // Light Background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Dark Text
      secondary: '#64748B', // Muted Text
    },
  },
  // Add custom properties
  custom: {
    gradients: {
      primary: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
      accent: 'linear-gradient(45deg, #0EA5E9 0%, #8B5CF6 100%)'
    }
  }
});