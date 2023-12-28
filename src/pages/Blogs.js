import React from "react";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  return (
    <div className="d-flex container">
      <div className="row">
        <div className="col-6">
          <BlogCard />
        </div>
        <div className="col-6">
          <BlogCard />
        </div>
        <div className="col-6">
          <BlogCard />
        </div>
        <div className="col-6">
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
