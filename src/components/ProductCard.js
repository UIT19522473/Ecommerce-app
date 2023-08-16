import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "../styles/product.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const item = props.item;
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
              <Link to={"#"}>
                <img src="images/wish.svg" alt="wishlist" />
              </Link>
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
            <p className="product-price">${item?.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
