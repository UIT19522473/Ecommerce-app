import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "../styles/product.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, chooseItemCart } from "../features/cart/cartSlice";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { apiAddToCart } from "../apis/apiCart";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const item = props.item;

  // const listCartRedux = useSelector((state) => state.cart.listCart);
  // console.log(item);
  // console.log("product", props.item);
  const navigate = useNavigate();
  const { col } = props;
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const show = col === "col-12" ? true : false;

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
  //handle add to cart

  const accessToken = useSelector((state) => state.user?.accessToken);
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    // const newItem = { ...item, quantity: 1 };

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

    toast.success("Added a product to your cart !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 700,
    });

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
    // updateCart();
  };

  return (
    <div
      onClick={handleShowProduct}
      className={`wrap-product-cart ${col ? col : ""}`}
    >
      <div className="product-card position-relative">
        {item?.coupon?.value ? (
          <div className="product-card-discount position-absolute">
            -{item?.coupon?.value}%
          </div>
        ) : (
          <></>
        )}
        <div className="row">
          <div
            className={`product-image ${
              col === "col-12" ? "col-5" : ""
            } position-relative`}
          >
            <div className="wishlist-icon position-absolute">
              <Link
                onClick={(e) => handleWishlist(e)}
                title="Add to wishlist"
                to={"#"}
              >
                <img src="images/wish.svg" alt="wishlist" />
              </Link>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
                {/* <Link title="" to="#">
                  <img src="images/view.svg" alt="view" />
                </Link> */}
                <Link
                  onClick={(e) => handleComapre(e)}
                  title="Add to compare"
                  to="#"
                >
                  <img src="images/prodcompare.svg" alt="compare" />
                </Link>
                <Link
                  onClick={(e) => handleAddToCart(e)}
                  title="Add to cart"
                  to="#"
                >
                  <img src="images/add-cart.svg" alt="add-card" />
                </Link>
              </div>
            </div>

            <div className="wrap-img">
              <img
                src={item?.images[0]}
                className="img-fluid "
                alt="product_image"
              />

              <img
                src={item?.images[1]}
                className="img-fluid"
                alt="product_image"
              />
            </div>
          </div>
          <div className={`product-details ${col === "col-12" ? "col-7" : ""}`}>
            <h6 className="product-brand">{item?.brand?.title}</h6>
            <h5 className="product-title">{item?.title}</h5>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={22}
              activeColor="#ffd700"
              value={3}
              edit={false}
            />
            {show ? <p className="product-desc">{item?.description}</p> : <></>}
            <div className="d-flex gap-2 align-items-center">
              {!item?.coupon ? (
                <p className="product-price">
                  ${item?.variants[0]?.price.toLocaleString("en-US")}
                </p>
              ) : (
                <>
                  <p className="product-price product-price-through">
                    ${item?.variants[0]?.price.toLocaleString("en-US")}
                  </p>
                  <p className="product-price product-price-discount">
                    $
                    {(
                      item?.variants[0]?.price *
                      (1 - item?.coupon?.value / 100)
                    ).toLocaleString("en-US")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
