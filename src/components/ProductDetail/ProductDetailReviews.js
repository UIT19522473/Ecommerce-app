import React from "react";
import Collapsible from "react-collapsible";
import ReactStars from "react-rating-stars-component";
import "../../styles/productdetail.css";

const ReviewByCustomer = (props) => {
  return (
    <div className="box-review-customer">
      <ReactStars
        name="input-rating"
        count={5}
        // onChange={ratingChanged}
        size={16}
        activeColor="#ffd700"
        value={3}
        edit={false}
      />

      <p className="text-sm fw-medium">Kha hai long</p>
      <p className="text-xs fw-medium">on 8/4/2023</p>
      <span className="text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, enim.
        Ratione, numquam! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Aut, enim. Ratione, numquam!
      </span>
    </div>
  );
};

const ProductDetailReviews = () => {
  return (
    <div className="row product-reviews-wrap">
      <p className="text-xl font-bold">Reviews</p>
      <div className="wrap-box-reviews mt-3">
        <div className="box-write-review">
          <Collapsible
            trigger={
              <div className="cursor-pointer d-flex align-items-center">
                <p className="text-sm font-semibold">Write your review</p>
                <span className="material-symbols-outlined fw-bold fs-6 mt-[1px]">
                  expand_more
                </span>
              </div>
            }
          >
            <div className="text-justify">
              <form action="#" className="form-write-review">
                <div className="wrap-input">
                  <label htmlFor="input-name">Name</label>
                  <input
                    type="text"
                    name="input-name"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="wrap-input">
                  <label htmlFor="input-email">Email</label>
                  <input
                    type="text"
                    name="input-email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="wrap-input">
                  <label htmlFor="input-rating">Rating</label>
                  <ReactStars
                    name="input-rating"
                    count={5}
                    // onChange={ratingChanged}
                    size={20}
                    activeColor="#ffd700"
                    // value={3}
                    edit={true}
                  />
                </div>

                <div className="wrap-input">
                  <label htmlFor="input-title">Review Title</label>
                  <input
                    type="text"
                    name="input-title"
                    placeholder="Give your review a title"
                  />
                </div>

                <div className="wrap-input">
                  <label htmlFor="input-email">Body of Review</label>
                  <textarea
                    rows={5}
                    type="text"
                    name="input-desc"
                    placeholder="Write your comments here"
                  />
                </div>

                <button
                  type="submit"
                  className="button ml-auto px-3 py-2 btn-submit-review"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </Collapsible>
        </div>

        <div className="wrap-customers-reviews my-5">
          <div className="wrap-total-reviews">
            <p className="text-sm font-semibold">Customer Reviews</p>
            <div className="wrap-total-stars d-flex gap-1 items-center">
              <ReactStars
                name="total-rating"
                count={5}
                // onChange={ratingChanged}
                size={16}
                activeColor="#ffd700"
                value={4}
                edit={false}
              />
              <label className="text-xs text-secondary" htmlFor="total-rating">
                Based on 5 reviews
              </label>
            </div>

            <div className="customers-reviews mt-3 ">
              <ReviewByCustomer />
              <ReviewByCustomer />
              <ReviewByCustomer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailReviews;
