import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OurStore from "./pages/OurStore";
import PageNotFound from "./pages/PageNotFound";
import ProductDetail from "./pages/ProductDetail";
import SuccessPayment from "./pages/SuccessPayment";
import ViewCart from "./pages/ViewCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="our-store" element={<OurStore />} />
            <Route path="product/:pid" element={<ProductDetail />} />
            <Route path="view-cart" element={<ViewCart />} />
            <Route path="success-payment" element={<SuccessPayment />} />

            <Route path="account">
              <Route path="register" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
