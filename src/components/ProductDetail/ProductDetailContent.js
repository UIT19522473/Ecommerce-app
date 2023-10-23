import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { InputNumber } from "antd";
// import { ItemColor } from "../OurStore/ItemColor";
import ReactStars from "react-rating-stars-component";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
// import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { apiAddToCart } from "../../apis/apiCart";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { apiAddToCart, apiRemoveCart } from "../../apis/apiCart";
import { apiCreatePayment } from "../../apis/apiPayment";
import { addWishlist, removeWishlist } from "../../features/user/userSlice";
import { apiAddToWishlist, apiDeleteWishlist } from "../../apis/apiWishlist";

//fix here
const getColorUnique = (variants) => {
  // Tạo một mảng chứa các màu duy nhất
  var uniqueColors = [...new Set(variants.map((variant) => variant.color))];
  return uniqueColors;
};

const getSizeByColor = (color, variants) => {
  const result = [];

  for (const variant of variants) {
    if (variant.color === color) {
      result.push({
        size: variant.size,
        price: variant.price,
      });
    }
  }

  return result;
};

const ColorRadio = (props) => {
  const { color, colorChoose, productId, variants } = props;

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);

  const handleChangeColor = (newColor) => {
    const sizeNew = getSizeByColor(newColor, variants);

    // Hàm để thay đổi kích thước trên URL
    searchParams.set("color", newColor);
    searchParams.set("size", sizeNew[0].size);
    navigate(`/product/${productId}?${searchParams.toString()}`);
  };

  return (
    <div
      onClick={() => handleChangeColor(color)}
      style={{ backgroundColor: color }}
      className={`item-color ${
        color === colorChoose ? "item-color--choose" : ""
      }`}
    ></div>
  );
};

const SizeRadio = (props) => {
  const { sizePrice, sizeChoose, productId } = props;
  // console.log(sizePrice);
  const searchParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const handleChangeSize = (newSize) => {
    // Hàm để thay đổi kích thước trên URL
    searchParams.set("size", newSize);
    navigate(`/product/${productId}?${searchParams.toString()}`);
  };
  return (
    <li className="product-detail-box-size">
      <input
        checked={sizeChoose === sizePrice?.size}
        className="cursor-pointer"
        type="radio"
        value={sizePrice?.size}
        id={sizePrice?.size}
        name="size"
        onChange={() => handleChangeSize(sizePrice?.size)}
      />
      <label className="text-secondary" htmlFor={sizePrice?.size}>
        {sizePrice?.size}
      </label>
    </li>
  );
};

