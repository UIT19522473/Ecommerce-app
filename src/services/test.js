// import { apiRefreshToken } from "../apis/apiUser";
import axios from "../axios";

export const testFunc = async () => {
  // Lấy cookie theo tên
  // const myCookieValue = Cookies.get("test");
  // console.log(myCookieValue);
  // const response = await axios.post(
  //   "/user/refreshtoken",

  //   {
  //     withCredentials: true,
  //     headers: {
  //       Cookie: "your_cookie_value_here",
  //     },
  //   }
  // );

  const response = await axios.get("/test");
  console.log(response);
};
