import React, { useEffect, useState } from "react";
import "../styles/viewcart.css";
import { InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  removeOneCart,
  updateQuantityToCart,
} from "../features/cart/cartSlice";
import { apiDeleteOneCart, apiUpdateQuantityToCart } from "../apis/apiCart";

const ItemViewCart = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const [quantity, setQuantity] = useState(data?.quantity || 1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (data?.product.coupon) {
      const priceWithDiscount =
        data?.variant.price * (1 - data?.product?.coupon?.value / 100);
      setPrice(priceWithDiscount);
    } else {
      setPrice(data?.variant.price);
    }
  }, [data?.product.coupon, data?.variant.price]);

  const accessToken = useSelector((state) => state.user?.accessToken);
  const handleRemoveCart = async (e) => {
    e.stopPropagation();
    dispatch(removeOneCart(data));
    if (accessToken !== "") {
      await apiDeleteOneCart({ content: data, token: accessToken });
    }
  };
  const handleQuantityChange = async (value) => {
    setQuantity(value);
    dispatch(updateQuantityToCart({ ...data, quantityChange: value }));
    if (accessToken !== "") {
      await apiUpdateQuantityToCart({
        content: { ...data, quantityChange: value },
        token: accessToken,
      });
    }
  };

  return (
    <tr className="wrap-item-view-cart">
      <td className="d-flex gap-3 align-items-center p-4">
        <img
          className="item-view-cart-img"
          src={data?.product?.images[0]}
          alt="logo"
        />
        <div>
          <p>{data?.product?.title}</p>
          <p className="mt-2">Size: {data?.variant?.size}</p>
          <p>Color: {data?.variant?.color}</p>
        </div>
      </td>
      <td className="fw-semibold">${price}</td>
      <td>
        <span className="wrap-item-view-cart-quantity">
          <InputNumber
            min={1}
            defaultValue={data?.quantity}
            value={quantity}
            onChange={handleQuantityChange}
          />

          <button
            onClick={(e) => handleRemoveCart(e)}
            title="Delete"
            className="ms-2 item-view-cart-btn-delete"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </span>
      </td>
      <td className="fw-semibold fs-5">$ {price * quantity * 1}</td>
    </tr>
  );
};

export default ItemViewCart;
