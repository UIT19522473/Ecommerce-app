import React, { useState } from "react";
import { TextField } from "@mui/material";
import "../styles/signup.css";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userAsyncThunk";
import { checkLogin } from "../services/auth";
import ReactLoading from "react-loading";

const Login = () => {
  const [waitLogin, setWaitLogin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateHome = async (success) => {
    setWaitLogin(true);
    if (await success) {
      navigate("/");
    }
    if (!(await success)) {
      setWaitLogin(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(12, "Must be 12 character or less")
        .required("Required"),
    }),

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // SignIn(formik, values, toast);
      dispatch(login(values));
      navigateHome(checkLogin(formik, values, toast));
    },
  });

  return (
    <div className="wrap-signup">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Account</h2>
      </div>
      <div className="container-xxl d-flex justify-content-center align-items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column signup-form my-4"
        >
          <h4 className="text-center">Login</h4>
          <TextField
            className="my-2 input-signup"
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-error">{formik.errors.email}*</p>
          ) : null}
          <TextField
            className="my-2 input-signup"
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-error">{formik.errors.password}*</p>
          ) : null}
          <Link to={"#"} className="text-black mb-4 link-forgot">
            Forgot your password?
          </Link>

          <div className="d-flex justify-content-around align-items-center px-3">
            <NavLink
              to={"/account/register"}
              className="btn-form btn-form--login"
            >
              Sign Up
            </NavLink>
            <button
              type="submit"
              className={`btn-form btn-form--create d-flex align-items-center gap-2 ${
                waitLogin ? "bg-secondary" : ""
              }`}
            >
              <p>Login</p>
              {waitLogin && (
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={25}
                  width={25}
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
