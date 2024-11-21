import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "null",
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state) {
      state = "";
      return state;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(createNotification(message));

    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
