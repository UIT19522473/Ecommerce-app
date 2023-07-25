import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "../styles/product.css";

const ProductCard = ({ col }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const show = col === "col-12" ? true : false;

  // return (
  //   <div
  //     // className="col-3"
  //     className={`wrap-product-cart ${col ? col : ""}`}
  //   >
  //     <div className="product-card position-relative ">
  //       <div className="product-card-discount position-absolute">-25%</div>
  //       <div className="wishlist-icon position-absolute">
  //         <Link to={"#"}>
  //           <img src="images/wish.svg" alt="wishlist" />
  //         </Link>
  //       </div>

  //       <div className="product-image">
  //         <img
  //           src="images/watch.jpg"
  //           className="img-fluid"
  //           alt="product_image"
  //         />
  //         <img
  //           src="https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
  //           className="img-fluid"
  //           alt="product_image"
  //         />
  //       </div>
  //       <div className="product-details">
  //         <h6 className="brand">Havels</h6>
  //         <h5 className="product-title">
  //           Kids headphones bulk 10 pack multi colored for students
  //         </h5>
  //         <ReactStars
  //           count={5}
  //           onChange={ratingChanged}
  //           size={24}
  //           activeColor="#ffd700"
  //           value={3}
  //           edit={false}
  //         />
  //         {show ? (
  //           <p className="product-desc">
  //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
  //             incidunt alias error omnis a.
  //           </p>
  //         ) : (
  //           <></>
  //         )}
  //         <p className="price">$100.000</p>
  //       </div>

  //       <div className="action-bar position-absolute">
  //         <div className="d-flex flex-column gap-15">
  //           <Link to="#">
  //             <img src="images/view.svg" alt="view" />
  //           </Link>
  //           <Link to="#">
  //             <img src="images/prodcompare.svg" alt="compare" />
  //           </Link>
  //           <Link to="#">
  //             <img src="images/add-cart.svg" alt="add-card" />
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // test------------------------
  return (
    <div
      // className="col-3"
      className={`wrap-product-cart ${col ? col : ""}`}
    >
      <div className="product-card ">
        <div className="row">
          <div
            className={`product-image ${
              col === "col-12" ? "col-3" : ""
            } position-relative`}
          >
            <div className="product-card-discount position-absolute">-25%</div>
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
            <img
              src="images/watch.jpg"
              className="img-fluid"
              alt="product_image"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0620/5082/8457/products/09_00_260x.jpg?v=1655095991"
              className="img-fluid"
              alt="product_image"
            />
          </div>
          <div className={`product-details ${col === "col-12" ? "col-9" : ""}`}>
            <h6 className="brand">Havels</h6>
            <h5 className="product-title">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              value={3}
              edit={false}
            />
            {show ? (
              <p className="product-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                incidunt alias error omnis a.
              </p>
            ) : (
              <></>
            )}
            <p className="price">$100.000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
