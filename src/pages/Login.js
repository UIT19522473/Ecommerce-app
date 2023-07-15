import React from "react";
import { TextField } from "@mui/material";
import "../styles/signup.css";
import { NavLink, Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="wrap-signup">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Account</h2>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <form className="d-flex flex-column signup-form my-4">
          <h4 className="text-center">Login</h4>
          <TextField
            className="my-2 input-signup"
            id="filled-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            className="my-2 input-signup"
            id="filled-basic"
            label="Password"
            variant="outlined"
          />
          <Link to={"#"} className="text-black mb-4 link-forgot">
            Forgot your password?
          </Link>

          <div className="d-flex justify-content-around align-items-center px-3">
            <NavLink to={"/register"} className="btn-form btn-form--login">
              Sign Up
            </NavLink>
            <button className="btn-form btn-form--create">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
