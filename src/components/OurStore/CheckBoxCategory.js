import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategoryOurStore,
  removeIdCategoryOurStore,
} from "../../features/filterOurStore/filterOurStore";

export const CheckBoxCategory = (props) => {
  const dispatch = useDispatch();
  const queryFilterCategory = useSelector((state) => state.filterOurStore.data);

  const { category } = props;

  const handleChangeInput = (e) => {
    const isChecked = e.target.checked; // Kiểm tra xem checkbox có được chọn hay không

    if (isChecked) {
      dispatch(updateCategoryOurStore(category?._id));
    } else {
      dispatch(removeIdCategoryOurStore(category?._id));
    }
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <input
        type="checkbox"
        id={category?._id}
        name={category?.title}
        value={category?.title}
        onChange={handleChangeInput}
        checked={queryFilterCategory.categories.includes(category?._id)}
      />
      <label className="text-lable" htmlFor={category?.title}>
        {category?.title}
      </label>
    </div>
  );
};
