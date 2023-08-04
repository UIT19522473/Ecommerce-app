import React from "react";
// import { useParams } from "react-router-dom";
import "../styles/productdetail.css";
import ProductDetailImg from "../components/ProductDetail/ProductDetailImg";
import ProductDetailContent from "../components/ProductDetail/ProductDetailContent";
import ProductDetailReviews from "../components/ProductDetail/ProductDetailReviews";
import { NavLink } from "react-router-dom";

const ProductDetail = () => {
  // const { pid } = useParams();

  return (
    <div className="wrap-product-detail">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        {/* <h2 className="ms-2">Products</h2> */}
      </div>

      <div className="container-xxl my-4">
        <div className="row product-detail-wrap">
          <ProductDetailImg />
          <ProductDetailContent />
        </div>

        <div className="row product-review-wrap ">
          <ProductDetailReviews />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
