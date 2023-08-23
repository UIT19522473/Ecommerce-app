import { createSlice } from "@reduxjs/toolkit";
import { getSearchProducts } from "./searchProductsAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  data: [],
  mes: "",
};

export const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {},

  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getSearchProducts.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getSearchProducts.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = action.payload.success;
      state.data = action.payload || [];
      state.mes = "Get products successfully";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getSearchProducts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = [];
      state.mes = "Server is not working";
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = categoriesSlice.actions;

export default searchProductsSlice.reducer;
