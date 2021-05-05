import React from "react";

const Select = ({ value, onChange, countItem }) => {
  return (
    <select
      className="flex-grow w-full max-w-full flex-basis-0 p-2 md:p-1 lg:p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 transition-colors ease-in-out"
      value={value}
      onChange={onChange}
    >
      {[...Array(countItem.countInStock).keys()].map((q) => (
        <option key={q + 1} value={q + 1}>
          {q + 1}
        </option>
      ))}
    </select>
  );
};

export default Select;
