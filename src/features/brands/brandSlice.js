import { createSlice } from "@reduxjs/toolkit";
import { getAllBrands } from "./brandAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  data: null,
  mes: "",
};

export const brandSlice = createSlice({
  name: "brand",
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
    builder.addCase(getAllBrands.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = action.payload.success;
      state.data = action.payload.getBrands || [];
      state.mes = "Get Barnds successfully";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getAllBrands.rejected, (state, action) => {
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

export default brandSlice.reducer;
