import React from "react";
import { useState } from "react";

export const ItemColor = ({ color }) => {
  const [choose, setChoose] = useState(false);
  return (
    <div
      onClick={() => setChoose(!choose)}
      style={{ backgroundColor: color }}
      className={`item-color ${choose ? "item-color--choose" : ""}`}
    ></div>
  );
};
