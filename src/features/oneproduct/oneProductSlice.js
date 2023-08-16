import { createSlice } from "@reduxjs/toolkit";
import { getOneProduct } from "./oneProductAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  data: null,
  mes: "",
};

export const oneProductSlice = createSlice({
  name: "oneProduct",
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
    builder.addCase(getOneProduct.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = action.payload.success;
      state.data = action.payload || [];
      state.mes = "Get One Product successfully";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getOneProduct.rejected, (state, action) => {
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

export default oneProductSlice.reducer;
