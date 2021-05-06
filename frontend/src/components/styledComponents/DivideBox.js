import React from "react";

const DivideBox = ({ children }) => {
  return (
    <div className="px-5 w-full md:w-3/5 md:flex-basis-60 relative">
      <div className="flex flex-col pl-0 divide-y > * divide-gray-900 > * divide-opacity-20 text-opacity-70 text-gray-900 text-sm sm:text-base md:text-sm lg:text-base my-3 justify-center">
        {children}
      </div>
    </div>
  );
};

export default DivideBox;
