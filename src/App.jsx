
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme/theme';



import cart from "../src/component/pages/cart"
import NavBar from '../src/components/NavBar';
import posScreen from './component/pages/posScreen';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={< posScreen/>} />
          <Route path="/cart" element={<cart />} />
         
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
