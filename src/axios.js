import axios from "axios";
import store from "./app/store";
import jwtDecode from "jwt-decode";
import { apiRefreshToken } from "./apis/apiUser";
import { newAccessToken } from "./features/user/userSlice";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER_API,
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  async function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const user = store.getState().user; // Truy cập thông tin user từ Redux Store
    // console.log("cai nay chua het han", user.accessToken);

    if (user.currentUser) {
      const currentTime = Date.now() / 1000;
      const decoded = jwtDecode(user.accessToken);
      if (decoded.exp < currentTime) {
        //   // Access token đã hết hạn, bạn có thể thực hiện các hành động ở đây
        //   // Ví dụ: gửi yêu cầu mới để làm mới token hoặc đăng xuất người dùng

        const response = await axios.post(
          `${process.env.REACT_APP_URL_SERVER_API}/user/refreshtoken`,
          {},
          {
            withCredentials: true,
          }
        );

        store.dispatch(newAccessToken(response.data.newAccessToken));
        // console.log(
        //   "het han xong tao gan lai ne",
        //   response.data.newAccessToken
        // );

        // config.headers.Authorization = "Bear" + response.data.newAccessToken
      } else {
        console.log("accessToken is valided");
      }
    }

    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);

export default instance;
