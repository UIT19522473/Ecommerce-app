import axios from "../axios";

const apiGetAllCategories = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/productcategory`,
    { withCredentials: true }
  );
  return response;
};

export { apiGetAllCategories };
