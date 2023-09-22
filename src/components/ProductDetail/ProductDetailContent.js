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
// import { apiAddToCart } from "../../apis/apiCart";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const convertVariant = (inputArray) => {
  const outputArray = [];

  const colorMap = {};

  // Lặp qua mỗi phần tử trong mảng ban đầu
  inputArray.forEach((item) => {
    const { color, size, price } = item;

    // Nếu màu đã tồn tại trong colorMap, thì thêm size và price vào sizePrice tương ứng
    if (colorMap[color]) {
      colorMap[color].sizePrice.push({ size, price });
    } else {
      // Nếu màu chưa tồn tại, thêm màu vào colorMap và tạo sizePrice mới
      colorMap[color] = {
        color,
        sizePrice: [{ size, price }],
      };
    }
  });

  // Chuyển colorMap thành mảng đầu ra
  for (const color in colorMap) {
    outputArray.push(colorMap[color]);
  }
  return outputArray;
};

const ColorRadio = (props) => {
  const {
    color,
    index,
    chooseColor,
    setChooseColor,
    setArrColorChoose,
    convertColorAndSize,
  } = props;

  // const choose = true;
  // const location = useLocation();
  const handleChooseColor = () => {
    setChooseColor(index);
    setArrColorChoose(convertColorAndSize[index].sizePrice);
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

const SizeRadio = (props) => {
  const { sizePrice } = props;
  // console.log(sizePrice);
  return (
    <li className="product-detail-box-size">
      <input
        className="cursor-pointer"
        type="radio"
        value={sizePrice?.size}
        id={sizePrice?.size}
        name="size"
      />
      <label className="text-secondary" htmlFor={sizePrice?.size}>
        {sizePrice?.size}
      </label>
    </li>
  );
};

const findFirstIndexColor = (variant, arrConvertVariant) => {
  if (!variant) return 0;
  return arrConvertVariant.findIndex((item) => item.color === variant.color);
};

const discountPrice = (item) => {
  if (item.type === "UPDATE") {
    if (item?.product?.coupon) {
      return item?.variant?.price * (1 - item?.product?.coupon?.value);
    } else {
      return item?.variant?.price;
    }
  } else {
    if (item?.product?.coupon) {
      return (
        item?.product?.variants[0]?.price *
        (1 - item?.product?.coupon?.value / 100)
      );
    } else {
      return item?.product?.variants[0]?.price;
    }
  }
};

const firstPrice = (item) => {
  if (item.type === "UPDATE") {
    return item?.variant?.price;
  }

  return item?.product?.variants[0]?.price;
};

const ProductDetailContent = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const chooseItemRedux = useSelector((state) => state.cart.itemChoose);
  const typeItemRedux = useSelector((state) => state.cart.type);

  const [inQuantity, setInQuantity] = useState(1);
  const [priceFirst, setPriceFirst] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [arrColorSize, setArrColorSize] = useState([]);
  const [arrColorChoose, setArrColorChoose] = useState([]);

  // const [currentVariant, setCurrentVariant] = useState(null);

  const convertColorAndSize = convertVariant(product?.product?.variants);
  const [chooseColor, setChooseColor] = useState(
    findFirstIndexColor(product?.variant, convertColorAndSize)
  );

  const [variantDefault, setVariantDefault] = useState(
    product?.variant || product?.product?.variants[0]
  );

  useEffect(() => {
    const indexColor = findFirstIndexColor(
      product?.variant,
      convertColorAndSize
    );
    setInQuantity(chooseItemRedux?.quantity);
    setPriceFirst(firstPrice(product));
    setPriceDiscount(discountPrice(product));
    setArrColorSize(convertColorAndSize);
    setChooseColor(indexColor);
    setArrColorChoose(convertColorAndSize[indexColor]?.sizePrice);
    setVariantDefault(product?.variant || product?.product?.variants[0]);
    // setCurrentVariant(product?.variant || product?.product?.variants[0]);
  }, [chooseItemRedux, product]);
  // console.log("sss", currentVariant);
  // console.log("custom size", arrColorChoose);

  console.log("variant default", variantDefault);
  // Handler khi giá trị InputNumber thay đổi
  const handleQuantityChange = (value) => {
    // Cập nhật giá trị inQuantity
    value = value || 1;
    // console.log(value);
    setInQuantity(value);
  };

  // const realPrice = currentPrice(product);

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

  // const listCartRedux = useSelector((state) => state.cart.listCart);

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
            <span>{product?.product?.description}</span>
          </div>
        </Collapsible>
      </div>

      <div className="product-detail-content-price mt-2">
        <p className="product-detail-content-text">Price:</p>

        {product?.product?.coupon ? (
          <div className="d-flex gap-2">
            <span className="product-detail-content-price-number product-detail-content-price-number--through">
              {priceFirst.toLocaleString("en-US")}
            </span>
            <span className="product-detail-content-price-number product-detail-content-price-number--discount">
              {priceDiscount.toLocaleString("en-US")}
            </span>
          </div>
        ) : (
          <span className="product-detail-content-price-number">
            {priceFirst.toLocaleString("en-US")}
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
        <p className="text-secondary">{product?.product?.brand?.title}</p>
      </div>
      <div className="product-detail-content-tags d-flex gap-2 mt-3">
        <p className="product-detail-content-text">Category:</p>
        <Link className="text-secondary" to={"#"}>
          {product?.product?.category?.title}
        </Link>
      </div>

      <div className="product-detail-content d-flex gap-2 align-items-center mt-3">
        <p className="product-detail-content-text">Color:</p>
        <ul className="product-detail-group-color d-flex gap-2 p-0 m-0">
          {arrColorSize?.map((item, index) => (
            <li key={index}>
              {/* <ItemColor color={item} /> */}
              <ColorRadio
                chooseColor={chooseColor}
                setChooseColor={setChooseColor}
                setArrColorChoose={setArrColorChoose}
                convertColorAndSize={convertColorAndSize}
                index={index}
                color={item.color}
              />
            </li>
          ))}

          {/* <li>
            <ItemColor color={"blue"} />
          </li> */}
        </ul>
      </div>

      <div className="product-detail-content-size mt-3 d-flex gap-2">
        <p className="product-detail-content-text">Size:</p>
        <ul className="product-detail-group-size d-flex gap-4 p-0 m-0">
          {arrColorChoose?.map((item, index) => (
            <SizeRadio key={index} sizePrice={item} />
          ))}
        </ul>
      </div>

      <div className="product-detail-content-quantity d-flex gap-2 mt-3">
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
