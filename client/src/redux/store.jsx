// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice' // Import your slice reducers
import alertReducer from './features/alertSlice';
import cartReducer from './features/cartSlice';

// Configure the Redux store and add the slices
const store = configureStore({
  reducer: {
    user: userReducer,     // user slice reducer
    alert: alertReducer,   // alert slice reducer
    cart: cartReducer,
  },
});

export default store; // Export the store
