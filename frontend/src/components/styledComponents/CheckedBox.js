import React from "react";

const CheckedBox = ({ value, onChange, checked }) => {
  return (
    <div className="my-2">
      <label className="inline-flex items-center mt-3">
        <input
          type="checkbox"
          className="h-5 w-5 focus:ring-blue-500 text-blue-600"
          value={value}
          name="isAdmin"
          onChange={onChange}
          checked={checked}
        />
        <span className="ml-2 text-gray-700">isAdmin</span>
      </label>
    </div>
  );
};

export default CheckedBox;
