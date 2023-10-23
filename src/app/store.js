import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import searchProductsReducer from "../features/searchProducts/searchProductsSlice";
import getOneProductReducer from "../features/oneproduct/oneProductSlice";
import brandReducer from "../features/brands/brandSlice";
import filterOurStoreReducer from "../features/filterOurStore/filterOurStore";
import cardReducer from "../features/cart/cartSlice";

import viewedProductsReducer from "../features/viewedProducts/viewedProductsSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Chọn storage engine (local storage, AsyncStorage, ...)
const persistConfig = {
  key: "root", // key để lưu trạng thái vào storage
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    products: productsReducer,
    categories: categoriesReducer,
    cart: cardReducer,
    searchProducts: searchProductsReducer,
    getProduct: getOneProductReducer,
    brands: brandReducer,
    filterOurStore: filterOurStoreReducer,
    viewedProducts: viewedProductsReducer,
  },
});

export const persistor = persistStore(store);
export default store; // Xuất biến store
