import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto w-full p-1 mt-3 text-sm xl:text-base">
      <table className="max-w-full w-full whitespace-nowrap rounded-sm bg-white divide-y divide-gray-300 overflow-hidden">
        {children}
      </table>
    </div>
  );
};

export default Table;
