import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../styles/spProduct.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SpecialProduct = (props) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const { item } = props;

  const settingSubImages = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [mainImg, setMainImg] = useState(null);
  useEffect(() => {
    setMainImg(item?.images[0]);
  }, [item]);

  const changeMainImg = (url) => {
    setMainImg(url);
  };

  const handleShowProduct = () => {
    // console.log("test here");
    navigate(`/product/${item._id}`); // Chuyển hướng đến trang /product/:idproduct
  };
  return (
    <div onClick={handleShowProduct} className="wrap-special-product">
      <div className="row special-product d-flex">
        <div className="special-product-img col-6">
          <div className="sp-img-main">
            <div className="product-card product-card-special position-relative">
              <div className="product-discount position-absolute">
                -{item?.coupon?.value}%
              </div>
              <div className="wishlist-icon position-absolute">
                <Link to={"#"}>
                  <img src="images/wish.svg" alt="wishlist" />
                </Link>
              </div>
              <div className="product-image">
                <img
                  src={
                    mainImg ||
                    "https://cdn.shopify.com/s/files/1/0620/5082/8457/products09_00_260x.jpg?v=1655095991"
                  }
                  className="img-fluid"
                  alt="product_image"
                />
              </div>

              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link to="#">
                    <img src="images/view.svg" alt="view" />
                  </Link>
                  <Link to="#">
                    <img src="images/prodcompare.svg" alt="compare" />
                  </Link>
                  <Link to="#">
                    <img src="images/add-cart.svg" alt="add-card" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="sp-img-sub">
            <button onClick={previous} className="btn-img-sub btn-img-sub--pre">
              <span className="material-symbols-outlined fw-bold  ">
                arrow_back_ios
              </span>
            </button>

            <button onClick={next} className="btn-img-sub btn-img-sub--next">
              <span className="material-symbols-outlined fw-bold ">
                arrow_forward_ios
              </span>
            </button>

            <Slider ref={sliderRef} {...settingSubImages}>
              <div
                onClick={() =>
                  changeMainImg(
                    // "https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
                    item?.images[0]
                  )
                }
                className="img-small d-flex"
              >
                <img
                  // src="https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
                  src={item?.images[0]}
                  alt="logo"
                />
              </div>
              <div
                onClick={() => changeMainImg(item?.images[1])}
                className="img-small d-flex"
              >
                <img src={item?.images[1]} alt="logo" />
              </div>
              <div
                onClick={() => changeMainImg(item?.images[0])}
                className="img-small d-flex"
              >
                <img src={item?.images[0]} alt="logo" />
              </div>
            </Slider>
          </div>
        </div>
        <div className="special-product-content col-6">
          <p className="content-brand mb-2">{item?.brand?.title}</p>
          <h3 className="content-name">{item?.title}</h3>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={20}
            activeColor="#ffd700"
            value={item?.totalRatings}
            edit={false}
          />
          <div className="content-cost d-flex gap-10">
            <span className="content-cost-past">${item?.price}</span>
            <span className="content-cost-current">
              ${item?.price * (1 - item?.coupon?.value / 100)}
            </span>
          </div>
          <div className="content-date-sale d-sm-flex">
            <div className="d-flex">
              <p className="date-days">37</p>
              <p className="mx-2">Days</p>
            </div>
            <div className="d-flex">
              <div className="date-time">
                <p>04</p>
              </div>
              <p className="">:</p>
              <div className="date-time">
                <p>29</p>
              </div>
              <p>:</p>
              <div className="date-time">
                <p>20</p>
              </div>
            </div>
          </div>
          <Link className="button btn-option mt-3">Option</Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
