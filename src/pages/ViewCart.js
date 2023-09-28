import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/viewcart.css";
import { useSelector } from "react-redux";
import ItemViewCart from "../components/ItemViewCart";
import { useNavigate } from "react-router-dom";
import { apiCreatePayment } from "../apis/apiPayment";
import { apiRemoveCart } from "../apis/apiCart";

const ViewCart = () => {
  const navigate = useNavigate();
  const dataCart = useSelector((state) => state.cart.listCart);

  const total = dataCart?.reduce(
    function (result, item) {
      result.price += item?.product?.coupon
        ? item?.quantity *
          item?.variant?.price *
          (1 - item?.product?.coupon?.value / 100)
        : item?.quantity * item?.variant?.price;
      result.quantity += item?.quantity * 1;
      return result;
    },
    { quantity: 0, price: 0 }
  );

  const handleShoping = () => {
    navigate("/our-store");
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
        const response = await apiCreatePayment(dataCart, accessToken);
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
    <div className="wrap-view-cart">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Your Shopping Cart</h2>
      </div>

      <div className="wrap-view-cart-content w-full">
        <table className="view-cart-table-product">
          <thead>
            <tr>
              <th className="p-4">PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {dataCart?.map((cart, index) => (
              <>
                <ItemViewCart key={index} data={cart} />
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="wrap-view-cart-footer">
        <button onClick={handleShoping} className="view-cart-btn-continute">
          Continute Shoping
        </button>
        <div>
          <p className="fs-5 mb-2 fw-semibold text-secondary">
            Subtotal: $ {total?.price.toLocaleString("en-US")}
          </p>
          <button onClick={handleCheckOut} className="view-cart-btn-continute">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
