import React, { useEffect, useState } from "react";
import { apiGetWishlist } from "../apis/apiWishlist";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

const WishList = () => {
  const accessToken = useSelector((state) => state.user?.accessToken);
  const wishListRedux = useSelector(
    (state) => state.user?.currentUser?.wishlist
  );

  const [wishList, setWishList] = useState([]);
  const [col, setCol] = useState("col-3");

  const fetchData = async () => {
    const response = await apiGetWishlist({ token: accessToken });
    const filteredArray = response.filter((item2) =>
      wishListRedux.includes(item2._id)
    );
    setWishList(filteredArray);
  };

  useEffect(() => {
    fetchData();
  }, [wishListRedux]);

  const handleResize = () => {
    // setWdSize(window.innerWidth);
    // console.log(window.innerWidth);
    if (window.innerWidth >= 992) {
      setCol("col-3");
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      setCol("col-4");
    } else if (window.innerWidth >= 567 && window.innerWidth < 768) {
      setCol("col-6");
    } else if (window.innerWidth < 567) {
      setCol("col-12");
    }
  };

  useEffect(() => {
    // Đăng ký sự kiện lắng nghe thay đổi kích thước của cửa sổ
    window.addEventListener("resize", handleResize);

    // Giải phóng sự kiện khi component bị hủy (unmounted)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Wish list</h2>
      </div>
      <div className="m-3 row">
        {wishList?.map((item) => (
          <ProductCard key={item?._id} item={item} col={col} />
        ))}
      </div>
    </div>
  );
};

export default WishList;
