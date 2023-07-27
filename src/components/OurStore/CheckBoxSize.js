import React from "react";

export const CheckBoxSize = ({ size, stock }) => {
  return (
    <div className="d-flex align-items-center gap-1 mb-1">
      <input
        style={{ width: 15, height: 15 }}
        type="checkbox"
        id={size}
        name={size}
        value={stock}
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
