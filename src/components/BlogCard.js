import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="wrap-blog-card">
      <div className="blog-card">
        <div className="card-image">
          <img className="img-fluid" src="images/blog-1.jpg" alt="blog" />
        </div>

        <div className="blog-content">
          <p className="date">1 Jun. 2023</p>
          <h5 className="title">A beautiful sunday morning renaissance</h5>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            asperiores.
          </p>
          <Link className="button mt-2" to="/">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
