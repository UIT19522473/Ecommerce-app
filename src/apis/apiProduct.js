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

const apiFilterProducts = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/product`,
    { params: data },
    { withCredentials: true }
  );
  return response;
};

const apiStockStatus = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/product/stock-status`,
    // { params: data },
    { withCredentials: true }
  );
  return response;
};

const apiGetColorSize = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/product/color-size`,
    // { params: data },
    { withCredentials: true }
  );
  return response;
};

export {
  apiGetAllProducts,
  apiGetOneProducts,
  apiFilterProducts,
  apiStockStatus,
  apiGetColorSize,
};
