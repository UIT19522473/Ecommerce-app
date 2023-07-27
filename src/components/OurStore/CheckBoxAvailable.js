import React from "react";

export const CheckBoxAvailable = ({ type, stock }) => {
  return (
    <div className="d-flex align-items-center gap-1 mb-1">
      <input type="checkbox" id={type} name={type} value={stock} />
      <label className="text-lable" htmlFor={type}>
        In stock ({stock})
      </label>
    </div>
  );
};
