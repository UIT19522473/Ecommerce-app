import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSizeOurStore,
  updateSizeOurStore,
} from "../../features/filterOurStore/filterOurStore";

export const CheckBoxSize = (props) => {
  const { size, stock } = props;

  const dispatch = useDispatch();
  const sizesRedux = useSelector((state) => state.filterOurStore.data.sizes);

  const handleChangeInput = (e) => {
    const isChecked = e.target.checked; // Kiểm tra xem checkbox có được chọn hay không

    if (isChecked) {
      dispatch(updateSizeOurStore(size));
    } else {
      dispatch(removeSizeOurStore(size));
    }
  };
  return (
    <div className="d-flex align-items-center gap-1 mb-1">
      <input
        style={{ width: 15, height: 15 }}
        type="checkbox"
        id={size}
        name={size}
        value={stock}
        onChange={handleChangeInput}
        checked={sizesRedux?.includes(size)}
      />
      <label
        htmlFor={size}
        className="d-flex align-content-center gap-1 ms-1 text-lable"
      >
        <p className="fw-medium">{size}</p>({stock})
      </label>
    </div>
  );
};