const ProductDetailContent = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const navigate = useNavigate();

  // Lấy tham số từ URL
  const search = window.location.search; // Lấy query string từ URL
  const searchParams = new URLSearchParams(search);
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const quantity = searchParams.get("quantity");

  // const price = searchParams.get("price");
  const [firstPrice, setFirstPrice] = useState(0);
  const [price, setPrice] = useState(0);

  const [arrColorUnique, setArrColorUnique] = useState([]);
  // console.log(arrColorUnique);
  const [arrSize, setArrSize] = useState([]);
  useEffect(() => {
    // const { productId } = useParams();
    if (!color || !size || !quantity) {
      // Nếu không có color hoặc size trong query, điều hướng đến trang NotFound
      navigate("/notFound");
    }
    if (product) {
      const arrColor = getColorUnique(product?.variants);
      const sizePriceByColor = getSizeByColor(color, product?.variants);
      setArrColorUnique(arrColor);
      setArrSize(sizePriceByColor);

      const pr = sizePriceByColor.find((item) => item.size === size);
      setFirstPrice(pr.price);
      if (product.coupon) {
        const priceWithDiscount = pr.price * (1 - product?.coupon?.value / 100);
        setPrice(priceWithDiscount);
      } else {
        setPrice(pr.price);
      }
    }
  }, [color, navigate, product, quantity, size]);

  const handleQuantityChange = (value) => {
    searchParams.set("quantity", value);
    navigate(`/product/${product?._id}?${searchParams.toString()}`);
  };

  const accessToken = useSelector((state) => state.user?.accessToken);

  const handleAddToCart = async () => {
    const newItemCart = {
      variant: {
        color: color,
        size: size,
        price: firstPrice,
      },
      product: { ...product },
      quantity: quantity * 1,
    };

    // console.log("new item cart", newItemCart);
    dispatch(addToCart(newItemCart));

    toast.success("Added a product to your cart !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 700,
    });

    if (accessToken !== "") {
      await apiAddToCart({
        content: { ...newItemCart }, // Use the updated cart here
        token: accessToken,
      });
    }
  };

  //handle when check out

  const handleCheckOut = async (e) => {
    console.log("check out");
    e.stopPropagation();
    if (accessToken === "") {
      alert("ban phai dang nhap");
    } else {
      const newItemCart = {
        variant: {
          color: color,
          size: size,
          price: firstPrice,
        },
        product: { ...product },
        quantity: quantity * 1,
      };
      try {
        const response = await apiCreatePayment([newItemCart], accessToken);
        // console.log(response);
        if (response?.data?.success) {
          window.location.href = response.data.url;
          await apiRemoveCart({ token: accessToken });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const user = useSelector((state) => state.user);

  const findIndex = user?.currentUser?.wishlist.findIndex(
    (p) => p === product?._id
  );

  const handleWishlist = async (e) => {
    e.stopPropagation();
    const item = product;

    if (user?.accessToken !== "") {
      if (findIndex === -1) {
        dispatch(addWishlist(item?._id));
        await apiAddToWishlist({
          content: { idProduct: item?._id },
          token: accessToken,
        });

        toast.success("Added a product to your wishlist !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 700,
        });
      } else {
        dispatch(removeWishlist(item?._id));
        await apiDeleteWishlist({
          pid: item?._id,
          token: accessToken,
        });
      }
    } else {
      alert("You must be logged in to add to your favorites list");
    }
  };
  return (
    <div className="col-6 product-detail-content">
      <h2 className="product-detail-content-name">{product?.title}</h2>

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
              {
                // product?.product?.description
                product?.description
              }
            </span>
          </div>
        </Collapsible>
      </div>

      <div className="product-detail-content-price mt-2">
        <p className="product-detail-content-text">Price:</p>

        {product?.coupon ? (
          <div className="d-flex gap-2">
            <span className="product-detail-content-price-number product-detail-content-price-number--through">
              {/* {priceFirst.toLocaleString("en-US")} */}
              {firstPrice.toLocaleString("en-US")}
            </span>
            <span className="product-detail-content-price-number product-detail-content-price-number--discount">
              {price.toLocaleString("en-US")}
            </span>
          </div>
        ) : (
          <span className="product-detail-content-price-number">
            {/* {priceFirst.toLocaleString("en-US")} */}
            {price.toLocaleString("en-US")}
          </span>
        )}
      </div>

      <div className="d-flex product-detail-content-ratings align-items-center gap-2 mt-2">
        <p className="product-detail-content-text">Ratings:</p>
        <ReactStars
          count={5}
          // onChange={ratingChanged}
          size={20}
          activeColor="#ffd700"
          value={product?.totalRatings}
          edit={false}
        />
        <p className="text-secondary">(5 reviews)</p>
      </div>
      <Link className="mt-2 text-secondary" to={"#"}>
        Write a review
      </Link>
      <div className="product-detail-content-brand d-flex gap-2 mt-3">
        <p className="product-detail-content-text">Brand:</p>
        <p className="text-secondary">{product?.brand?.title}</p>
      </div>
      <div className="product-detail-content-tags d-flex gap-2 mt-3">
        <p className="product-detail-content-text">Category:</p>
        <Link className="text-secondary" to={"#"}>
          {product?.category?.title}
        </Link>
      </div>

      <div className="product-detail-content d-flex gap-2 align-items-center mt-3">
        <p className="product-detail-content-text">Color:</p>
        <ul className="product-detail-group-color d-flex gap-2 p-0 m-0">
          {arrColorUnique?.map((item, index) => (
            <li key={index}>
              <ColorRadio
                // chooseColor={chooseColor}
                // setChooseColor={setChooseColor}
                // setArrColorChoose={setArrColorChoose}
                // convertColorAndSize={convertColorAndSize}
                index={index}
                color={item}
                colorChoose={color}
                productId={product?._id}
                variants={product?.variants}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="product-detail-content-size mt-3 d-flex gap-2">
        <p className="product-detail-content-text">Size:</p>
        <ul className="product-detail-group-size d-flex gap-4 p-0 m-0">
          {arrSize?.map((item, index) => (
            <SizeRadio
              key={index}
              sizePrice={item}
              sizeChoose={size}
              productId={product?._id}
            />
          ))}
        </ul>
      </div>

      <div className="product-detail-content-quantity d-flex gap-2 mt-3">
        <p className="product-detail-content-text">Quantity:</p>
        <InputNumber
          // min={1}
          // max={100000}
          // // defaultValue={inQuantity}
          // defaultValue={chooseItemRedux?.quantity * 1}
          // value={inQuantity}
          // onChange={handleQuantityChange}
          min={1}
          defaultValue={quantity}
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      <div className="product-detail-content-wrap-checkout mt-4">
        <button
          onClick={handleAddToCart}
          className="btn-checkout btn-checkout--cart"
        >
          {/* {typeItemRedux === "NEW" ? "ADD TO CART" : "UPDATE TO CART"}
           */}
          ADD TO CART
        </button>
        <button onClick={handleCheckOut} className="btn-checkout">
          CHECK OUT
        </button>
      </div>

      <div className="product-detail-content-wishcompare d-flex gap-4 mt-4">
        <button
          onClick={handleWishlist}
          style={{ backgroundColor: "white" }}
          className="d-flex align-items-center border-0 gap-1 "
        >
          {/* <img src="/images/wish.svg" alt="wishlist" /> */}
          <img
            className="img-heart"
            src={findIndex !== -1 ? "/images/wishfill.svg" : "/images/wish.svg"}
            alt="wishlist"
          />
          <p>Add to wishlist</p>
        </button>

        {/* <div className="d-flex items-center gap-1 cursor-pointer">
          <img src="/images/prodcompare.svg" alt="compare" />
          <p>Add to compare</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailContent;
