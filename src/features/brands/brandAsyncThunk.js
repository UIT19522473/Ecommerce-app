import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllBrands } from "../../apis/apiBrands";

//login by thunk
export const getAllBrands = createAsyncThunk(
  // Tên action
  "brand/getAllBrands",
  //   Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await apiGetAllBrands();

    const jsonData = response.data;

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }

    // Còn không thì trả về dữ liệu
    return jsonData;
  }
);
