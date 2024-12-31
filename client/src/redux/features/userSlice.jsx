import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Default user state is null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload; // Update the user state
      } else {
        console.warn('No user data provided');
      }
    },
    logout: (state) => {
      state.user = null; // Reset user state to null
    },
    addAddressToStore: (state, action) => {
      if (state.user && state.user.addresses) {
        state.user.addresses.push(action.payload); // Add new address
      }
    },
    updateAddressInStore: (state, action) => {
      if (state.user && state.user.addresses) {
        state.user.addresses = state.user.addresses.map((addr) =>
          addr._id === action.payload._id ? action.payload : addr
        );
      }
    },
    removeAddressFromStore: (state, action) => {
      if (state.user && state.user.addresses) {
        state.user.addresses = state.user.addresses.filter(
          (address) => address._id !== action.payload
        );
      }
    },
  },
});

// Export actions
export const { setUser, logout, addAddressToStore, updateAddressInStore,removeAddressFromStore } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
