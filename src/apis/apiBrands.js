import axios from "../axios";

const apiGetAllBrands = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/brand`,
    { withCredentials: true }
  );
  return response;
};

export { apiGetAllBrands };
