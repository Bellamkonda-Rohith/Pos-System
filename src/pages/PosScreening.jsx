import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Select, MenuItem, IconButton, Box, Card, CardContent, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { addItem, incrementQuantity, decrementQuantity } from '../Redux/CartSlice';

const PosScreening = () => {
  const data = [
    { itemCode: 'A001', itemName: 'Premium Coffee Beans', itemPrice: 150 },
    { itemCode: 'A002', itemName: 'Organic Tea Set', itemPrice: 80 },
    { itemCode: 'B001', itemName: 'Wireless Earbuds', itemPrice: 220 },
    { itemCode: 'B002', itemName: 'Smart Watch', itemPrice: 450 },
    { itemCode: 'C001', itemName: 'Leather Wallet', itemPrice: 120 },
    { itemCode: 'C002', itemName: 'Designer Sunglasses', itemPrice: 180 },
  ];

  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const itemInCart = cart.find((item) => item.itemCode === selectedItem);
    setQuantity(itemInCart ? itemInCart.quantity : 1);
  }, [selectedItem, cart]);

  const handleAddToCart = () => {
    const item = data.find(i => i.itemCode === selectedItem);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(selectedItem));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(selectedItem));
  };

  const { totalItems, totalPrice } = useSelector((state) => state.cart);

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Select Item and Quantity
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select an Item
                  </MenuItem>
                  {data.map((item) => (
                    <MenuItem key={item.itemCode} value={item.itemCode}>
                      {`${item.itemCode} - ${item.itemName} ($${item.itemPrice})`} 
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <IconButton onClick={handleDecrement}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  {quantity}
                </Typography>
                <IconButton onClick={handleIncrement}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%', mt: 2 }}
              onClick={handleAddToCart}
              disabled={!selectedItem}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Box>

      {totalItems > 0 && (
        <Box sx={{ p: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Cart Summary</Typography>
              {cart.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.itemName} (x{item.quantity})</Typography>
                  <Typography>${(item.itemPrice * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total Items: {totalItems}</Typography>
                <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '100%', mt: 2 }}
            onClick={handleCart}
            startIcon={<ShoppingCartIcon />}
          >
            Go to Cart
          </Button>
        </Box>
      )}
    </div>
  );
};

export default PosScreening;
