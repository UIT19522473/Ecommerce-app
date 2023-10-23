import { createSlice } from "@reduxjs/toolkit";
import { login } from "./userAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  currentUser: null,
  accessToken: "",
  mes: "",
  // errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    newAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    logOut: (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.currentUser = null;
      state.accessToken = "";
      state.mes = "";
    },

    removeWishlist: (state, action) => {
      state.currentUser.wishlist = state.currentUser.wishlist.filter(
        (item) => item !== action.payload
      );
    },

    addWishlist: (state, action) => {
      state.currentUser.wishlist = [
        ...state.currentUser.wishlist,
        action.payload,
      ];
    },
  },

  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(login.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(login.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = action.payload.success;
      state.currentUser = action.payload.userData || null;
      state.accessToken = action.payload.accessToken || "";
      state.mes = action.payload.mes || "";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(login.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.currentUser = null;
      state.accessToken = "";
      state.mes = "Server is not working";
    });
  },
});

// Action creators are generated for each case reducer function
export const { logOut, newAccessToken, addWishlist, removeWishlist } =
  userSlice.actions;

export default userSlice.reducer;
