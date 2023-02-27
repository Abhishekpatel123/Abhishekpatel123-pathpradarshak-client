import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    type: "",
  },
};

export const counterSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },

    closeSnackbar: (state) => {
      state.snackbar = {
        open: false,
        message: "",
        type: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSnackbar, closeSnackbar } = counterSlice.actions;

export default counterSlice.reducer;
