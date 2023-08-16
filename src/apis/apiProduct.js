import axios from "../axios";

const apiGetAllProducts = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/product`,
    { withCredentials: true }
  );
  return response;
};

const apiGetOneProducts = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/product/${data}`,
    { withCredentials: true }
  );
  return response;
};

export { apiGetAllProducts, apiGetOneProducts };
