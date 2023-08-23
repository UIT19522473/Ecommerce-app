import React from "react";
import "../../styles/ourstore.css";

import { useSelector, useDispatch } from "react-redux";
import {
  updatePriceFrom,
  updatePriceTo,
} from "../../features/filterOurStore/filterOurStore";

const InputPrice = () => {
  const dispatch = useDispatch();

  const priceRedux = useSelector((state) => state.filterOurStore.data.price);
  //   const [priceFrom, setPriceFrom] = useState(0);
  //   const [priceTo, setPriceTo] = useState(0);
  const handleChangePriceFrom = (e) => {
    // setPriceFrom(e.target.value);
    // console.log(e.target.value);
    dispatch(updatePriceFrom(e.target.value));
  };

  const handleChangePriceTo = (e) => {
    // setPriceTo(e.target.value);
    // console.log(e.target.value);
    dispatch(updatePriceTo(e.target.value));
  };
  return (
    <div className="filter-price">
      <p className="nav-title">Price</p>
      <div className="d-flex gap-10 flex-wrap">
        <div className="input-price d-flex align-items-center gap-1">
          <label htmlFor="price-from" className="lb-dolar">
            $
          </label>
          <input
            value={priceRedux?.from}
            onChange={handleChangePriceFrom}
            type="number"
            placeholder="From"
            name="price-from"
          />
        </div>

        <div className="input-price d-flex align-items-center gap-1">
          <label htmlFor="price-to" className="lb-dolar">
            $
          </label>
          <input
            value={priceRedux?.to}
            onChange={handleChangePriceTo}
            type="number"
            placeholder="To"
            name="price-to"
          />
        </div>
      </div>
    </div>
  );
};

export default InputPrice;
