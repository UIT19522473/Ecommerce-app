import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./productAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  data: null,
  mes: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // register: (state, action) => {},
    // newAccessToken: (state, action) => {
    //   state.accessToken = action.payload;
    // },
    // logOut: (state, action) => {
    //   state.isLoading = false;
    //   state.success = false;
    //   state.currentUser = null;
    //   state.accessToken = "";
    //   state.mes = "";
    // },
  },

  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getAllProducts.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = action.payload.success;
      state.data = action.payload || [];
      state.mes = "Get products successfully";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getAllProducts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = null;
      state.mes = "Server is not working";
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = productsSlice.actions;

export default productsSlice.reducer;
