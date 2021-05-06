import React from "react";

const DivideFlex = ({ key, children }) => {
  return (
    <div
      className="flex flex-col pl-0 mb-3 text-opacity-70 text-gray-900 text-sm sm:text-base md:text-sm lg:text-base items-center justify-center text-center md:text-left"
      key={key}
    >
      <div className="py-3 relative block px-5">
        <div className="-mx-3.5 flex flex-wrap items-center">{children}</div>
      </div>
    </div>
  );
};

export default DivideFlex;
