import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/ourstore.css";
import NavOurStore from "../components/NavOurStore";
import { Pagination } from "../components/OurStore";

import { useSelector, useDispatch } from "react-redux";
import {
  updateStateByURL,
  updateTitleOurStore,
} from "../features/filterOurStore/filterOurStore";
import { useLocation } from "react-router-dom";
import { getFilterProducts } from "../features/filterOurStore/filterAsyncThunk";
import ProductLoader from "../components/ContentLoader/ProductLoader";

const BtnView = ({ colType, col, setCol, children }) => {
  const fcs = colType === col ? true : false;

  return (
    <button
      onClick={() => setCol(colType)}
      className={`btn-view ${fcs ? "btn-view--focus" : ""}`}
    >
      {children}
    </button>
  );
};

const OurStore = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location.search);
  //load products
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    dispatch(getFilterProducts(searchParams));
    // Convert searchParams to a plain object using Object.fromEntries
    const searchObject = Object.fromEntries(searchParams.entries());
    dispatch(updateStateByURL(searchObject));
    // console.log(searchObject);
  }, [dispatch, location.search]);

  const [col, setCol] = useState("col-3");
  // const [wdSize, setWdSize] = useState(window.innerWidth);

  // const products = useSelector((state) => state.products?.data?.products);

  // test -----------
  const products = useSelector(
    (state) => state.filterOurStore?.result?.products
  );

  const filterRedux = useSelector((state) => state.filterOurStore?.data);

  const handleFilterSearch = (e) => {
    dispatch(updateTitleOurStore(e.target.value));
  };

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
    <div className="wrap-our-store">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Products</h2>
      </div>

      <div className="container-xxl my-4">
        <div className="row">
          {/* nav------------- */}
          <div className="col-lg-2 position-relative">
            <NavOurStore />
          </div>

          {/* content------- */}
          <div className="col-lg-10 col-12 mt-sm-0 mt-5">
            <div className="products-filter d-sm-flex  align-items-center">
              <div className="d-flex me-4 mb-sm-0">
                <p className="mt-1 me-4">Sort By:</p>
                <div className="sort-by">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle btn-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Alphabetically, A-Z
                    </button>
                    <ul className="dropdown-menu sort-by-menu">
                      <li>
                        <Link className="sort-by-item" href="#">
                          Alphabetically, A-Z
                        </Link>
                      </li>
                      <li>
                        <Link className="sort-by-item" href="#">
                          Alphabetically, Z-A
                        </Link>
                      </li>
                      <li>
                        <Link className="sort-by-item" href="#">
                          Price, low to high
                        </Link>
                      </li>
                      <li>
                        <Link className="sort-by-item" href="#">
                          Price, high to low
                        </Link>
                      </li>

                      <li>
                        <Link className="sort-by-item" href="#">
                          Date, old to new
                        </Link>
                      </li>

                      <li>
                        <Link className="sort-by-item" href="#">
                          Date, new to old
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="input-group search-filter my-xl-0 my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search product here..."
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={filterRedux?.title}
                  onChange={handleFilterSearch}
                />
                <button
                  className="btn btn-outline-secondary d-flex justify-content-center align-items-center px-2"
                  type="button"
                  id="button-addon2"
                  disabled={true}
                >
                  <span className="material-symbols-outlined fs-5">search</span>
                </button>
              </div>

              <div className="ms-xl-auto d-flex align-items-center justify-content-between my-2">
                {/* <p className="mt-1 text-secondary">10 of 21 products</p> */}
                <div className="d-flex justify-content-center align-items-center gap-10 ms-4">
                  <BtnView
                    col={col}
                    setCol={setCol}
                    colType={"col-3"}
                    children={<p>||||</p>}
                  />
                  <BtnView
                    col={col}
                    setCol={setCol}
                    colType={"col-4"}
                    children={<p>|||</p>}
                  />
                  <BtnView
                    col={col}
                    setCol={setCol}
                    colType={"col-6"}
                    children={<p>||</p>}
                  />
                  <BtnView
                    col={col}
                    setCol={setCol}
                    colType={"col-12"}
                    children={
                      <span className="material-symbols-outlined">menu</span>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {/* <ProductCard col={col} />
              <ProductCard col={col} />
              <ProductCard col={col} />
              <ProductCard col={col} />
              <ProductCard col={col} /> */}
              {products ? (
                <>
                  {products?.map((item, index) => (
                    <ProductCard col={col} item={item} key={index} />
                  ))}
                </>
              ) : (
                <>
                  <div className="col-12 col-sm-6 col-lg-3 mt-3 mb-5">
                    <ProductLoader />
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 mt-3 mb-5">
                    <ProductLoader />
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 mt-3 mb-5">
                    <ProductLoader />
                  </div>
                  <div className="col-12 col-sm-6 col-lg-3 mt-3 mb-5">
                    <ProductLoader />
                  </div>
                </>
              )}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
