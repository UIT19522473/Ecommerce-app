import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/ourstore.css";
import NavOurStore from "../components/NavOurStore";

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
  const [col, setCol] = useState("col-3");
  // const [wdSize, setWdSize] = useState(window.innerWidth);

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
    <div className="container-xxl my-4">
      <div className="d-flex justify-content-center align-items-center py-4 name-content">
        <NavLink className="text-link" to={"/"}>
          Home
        </NavLink>
        <p className="mb-0">/</p>
        <h2 className="ms-2">Products</h2>
      </div>
      <div className="row">
        {/* nav------------- */}
        <div className="col-lg-2">
          <NavOurStore />
        </div>

        {/* content------- */}
        <div className="col-lg-10 col-12">
          <div className="products-filter d-sm-flex align-items-center">
            <div className="d-flex mb-sm-0 mb-3">
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

            <div className="ms-auto  d-flex align-items-center justify-content-between">
              <p className="mt-1 text-secondary">10 of 21 products</p>
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
            <ProductCard col={col} />
            <ProductCard col={col} />
            <ProductCard col={col} />
            <ProductCard col={col} />
            <ProductCard col={col} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStore;
