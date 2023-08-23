import axios from "../axios";

const apiCreatePayment = async (data, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/payment`,
    { listProducts: data },
    { withCredentials: true, headers: { Authorization: `Bear ${token}` } }
  );
  return response;
};

export { apiCreatePayment };
