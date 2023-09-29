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
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
