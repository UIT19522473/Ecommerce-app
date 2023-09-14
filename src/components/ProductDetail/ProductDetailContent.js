import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { InputNumber } from "antd";
// import { ItemColor } from "../OurStore/ItemColor";
import ReactStars from "react-rating-stars-component";
import { apiCreatePayment } from "../../apis/apiPayment";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateToCart } from "../../features/cart/cartSlice";
// import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { apiAddToCart } from "../../apis/apiCart";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ColorRadio = (props) => {
  const { color, index, chooseColor, setChooseColor } = props;

  // const choose = true;
  // const location = useLocation();
  const handleChooseColor = () => {
    setChooseColor(index);
  };
  return (
    <div
      onClick={handleChooseColor}
      style={{ backgroundColor: color }}
      className={`item-color ${
        chooseColor === index ? "item-color--choose" : ""
      }`}
    ></div>
  );
};

const ProductDetailContent = (props) => {
  // const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const { product } = props;
  //  console.log(product);

  const chooseItemRedux = useSelector((state) => state.cart.itemChoose);
  const typeItemRedux = useSelector((state) => state.cart.type);
  //get index color
  const indexColor = product?.color.findIndex(
    (item) => chooseItemRedux?.color[0] === item
  );
  // console.log("color", indexColor);
  const [chooseColor, setChooseColor] = useState(
    indexColor !== -1 ? indexColor : 0
  );

  // const initialQuantity = queryParams.get("quantity")
  //   ? parseInt(queryParams.get("quantity"), 10)
  //   : 1;
  const [inQuantity, setInQuantity] = useState(
    chooseItemRedux?.quantity * 1 || 1
  );

  // Handler khi giá trị InputNumber thay đổi
  const handleQuantityChange = (value) => {
    // Cập nhật giá trị inQuantity
    value = value || 1;
    // console.log(value);
    setInQuantity(value);
  };

  useEffect(() => {
    const indexColor = product?.color.findIndex(
      (item) => chooseItemRedux?.color[0] === item
    );
    setInQuantity(chooseItemRedux?.quantity * 1);
    setChooseColor(indexColor);
  }, [chooseItemRedux?.color, chooseItemRedux?.quantity, product?.color]);

  const realPrice = product?.coupon
    ? product?.price * (1 - product?.coupon?.value / 100)
    : product?.price;

  const accessToken = useSelector((state) => state.user?.accessToken);

  const handleCheckOut = async () => {
    // console.log("check out");
    const productChanged = { ...product };

    // Cập nhật màu sắc theo lựa chọn của người dùng
    // productChanged.color[0] = product?.color[chooseColor];
    productChanged.color = [...productChanged.color]; // Tạo một bản sao của mảng color
    productChanged.color[0] = product?.color[chooseColor]; // Cập nhật phần tử đầu tiên của mảng
    // Cập nhật số lượng sản phẩm theo giá trị đã chọn
    productChanged.quantity = inQuantity;

    if (accessToken === "") {
      alert("ban phai dang nhap");
    } else {
      try {
        const response = await apiCreatePayment([productChanged], accessToken);
        // console.log(response);

        if (response?.data?.success) {
          window.location.href = response.data.url;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const listCartRedux = useSelector((state) => state.cart.listCart);

  const handleAddToCart = () => {
    // Tạo một bản sao của đối tượng product để không ảnh hưởng đến sản phẩm gốc
    const productChanged = { ...product };

    // Cập nhật màu sắc theo lựa chọn của người dùng
    // productChanged.color[0] = product?.color[chooseColor];
    productChanged.color = [...productChanged.color]; // Tạo một bản sao của mảng color
    productChanged.color[0] = product?.color[chooseColor]; // Cập nhật phần tử đầu tiên của mảng

    // Cập nhật số lượng sản phẩm theo giá trị đã chọn
    productChanged.quantity = inQuantity;
    if (typeItemRedux === "NEW") {
      dispatch(addToCart(productChanged));
      toast.success("Added a product to your cart !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 700,
      });
    } else {
      dispatch(updateToCart(productChanged));
      toast.success("Updated a product to your cart !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 700,
      });
    }

    // TODO: Thực hiện các hành động khác, ví dụ như thêm sản phẩm vào giỏ hàng
    // console.log("Product changed", productChanged);
  };

  //call api when cart update
  useEffect(() => {
    if (accessToken !== "") {
      const updateCart = async () => {
        await apiAddToCart({
          content: listCartRedux, // Use the updated cart here
          token: accessToken,
        });
        // console.log("add to card", response);
      };
      updateCart();
    }
  }, [accessToken, listCartRedux]);

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
            <span>{product?.description}</span>
          </div>
        </Collapsible>
      </div>

      <div className="product-detail-content-price mt-2">
        <p className="product-detail-content-text">Price:</p>

        {product?.coupon ? (
          <div className="d-flex gap-2">
            <span className="product-detail-content-price-number product-detail-content-price-number--through">
              {product?.price.toLocaleString("en-US")}
            </span>
            <span className="product-detail-content-price-number product-detail-content-price-number--discount">
              {realPrice.toLocaleString("en-US")}
            </span>
          </div>
        ) : (
          <span className="product-detail-content-price-number">
            {product?.price.toLocaleString("en-US")}
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
      <div className="product-detail-content-brand d-flex gap-1 mt-2">
        <p className="product-detail-content-text">Brand:</p>
        <p className="text-gray-500">{product?.brand?.title}</p>
      </div>
      <div className="product-detail-content-tags d-flex gap-2 mt-2">
        <p className="product-detail-content-text">Category:</p>
        <Link className="text-secondary" to={"#"}>
          {product?.category?.title}
        </Link>
        {/* <Link className="text-gray-500" to={"#"}>
          laptop
        </Link>
        <Link className="text-gray-500" to={"#"}>
          mobile
        </Link> */}
      </div>

      {/* <div className="product-detail-content-size mt-2 d-flex gap-2">
        <p className="product-detail-content-text">Size:</p>
        <ul className="product-detail-group-size d-flex gap-4 p-0">
          <li className="product-detail-box-size">
            <input
              className="cursor-pointer"
              type="radio"
              value="S"
              id="S"
              name="size"
            />
            <label className="text-secondary" htmlFor="S">
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
            <label className="text-secondary " htmlFor="L">
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
            <label className="text-secondary " htmlFor="M">
              M
            </label>
          </li>
        </ul>
      </div> */}

      <div className="product-detail-content- mt-2">
        <p className="product-detail-content-text">Color:</p>
        <ul className="product-detail-group-color d-flex gap-2 mt-1 p-0">
          {product?.color?.map((item, index) => (
            <li key={index}>
              {/* <ItemColor color={item} /> */}
              <ColorRadio
                chooseColor={chooseColor}
                setChooseColor={setChooseColor}
                index={index}
                color={item}
              />
            </li>
          ))}

          {/* <li>
            <ItemColor color={"blue"} />
          </li> */}
        </ul>
      </div>

      <div className="product-detail-content-quantity d-flex gap-2 mt-4">
        <p className="product-detail-content-text">Quantity:</p>
        <InputNumber
          min={1}
          max={100000}
          // defaultValue={inQuantity}
          defaultValue={chooseItemRedux?.quantity * 1}
          value={inQuantity}
          onChange={handleQuantityChange}
        />
      </div>

      <div className="product-detail-content-wrap-checkout mt-4">
        <button
          onClick={handleAddToCart}
          className="btn-checkout btn-checkout--cart"
        >
          {typeItemRedux === "NEW" ? "ADD TO CART" : "UPDATE TO CART"}
          {/* {typeItemRedux} */}
        </button>
        <button onClick={handleCheckOut} className="btn-checkout">
          CHECK OUT
        </button>
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
