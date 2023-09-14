import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import RightMenuCart from "./RightMenuCart";
import { useSelector } from "react-redux";

const Layout = () => {
  const openCart = useSelector((state) => state.cart.open);
  return (
    <>
      <ToastContainer />
      <Header />
      {openCart && <RightMenuCart />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
