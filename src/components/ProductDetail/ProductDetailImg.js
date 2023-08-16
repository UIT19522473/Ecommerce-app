import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { settingSubProductImg } from "../../pages/settingSlick";

const ProductDetailImg = (props) => {
  const { product } = props;
  const sliderRef = useRef(null);

  const [mainImg, setMainImg] = useState(null);
  useEffect(() => {
    setMainImg(
      // "https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
      product?.images[0]
    );
  }, [product]);

  const changeMainImg = (url) => {
    setMainImg(url);
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="col-6 product-detail-img">
      <div className="img-fluid product-detail-img-main">
        <img src={mainImg || "/images/watch.jpg"} alt="logo" />
      </div>
      <div className="product-detail-img-sub">
        <div className="sp-img-sub">
          <button
            onClick={previous}
            className="btn-img-sub btn-img-sub--pre btn-detail-product-sub-img--pre"
          >
            <span className="material-symbols-outlined fw-bold ">
              arrow_back_ios
            </span>
          </button>

          <button
            onClick={next}
            className="btn-img-sub btn-img-sub--next btn-detail-product-sub-img--next"
          >
            <span className="material-symbols-outlined fw-bold ">
              arrow_forward_ios
            </span>
          </button>

          <Slider ref={sliderRef} {...settingSubProductImg}>
            <div
              onClick={() =>
                changeMainImg(
                  // "https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
                  product?.images[0]
                )
              }
              className="img-small d-flex"
            >
              <img
                // src="https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
                src={product?.images[0]}
                alt="logo"
              />
            </div>
            <div
              onClick={() =>
                changeMainImg(
                  // "/images/watch.jpg"
                  product?.images[1]
                )
              }
              className="img-small d-flex"
            >
              <img src={product?.images[1]} alt="logo" />
            </div>
            <div
              onClick={() =>
                changeMainImg(
                  // "/images/watch.jpg"
                  product?.images[0]
                )
              }
              className="img-small d-flex"
            >
              <img src={product?.images[0]} alt="logo" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailImg;
