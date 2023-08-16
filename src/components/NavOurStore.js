import React, { useState } from "react";
import "../styles/ourstore.css";
import {
  CheckBoxAvailable,
  CheckBoxBrand,
  CheckBoxSize,
  ItemColor,
} from "./OurStore";
import { useSpring, animated } from "react-spring";

const NavOurStore = () => {
  const [modeNavFilter, setModeNavFilter] = useState(false);

  const [openResNav, setOpenResNav] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const expandAnimation = useSpring({
    height: expanded ? `500px` : "0px",
  });

  const expandFilter = () => {
    setModeNavFilter(!modeNavFilter);
    setExpanded(!expanded);
  };

  const openResponsiveNav = () => {
    setOpenResNav(!openResNav);
  };

  return (
    <div
      className={`wrap-navstore ${
        openResNav ? "wrap-navstore--responsive" : ""
      }`}
    >
      <button
        onClick={openResponsiveNav}
        className={`d-flex justify-content-center align-items-center btn-left-nav ${
          openResNav ? "btn-left-nav--close" : ""
        } d-sm-none d-block`}
      >
        {/* <p>Filter By</p> */}
        {/* <p>1</p> */}
        {openResNav ? (
          <span className="material-symbols-outlined">chevron_left</span>
        ) : (
          <>
            <p>Filter By</p>
            <span className="material-symbols-outlined">chevron_right</span>
          </>
        )}
      </button>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0 text-2xl font-semibold">Filter By</h3>
        {/* Sử dụng react-measure để đo kích thước của phần tử nội dung */}
        {modeNavFilter ? (
          <span
            onClick={expandFilter}
            className="material-symbols-outlined fs-2 fw-bold d-lg-none btn-expand-filter"
          >
            expand_less
          </span>
        ) : (
          <span
            onClick={expandFilter}
            className="material-symbols-outlined fs-2 fw-bold d-lg-none btn-expand-filter"
          >
            expand_more
          </span>
        )}
      </div>
      <animated.div
        style={
          window.innerWidth < 992 && window.innerWidth >= 576
            ? expandAnimation
            : {}
        }
        // className={`wrap-navstore-content ${
        //   window.innerWidth < 992 && window.innerWidth >= 576
        //     ? "wrap-navstore-content--small custom-scroll"
        //     : "wrap-navstore-content--fit"
        // } ${window.innerWidth < 576 ? "wrap-navstore-content--left" : ""}`}

        className={`wrap-navstore-content `}
      >
        <div className="wrap-filter-brand">
          <p className="nav-title">Brand</p>
          <div className="filter-brand d-flex flex-wrap gap-15 custom-scroll">
            <CheckBoxBrand brand={"Windown"} />
            <CheckBoxBrand brand={"Apple"} />
            <CheckBoxBrand brand={"Sony"} />
            <CheckBoxBrand brand={"Samsung"} />
            <CheckBoxBrand brand={"LG"} />
          </div>
        </div>
        <div className="wrap-filter-properties">
          <p className="nav-title">Availability</p>
          <div className="filter-available d-lg-block d-flex gap-lg-0 gap-30">
            <CheckBoxAvailable type={"In stock"} stock={21} />
            <CheckBoxAvailable type={"Out of stock"} stock={2} />
          </div>
          <div className="filter-price">
            <p className="nav-title">Price</p>
            <div className="d-flex gap-10 flex-wrap">
              <div className="input-price d-flex align-items-center gap-1">
                <label htmlFor="price-from" className="lb-dolar">
                  $
                </label>
                <input type="number" placeholder="From" name="price-from" />
              </div>

              <div className="input-price d-flex align-items-center gap-1">
                <label htmlFor="price-to" className="lb-dolar">
                  $
                </label>
                <input type="number" placeholder="To" name="price-to" />
              </div>
            </div>
          </div>

          <div className="wrap-filter-color">
            <p className="nav-title">Color</p>
            <div className="filter-color d-flex gap-15 flex-wrap custom-scroll">
              <ItemColor color="red" />
              <ItemColor color="green" />
              <ItemColor color="yellow" />
              <ItemColor color="orange" />
              <ItemColor color="black" />
              <ItemColor color="yellow" />
              <ItemColor color="orange" />
              <ItemColor color="black" />
              <ItemColor color="yellow" />
              <ItemColor color="orange" />
              <ItemColor color="black" />
              <ItemColor color="black" />
              <ItemColor color="yellow" />
              <ItemColor color="orange" />
              <ItemColor color="black" />
              <ItemColor color="black" />
              <ItemColor color="yellow" />
              <ItemColor color="orange" />
              <ItemColor color="black" />
            </div>
          </div>

          <div className="filter-size">
            <p className="nav-title">Size</p>
            <div className="d-lg-block d-flex gap-lg-0 gap-30 flex-wrap">
              <CheckBoxSize size={"S"} stock={10} />
              <CheckBoxSize size={"M"} stock={7} />
              <CheckBoxSize size={"L"} stock={12} />
              <CheckBoxSize size={"XL"} stock={1} />
              <CheckBoxSize size={"XXL"} stock={3} />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default NavOurStore;
