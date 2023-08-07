import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
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
  },
});

export const persistor = persistStore(store);
export default store; // Xuất biến store
