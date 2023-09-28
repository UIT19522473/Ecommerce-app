import React from "react";
import { TextField } from "@mui/material";
import "../styles/signup.css";
import { NavLink, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

// toastify

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { checkRegister } from "../services/auth";

import ReactLoading from "react-loading";
import { useState } from "react";

const SignUp = () => {
  const [waitLogin, setWaitLogin] = useState(false);
  const navigate = useNavigate();
  const navigateLogin = async (success) => {
    setWaitLogin(true);
    if (await success) {
      toast.success("Register Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/account/login");
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
      firstname: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(12, "Must be 12 character or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      navigateLogin(checkRegister(formik, values, toast));
    },
  });
  return (
    <div className="wrap-signup">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Create Account</h2>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column signup-form my-4"
        >
          <h4 className="text-center">Create Account</h4>
          <TextField
            className="my-2 input-signup"
            id="firstname"
            label="First name"
            variant="outlined"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <p className="text-error">{formik.errors.firstname}*</p>
          ) : null}

          <TextField
            className="my-2 input-signup"
            id="lastname"
            label="Last name"
            variant="outlined"
            {...formik.getFieldProps("lastname")}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <p className="text-error">{formik.errors.lastname}*</p>
          ) : null}
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

          <div className="d-flex justify-content-around align-items-center px-3">
            <NavLink to={"/account/login"} className="btn-form btn-form--login">
              Login
            </NavLink>

            <button
              type="submit"
              className={`btn-form btn-form--create d-flex align-items-center gap-2 ${
                waitLogin ? "bg-secondary" : ""
              }`}
            >
              <p>Create</p>
              {waitLogin && (
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={25}
                  width={25}
                />
              )}
            </button>
            {/* <button type="submit" className="btn-form btn-form--create">
              Create
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
