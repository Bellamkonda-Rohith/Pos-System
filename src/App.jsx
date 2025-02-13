
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




import ShoppingCartScreen from './pages/ShoppingCartScreen';
import PosScreening from './pages/PosScreening'
import PaymentScreen from './pages/PaymentScreen';
import OrderConfirmationScreen from './pages/OrderConfirmationScreen';
import DashboardScreen from './pages/DashboardScreen';
import NavBar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
function App() {
  return (
    
    
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={< LandingPage />} />
        <Route path="/PosScreening" element={< PosScreening/>} />
        
          <Route path="/PosScreening" element={<PosScreening />} />

          
        <Route path="/cart" element={<ShoppingCartScreen />} />
        <Route path="/PaymentScreen" element={<PaymentScreen />} />
        <Route path="/OrderConfirmationScreen" element={<OrderConfirmationScreen />} />
        <Route path="/DashboardScreen" element={<DashboardScreen/>} />
        
      
        
        
      </Routes>
      <Footer/>
      </Router>
  
  );
}

export default App;
