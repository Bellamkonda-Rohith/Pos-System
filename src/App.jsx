
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




import ShoppingCartScreen from './pages/ShoppingCartScreen';
import PosScreening from './pages/PosScreening'
import PaymentScreen from './pages/PaymentScreen';
import OrderConfirmationScreen from './pages/OrderConfirmationScreen';
import DashboardScreen from './pages/DashboardScreen';
import NavBar from './components/Navbar';
function App() {
  return (
    
    
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={< PosScreening />} />
        <Route path="/PosScreening" element={< PosScreening/>} />
        
          <Route path="/PosScreening" element={<PosScreening />} />

          
        <Route path="/cart" element={<ShoppingCartScreen />} />
        <Route path="/PaymentScreen" element={<PaymentScreen />} />
        <Route path="/OrderConfirmationScreen" element={<OrderConfirmationScreen />} />
        <Route path="/DashboardScreen" element={<DashboardScreen/>} />
        
      
        
        
        </Routes>
      </Router>
  
  );
}

export default App;
