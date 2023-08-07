import axios from "../axios";

const apiLogin = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/login`,
    data,
    { withCredentials: true }
  );
  return response;
};

const apiRegister = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/register`,
    data
  );
  return response;
};

const apiRefreshToken = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_URL_SERVER_API}/user/refreshtoken`,
    { withCredentials: true }
  );
  return response;
};

export { apiLogin, apiRegister, apiRefreshToken };
