import React from "react";

const SmBanner = ({ category, name, title, img, color }) => {
  return (
    <div className="smbanner">
      <div className="smbanner-img">
        <img
          src={
            img ||
            "https://demo-digitic.myshopify.com/cdn/shop/files/subbanner-01.jpg?v=1655701528"
          }
          alt="logo"
        />
      </div>
      <div
        className={`smbanner-content ${color ? "smbanner-content--black" : ""}`}
      >
        <p className="smbanner-category">{category}</p>
        <h2 className="smbanner-name">{name}</h2>
        <p className="smbanner-title">{title}</p>
      </div>
    </div>
  );
};

export default SmBanner;
