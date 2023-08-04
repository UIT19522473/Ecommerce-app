import React from "react";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { InputNumber } from "antd";
import { ItemColor } from "../OurStore/ItemColor";
import ReactStars from "react-rating-stars-component";

const ProductDetailContent = () => {
  return (
    <div className="col-6 product-detail-content">
      <h2 className="product-detail-content-name">
        Kids headphones Bulk 10 Pack Multi Colored For Students adkajd akdj dák
      </h2>

      <div classname="product-detail-content-desc">
        <Collapsible
          trigger={
            <div className="cursor-pointer d-flex items-center">
              <p className="product-detail-content-text">Description</p>
              <span className="material-symbols-outlined fw-bold">
                expand_more
              </span>
            </div>
          }
        >
          <div className="mx-4 text-justify">
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error,
              earum cumque. Praesentium molestias illo, at cupiditate dolorem
              incidunt alias labore. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Error, earum cumque. Praesentium molestias illo,
              at cupiditate dolorem incidunt alias labore.
            </span>
          </div>
        </Collapsible>
      </div>

      <div className="product-detail-content-price mt-2">
        <p className="product-detail-content-text">Price:</p>
        <span className="product-detail-content-price-number">{"$100.00"}</span>
      </div>

      <div className="d-flex product-detail-content-ratings items-center gap-1 mt-2">
        <p className="product-detail-content-text">Ratings:</p>
        <ReactStars
          count={5}
          // onChange={ratingChanged}
          size={20}
          activeColor="#ffd700"
          value={3}
          edit={false}
        />
        <p className="text-gray-500">(5 reviews)</p>
      </div>
      <Link className="mt-2 text-gray-500" to={"#"}>
        Write a review
      </Link>
      <div className="product-detail-content-brand d-flex gap-1 mt-2">
        <p className="product-detail-content-text">Brand:</p>
        <p className="text-gray-500">Havells</p>
      </div>
      <div className="product-detail-content-tags d-flex gap-2 mt-2">
        <p className="product-detail-content-text">Tags:</p>
        <Link className="text-gray-500" to={"#"}>
          headphones
        </Link>
        <Link className="text-gray-500" to={"#"}>
          laptop
        </Link>
        <Link className="text-gray-500" to={"#"}>
          mobile
        </Link>
      </div>

      <div className="product-detail-content-size mt-2 d-flex gap-2">
        <p className="product-detail-content-text">Size:</p>
        <ul className="product-detail-group-size d-flex gap-4">
          <li className="product-detail-box-size">
            <input
              className="cursor-pointer"
              type="radio"
              value="S"
              id="S"
              name="size"
            />
            <label className="text-gray-500" htmlFor="S">
              S
            </label>
          </li>
          <li className="product-detail-box-size">
            <input
              className="cursor-pointer"
              type="radio"
              value="L"
              id="L"
              name="size"
            />
            <label className="text-gray-500" htmlFor="L">
              L
            </label>
          </li>
          <li className="product-detail-box-size">
            <input
              className="cursor-pointer"
              type="radio"
              value="M"
              id="M"
              name="size"
            />
            <label className="text-gray-500" htmlFor="M">
              M
            </label>
          </li>
        </ul>
      </div>

      <div className="product-detail-content-color mt-2">
        <p className="product-detail-content-text">Color:</p>
        <ul className="product-detail-group-color d-flex gap-2 mt-1">
          <li>
            <ItemColor color={"red"} />
          </li>
          <li>
            <ItemColor color={"blue"} />
          </li>
        </ul>
      </div>

      <div className="product-detail-content-quantity d-flex gap-2 mt-4">
        <p className="product-detail-content-text">Quantity:</p>
        <InputNumber
          min={1}
          max={10}
          defaultValue={3}
          //  onChange={onChange}
        />
      </div>

      <div className="product-detail-content-wrap-checkout mt-4">
        <button className="btn-checkout btn-checkout--cart">ADD TO CART</button>
        <button className="btn-checkout">CHECK OUT</button>
      </div>

      <div className="product-detail-content-wishcompare d-flex gap-4 mt-4">
        <dir className="d-flex items-center gap-1 cursor-pointer">
          <img src="/images/wish.svg" alt="wishlist" />
          <p>Add to wishlist</p>
        </dir>

        <div className="d-flex items-center gap-1 cursor-pointer">
          <img src="/images/prodcompare.svg" alt="compare" />
          <p>Add to compare</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
