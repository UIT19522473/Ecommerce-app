import React from "react";
import { useState } from "react";

const NumberPage = (props) => {
  const { number, page, setPage } = props;
  return (
    <li
      onClick={() => setPage(number)}
      className={`number-page ${
        number === page ? "number-page--choose" : ""
      } cursor-pointer`}
    >
      <p>{number}</p>
    </li>
  );
};

export const Pagination = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="pagination-wrap mt-4">
      <div className="pagination-text">
        <p>Showing 6 of 21</p>
      </div>

      <nav className="pagination-nav-number d-flex justify-content-center align-items-center gap-4">
        <button className="btn-pagination">{"<"}</button>
        <ul className="d-flex gap-4 p-0 m-0">
          <NumberPage number={1} page={page} setPage={setPage} />
          <NumberPage number={2} page={page} setPage={setPage} />
          <NumberPage number={3} page={page} setPage={setPage} />
        </ul>
        <button className="btn-pagination">{">"}</button>
      </nav>
    </div>
  );
};
