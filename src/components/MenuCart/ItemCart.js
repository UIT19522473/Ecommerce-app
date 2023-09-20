import React from "react";
import "../../styles/rightmenucart.css";
import { useDispatch, useSelector } from "react-redux";
import { chooseItemCart, removeOneCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { apiDeleteOneCart } from "../../apis/apiCart";

const ItemCart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item } = props;
  const priceReal = item?.product?.coupon
    ? item?.variant?.price * (1 - item?.product?.coupon?.value / 100)
    : item?.variant?.price;

  const accessToken = useSelector((state) => state.user?.accessToken);
  const handleRemoveCart = async (e) => {
    e.stopPropagation();
    dispatch(removeOneCart(item));
    await apiDeleteOneCart({ content: item, token: accessToken });
  };

  const handleClickItem = () => {
    navigate(
      `/product/${item.product._id}?quantity=${item?.quantity}&color=${item?.variant.color}`
    ); // Chuyển hướng đến trang /product/:idproduct
    dispatch(chooseItemCart({ item: item, type: "UPDATE" }));
  };
  return (
    <div
      onClick={handleClickItem}
      className="item-cart d-flex align-items-center gap-2"
    >
      <img
        className="item-cart-img"
        src={item?.product?.images[0]}
        alt="logo"
      />
      <div className="item-cart-info">
        <div className="item-cart-info-header d-flex gap-1 align-items-start">
          <p className="item-cart-info-name">{item?.product?.title}</p>
          <button
            onClick={handleRemoveCart}
            title="Delete"
            className="item-cart-infor-delete ms-auto"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
        <div className="d-flex gap-2">
          {item?.product?.coupon ? (
            <>
              <p className="item-cart-info-price item-cart-info-price--through">
                ${item?.variant?.price.toLocaleString("en-US")}
              </p>
              <p className="item-cart-info-price item-cart-info-price--discount">
                ${priceReal.toLocaleString("en-US")}
              </p>
            </>
          ) : (
            <p className="item-cart-info-price">
              ${item?.variant?.price.toLocaleString("en-US")}
            </p>
          )}
        </div>
        <p className="item-cart-info-quantity d-flex gap-1 align-items-center">
          Quantity:
          <p className="item-cart-info-total-text">{item?.quantity}</p>
        </p>
        {/* <p className="item-cart-info-size">Size: {"M"}</p> */}
        <p className="item-cart-info-color d-flex gap-1 align-items-center">
          Color:
          <p className="item-cart-info-total-text"> {item?.variant?.color}</p>
        </p>
        <span className="item-cart-info-total d-flex gap-1 align-items-center">
          <p>Total: </p>
          <p className="item-cart-info-total-text">
            {/* {item?.quantity} {"x 100$ = 200$"} */}
            {`${item?.quantity} x ${priceReal.toLocaleString("en-US")} = ${(
              item?.quantity * priceReal
            ).toLocaleString("en-US")} $`}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ItemCart;
