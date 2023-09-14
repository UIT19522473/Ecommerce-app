import React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import {
  removeColorsOurStore,
  updateColorsOurStore,
} from "../../features/filterOurStore/filterOurStore";

export const ItemColor = (props) => {
  const { color, type } = props;
  // console.log(color);
  const dispatch = useDispatch();
  // const colorsRedux = useSelector((state) => state.filterOurStore.data.colors);
  const [choose, setChoose] = useState(false);

  const handleChooseColor = () => {
    setChoose(!choose);
    if (type === "our-store") {
      if (!choose) {
        dispatch(updateColorsOurStore(color));
      } else {
        dispatch(removeColorsOurStore(color));
      }
    }
  };
  return (
    <div
      onClick={handleChooseColor}
      style={{ backgroundColor: color }}
      className={`item-color ${choose ? "item-color--choose" : ""}`}
    ></div>
  );
};
