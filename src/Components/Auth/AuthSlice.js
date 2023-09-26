import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "AuthUser",
  initialState: {
    value: {
      name: "null",
      userID: null,
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: () => {
      state.value = {
        name: null,
        userID: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
