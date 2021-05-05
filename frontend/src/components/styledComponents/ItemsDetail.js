import React from "react";

const ItemsDetail = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

ItemsDetail.defaultProps = {
  className: "px-5 w-full md:w-2/12 md:flex-basis-16 relative mb-2 md:mb-0",
};

export default ItemsDetail;
