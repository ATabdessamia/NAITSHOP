import React from "react";

const CardGrowItem = ({ title, price }) => {
  return (
    <div className="-mx-3.5 flex flex-wrap px-3">
      <div className="flex-grow flex-basis-0 max-w-full">{title}</div>
      <div className="flex-grow flex-basis-0 max-w-full">
        <strong>${price}</strong>
      </div>
    </div>
  );
};

export default CardGrowItem;
