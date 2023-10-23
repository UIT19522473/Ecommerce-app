import axios from "../axios";

const apiAddToWishlist = async (data) => {
  const { content, token } = data;
  console.log("api", content);
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/wishlist`,
    {
      ...content,
    },
    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response;
};

const apiGetWishlist = async (data) => {
  const { token } = data;
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/wishlist`,

    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response.data?.data;
};

const apiDeleteWishlist = async (data) => {
  const { pid, token } = data;
  const response = await axios.delete(
    `${process.env.REACT_APP_URL_SERVER_API}/wishlist/${pid}`,

    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response.data?.data;
};

// const apiDeleteOneCart = async (data) => {
//   const { content, token } = data;
//   const response = await axios.put(
//     `${process.env.REACT_APP_URL_SERVER_API}/cart/delete-one-cart`,
//     { ...content },
//     { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
//   );
//   return response.data;
// };

// const apiRemoveCart = async (data) => {
//   const { token } = data;
//   const response = await axios.post(
//     `${process.env.REACT_APP_URL_SERVER_API}/user/removecart`,
//     {},
//     { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
//   );
//   return response.data;
// };

export { apiAddToWishlist, apiGetWishlist, apiDeleteWishlist };
