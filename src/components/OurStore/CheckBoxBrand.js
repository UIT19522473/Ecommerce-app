import React from "react";

export const CheckBoxBrand = ({ brand }) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <input type="checkbox" id={brand} name={brand} value={brand} />
      <label className="text-lable" htmlFor={brand}>
        {brand}
      </label>
    </div>
  );
};
