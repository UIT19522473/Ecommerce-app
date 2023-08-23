import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  updateBrandOurStore,
  removeIdBrandOurStore,
} from "../../features/filterOurStore/filterOurStore";

export const CheckBoxBrand = (props) => {
  const dispatch = useDispatch();
  const brandsRedux = useSelector((state) => state.filterOurStore.data.brands);

  const { brand } = props;

  const handleChangeInput = (e) => {
    const isChecked = e.target.checked; // Kiểm tra xem checkbox có được chọn hay không

    if (isChecked) {
      dispatch(updateBrandOurStore(brand?._id));
      // console.log("checked", brand?._id);
    } else {
      dispatch(removeIdBrandOurStore(brand?._id));
      // console.log("unChecked");
    }
  };
  return (
    <div className="d-flex align-items-center gap-1">
      <input
        type="checkbox"
        id={brand?._id}
        name={brand?.title}
        value={brand?.title}
        onChange={handleChangeInput}
        checked={brandsRedux?.includes(brand?._id)}
      />
      <label className="text-lable" htmlFor={brand?.title}>
        {brand?.title}
      </label>
    </div>
  );
};
