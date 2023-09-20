import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../styles/spProduct.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, chooseItemCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { apiAddToCart } from "../apis/apiCart";

const SpecialProduct = (props) => {
  const dispatch = useDispatch();
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

  const next = (event) => {
    event.stopPropagation();
    sliderRef.current.slickNext();
  };

  const previous = (event) => {
    event.stopPropagation();
    sliderRef.current.slickPrev();
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [mainImg, setMainImg] = useState(null);
  useEffect(() => {
    setMainImg(item?.images[0]);
  }, [item]);

  const changeMainImg = (event, url) => {
    event.stopPropagation();
    setMainImg(url);
  };

  const handleShowProduct = () => {
    // console.log("test here");
    navigate(`/product/${item._id}`); // Chuyển hướng đến trang /product/:idproduct
    dispatch(chooseItemCart({ item: item, type: "NEW" }));
  };

  //wish list
  const handleWishlist = (e) => {
    e.stopPropagation();
  };

  //comapre
  const handleComapre = (e) => {
    e.stopPropagation();
  };
  //cart
  const accessToken = useSelector((state) => state.user?.accessToken);
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    toast.success("Added a product to your cart !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 700,
    });
    // dispatch(addToCart({ ...item, quantity: 1 }));
    const newItem = {
      product: item,
      variant: {
        color: item?.variants[0]?.color,
        size: item?.variants[0]?.size,
        price: item?.variants[0]?.price,
      },
      quantity: 1,
    };

    // Dispatch action to update cart in Redux
    // dispatch(addToCart(newItem));
    dispatch(addToCart(newItem));

    if (accessToken !== "") {
      const content = {
        productId: item?._id,
        quantity: 1,
        variant: item?.variants[0],
      };
      await apiAddToCart({
        content: content, // Use the updated cart here
        token: accessToken,
      });
    }
  };

  //down time  function CountdownClock() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Thời gian bạn muốn đếm ngược đến
  // const targetDateString = "15/11/2023 23:59:59";
  const [datePart, timePart] = item?.coupon?.timeEnd.split(" ");
  // const [Date, Time] = item?.coupon?.timeEnd.split(" ");
  // console.log({ Date, Time });
  const [day, month, year] = datePart.toString().split("/");
  const [hour, minute, second] = timePart.split(":");
  const targetDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second
  ).getTime();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeLeft = targetDate - currentDate;

      if (timeLeft <= 0) {
        // Thời gian đã hết, bạn có thể thực hiện hành động tương ứng ở đây
        clearInterval(intervalId);
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Dọn dẹp bất kỳ hẹn giờ nào khi component bị hủy
    };
  }, [targetDate]);

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
                <Link
                  title="Add to wishlist"
                  onClick={(e) => handleWishlist(e)}
                  to={"#"}
                >
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
                  {/* <Link to="#">
                    <img src="images/view.svg" alt="view" />
                  </Link> */}
                  <Link
                    title="Add to compare"
                    onClick={(e) => handleComapre(e)}
                    to="#"
                  >
                    <img src="images/prodcompare.svg" alt="compare" />
                  </Link>
                  <Link
                    title="Add to cart"
                    onClick={(e) => handleAddToCart(e)}
                    to="#"
                  >
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
                onClick={(e) =>
                  changeMainImg(
                    e,
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
                onClick={(e) => changeMainImg(e, item?.images[1])}
                className="img-small d-flex"
              >
                <img src={item?.images[1]} alt="logo" />
              </div>
              <div
                onClick={(e) => changeMainImg(e, item?.images[0])}
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
            <span className="content-cost-past">
              ${item?.variants[0]?.price.toLocaleString("en-US")}
            </span>
            <span className="content-cost-current">
              $
              {(
                item?.variants[0]?.price *
                (1 - item?.coupon?.value / 100)
              ).toLocaleString("en-US")}
            </span>
          </div>
          <div className="content-date-sale d-sm-flex">
            <div className="d-flex">
              <p className="date-days">{countdown.days}</p>
              <p className="mx-2">Days</p>
            </div>
            <div className="d-flex">
              <div className="date-time">
                <p>{countdown.hours}</p>
              </div>
              <p className="">:</p>
              <div className="date-time">
                <p>{countdown.minutes}</p>
              </div>
              <p>:</p>
              <div className="date-time">
                <p>{countdown.seconds}</p>
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
