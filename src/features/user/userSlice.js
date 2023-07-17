import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

//login by thunk
export const login = createAsyncThunk(
  // Tên action
  "user/login",
  //   Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    // const response = await fetch(
    //   `${process.env.REACT_APP_URL_SERVER_API}/user/login`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );

    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERVER_API}/user/login`,
      data
    );

    // Convert dữ liệu ra json
    // const jsonData = await response.json();
    const jsonData = response.data;
    // console.log(jsonData);

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }

    // Còn không thì trả về dữ liệu
    return jsonData;
  }
);

const initialState = {
  isLoading: false,
  errorMessage: "",
  currentUser: null,
  accessToken: "",
  success: false,
  mes: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },

    logOut: (state, action) => {
      state.user = null;
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

      state.currentUser = action.payload.userData || null;
      state.accessToken = action.payload.accessToken || "";
      state.success = action.payload.success;
      state.mes = action.payload.mes || "";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(login.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = "Server is not working";
    });
  },
});

// Action creators are generated for each case reducer function
export const { register, logOut } = userSlice.actions;

export default userSlice.reducer;
