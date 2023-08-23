import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInStockOurStore,
  updateOutStockOurStore,
} from "../../features/filterOurStore/filterOurStore";

export const CheckBoxAvailable = (props) => {
  const { type, stock } = props;

  const dispatch = useDispatch();
  const availability = useSelector(
    (state) => state.filterOurStore.data.availability
  );

  const handleChangeInput = (e) => {
    const isChecked = e.target.checked; // Kiểm tra xem checkbox có được chọn hay không

    if (type === "In") {
      dispatch(updateInStockOurStore(isChecked));
    } else {
      dispatch(updateOutStockOurStore(isChecked));
    }
    // if (isChecked) {
    //   dispatch(updateBrandOurStore(brand?._id));
    //   // console.log("checked", brand?._id);
    // } else {
    //   dispatch(removeIdBrandOurStore(brand?._id));
    //   // console.log("unChecked");
    // }
  };
  return (
    <div className="d-flex align-items-center gap-1 mb-1">
      <input
        type="checkbox"
        id={type}
        name={type}
        value={stock}
        onChange={handleChangeInput}
        checked={type === "In" ? availability.in : availability.out}
      />
      <label className="text-lable" htmlFor={type}>
        {type === "In" ? `In stock (${stock})` : `Out of stock (${stock})`}
      </label>
    </div>
  );
};
