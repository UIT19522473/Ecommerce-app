import axios from "axios";

//register service
export const Register = async (formik, value, toast) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERVER_API}/user/register`,
      value
    );

    if (!response.data.success) {
      formik.setErrors({
        email: response.data.mes,
      });
    } else {
      return true;
    }
  } catch (error) {
    toast.error("Server is not working !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return false;
};

//login service
export const SignIn = async (formik, values, toast) => {
  try {
    // console.log(data.values);
    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERVER_API}/user/login`,
      values
    );

    // console.log("login", response);

    if (!response.data.success) {
      const mess = response?.data?.mes;
      if (mess.includes("Password is incorrect")) {
        formik.setErrors({
          password: response?.data?.mes,
        });
      } else if (mess.includes("Your account is not registered")) {
        formik.setErrors({
          email: response?.data?.mes,
        });
      }
    } else {
      return true;
    }
  } catch (error) {
    toast.error("Server is not working !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return false;
};
