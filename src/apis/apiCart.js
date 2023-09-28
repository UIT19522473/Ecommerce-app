import axios from "../axios";

const apiAddToCart = async (data) => {
  const { content, token } = data;
  console.log("api", content);
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/cart/add-to-cart`,
    // "http://localhost:5000/api/cart/add-to-cart",
    {
      ...content,
    },
    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response;
};

const apiUpdateQuantityToCart = async (data) => {
  const { content, token } = data;
  console.log("api", content);
  const response = await axios.put(
    `${process.env.REACT_APP_URL_SERVER_API}/cart/update-quantity-to-cart`,
    // "http://localhost:5000/api/cart/update-quantity-to-cart",
    {
      ...content,
    },
    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response;
};

const apiGetCart = async (data) => {
  const { token } = data;
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/cart/get-cart`,

    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response.data;
};

const apiDeleteOneCart = async (data) => {
  const { content, token } = data;
  const response = await axios.put(
    `${process.env.REACT_APP_URL_SERVER_API}/cart/delete-one-cart`,
    { ...content },
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

export {
  apiAddToCart,
  apiGetCart,
  apiDeleteOneCart,
  apiRemoveCart,
  apiUpdateQuantityToCart,
};
