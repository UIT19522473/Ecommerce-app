import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const viewedProductsSlice = createSlice({
  name: "viewedProducts",
  initialState,
  reducers: {
    addViewed: (state, action) => {
      const findIndex = state.data.findIndex(
        (item) => item._id === action.payload?._id
      );
      if (findIndex === -1) {
        state.data = [...state.data, action.payload];
      }
    },

    removeViewed: (state, action) => {
      const findIndex = state.data.findIndex(
        (item) => item._id === action.payload?._id
      );
      if (findIndex !== -1) {
        state.data = state.data.splice(findIndex, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addViewed, removeViewed } = viewedProductsSlice.actions;

export default viewedProductsSlice.reducer;
