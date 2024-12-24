import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    }
  }
});

export const { setCartItems, updateItemQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
