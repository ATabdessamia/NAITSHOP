import React from "react";

const Select = ({ value, onChange, countItem, opRate }) => {
  return (
    <select
      className="flex-grow w-full max-w-full flex-basis-0 p-2 md:p-1 lg:p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200 transition-colors ease-in-out"
      value={value}
      onChange={onChange}
    >
      {opRate ? (
        <>
          <option value="" className="text-gray-400">
            Select...
          </option>
          <option value="1">1 - Poor &#x1F60F;</option>
          <option value="2">2 - Fair &#x1F610;</option>
          <option value="3">3 - Good &#x1F60A;</option>
          <option value="4">4 - Very Good &#x1F60E;</option>
          <option value="5">5 - Excellent &#x1F4AA;</option>
        </>
      ) : (
        [...Array(countItem && countItem.countInStock).keys()].map((q) => (
          <option key={q + 1} value={q + 1}>
            {q + 1}
          </option>
        ))
      )}
    </select>
  );
};

export default Select;
