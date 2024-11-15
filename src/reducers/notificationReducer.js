import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "null",
  reducers: {
    createNotification(state, action) {
      state = action.payload;
      return state;
    },
    removeNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
