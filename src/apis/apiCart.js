import axios from "../axios";

const apiAddToCart = async (data) => {
  const { content, token } = data;
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/addcart`,
    {
      listProduct: content,
    },
    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response;
};

const apiGetCart = async (data) => {
  const { token } = data;
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/user/getcart`,

    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response.data;
};

const apiRemoveCart = async (data) => {
  const { token } = data;
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/removecart`,
    {},
    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response.data;
};

export { apiAddToCart, apiGetCart, apiRemoveCart };
