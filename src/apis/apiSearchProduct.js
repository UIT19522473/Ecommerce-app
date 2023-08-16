import axios from "../axios";

const apiSearchProduct = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_URL_SERVER_API}/product`,
    {
      params: { title: data },
    },
    { withCredentials: true }
  );
  return response;
};

export { apiSearchProduct };
