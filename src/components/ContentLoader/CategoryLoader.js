import React from "react";
import ContentLoader from "react-content-loader";

const CategoryLoader = () => {
  return (
    <ContentLoader
      width={380}
      height={70}
      viewBox="0 0 400 160"
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="300" height="30" />
      <rect x="0" y="40" rx="3" ry="3" width="200" height="30" />
      <rect x="320" y="0" rx="0" ry="0" width="80" height="80" />
    </ContentLoader>
  );
};

export default CategoryLoader;
