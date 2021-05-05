import React from "react";

const CardListItems = ({ children, flexed, capitalize }) => {
  return (
    <li
      className={`${
        flexed
          ? "p-3 flex flex-wrap items-center justify-center "
          : "py-3 relative block px-5"
      }
      ${capitalize ? "text-gray-700 text-opacity-80 capitalize" : ""}
      `}
    >
      {children}
    </li>
  );
};

CardListItems.defaultProps = {
  flexed: false,
  capitalize: false,
};

export default CardListItems;
