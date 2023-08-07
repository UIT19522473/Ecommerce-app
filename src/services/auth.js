// import axios from "axios";
import { apiLogin, apiRegister } from "../apis/apiUser";

//register service
const checkRegister = async (formik, values, toast) => {
  try {
    const response = await apiRegister(values);

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
const checkLogin = async (formik, values, toast) => {
  try {
    const response = await apiLogin(values);

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

export { checkRegister, checkLogin };
