import React from "react";
import "../styles/rightmenucart.css";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "../features/cart/cartSlice";
import ItemCart from "./MenuCart/ItemCart";
import { apiCreatePayment } from "../apis/apiPayment";
import { apiRemoveCart } from "../apis/apiCart";

const RightMenuCart = () => {
  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart.listCart);
  // console.log(listCart);

  const total = listCart.reduce(
    function (result, item) {
      result.price += item?.product?.coupon
        ? item?.quantity *
          item?.variant?.price *
          (1 - item?.product?.coupon?.value / 100)
        : item?.quantity * item?.variant?.price;
      result.quantity += item?.quantity;
      return result;
    },
    { quantity: 0, price: 0 }
  );
  console.log(total);

  const handleCloseModalCart = () => {
    dispatch(closeCart());
  };

  const handleClickMenu = (e) => {
    e.stopPropagation();
    console.log("click menu");
  };

  //handle when check out
  const accessToken = useSelector((state) => state.user?.accessToken);

  const handleCheckOut = async (e) => {
    console.log("check out");
    e.stopPropagation();
    if (accessToken === "") {
      alert("ban phai dang nhap");
    } else {
      try {
        const response = await apiCreatePayment(listCart, accessToken);
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

  return (
    <div onClick={handleCloseModalCart} className="wrap-right-menu-cart d-flex">
      <div onClick={handleClickMenu} className="right-menu-cart ms-auto">
        {listCart?.length === 0 ? (
          <div className="wrap-text-cart-empty p-2 text-center">
            <p>Your cart is currently empty.</p>
            <p>Continue shopping</p>
          </div>
        ) : (
          <div className="wrap-menu-cart-item">
            <div className="wrap-cart-item">
              {listCart?.map((item, index) => (
                <ItemCart key={index} item={item} />
                // <p>1</p>
              ))}
            </div>
            <div className="wrap-cart-controller">
              <div className="wrap-cart-controller-total">
                <div className="cart-controller-total-quantity">
                  <p className="fw-semibold">Total Item</p>
                  <p className="fw-semibold fs-5">{total?.quantity}</p>
                </div>
                <div className="cart-controller-total-price">
                  <p className="fw-semibold">Subtotal</p>
                  <p className="fw-semibold fs-5">
                    ${total?.price.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
              <div className="wrap-cart-controller-btn">
                <button className="cart-controller-btn">View Cart</button>
                <button
                  onClick={handleCheckOut}
                  className="cart-controller-btn cart-controller-btn--checkout"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightMenuCart;
