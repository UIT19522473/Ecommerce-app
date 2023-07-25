import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

const Header = () => {
  //open menu large screen
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  //open menu responsive
  const [isOpenSm, setIsOpenSm] = useState(false);

  const handleBtnMenuToggle = () => {
    setIsOpenSm(!isOpenSm);
  };

  const user = useSelector((state) => state.user);
  return (
    <>
      <header className="header-top-strip py-3">
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
                <li>
                  <Link className=" text-white" to="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className=" text-white" to="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="#">
                    Something else here
                  </Link>
                </li>
                <li>
                  <Link className=" text-white" to="#">
                    Something else here
                  </Link>
                </li>
                <li>
                  <Link className=" text-white" to="#">
                    Something else here
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
                <Link className="text-white">TuanNguyen</Link>
              </h2>
            </div>
            <div className="col-xl-5 col-lg-6 d-none d-lg-block">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search product here..."
                  aria-label="Search product here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text px-3" id="basic-addon2">
                  <BsSearch className="fs-10" />
                </span>
              </div>
            </div>
            <div className="col-xl-5 col-lg-3 col-sm-4 col-5">
              <div className="header-upper-link d-flex align-items-center justify-content-between">
                <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img
                      className="img-item"
                      src="/images/compare.svg"
                      alt="compare"
                    />
                    <p className="text-item mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link>
                </div>

                <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img
                      className="img-item"
                      src="/images/wishlist.svg"
                      alt=""
                    />
                    <p className="text-item mb-0">
                      Favorite <br />
                      Wishlists
                    </p>
                  </Link>
                </div>

                <div>
                  <NavLink
                    to={"/account/login"}
                    className="d-flex align-items-center gap-10 text-white"
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
                      <p className="text-item mb-0">
                        Login <br />
                        My Account
                      </p>
                    )}
                  </NavLink>
                </div>

                <div className="wrap-cart">
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img
                      className="img-item"
                      src="/images/cart.svg"
                      alt="cart"
                    />
                    <div className="d-flex flex-column box-cost">
                      <span className="icon-badge badge bg-white text-dark">
                        0
                      </span>
                      <p className="text-cost mb-0">$ 5000</p>
                    </div>
                  </Link>
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
                  type="text"
                  className="form-control py-2"
                  placeholder="Search product here..."
                  aria-label="Search product here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text px-3" id="basic-addon2">
                  <BsSearch className="fs-10" />
                </span>
              </div>
            </div>
            <div className="d-none d-lg-block col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className={`dropdown ${isOpen ? "open" : "close"}`}>
                    <button
                      onClick={handleDropdownToggle}
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                      type="button"
                      // data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/images/menu.svg" alt="menu" />
                      <span>Shop Categories</span>
                    </button>

                    <ul className="menu">
                      <li>
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
                      </li>
                    </ul>
                  </div>
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
