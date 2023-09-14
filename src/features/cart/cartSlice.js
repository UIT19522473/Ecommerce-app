import { createSlice } from "@reduxjs/toolkit";
// import { getAllBrands } from "./brandAsyncThunk";

const initialState = {
  //   isLoading: false,
  //   success: false,
  //   data: null,
  //   mes: "",
  open: false,
  listCart: [],
  itemChoose: null,
  type: "NEW",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.open = true;
    },
    closeCart: (state) => {
      state.open = false;
    },

    loadCartFromDB: (state, action) => {
      state.listCart = action.payload;
    },
    addToCart: (state, action) => {
      const addQuantity =
        action.payload.quantity === 0 ? 1 : action.payload.quantity;
      const findItemIndex = state.listCart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.color[0] === action.payload.color[0]
      );

      if (findItemIndex === -1) {
        // Nếu không tìm thấy, thêm mới vào mảng
        state.listCart = [...state.listCart, action.payload];
      } else {
        // Nếu tìm thấy, cập nhật phần tử tại vị trí đó
        state.listCart[findItemIndex].quantity =
          action.payload.quantity === 0
            ? state.listCart[findItemIndex].quantity + 1
            : state.listCart[findItemIndex].quantity + addQuantity * 1;
      }
    },

    updateToCart: (state, action) => {
      // const addQuantity =
      //   action.payload.quantity === 0 ? 1 : action.payload.quantity;
      const findItemIndex = state.listCart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.color[0] === action.payload.color[0]
      );

      if (findItemIndex === -1) {
        // Nếu không tìm thấy, thêm mới vào mảng
        state.listCart = [...state.listCart, action.payload];
      } else {
        // Nếu tìm thấy, cập nhật phần tử tại vị trí đó

        state.listCart[findItemIndex] = action.payload;
      }
    },

    removeOneCart: (state, action) => {
      const findItemIndex = state.listCart.findIndex(
        (item) =>
          item._id === action.payload._id &&
          item.color[0] === action.payload.color[0]
      );

      if (findItemIndex !== -1) {
        const updatedListCart = [...state.listCart];
        updatedListCart.splice(findItemIndex, 1); // Xóa phần tử tại index
        // Nếu không tìm thấy, thêm mới vào mảng
        return { ...state, listCart: updatedListCart };
      }
    },

    chooseItemCart: (state, action) => {
      if (action.payload.type === "NEW") {
        state.itemChoose = { ...action.payload.item, quantity: 1 };
      } else {
        state.itemChoose = action.payload.item;
      }
      state.type = action.payload.type;
    },
    removeItemCart: (state, action) => {
      state.itemChoose = null;
    },

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
  //   extraReducers: (builder) => {
  //     // Bắt đầu thực hiện action login (Promise pending)
  //     builder.addCase(getAllBrands.pending, (state) => {
  //       // Bật trạng thái loading
  //       state.isLoading = true;
  //     });

  //     // Khi thực hiện action login thành công (Promise fulfilled)
  //     builder.addCase(getAllBrands.fulfilled, (state, action) => {
  //       // Tắt trạng thái loading, lưu thông tin user vào store
  //       state.isLoading = false;
  //       state.success = action.payload.success;
  //       state.data = action.payload.getBrands || [];
  //       state.mes = "Get Barnds successfully";
  //     });

  //     // Khi thực hiện action login thất bại (Promise rejected)
  //     builder.addCase(getAllBrands.rejected, (state, action) => {
  //       // Tắt trạng thái loading, lưu thông báo lỗi vào store
  //       state.isLoading = false;
  //       state.success = false;
  //       state.data = null;
  //       state.mes = "Server is not working";
  //     });
  //   },
});

// Action creators are generated for each case reducer function
export const {
  openCart,
  closeCart,
  loadCartFromDB,
  addToCart,
  updateToCart,
  removeOneCart,
  chooseItemCart,
  removeItemCart,
} = cartSlice.actions;

export default cartSlice.reducer;
