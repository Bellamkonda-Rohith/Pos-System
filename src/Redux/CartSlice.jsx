import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.cart.find(cartItem => cartItem.itemCode === item.itemCode);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...item, quantity: 1 });
                state.totalItems += 1;
            }
            state.totalPrice += item.itemPrice;
        },
        incrementQuantity: (state, action) => {
            const itemCode = action.payload;
            const item = state.cart.find(cartItem => cartItem.itemCode === itemCode);

            if (item) {
                item.quantity += 1;
                state.totalPrice += item.itemPrice;
            }
        },
        decrementQuantity: (state, action) => {
            const itemCode = action.payload;
            const item = state.cart.find(cartItem => cartItem.itemCode === itemCode);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalPrice -= item.itemPrice;
            }
        },
        removeFromCart: (state, action) => {
            const itemCode = action.payload;
            const item = state.cart.find(cartItem => cartItem.itemCode === itemCode);

            if (item) {
                state.cart = state.cart.filter(cartItem => cartItem.itemCode !== itemCode);
                state.totalItems -= item.quantity;
                state.totalPrice -= item.itemPrice * item.quantity;
            }
        },
        resetCart: (state) => {
            state.cart = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addItem, incrementQuantity, decrementQuantity, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
