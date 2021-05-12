import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto w-full mt-3 text-sm xl:text-base ml-1">
      <table className="max-w-4xl w-full whitespace-nowrap rounded-sm bg-white divide-y divide-gray-300 overflow-hidden">
        {children}
      </table>
    </div>
  );
};

export default Table;
