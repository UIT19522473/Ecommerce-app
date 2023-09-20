import React, { useState } from "react";
import "../styles/ourstore.css";
import {
  CheckBoxAvailable,
  CheckBoxBrand,
  CheckBoxSize,
  ItemColor,
} from "./OurStore";
import { useSpring, animated } from "react-spring";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllBrands } from "../features/brands/brandAsyncThunk";
import { getAllCategories } from "../features/categories/categoryAsyncThunk";
import { CheckBoxCategory } from "./OurStore/CheckBoxCategory";
import InputPrice from "./OurStore/InputPrice";

import { useNavigate } from "react-router-dom";
import { apiGetColorSize, apiStockStatus } from "../apis/apiProduct";

const NavOurStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [stock, setStock] = useState({
    productsInStock: 0,
    productsOutOfStock: 0,
  });

  const [colorSize, setColorSize] = useState({
    uniqueColors: [],
    uniqueSizesWithQuantity: [],
  });

  const filterQueryRedux = useSelector((state) => state.filterOurStore.data);

  //fetch stock
  useEffect(() => {
    const fetchStock = async () => {
      const responseStock = await apiStockStatus();
      const responseColorSize = await apiGetColorSize();
      // console.log(response);
      setStock(responseStock?.data);
      setColorSize(responseColorSize?.data);
    };
    fetchStock();
  }, []);

  useEffect(() => {
    const newQueryParams = new URLSearchParams();
    const { title, categories, brands, availability, price, colors, sizes } = {
      ...filterQueryRedux,
    };

    if (title !== "") newQueryParams.set("title", title);
    if (categories.length > 0) newQueryParams.set("category", categories);
    if (brands.length > 0) newQueryParams.set("brand", brands);
    if (availability.in) newQueryParams.set("availIn", availability.in);
    if (availability.out) newQueryParams.set("availOut", availability.out);
    if (price.from) newQueryParams.set("minPrice", price.from);
    if (price.to) newQueryParams.set("maxPrice", price.to);
    if (colors.length > 0) newQueryParams.set("color", colors);
    if (sizes.length > 0) newQueryParams.set("size", sizes);

    navigate(`?${newQueryParams.toString()}`);
    // dispatch(getFilterProducts(newQueryParams));

    // dispatch(getSearchProducts(newQueryParams));
  }, [filterQueryRedux, navigate]);

  const brands = useSelector((state) => state?.brands?.data);
  const categories = useSelector((state) => state?.categories?.data);
  useEffect(() => {
    dispatch(getAllBrands());
    if (!categories) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories]);

  const [modeNavFilter, setModeNavFilter] = useState(false);

  const [openResNav, setOpenResNav] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const expandAnimation = useSpring({
    height: expanded ? `600px` : "0px",
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
      className={`wrap-navstore  ${
        openResNav ? "wrap-navstore--responsive" : ""
      }`}
    >
      <button
        onClick={openResponsiveNav}
        className={`d-flex justify-content-center align-items-center btn-left-nav ${
          openResNav ? "btn-left-nav--close" : ""
        } d-sm-none d-block`}
      >
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
        className={`wrap-navstore-content `}
      >
        <div className="wrap-filter-categories">
          <p className="nav-title">Categories</p>
          <div className="filter-categories d-flex flex-wrap gap-15 custom-scroll">
            {categories?.map((item, index) => (
              <CheckBoxCategory key={index} category={item} />
            ))}
          </div>
        </div>

        <div className="wrap-filter-brand">
          <p className="nav-title">Brand</p>
          <div className="filter-brand d-flex flex-wrap gap-15 custom-scroll">
            {brands?.map((item, index) => (
              <CheckBoxBrand key={index} brand={item} />
            ))}
          </div>
        </div>
        <div className="wrap-filter-properties">
          <p className="nav-title">Availability</p>
          <div className="filter-available d-lg-block d-flex gap-lg-0 gap-30">
            <CheckBoxAvailable type={"In"} stock={stock?.productsInStock} />
            <CheckBoxAvailable type={"Out"} stock={stock?.productsOutOfStock} />
          </div>

          <InputPrice />

          <div className="wrap-filter-color">
            <p className="nav-title">Color</p>
            <div className="filter-color d-flex gap-15 flex-wrap custom-scroll">
              {colorSize?.uniqueColors?.map((item, index) => (
                <ItemColor key={index} type="our-store" color={item?.color} />
              ))}
            </div>
          </div>

          <div className="filter-size">
            <p className="nav-title">Size</p>
            <div className="d-lg-block d-flex gap-lg-0 gap-30 flex-wrap">
              {colorSize?.uniqueSizesWithQuantity?.map((item, index) => (
                <CheckBoxSize
                  key={index}
                  size={item?.size}
                  stock={item?.totalQuantity}
                />
              ))}
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default NavOurStore;
