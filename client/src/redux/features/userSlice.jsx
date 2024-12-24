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
        // console.log('Setting user:', action.payload); // Log the payload
        state.user = action.payload; // Update the user state
      } else {
        console.warn('No user data provided');
      }
    },
    logout: (state) => {
      console.log('Logging out user'); // Log the logout action
      state.user = null; // Reset user state to null
    },
  },
});

// Export actions
export const { setUser, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
