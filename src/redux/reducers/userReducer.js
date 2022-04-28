import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// actions
export const { setUser } = userSlice.actions;

// selectors
export const selectUser = store => store.user.user;

// reducer
export default userSlice.reducer;
