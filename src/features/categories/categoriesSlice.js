import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./categoryAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  data: null,
  mes: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getAllCategories.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = action.payload.success;
      state.data = action.payload.getCategories || [];
      state.mes = "Get categories successfully";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getAllCategories.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = null;
      state.mes = "Server is not working";
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
