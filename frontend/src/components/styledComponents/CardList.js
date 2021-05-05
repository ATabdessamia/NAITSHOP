import React from "react";

const CardList = ({ children, bordred, flexed }) => {
  return (
    <ul
      className={`divide-y > * divide-gray-900 > * divide-opacity-20 ${
        bordred ? "border" : ""
      } text-opacity-70 text-gray-900 ${
        flexed ? "flex flex-col pl-0 mb-0" : ""
      }`}
    >
      {children}
    </ul>
  );
};

CardList.defaultProps = {
  bordred: false,
  flexed: false,
};

export default CardList;
