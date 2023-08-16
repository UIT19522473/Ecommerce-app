import React from "react";

const Category = (props) => {
  const { item } = props;
  return (
    <div className="categories-part">
      <div className="d-flex align-items-center justify-content-between px-3 categories-item">
        <div>
          <h6>{item?.title}</h6>
          <p className="mb-0">{item?.numberOfProducts} Items</p>
        </div>
        <img src={item?.image} alt="camera" />
      </div>
    </div>
  );
};

export default Category;
