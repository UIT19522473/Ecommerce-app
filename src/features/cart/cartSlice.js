import { createSlice } from "@reduxjs/toolkit";
// import { getAllBrands } from "./brandAsyncThunk";

const initialState = {
  //   isLoading: false,
  //   success: false,
  //   data: null,
  //   mes: "",
  open: false,
  itemChoose: null,
  type: "NEW",
  listCart: [],
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
      let findItemIndex = -1;

      if (state.listCart.length > 0) {
        findItemIndex = state.listCart.findIndex(
          (item) =>
            item.product?._id === action.payload.product?._id &&
            item.variant.color === action.payload.variant?.color &&
            item?.variant.size === action.payload.variant?.size
        );
      }

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

    updateQuantityToCart: (state, action) => {
      let findItemIndex = -1;

      if (state.listCart.length > 0) {
        findItemIndex = state.listCart.findIndex(
          (item) =>
            item.product?._id === action.payload.product?._id &&
            item.variant.color === action.payload.variant?.color &&
            item?.variant.size === action.payload.variant?.size
        );
      }

      if (findItemIndex === -1) {
        // Nếu không tìm thấy, thêm mới vào mảng
        state.listCart = [...state.listCart, action.payload];
      } else {
        // Nếu tìm thấy, cập nhật phần tử tại vị trí đó
        state.listCart[findItemIndex].quantity = action.payload.quantityChange
          ? action.payload.quantityChange
          : 1;
      }
    },

    removeOneCart: (state, action) => {
      const findItemIndex = state.listCart.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.variant.color === action.payload.variant.color &&
          item.variant.size === action.payload.variant.size
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
        state.itemChoose = {
          variant: null,
          product: action.payload.item,
          quantity: 1,
        };
      } else {
        state.itemChoose = action.payload.item;
      }
      state.type = action.payload.type;
    },
    removeItemCart: (state, action) => {
      state.itemChoose = null;
    },

    setDefaultCart: (state) => {
      state.open = false;
      state.listCart = [];
      state.itemChoose = null;
      state.type = "NEW";
    },
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
  updateQuantityToCart,
  removeOneCart,
  chooseItemCart,
  removeItemCart,
  setDefaultCart,
} = cartSlice.actions;

export default cartSlice.reducer;
