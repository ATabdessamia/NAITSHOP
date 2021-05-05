import React from "react";

const Card = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

Card.defaultProps = {
  className:
    "px-5 w-full md:w-2/5 md:flex-basis-40 relative text-sm sm:text-base md:text-sm lg:text-base break-word bg-clip-border min-w-0 flex flex-col",
};

export default Card;
