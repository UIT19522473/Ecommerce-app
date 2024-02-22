import React from "react";
import ContentLoader from "react-content-loader";

const ProductLoader = () => {
  return (
    <div style={{ width: "100%" }} className="product-loader">
      <div className="ms-5 d-flex justify-content-center align-items-center">
        <ContentLoader
          viewBox={`0 0 100% 100%`}
          speed={2}
          backgroundColor="#d6d6d6"
          foregroundColor="#ecebeb"
        >
          {/* Only SVG shapes */}
          <rect x="50" y="0" rx="5" ry="5" width="100" height="120" />
        </ContentLoader>
      </div>
      <div className="d-flex align-items-center justify-content-center ms-5">
        <ContentLoader
          viewBox={`0 0 100% 100%`}
          speed={2}
          backgroundColor="#d6d6d6"
          foregroundColor="#ecebeb"
        >
          {/* Only SVG shapes */}

          <rect x="0" y="0" rx="4" ry="4" width="100" height="15" />
          <rect x="0" y="20" rx="4" ry="4" width="200" height="15" />
          <rect x="0" y="40" rx="4" ry="4" width="100" height="15" />
          <rect x="0" y="60" rx="4" ry="4" width="150" height="15" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default ProductLoader;
