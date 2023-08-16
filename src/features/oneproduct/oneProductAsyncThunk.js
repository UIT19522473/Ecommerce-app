import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetOneProducts } from "../../apis/apiProduct";

//login by thunk
export const getOneProduct = createAsyncThunk(
  // Tên action
  "oneproduct/getOneProduct",
  //   Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await apiGetOneProducts(data);

    const jsonData = response.data;

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }

    // Còn không thì trả về dữ liệu
    return jsonData;
  }
);
