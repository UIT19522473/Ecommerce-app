import React from "react";
import Collapsible from "react-collapsible";
import ReactStars from "react-rating-stars-component";
import "../../styles/productdetail.css";
import { useState } from "react";
import { apiGetRatings, apiRating } from "../../apis/apiProduct";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";

const ReviewByCustomer = (props) => {
  const { rating } = props;
  return (
    <div className="box-review-customer">
      <ReactStars
        name="input-rating"
        count={5}
        // onChange={ratingChanged}
        size={16}
        activeColor="#ffd700"
        value={rating?.star}
        edit={false}
      />

      <p className="fw-medium">{rating?.title}</p>
      <p style={{ fontStyle: "italic" }} className="fw-medium">
        on {rating?.createAt}
      </p>
      <span className="text-xs">{rating?.comment}</span>
    </div>
  );
};

const ProductDetailReviews = (props) => {
  const { product } = props;

  const [dataRatings, setDataRatings] = useState(null);
  const [totalRatings, setTotalRatings] = useState(0);

  const [star, setStar] = useState(5);
  const [titleReview, setTitleReview] = useState("");
  const [commentReview, setCommentReview] = useState("");

  const handleRating = (newRating) => {
    setStar(newRating);
  };

  const accessToken = useSelector((state) => state.user?.accessToken);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmitReview = useCallback(async () => {
    const newReview = {
      pid: product?._id,
      star,
      title: titleReview,
      comment: commentReview,
    };
    await apiRating({ token: accessToken, content: newReview });
  });

  useEffect(() => {
    const fetchListReview = async () => {
      const response = await apiGetRatings({ pid: product?._id });
      setDataRatings(response?.data?.metadata || null);
      setTotalRatings(response?.data?.metadata?.totalRatings || 0);
    };

    fetchListReview();
  }, [product?._id, handleSubmitReview]);
  return (
    <div className="row product-reviews-wrap">
      <p className="fs-5 fw-bold">Reviews</p>
      <div className="wrap-box-reviews mt-3">
        <div className="box-write-review">
          <Collapsible
            trigger={
              <div className="cursor-pointer d-flex align-items-center">
                <p className="text-sm fw-semibold">Write your review</p>
                <span className="material-symbols-outlined fw-bold fs-6 mt-[1px]">
                  expand_more
                </span>
              </div>
            }
          >
            <div className="text-justify">
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Ngăn chặn form từ việc gửi đi (refresh trang)
                  handleSubmitReview(); // Gọi hàm xử lý submit của bạn
                }}
                className="form-write-review"
              >
                {/* <div className="wrap-input">
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
                </div> */}

                <div className="wrap-input mt-2">
                  <label className="fs-6 fw-semibold" htmlFor="input-rating">
                    Rating
                  </label>
                  <ReactStars
                    name="input-rating"
                    count={5}
                    size={32}
                    activeColor="#ffd700"
                    edit={true}
                    value={star}
                    onChange={handleRating}
                  />
                </div>

                <div className="wrap-input">
                  <label htmlFor="input-title">Review Title</label>
                  <input
                    type="text"
                    name="input-title"
                    placeholder="Give your review a title"
                    value={titleReview}
                    onChange={(e) => setTitleReview(e.target.value)}
                  />
                </div>

                <div className="wrap-input">
                  <label htmlFor="input-email">Body of Review</label>
                  <textarea
                    rows={5}
                    type="text"
                    name="input-desc"
                    placeholder="Write your comments here"
                    value={commentReview}
                    onChange={(e) => setCommentReview(e.target.value)}
                  />
                </div>

                <button
                  // onClick={handleSubmitReview}
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
          {dataRatings ? (
            <div className="wrap-total-reviews">
              <p className="text-sm font-semibold">Customer Reviews</p>
              <div className="wrap-total-stars d-flex gap-1 items-center">
                {dataRatings ? (
                  <ReactStars
                    name="total-rating"
                    count={5}
                    // onChange={ratingChanged}
                    size={16}
                    activeColor="#ffd700"
                    value={totalRatings}
                    edit={false}
                  />
                ) : (
                  <></>
                )}
                <label
                  className="text-xs text-secondary"
                  htmlFor="total-rating"
                >
                  Based on {dataRatings?.ratings?.length} reviews
                </label>
              </div>

              <div className="customers-reviews mt-3 ">
                {dataRatings?.ratings?.map((rating, index) => (
                  <ReviewByCustomer key={index} rating={rating} />
                ))}
                {/* <ReviewByCustomer />
              <ReviewByCustomer />
              <ReviewByCustomer /> */}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailReviews;
