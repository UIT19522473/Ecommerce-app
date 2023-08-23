import { createSlice } from "@reduxjs/toolkit";
// import { getAllBrands } from "./brandAsyncThunk";

const initialState = {
  isLoading: false,
  success: false,
  data: {
    categories: [],
    brands: [],
    availability: {
      in: false,
      out: false,
    },
    price: {
      from: null,
      to: null,
    },
    colors: [],
    sizes: [],
  },
  mes: "",
};

export const filterOurStoreSlice = createSlice({
  name: "filterOurStore",
  initialState,
  reducers: {
    //category-------------
    updateCategoryOurStore: (state, action) => {
      const idCategory = action.payload;
      const findCategoryId = state.data?.categories.indexOf(idCategory);

      if (findCategoryId === -1) {
        const updatedCategories = [...state.data?.categories, idCategory];
        return {
          ...state,
          data: {
            ...state.data,
            categories: updatedCategories,
          },
        };
      }
    },
    removeIdCategoryOurStore: (state, action) => {
      const categoryIdToRemove = action.payload;
      const updatedCategories = state.data.categories.filter(
        (categoryId) => categoryId !== categoryIdToRemove
      );

      return {
        ...state,
        data: {
          ...state.data,
          categories: updatedCategories,
        },
      };
    },

    //brand---------------
    updateBrandOurStore: (state, action) => {
      const idBrand = action.payload;
      const findBrandId = state.data?.brands.indexOf(idBrand);

      if (findBrandId === -1) {
        const updatedBrands = [...state.data?.brands, idBrand];
        return {
          ...state,
          data: {
            ...state.data,
            brands: updatedBrands,
          },
        };
      }
    },
    removeIdBrandOurStore: (state, action) => {
      const brandIdToRemove = action.payload;
      const updatedBrandss = state.data.brands.filter(
        (brand) => brand !== brandIdToRemove
      );

      return {
        ...state,
        data: {
          ...state.data,
          brands: updatedBrandss,
        },
      };
    },
    //availability------------
    updateInStockOurStore: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          availability: {
            ...state.data.availability,
            in: action.payload,
          },
        },
      };
    },
    updateOutStockOurStore: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          availability: {
            ...state.data.availability,
            out: action.payload,
          },
        },
      };
    },

    //price-----------------
    updatePriceFrom: (state, action) => {
      //   const brandIdToRemove = action.payload;
      //   const updatedBrandss = state.data.brands.filter(
      //     (brand) => brand !== brandIdToRemove
      //   );

      return {
        ...state,
        data: {
          ...state.data,
          price: {
            ...state.data.price,
            from: action.payload,
          },
        },
      };
    },
    updatePriceTo: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          price: {
            ...state.data.price,
            to: action.payload,
          },
        },
      };
    },

    //colors-------------
    updateColorsOurStore: (state, action) => {
      const color = action.payload;
      const findColor = state.data?.colors.indexOf(color);

      if (findColor === -1) {
        const updatedColors = [...state.data?.colors, color];
        return {
          ...state,
          data: {
            ...state.data,
            colors: updatedColors,
          },
        };
      }
    },
    removeColorsOurStore: (state, action) => {
      const colorIsRemoved = action.payload;
      const updatedColors = state.data.colors.filter(
        (color) => color !== colorIsRemoved
      );

      return {
        ...state,
        data: {
          ...state.data,
          colors: updatedColors,
        },
      };
    },

    //size--------------------

    updateSizeOurStore: (state, action) => {
      const size = action.payload;
      const findSize = state.data?.sizes.indexOf(size);

      if (findSize === -1) {
        const updatedSizes = [...state.data?.sizes, size];
        return {
          ...state,
          data: {
            ...state.data,
            sizes: updatedSizes,
          },
        };
      }
    },
    removeSizeOurStore: (state, action) => {
      const sizeIsRemoved = action.payload;
      const updatedSizes = state.data.sizes.filter(
        (size) => size !== sizeIsRemoved
      );

      return {
        ...state,
        data: {
          ...state.data,
          sizes: updatedSizes,
        },
      };
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
  // categories
  updateCategoryOurStore,
  removeIdCategoryOurStore,
  //   brands
  updateBrandOurStore,
  removeIdBrandOurStore,

  //availability
  updateInStockOurStore,
  updateOutStockOurStore,

  //price
  updatePriceFrom,
  updatePriceTo,

  //colors
  updateColorsOurStore,
  removeColorsOurStore,

  //size
  updateSizeOurStore,
  removeSizeOurStore,
} = filterOurStoreSlice.actions;

export default filterOurStoreSlice.reducer;
