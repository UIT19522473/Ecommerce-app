import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import { useSpring, animated } from "react-spring";
import { logOut } from "../features/user/userSlice";

import { getSearchProducts } from "../features/searchProducts/searchProductsAsyncThunk";
import { updateTitleOurStore } from "../features/filterOurStore/filterOurStore";
import {
  loadCartFromDB,
  openCart,
  setDefaultCart,
} from "../features/cart/cartSlice";
import { apiGetCart } from "../apis/apiCart";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categories = useSelector((state) => state?.categories?.data);

  const handleLogOut = () => {
    console.log("logout");
    dispatch(logOut());
    dispatch(setDefaultCart());
  };

  // menu
  const [expanded, setExpanded] = useState(false);
  const expandAnimation = useSpring({
    height: expanded ? "300px" : "0px",
  });

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  // account
  const [expandedAccount, setExpandedAccount] = useState(false);
  const expandAnimationAccount = useSpring({
    height: expandedAccount ? "70px" : "0px",
  });

  const handleToggleAccount = () => {
    setExpandedAccount(!expandedAccount);
  };
  // ---------------

  //open menu responsive
  const [isOpenSm, setIsOpenSm] = useState(false);

  const handleBtnMenuToggle = () => {
    setIsOpenSm(!isOpenSm);
  };

  const [inputSearch, setInputSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchContainerRef = useRef(null); // Sử dụng ref để theo dõi phần kết quả tìm kiếm
  const searchResultsRef = useRef(null);

  const listSearchProducts = useSelector(
    (state) => state.searchProducts?.data?.products
  );

  const handleSearch = (event) => {
    setInputSearch(event.target.value);
    dispatch(getSearchProducts({ title: event.target.value }));
    // dispatch(updateTitleOurStore(event.target.value));
    setShowResults(event.target.value !== "");
  };

  const handleClickSearchFor = () => {
    dispatch(updateTitleOurStore(inputSearch));
  };

  // useEffect(() => {
  //   if (showResults) {
  //     searchContainerRef.current.focus(); // Tập trung vào container khi hiển thị kết quả tìm kiếm
  //   }
  // }, [showResults]);

  // xu li khi click ra ngoai search input
  const handleDocumentClick = (event) => {
    if (
      searchContainerRef.current &&
      searchResultsRef.current &&
      !searchContainerRef.current.contains(event.target) &&
      !searchResultsRef.current.contains(event.target)
    ) {
      setShowResults(false);
    }
  };

  //them su kien cho document
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const handleOpenModalCart = (e) => {
    e.stopPropagation();
    dispatch(openCart());
  };

  //handle load data for cart
  const cartRedux = useSelector((state) => state.cart.listCart);

  const total = cartRedux?.reduce(
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

  const user = useSelector((state) => state.user);
  //load data for cart from db
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.accessToken !== "") {
        const response = await apiGetCart({ token: user?.accessToken });
        if (response.data) {
          dispatch(loadCartFromDB(response?.data?.items));
        } else {
          dispatch(loadCartFromDB([]));
        }
      }
    };
    fetchCart();
  }, [dispatch, user?.accessToken]);

  const handleWishlist = () => {
    navigate("/wishlist");
  };

  const handleViewed = () => {
    navigate("/viewed-products");
  };

  return (
    <>
      <header className="header-top-strip py-3">
        {/* <button onClick={handleTest}>Test</button> */}
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-6 d-lg-block d-none">
              <p className="text-white mb-0 ">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-lg-6 col-12">
              <p className="text-lg-end text-center text-white mb-0">
                Hotline:
                <a className="ms-1 text-white" href="tel:+91 000000000">
                  (000) 012 345 xxx
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center wrap-header-upper">
            <div
              className={`menu-responsive ${isOpenSm ? "opensm" : "closesm"}`}
            >
              <ul className="text-white">
                {categories?.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="text-white"
                      to={`/our-store?category=${item?._id}`}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className=" text-white" to="/">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="/our-store">
                    OUR STORE
                  </Link>
                </li>
                <li>
                  <Link className=" text-white" to="#">
                    BLOGS
                  </Link>
                </li>
                <li>
                  <Link className=" text-white" to="#">
                    CONTACT
                  </Link>
                </li>
              </ul>
              <div onClick={handleBtnMenuToggle} className="wrap-btn-close">
                <span className="material-symbols-outlined text-white font-weight-bold">
                  close
                </span>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-8 col-7 d-flex align-items-center gap-10">
              <span
                onClick={handleBtnMenuToggle}
                className="material-symbols-outlined text-white font-weight-bold fs-2 d-lg-none button-menu"
              >
                menu
              </span>
              <h2 className="text-name mb-0">
                <Link to="/" className="text-white sm:text-2xl text-lg">
                  TuanNguyen
                </Link>
              </h2>
            </div>
            <div className="col-xl-5 col-lg-6 d-none d-lg-block">
              <div
                ref={searchContainerRef}
                tabIndex="0"
                className="input-group "
              >
                <input
                  onClick={() => setShowResults(true)}
                  onChange={handleSearch}
                  value={inputSearch}
                  type="text"
                  className="form-control py-2 "
                  placeholder="Search product here..."
                  aria-label="Search product here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch className="fs-10" />
                </span>

                {showResults && (
                  <div ref={searchResultsRef} className="tb-result-search">
                    <ul className="row p-0">
                      {listSearchProducts?.map((item, index) => (
                        <Link
                          // onClick={handleClickItem}
                          to={`/product/${item?._id}?color=${item?.variants[0]}&size=${item?.variants[0].size}&quantity=1`}
                          key={index}
                          className="text-black col-6 d-flex justify-content-center align-items-center my-2 result-search-item"
                        >
                          <div className="item-search-img">
                            <img src={item?.images[0]} alt="img" />
                          </div>
                          <div className="item-search-detail">
                            <p className="item-search-title">{item?.title}</p>
                            <div className="d-flex gap-2">
                              {!item?.coupon ? (
                                <p className="item-search-price">
                                  {item?.price}
                                </p>
                              ) : (
                                <>
                                  <p className="item-search-price item-search-price-through">
                                    {item?.price}
                                  </p>
                                  <p className="item-search-price item-search-price-discount">
                                    {item?.price *
                                      (1 - item?.coupon?.value / 100)}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </ul>

                    {inputSearch !== "" ? (
                      <NavLink
                        onClick={handleClickSearchFor}
                        to="/our-store"
                        className="col-12 tb-result-search-btn d-flex justify-content-around align-items-center px-5 py-2"
                      >
                        <p>Search For "{inputSearch}"</p>
                        <span className="material-symbols-outlined fw-bold ">
                          arrow_right_alt
                        </span>
                      </NavLink>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-xl-5 col-lg-3 col-sm-4 col-5">
              <div className="header-upper-link d-flex align-items-center justify-content-between">
                <div>
                  <div
                    onClick={handleViewed}
                    className="d-flex align-items-center gap-10 text-white item-right-header"
                  >
                    {/* <img
                      className="img-item"
                      // src="/images/compare.svg"
                      src="/images/view.svg"
                      alt="viewed"
                    /> */}
                    <span className="material-symbols-outlined img-item fs-1">
                      visibility
                    </span>
                    <p className="text-item mb-0">
                      Viewed <br />
                      Products
                    </p>
                  </div>
                </div>

                <div>
                  <div
                    onClick={handleWishlist}
                    className="d-flex align-items-center gap-10 text-white item-right-header"
                  >
                    <img
                      className="img-item"
                      src="/images/wishlist.svg"
                      alt=""
                    />
                    <p className="text-item mb-0">
                      Favorite <br />
                      Wishlists
                    </p>
                  </div>
                </div>

                <div>
                  <div
                    // to={"/account/login"}
                    onClick={handleToggleAccount}
                    className="d-flex align-items-center gap-10 text-white position-relative item-right-header"
                  >
                    <img
                      className="img-item"
                      src="/images/user.svg"
                      alt="account"
                    />
                    {user.currentUser ? (
                      <p className="mb-0 mt-3 text-item">
                        {user.currentUser?.firstname}
                      </p>
                    ) : (
                      <p className="text-item mb-0 text-right">
                        Login <br />
                        My Account
                      </p>
                    )}

                    <animated.ul
                      style={expandAnimationAccount}
                      className="menu-account"
                    >
                      {!user.currentUser ? (
                        <>
                          <li
                            onClick={() => navigate("/account/login")}
                            className="pb-2 dropdown-item"
                          >
                            <p
                              className="text-white text-start"
                              // to="/account/login"
                            >
                              Login
                            </p>
                          </li>
                          <li
                            onClick={() => navigate("/account/register")}
                            className="mt-1 dropdown-item "
                          >
                            <p
                              className=" text-white text-start "
                              // to="/account/register"
                            >
                              Register
                            </p>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="dropdown-item pb-2">
                            <p className=" text-white text-start">My account</p>
                          </li>
                          <li
                            onClick={handleLogOut}
                            className="mt-1 dropdown-item"
                          >
                            <Link className=" text-white text-start" to="#">
                              Logout
                            </Link>
                          </li>
                        </>
                      )}
                    </animated.ul>
                  </div>
                </div>

                <div
                  onClick={(e) => handleOpenModalCart(e)}
                  className="wrap-cart item-right-header"
                >
                  <div className="d-flex align-items-center gap-10 text-white">
                    <img
                      className="img-item"
                      src="/images/cart.svg"
                      alt="cart"
                    />
                    <div className="d-flex flex-column box-cost">
                      <span className="icon-badge-quantity badge bg-white text-dark">
                        {total?.quantity || 0}
                      </span>
                      <p className="text-cost mb-0">
                        $ {total?.price.toLocaleString("en-US") || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row d-flex justify-content-center item-center">
            <div className="col-8 d-lg-none">
              <div className="input-group">
                <input
                  onClick={() => setShowResults(true)}
                  onChange={handleSearch}
                  // onChange={handleSearch}
                  value={inputSearch}
                  type="text"
                  className="form-control py-2"
                  placeholder="Search product here..."
                  aria-label="Search product here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text px-3" id="basic-addon2">
                  <BsSearch className="fs-10" />
                </span>
                {showResults && (
                  <div ref={searchResultsRef} className="tb-result-search">
                    <ul className="row p-0">
                      {listSearchProducts?.map((item, index) => (
                        <Link
                          // onClick={handleClickItem}
                          to={`/product/${item?._id}`}
                          key={index}
                          className="text-black col-6 d-flex justify-content-center align-items-center my-2 result-search-item"
                        >
                          <div className="item-search-img">
                            <img src={item?.images[0]} alt="img" />
                          </div>
                          <div className="item-search-detail">
                            <p className="item-search-title">{item?.title}</p>
                            <div className="d-flex gap-2">
                              {!item?.coupon ? (
                                <p className="item-search-price">
                                  {item?.price}
                                </p>
                              ) : (
                                <>
                                  <p className="item-search-price item-search-price-through">
                                    {item?.price}
                                  </p>
                                  <p className="item-search-price item-search-price-discount">
                                    {item?.price *
                                      (1 - item?.coupon?.value / 100)}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </ul>

                    {inputSearch !== "" ? (
                      <NavLink
                        onClick={handleClickSearchFor}
                        to="/our-store"
                        className="col-12 tb-result-search-btn d-flex justify-content-around align-items-center px-5 py-2"
                      >
                        <p>Search For "{inputSearch}"</p>
                        <span className="material-symbols-outlined fw-bold ">
                          arrow_right_alt
                        </span>
                      </NavLink>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="d-none d-lg-block col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown position-relative d-flex align-items-center">
                  <button
                    onClick={handleToggle}
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                    type="button"
                    // data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="/images/menu.svg" alt="menu" />
                    <span>Shop Categories</span>
                  </button>
                  <animated.ul style={expandAnimation} className="menu">
                    {categories?.map((item, index) => (
                      <li key={index}>
                        <Link
                          className="dropdown-item text-white"
                          to={`/our-store?category=${item?._id}`}
                        >
                          {item?.title}
                        </Link>
                      </li>
                    ))}

                    {/* <li>
                      <Link className="dropdown-item text-white" to="#">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Something else here
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Something else here
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Something else here
                      </Link>
                    </li> */}
                  </animated.ul>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/our-store">Our Store</NavLink>
                    <NavLink to="/">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
